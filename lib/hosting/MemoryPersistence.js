var StrMap = require("backpack-node").collections.StrMap;
var StrBag = require("backpack-node").collections.StrBag;
var Guid = require("guid");
require('date-utils');
var specStrings = require("../common/specStrings");

function MemoryPersistence()
{
    this._instanceData = new StrMap();
    this._paths = new StrBag();
    this._locksById = new StrMap();
    this._locksByName = new StrMap();
}

MemoryPersistence.prototype.enterLock = function (lockName, inLockTimeoutMs)
{
    var now = new Date();
    var cLock = this._locksByName.get(lockName);
    if (cLock === undefined || now.compareTo(cLock.heldTo) === -1)
    {
        var lockInfo = {
            id: Guid.create().toString(),
            name: lockName,
            heldTo: new Date().addMilliseconds(inLockTimeoutMs)
        };

        this._locksById.set(lockInfo.id, lockInfo);
        this._locksByName.set(lockInfo.name, lockInfo);

        return lockInfo;
    }
    return null;
}

MemoryPersistence.prototype.renewLock = function (lockId, inLockTimeoutMs)
{
    var cLock = this._getLockById(lockId);
    cLock.heldTo = new Date().addMilliseconds(inLockTimeoutMs);
}

MemoryPersistence.prototype.renameLock = function (lockId, lockName)
{
    var cLock = this._getLockById(lockId);
    if (cLock.name !== lockName)
    {
        if (this._locksByName.containsKey(lockName)) throw new Error("Lock '" + lockName + "' already held.");
        this._locksByName.remove(cLock.name);
        cLock.name = lockName;
        this._locksByName.add(cLock.name, cLock);
    }
}

MemoryPersistence.prototype.exitLock = function (lockId)
{
    var cLock = this._getLockById(lockId);
    this._locksByName.remove(cLock.name);
    this._locksById.remove(cLock.id);
}

MemoryPersistence.prototype._getLockById = function (lockId)
{
    var cLock = this._locksById.get(lockId);
    var now = new Date();
    if (!cLock || now.compareTo(cLock.heldTo) > -1) throw new Error("Lock by id '" + lockId + "' doesn't exists.");
    return cLock;
}

MemoryPersistence.prototype.getRunningInstanceIdPaths = function (workflowName, methodName)
{
    var result = [];
    var key = specStrings.hosting.doubleKeys(workflowName, methodName);
    this._paths.forEachValueIn(key, function(path)
    {
        result.push(path);
    });
    return result;
}

MemoryPersistence.prototype.persistState = function (state)
{
    var self = this;
    var key = specStrings.hosting.doubleKeys(state.workflowName, state.instanceId);
    var oldState = this._instanceData.get(key);
    if (oldState)
    {
        oldState.idleMethods.forEach(function(m)
        {
            self._paths.remove(new Names(oldState.workflowName, m.methodName));
        });
        this._instanceData.remove(key);
    }
    self._instanceData.set(key, state);
    state.idleMethods.forEach(function(m)
    {
        self._paths.add(
            specStrings.hosting.doubleKeys(state.workflowName, m.methodName),
            {
                value: m.instanceIdPath,
                instanceId: state.instanceId
            });
    });
}

MemoryPersistence.prototype.getRunningInstanceIdHeader = function (workflowName, instanceId, methodName)
{
    var state = this.loadState(workflowName, instanceId);
    var result = null;
    state.idleMethods.forEach(function(m)
    {
        if (m.methodName === methodName)
        {
            result = {
                instanceIdPath: m.instanceIdPath,
                timestamp: state.timestamp,
                version: state.version
            };
            return false;
        }
    })
    if (result === null) throw new Error("Running instance id path for workflow '" + workflowName + "' by id '" + instanceId + " and method '" + methodName + "' not found.");
    return result;
}

MemoryPersistence.prototype.loadState = function (workflowName, instanceId)
{
    var state = this._instanceData.get(specStrings.hosting.doubleKeys(workflowName, instanceId));
    if (!state) throw new Error("Instance data of workflow '" + workflowName + "' by id '" + instanceId + "' is not found.");
    return state;
}

MemoryPersistence.prototype.removeState = function (workflowName, instanceId)
{
    var state = this.loadState(workflowName, instanceId);
    state.idleMethods.forEach(function(m)
    {
        self._paths.remove(specStrings.hosting.doubleKeys(state.workflowName, m.methodName));
    });
    this._instanceData.remove(specStrings.hosting.doubleKeys(workflowName, instanceId));
}

module.exports = MemoryPersistence;