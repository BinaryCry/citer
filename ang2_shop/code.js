var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Report = (function () {
    function Report(arr) {
        this.data = arr;
    }
    Report.prototype.run = function () {
        console.log(this.data.join(', '));
    };
    return Report;
}());
var ExtReport = (function (_super) {
    __extends(ExtReport, _super);
    function ExtReport(str, arr) {
        var _this = _super.call(this, arr) || this;
        _this.header = str;
        return _this;
    }
    ExtReport.prototype.run = function () {
        console.log(this.header);
        _super.prototype.run.call(this);
    };
    return ExtReport;
}(Report));
var R = new ExtReport('Header', ['Notice', 'Access is allowed', 'Orange']);
R.run();
