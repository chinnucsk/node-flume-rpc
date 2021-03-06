//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./flume_types');
//HELPER FUNCTIONS AND STRUCTURES

var ThriftFlumeEventServer_append_args = function(args){
  this.evt = null
if( args != null ){  if (null != args.evt)
  this.evt = args.evt
}}
ThriftFlumeEventServer_append_args.prototype = {}
ThriftFlumeEventServer_append_args.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRUCT) {
        this.evt = new ttypes.ThriftFlumeEvent()
        this.evt.read(input)
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

ThriftFlumeEventServer_append_args.prototype.write = function(output){ 
  output.writeStructBegin('ThriftFlumeEventServer_append_args')
  if (null != this.evt) {
    output.writeFieldBegin('evt', Thrift.Type.STRUCT, 1)
    this.evt.write(output)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var ThriftFlumeEventServer_append_result = function(args){
}
ThriftFlumeEventServer_append_result.prototype = {}
ThriftFlumeEventServer_append_result.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

ThriftFlumeEventServer_append_result.prototype.write = function(output){ 
  output.writeStructBegin('ThriftFlumeEventServer_append_result')
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var ThriftFlumeEventServer_close_args = function(args){
}
ThriftFlumeEventServer_close_args.prototype = {}
ThriftFlumeEventServer_close_args.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

ThriftFlumeEventServer_close_args.prototype.write = function(output){ 
  output.writeStructBegin('ThriftFlumeEventServer_close_args')
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var ThriftFlumeEventServer_close_result = function(args){
}
ThriftFlumeEventServer_close_result.prototype = {}
ThriftFlumeEventServer_close_result.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

ThriftFlumeEventServer_close_result.prototype.write = function(output){ 
  output.writeStructBegin('ThriftFlumeEventServer_close_result')
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var ThriftFlumeEventServerClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {}
}
ThriftFlumeEventServerClient.prototype = {}
ThriftFlumeEventServerClient.prototype.append = function(evt,callback){
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
    this.send_append(evt)
}

ThriftFlumeEventServerClient.prototype.send_append = function(evt){
  var output = new this.pClass(this.output);
  output.writeMessageBegin('append', Thrift.MessageType.CALL, this.seqid)
  var args = new ThriftFlumeEventServer_append_args()
  args.evt = evt
  args.write(output)
  output.writeMessageEnd()
  return this.output.flush()
}
ThriftFlumeEventServerClient.prototype.close = function(callback){
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
    this.send_close()
}

ThriftFlumeEventServerClient.prototype.send_close = function(){
  var output = new this.pClass(this.output);
  output.writeMessageBegin('close', Thrift.MessageType.CALL, this.seqid)
  var args = new ThriftFlumeEventServer_close_args()
  args.write(output)
  output.writeMessageEnd()
  return this.output.flush()
}

ThriftFlumeEventServerClient.prototype.recv_close = function(input,mtype,rseqid){
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException()
    x.read(input)
    input.readMessageEnd()
    return callback(x);
  }
  var result = new ThriftFlumeEventServer_close_result()
  result.read(input)
  input.readMessageEnd()

  callback(null)
}
var ThriftFlumeEventServerProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
ThriftFlumeEventServerProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin()
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output)
  } else {
    input.skip(Thrift.Type.STRUCT)
    input.readMessageEnd()
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname)
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid)
    x.write(output)
    output.writeMessageEnd()
    output.flush()
  }
}

ThriftFlumeEventServerProcessor.prototype.process_append = function(seqid, input, output) {
  var args = new ThriftFlumeEventServer_append_args()
  args.read(input)
  input.readMessageEnd()
  this._handler.append(args.evt)
}

ThriftFlumeEventServerProcessor.prototype.process_close = function(seqid, input, output) {
  var args = new ThriftFlumeEventServer_close_args()
  args.read(input)
  input.readMessageEnd()
  var result = new ThriftFlumeEventServer_close_result()
  this._handler.close(function(success) {
    result.success = success
    output.writeMessageBegin("close", Thrift.MessageType.REPLY, seqid)
    result.write(output)
    output.writeMessageEnd()
    output.flush()
  })
}

