
//export default ({ app,route }) => {
//
//  app.router.beforeEach((to, from, next) => {
//    	console.log(to.path,"**********")
//		var resourceData = app.store.state.resourceData
//    	
//	    function queryList(url) {
//		    for (var i = 0; i < resourceData.length; i++) {
//		    	if (resourceData[i].resUrl != url) {
//						return true;
//		    	} else {
//		    		queryList(resourceData[i].children);
//		    	}
//		    }
//		}
//		var result = queryList(to.path);
//    	console.log(result,"resultresultresultresult")
//    	if(result === undefined){
//    		//console.log(app,"app")
//    	}
//    	next()
//  })
//}
import _Storage from '../utils/Storage';
export default ({ app })=>{
	if (process.client) {
		
	 	var hasTarget = false;
		const resourceData = _Storage.getObj(
	      "jurisdictionList",
	      "jurisdictionList"
	    )?_Storage.getObj(
	      "jurisdictionList",
	      "jurisdictionList"
	    ):[];
    	console.log(resourceData,"resourceData")
	 	function queryList(loopArr, target) {
	 		debugger;
		    for (var i = 0; i < loopArr.length; i++) {
		    	let item = loopArr[i];
		    	if (item.resUrl && item.resUrl == target) {
		    			hasTarget = true;
						return;
		    	} else {
		    		if(item.children && item.children.length>0){
		    			queryList(item.children, target);		    			
		    		}
		    	}
		    }
		}
	 	app.router.beforeEach((to, from, next) => {
			if(to.name != "login" && to.name != "index" && to.name != "error"){
				queryList(resourceData, to.name);
				
				if(hasTarget){
		      		next();
		     }else{
		     		debugger;
		     		hasTarget = false;
		      		next({ path: '/error' })
		      	}
			}else{
				next()
			}
	      	
	    })
	 }
}
