var _               = require('lodash')
var debug           = require('debug')('engulped')
var path            = require('path')
var taskBuilders    = require('./taskBuilders')
var addDefaultTasks = require('./addDefaultTasks')

function Engulped(gulp,options,tasks) {
  this.gulp = gulp
  tasks = tasks || taskBuilders.tasks

  //make sure babel is registered, for stack traces and transpiling
  //on the fly (for testing and running, not so much for building)
  var register = _.once(function(){
    require('babel/register')({sourceMap: 'both'})
  })

  //helper method that invokes fn after babel is registered
  var registered = this.registered = function(fn){
    return _.flow(register,fn)
  }

  var config = this.config = _.defaults(
    {
      registered : registered
    },
    options,
    {
      argv : process.argv,
      paths : {
        script : {
          src  : './lib/',
          dest : './dist/',
          pattern : '/**/*.js'
        },
        test : {
          src  : './test/',
          pattern : '/**/**Spec.js'
        }
      }
    })


  //accessible list of task builders, without the need to
  //thread gulp and config to all of them
  this.tasks = _.once(function(){
    return _.mapValues(tasks,function(t) {
      return _.partial(t,gulp,config)
    })
  })
}

//constructs Engulped, with the default tasks added
//parameters are the same as the Engulped constructor
Engulped.withDefaultTasks = function(){
  var args = arguments
  function E(){
    return Engulped.apply(this,args)
  }
  E.prototype = Engulped.prototype
  var engulped = new E()
  addDefaultTasks(engulped)
  return engulped
}

module.exports = Engulped
