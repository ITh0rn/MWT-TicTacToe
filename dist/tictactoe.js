/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "05b0910b3551eaef422c";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/Button.js":
/*!******************************!*\
  !*** ./src/common/Button.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility/index.js\");\n\n\n/*Generic Button component, if customStyle is not passed, use default*/\nfunction Button(id,innertext,onClick,customStyle) {\n\n  let button = document.createElement('button');\n\n  let settedStyle = customStyle || style.default;\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"])(button, {...settedStyle, ...style.static})\n\n  button.addEventListener('click', onClick);\n  button.innerHTML = innertext;\n\n  return button;\n}\n\nconst style = {\n  default: {\n    width: '100px',\n    height: '100px',\n    backgroundColor: 'blue',\n  },\n  static: {\n    outline: 'none',\n    cursor: 'pointer'\n  },\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Button);\n\n\n//# sourceURL=webpack:///./src/common/Button.js?");

/***/ }),

/***/ "./src/components/Cell.js":
/*!********************************!*\
  !*** ./src/components/Cell.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility/index.js\");\n\n\nlet Cell = function(idx) {\n\n  let cell;\n\n  let init = (function() {\n\n    cell = document.createElement(\"div\");\n    cell.setAttribute(\"class\", \"tic-cell\");\n\n    let borderDimension = '4px solid';\n\n    let customstyle = {};\n\n    /*Set grid layout and border for each cell based on it's position*/\n    switch (idx) {\n      case 1:\n        customstyle = {\n          borderLeft: borderDimension,\n          borderRight: borderDimension\n        }\n        break;\n      case 3:\n        customstyle = {\n          borderTop: borderDimension,\n          borderBottom: borderDimension\n        }\n        break;\n      case 4:\n        customstyle = {\n          border: borderDimension\n        }\n        break;\n      case 5:\n        customstyle = {\n          borderTop: borderDimension,\n          borderBottom: borderDimension\n        }\n        break;\n      case 7:\n        customstyle = {\n          borderRight: borderDimension,\n          borderLeft: borderDimension\n        }\n        break;\n      default:\n        // code block\n    }\n\n    this.setStyle(cell, {\n      ...style.default,\n      ...customstyle\n    })\n\n  }).bind(this)\n\n\n  this.getNode = function() {\n    return cell;\n  }\n\n  this.handleEvent = function(eventid, callback, once = false) {\n    cell.addEventListener(eventid, callback, { once })\n  }\n\n  init();\n\n}\n\nconst style = {\n  default: {\n    width: '100px',\n    height: '100px',\n    backgroundColor: 'transparent',\n    display: 'flex',\n    justifyContent: 'center',\n    alignItems: 'center',\n  }\n}\n\nCell.prototype.setStyle = _utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cell);\n\n\n//# sourceURL=webpack:///./src/components/Cell.js?");

/***/ }),

/***/ "./src/components/Dashboard.js":
/*!*************************************!*\
  !*** ./src/components/Dashboard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility/index.js\");\n/* harmony import */ var _Marker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Marker */ \"./src/components/Marker.js\");\n\n\n\n/*Dashboard div*/\nfunction Dashboard() {\n  let node = document.createElement('div');\n  node.id = 'dashboard';\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"])(node, {\n    width: '100%',\n    display: 'flex',\n    justifyContent: 'space-around',\n    flexDirection: 'row',\n    marginBottom: '200px'\n  })\n\n  /*Generate a counter for each label (X-O)*/\n  for (let i = 0; i<2; i++) {\n    node.appendChild(symbolCounter(i));\n  }\n\n  return node;\n}\n\n/*Generate marker label*/\nfunction symbolCounter(idx) {\n\n  let counter = document.createElement('div');\n  counter.appendChild(new _Marker__WEBPACK_IMPORTED_MODULE_1__[\"default\"](idx !== 0, false).getNode());\n  counter.appendChild(labelCounter(idx))\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"])(counter, styles.markerStyle);\n\n  return counter;\n}\n\n/*Generate Marker Counter*/\nfunction labelCounter(idx) {\n\n  let labelCounter = document.createElement('h3');\n  labelCounter.id = `${idx === 0 ? 'X' : 'O'}-counter`\n  labelCounter.innerText = `0`\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"])(labelCounter, styles.labelStyle);\n\n  return labelCounter;\n\n}\n\nconst styles = {\n  labelStyle: {\n    fontFamily: 'Varela Round, sans-serif',\n    fontWeight: 'bold'\n  },\n  markerStyle: {\n    height: '100px',\n    width: '100px',\n    justifyContent: 'center',\n    alignItems: 'center',\n    display: 'flex',\n    flexDirection: 'column'\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);\n\n\n//# sourceURL=webpack:///./src/components/Dashboard.js?");

/***/ }),

/***/ "./src/components/Marker.js":
/*!**********************************!*\
  !*** ./src/components/Marker.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility/index.js\");\n\n\n/*Marker img and logic generate*/\nclass Marker {\n\n  constructor(type,placeholder=true) {\n\n    this.symbol = type ? 'O' : 'X';\n\n    this.node = document.createElement('img');\n    this.node.setAttribute('src', `assets/img/${this.symbol}.png`)\n    this.node.setAttribute(\"type\", placeholder ? 'placeholder' : 'definitive');\n    this.node.setAttribute(\"value\", this.symbol);\n\n\n    this.setStyle(this.node, {...style, ...placeholder ? { opacity: 0.3 } : null})\n\n    this.node.addEventListener('click', function(event) {\n        event.preventDefault();\n    })\n\n  }\n\n  getSymbol() {\n    return this.symbol;\n  }\n\n  getNode() {\n    return this.node;\n  }\n\n}\n\nconst style = {\n  zIndex: -1000,\n  width: '80%',\n}\n\nMarker.prototype.setStyle = _utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Marker);\n\n\n//# sourceURL=webpack:///./src/components/Marker.js?");

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/*! exports provided: Modal, innerText, newGameBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"innerText\", function() { return innerText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newGameBtn\", function() { return newGameBtn; });\n/* harmony import */ var _common_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Button */ \"./src/common/Button.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility/index.js\");\n\n\n\n/*Win Modal Node*/\nlet Modal = function() {\n\n  let modal_content = document.createElement('div');\n  modal_content.setAttribute('id', 'wind_modal');\n  Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"setStyle\"])(modal_content, {\n    display: 'none',\n    position: 'fixed',\n    top: 0,\n    left: 0,\n    width: '100%',\n    height: '100%',\n    backgroundColor: 'rgb(0,0,0,0.8)',\n    justifyContent: 'center',\n    alignItems: 'center'\n  });\n\n  /*Wind Modal content box*/\n  modal_content.appendChild(winModalBox());\n\n  return modal_content;\n\n}\n\n/*Modal Box*/\nfunction winModalBox() {\n  let modalBox = document.createElement('div');\n\n  let modalbody = document.createElement('div');\n  Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"setStyle\"])(modalbody, {\n    padding: '50px',\n  })\n\n  modalbody.appendChild(innerText(\"Woohoo! \\r\\n X Win's motherfucker\"));\n  modalbody.appendChild(newGameBtn())\n  modalbody.appendChild(closeBtn());\n\n  modalBox.appendChild(modalbody);\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"setStyle\"])(modalBox, styles.modalBox);\n\n  return modalBox;\n}\n\n/*Modal box inner text (Winning label)*/\nfunction innerText(value) {\n  let text = document.createElement('h3');\n  text.id = 'inner-text';\n  text.innerText = value;\n\n  Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"setStyle\"])(text, styles.innerText)\n\n  return text;\n}\n\n/*close modal button*/\nfunction closeBtn() {\n  let spanContent = '<span aria-hidden=\\\"true\\\">×</span>';\n  let closeHandler = function() {\n    document.getElementById('wind_modal').style.display = 'none';\n  };\n\n  return new _common_Button__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('close', spanContent, closeHandler, styles.closeBtn)\n}\n\n/*New Game button*/\nfunction newGameBtn() {\n  let newGameHandler = function() {\n    location.reload();\n  };\n\n  return new _common_Button__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"new-game\", \"Rigioca\", newGameHandler, styles.newGameBtn);\n}\n\n\n\nconst styles = {\n  modalBox: {\n    borderRadius: '25px',\n    width: '400px',\n    position: 'relative',\n    backgroundColor: 'white',\n  },\n  innerText: {\n    fontFamily: 'Varela Round, sans-serif',\n    fontWeight: 'normal',\n    textAlign: 'center'\n  },\n  closeBtn: {\n    color: '#e74c3c',\n    backgroundColor: '#fff',\n    fontSize: '28px',\n    textShadow: 'none',\n    lineHeight: '33px',\n    height: '33px',\n    width: '33px',\n    borderRadius: '50%',\n    border: 'none',\n    opacity: 1,\n    boxShadow: '0 0 5px #555',\n    position: 'absolute',\n    right: '-10px',\n    top: '-10px',\n    zIndex: 1,\n  },\n  newGameBtn: {\n    color: '#fff',\n    backgroundColor: '#36BDEE',\n    fontSize: '18px',\n    textTransform: 'uppercase',\n    padding: '10px',\n    border: '0 solid #222',\n    borderRadius: '50px',\n    display: 'block',\n    position: 'relative',\n    zIndex: 1,\n    margin: '0 auto',\n  }\n};\n\n\n\n//# sourceURL=webpack:///./src/components/Modal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility/index.js\");\n/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Modal */ \"./src/components/Modal.js\");\n/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Dashboard */ \"./src/components/Dashboard.js\");\n/* harmony import */ var _components_Cell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Cell */ \"./src/components/Cell.js\");\n/* harmony import */ var _components_Marker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Marker */ \"./src/components/Marker.js\");\n/* harmony import */ var _common_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/Button */ \"./src/common/Button.js\");\n\n\n\n\n\n\n\nconst winCombination = [\n  [0, 1, 2],\n  [3, 4, 5],\n  [6, 7, 8],\n  [0, 3, 6],\n  [1, 4, 7],\n  [2, 5, 8],\n  [0, 4, 8],\n  [2, 4, 6],\n];\n\n\nlet symbol = false;\nlet freespacescounter = 9;\nlet isfinishround = false;\n\nconst myStorage = window.localStorage;\n\n{\n\n  let TicTacToe = function() {\n    let context = document.getElementById('root');\n\n    let tictacdiv = document.createElement('div');\n    tictacdiv.id = 'grid-content';\n\n    Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"setStyle\"])(tictacdiv, {\n      display: 'grid',\n      justifyContent: 'center',\n      alignContent: 'center',\n      gridTemplateColumns: 'repeat(3, auto)',\n      marginBottom: '50px'\n    });\n\n    /*Generate game cells*/\n    for (let i = 0; i < 9; i++) {\n\n      let cell = new _components_Cell__WEBPACK_IMPORTED_MODULE_3__[\"default\"](i);\n      /*Passing custom event handler to Cell class method*/\n      cell.handleEvent('click', handleClick, true)\n      cell.handleEvent('mouseenter', handleOver);\n      cell.handleEvent('mouseleave', removeOver);\n\n      tictacdiv.appendChild(cell.getNode());\n\n    }\n\n    /*Append Dashboard and Grid Game to root div*/\n    context.appendChild(new _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]());\n    context.appendChild(tictacdiv);\n    context.appendChild(new _common_Button__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\"new-game\", \"Rigioca\", function() {\n      location.reload();\n    }, styles.newGameBtn));\n    context.parentElement.appendChild(Object(_components_Modal__WEBPACK_IMPORTED_MODULE_1__[\"Modal\"])())\n\n\n    /*Storage, check if an item is already setted*/\n\n    if (myStorage.getItem('O') === null) {\n      myStorage.setItem('O','0');\n      myStorage.setItem('X','0');\n    }\n\n    document.getElementById('O-counter').innerText = myStorage.getItem('O');\n    document.getElementById('X-counter').innerText = myStorage.getItem('X');\n\n  };\n\n  window.addEventListener('load', TicTacToe, true);\n\n   /******* Events Handler *******/\n\n  function handleClick(e) {\n    let cell = e.target;\n    placeMarker(cell, symbol);\n  }\n\n  function handleOver(e) {\n    let cell = e.target;\n    placeHolder(cell, symbol);\n  }\n\n  function removeOver(e) {\n    if (!isfinishround) {\n      let cell = e.target;\n      let child = cell.firstChild;\n      if (child.getAttribute('type') === 'placeholder') {\n        cell.removeChild(child);\n      }\n    }\n  }\n\n  /******* Finish *******/\n\n  /*Show the current marker position before placing it*/\n  function placeHolder(cell, currentSymbol) {\n    if (!isfinishround) {\n      let child = cell.firstChild;\n      if (child === null) {\n        let marker = new _components_Marker__WEBPACK_IMPORTED_MODULE_4__[\"default\"](currentSymbol);\n        cell.appendChild(marker.getNode());\n      }\n    }\n  }\n\n  /*Place a Marker (current round: O or X)*/\n  function placeMarker(cell, currentSymbol) {\n    if (!isfinishround) {\n      let firstChild = cell.firstChild;\n\n      if (firstChild.getAttribute(\"type\") === 'placeholder') {\n        let marker = new _components_Marker__WEBPACK_IMPORTED_MODULE_4__[\"default\"](currentSymbol, false);\n        cell.removeChild(firstChild);\n        cell.appendChild(marker.getNode())\n      }\n\n      freespacescounter = freespacescounter - 1;\n      symbol = !symbol;\n\n      checkStatus(currentSymbol);\n    }\n\n  }\n\n  /*Check the status, if one cell's left, check if it's draw (pareggio)*/\n  function checkStatus(marker) {\n    let cells = document.querySelectorAll('.tic-cell');\n    let symbol = marker ? 'O' : 'X';\n\n    if (checkwin(cells,symbol)) {\n      /*Win logic*/\n      isfinishround = true;\n      setWinLabelStatus(symbol);\n      setCounter(symbol);\n    } else if (freespacescounter === 0) {\n      /*Draw logic*/\n      setWinLabelStatus('pareggio')\n    }\n  }\n\n  /*Check if one current combination check a winner combination*/\n  function checkwin(cells,symbol) {\n    return winCombination.some((combination) => {\n      return combination.every(function(idx) {\n        if (cells[idx].firstChild !== null) {\n          return cells[idx].firstChild.getAttribute('value') === symbol;\n        } else {\n          return false;\n        }\n      });\n    });\n  }\n\n  /*Set the modal view status*/\n  function setWinLabelStatus(status) {\n\n    let winModal = document.getElementById('wind_modal');\n    document.getElementById('inner-text').innerText = status !== 'pareggio' ?\n        `Woohoo! \\r\\n ${status} vince il turno` :\n        'Pareggio';\n    winModal.style.display = 'flex';\n  }\n\n  /*Set wins counter for each label and update local storage*/\n  function setCounter(status) {\n    let counter = document.getElementById(`${status}-counter`);\n    counter.innerText = (parseInt(counter.innerText) + 1).toString();\n    myStorage.setItem(status,(parseInt(myStorage.getItem(status)) + 1).toString());\n  }\n}\n\nconst styles = {\n  newGameBtn: {\n    color: '#fff',\n    backgroundColor: '#36BDEE',\n    fontSize: '18px',\n    textTransform: 'uppercase',\n    padding: '10px',\n    border: '0 solid #222',\n    borderRadius: '50px',\n    display: 'block',\n    position: 'relative',\n    margin: '0 auto',\n  }\n}\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utility/index.js":
/*!******************************!*\
  !*** ./src/utility/index.js ***!
  \******************************/
/*! exports provided: setStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setStyle\", function() { return setStyle; });\n/*Takes a style object and set html element style properties */\n\nlet setStyle = (element, style) => {\n  for (let property in style) {\n    element.style[property] = style[property];\n  }\n};\n\n\n\n\n//# sourceURL=webpack:///./src/utility/index.js?");

/***/ })

/******/ });