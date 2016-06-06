var mongoose = require('mongoose');
var scriptSchema = new mongoose.Schema({
  title: String,
  code: String,
  optimisations: Object,
  createdTime: Date,
  updatedTime: Date
});
// on every save, add the date
scriptSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updatedTime = currentDate;

  if (!this.createdTime) {
    this.createdTime = currentDate;
  }
  next();
});

var Script = mongoose.model('Script', scriptSchema);
module.exports = Script;
