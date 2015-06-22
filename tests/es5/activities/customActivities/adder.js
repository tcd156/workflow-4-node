"use strict";
var wf4node = require("../../../../");
var util = require("util");
var Activity = wf4node.activities.Activity;
var _ = require("lodash");
function Adder() {
  Activity.call(this);
}
util.inherits(Adder, Activity);
Adder.prototype.run = function(callContext, args) {
  callContext.schedule(args, "_argsGot");
};
Adder.prototype._argsGot = function(callContext, reason, result) {
  if (reason == Activity.states.complete) {
    var sum = 0;
    result.forEach(function(a) {
      if (_.isNumber(a))
        sum += a;
    });
    callContext.complete(sum);
  } else {
    callContext.end(reason, result);
  }
};
module.exports = Adder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsQUFBSSxFQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFDckMsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDMUIsQUFBSSxFQUFBLENBQUEsUUFBTyxFQUFJLENBQUEsT0FBTSxXQUFXLFNBQVMsQ0FBQztBQUMxQyxBQUFJLEVBQUEsQ0FBQSxDQUFBLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUV6QixPQUFTLE1BQUksQ0FBRSxBQUFELENBQUc7QUFDYixTQUFPLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ3ZCO0FBQUEsQUFFQSxHQUFHLFNBQVMsQUFBQyxDQUFDLEtBQUksQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUU5QixJQUFJLFVBQVUsSUFBSSxFQUFJLFVBQVMsV0FBVSxDQUFHLENBQUEsSUFBRyxDQUFHO0FBQzlDLFlBQVUsU0FBUyxBQUFDLENBQUMsSUFBRyxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxJQUFJLFVBQVUsU0FBUyxFQUFJLFVBQVMsV0FBVSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsTUFBSyxDQUFHO0FBQzdELEtBQUksTUFBSyxHQUFLLENBQUEsUUFBTyxPQUFPLFNBQVMsQ0FBRztBQUNwQyxBQUFJLE1BQUEsQ0FBQSxHQUFFLEVBQUksRUFBQSxDQUFDO0FBQ1gsU0FBSyxRQUFRLEFBQUMsQ0FBQyxTQUFVLENBQUEsQ0FBRztBQUN4QixTQUFJLENBQUEsU0FBUyxBQUFDLENBQUMsQ0FBQSxDQUFDO0FBQUcsVUFBRSxHQUFLLEVBQUEsQ0FBQztBQUFBLElBQy9CLENBQUMsQ0FBQztBQUNGLGNBQVUsU0FBUyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7RUFDN0IsS0FDSztBQUNELGNBQVUsSUFBSSxBQUFDLENBQUMsTUFBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0VBQ25DO0FBQUEsQUFDSixDQUFBO0FBRUEsS0FBSyxRQUFRLEVBQUksTUFBSSxDQUFDO0FBQ3RCIiwiZmlsZSI6ImFjdGl2aXRpZXMvY3VzdG9tQWN0aXZpdGllcy9hZGRlci5qcyIsInNvdXJjZVJvb3QiOiJ0ZXN0cy9lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2Y0bm9kZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9cIik7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcInV0aWxcIik7XHJcbnZhciBBY3Rpdml0eSA9IHdmNG5vZGUuYWN0aXZpdGllcy5BY3Rpdml0eTtcclxudmFyIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xyXG5cclxuZnVuY3Rpb24gQWRkZXIoKSB7XHJcbiAgICBBY3Rpdml0eS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG51dGlsLmluaGVyaXRzKEFkZGVyLCBBY3Rpdml0eSk7XHJcblxyXG5BZGRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oY2FsbENvbnRleHQsIGFyZ3MpIHtcclxuICAgIGNhbGxDb250ZXh0LnNjaGVkdWxlKGFyZ3MsIFwiX2FyZ3NHb3RcIik7XHJcbn07XHJcblxyXG5BZGRlci5wcm90b3R5cGUuX2FyZ3NHb3QgPSBmdW5jdGlvbihjYWxsQ29udGV4dCwgcmVhc29uLCByZXN1bHQpIHtcclxuICAgIGlmIChyZWFzb24gPT0gQWN0aXZpdHkuc3RhdGVzLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIoYSkpIHN1bSArPSBhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhbGxDb250ZXh0LmNvbXBsZXRlKHN1bSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjYWxsQ29udGV4dC5lbmQocmVhc29uLCByZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFkZGVyO1xyXG4iXX0=