// 子类继承之
var BaseDb = require('./base');

function Hanzi() {}
Hanzi.prototype = new BaseDb('hanzi');

module.exports = new Hanzi();

// 一些测试方法
/*
exports.insert({NoteId: 'xxx3', 'title': "你好吗?", 'NotebookId': 'life', Tags: ['red', '你好'], CreatedTime: new Date()}, function(err, data){ 
  console.log(err);
});

exports.update({NoteId: 'xxx3'}, {$set: {title: "你知道的", Tags: [], CreatedTime: new Date()}}, function(err) {
  console.log(err);
});
exports.remove({NoteId: 'xxx3'}, function(err, rows) {
  console.log("??");
  console.log(err);
  console.log(rows);
});
exports.find({'$or': [{Title: new RegExp("你")}]}).sort({Title: -1}).exec(function(err, rows) {
  console.log(err);
  console.log(rows);
});
*/