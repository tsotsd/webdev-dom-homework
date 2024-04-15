/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTodos: () => (/* binding */ getTodos),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postTodo: () => (/* binding */ postTodo),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   setUser: () => (/* binding */ setUser),\n/* harmony export */   token: () => (/* binding */ token),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\nconst urlApi = \"https://wedev-api.sky.pro/api/v2/oleg-petrov/comments\";\r\nconst userUrl = \"https://wedev-api.sky.pro/api/user/login\";\r\n\r\n\r\nlet token;\r\nlet user = null;\r\n\r\n\r\nconst setUser = (newUser) => {\r\n    user = newUser;\r\n  };\r\n  \r\n\r\nconst setToken = (newToken) => {\r\n  token = newToken;\r\n};\r\n\r\nfunction getTodos() {\r\n  return fetch(urlApi, {\r\n    method: \"GET\",\r\n    headers: {\r\n        Authorization: `Bearer ${token}`\r\n    },\r\n  }).then((response) => {\r\n    // console.log(response)\r\n    // return response.json();\r\n    if (response.status === 500) {\r\n      throw new Error(\"Нет подключения к интернету\");\r\n    } else {\r\n      return response.json();\r\n    }\r\n  });\r\n}\r\n\r\nfunction postTodo({ commentApi, nameApi }) {\r\n  return fetch(urlApi, {\r\n    method: \"POST\",\r\n    headers: {\r\n        Authorization: `Bearer ${token}`\r\n    },\r\n    body: JSON.stringify({\r\n      text: commentApi,\r\n      name: nameApi,\r\n      forceError: true,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 400) {\r\n      throw new Error(\"Имя и комментарий должны содержать хотя бы 3 символа\");\r\n    }\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер упал\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n\r\nfunction login({ login, password }) {\r\n  return fetch(userUrl, {\r\n    method: \"POST\",\r\n    headers: {\r\n        Authorization: `Bearer ${token}`\r\n    },\r\n    body: JSON.stringify({\r\n      login,\r\n      password,\r\n    }),\r\n  }).then((response) => {\r\n    return response.json();\r\n  }).then((data) => {\r\n    setUser(data.user);\r\n    setToken(data.user.token);\r\n    console.log(data, user);\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./getComments.js":
/*!************************!*\
  !*** ./getComments.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   setComments: () => (/* binding */ setComments)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _renderComment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderComment.js */ \"./renderComment.js\");\n\r\n\r\n\r\n\r\nlet comments = [];\r\nlet setComments = newComments => {\r\n    comments = newComments;\r\n}\r\n\r\nfunction getComments() {\r\n    ;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)().then((responseData) => {\r\n        const appComments = responseData.comments.map((comment) => {\r\n            return {\r\n                name: comment.author.name,\r\n                date:\r\n                    new Date(comment.date).toLocaleDateString(\"default\", {\r\n                        day: \"2-digit\",\r\n                        month: \"2-digit\",\r\n                        year: \"2-digit\",\r\n                    }) +\r\n                    \" \" +\r\n                    new Date().toLocaleTimeString().slice(0, -3),\r\n                text: comment.text,\r\n                likes: comment.likes,\r\n                isLikes: false,\r\n            };\r\n        });\r\n        setComments(appComments)\r\n        \r\n        \r\n        ;(0,_renderComment_js__WEBPACK_IMPORTED_MODULE_1__.renderComment)();\r\n    })\r\n        .catch((error) => {\r\n            if (error.message === \"Failed to fetch\") {\r\n                alert(\"Упал интернет\");\r\n            } else {\r\n                alert(error.message);\r\n            }\r\n        });\r\n    \r\n    }\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./getComments.js?");

/***/ }),

/***/ "./initListnerAddComment.js":
/*!**********************************!*\
  !*** ./initListnerAddComment.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initListnerAddComment: () => (/* binding */ initListnerAddComment)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script.js */ \"./script.js\");\n/* harmony import */ var _getComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getComments.js */ \"./getComments.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction initListnerAddComment() {\r\n    const loadingCommentElement = document.getElementById(\"loading-comment\");\r\n    const buttonElement = document.getElementById(\"add-button\");\r\n    const nameInputElement = document.getElementById(\"name-input\");\r\n    const commentInputElement = document.getElementById(\"comment-textarea\");\r\n    const addFormElement = document.querySelector(\".hidden-add-form\");\r\n\r\n    buttonElement.addEventListener(\"click\", () => {\r\n        nameInputElement.classList.remove(\"error\");\r\n        commentInputElement.classList.remove(\"error\");\r\n\r\n        if (nameInputElement.value === \"\" || nameInputElement.value.trim() == \"\") {\r\n            nameInputElement.classList.add(\"error\");\r\n            return;\r\n        } else if (\r\n            commentInputElement.value === \"\" ||\r\n            commentInputElement.value.trim() == \"\"\r\n        ) {\r\n            commentInputElement.classList.add(\"error\");\r\n            return;\r\n        }\r\n\r\n        loadingCommentElement.style.display = \"block\";\r\n        addFormElement.style.display = \"none\";\r\n\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postTodo)({\r\n            commentApi: (0,_script_js__WEBPACK_IMPORTED_MODULE_1__.toCorrectVulnerability)(commentInputElement.value),\r\n            nameApi: (0,_script_js__WEBPACK_IMPORTED_MODULE_1__.toCorrectVulnerability)(nameInputElement.value),\r\n\r\n        }).then(() => {\r\n            loadingCommentElement.style.display = \"none\";\r\n            addFormElement.style.display = null;\r\n            nameInputElement.value = \"\";\r\n            commentInputElement.value = \"\";\r\n            (0,_getComments_js__WEBPACK_IMPORTED_MODULE_2__.getComments)();\r\n        })\r\n            .catch((error) => {\r\n                if (error.message === \"Failed to fetch\") {\r\n                    alert(\"Упал интернет\");\r\n                } else {\r\n                    alert(error.message);\r\n                }\r\n                loadingCommentElement.style.display = \"none\";\r\n                addFormElement.style.display = null;\r\n            });\r\n\r\n    });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./initListnerAddComment.js?");

/***/ }),

/***/ "./loginPage.js":
/*!**********************!*\
  !*** ./loginPage.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _getComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComments.js */ \"./getComments.js\");\n\r\n\r\n\r\nconst renderLogin = () => {\r\n    const appElement = document.getElementById(\"app\");\r\n    const loginHtml = `\r\n    <div class=\"add-form\">\r\n    <h2 class=\"h2-login-form\">Форма входа</h2>\r\n    <div class=\"form-entrance-title\">\r\n        <input type=\"text\" id=\"login-input\" class=\"login-name add-form-name\" placeholder=\"Логин\" /> \r\n        <input type=\"password\" id=\"password-input\" class=\"password-name add-form-name\" placeholder=\"Пароль\" />\r\n        <br>\r\n        <div class=\"sign-in-comments\">\r\n            <button id=\"sign-in\" class=\"add-form-button\">Войти</button>\r\n        </div>\r\n    </div>  \r\n</div>\r\n    `\r\n    appElement.innerHTML = loginHtml;\r\n\r\nconst buttonElement = document.getElementById(\"sign-in\");\r\nconsole.log(buttonElement);\r\nconst loginInputElement = document.getElementById(\"login-input\");\r\nconst passwordInputElement = document.getElementById(\"password-input\");\r\n\r\nbuttonElement.addEventListener(\"click\", () => {\r\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({\r\n    login: loginInputElement.value,\r\n    password: passwordInputElement.value,\r\n  }).then((responseData) => {\r\n    (0,_getComments_js__WEBPACK_IMPORTED_MODULE_1__.getComments)();\r\n});\r\n});\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./loginPage.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComments.js */ \"./getComments.js\");\n\r\n\r\n\r\n(0,_getComments_js__WEBPACK_IMPORTED_MODULE_0__.getComments)();\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./renderComment.js":
/*!**************************!*\
  !*** ./renderComment.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComment: () => (/* binding */ renderComment),\n/* harmony export */   replyComment: () => (/* binding */ replyComment)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script.js */ \"./script.js\");\n/* harmony import */ var _getComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getComments.js */ \"./getComments.js\");\n/* harmony import */ var _initListnerAddComment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initListnerAddComment.js */ \"./initListnerAddComment.js\");\n/* harmony import */ var _loginPage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loginPage.js */ \"./loginPage.js\");\n\r\n\r\n\r\n\r\n\r\n//import { format } from \"date-fns\";\r\n// <div>${format(comments.date, \"yyyy-MM-dd hh.mm.ss\")}</div>\r\nconst renderComment = (textValue = \"\") => {\r\n  const appElement = document.getElementById(\"app\");\r\n\r\n    const commentHtml = _getComments_js__WEBPACK_IMPORTED_MODULE_2__.comments\r\n        .map((comments, index) => {\r\n            return `<li class=\"comment\">\r\n    <div class=\"comment-header\">\r\n      <div>${comments.name}</div>\r\n      <div>${comments.date}</div>\r\n  \r\n      </div>\r\n    <div class=\"comment-body\">\r\n      <div data-index=\"${index}\" class=\"comment-text\">${comments.text}</div>\r\n    </div>\r\n    <div class=\"comment-footer\">\r\n      <div class=\"likes\">\r\n        <span class=\"likes-counter\">${comments.likes}</span>\r\n        <button data-index=\"${index}\" class=\"like-button ${comments.active}\"></button>\r\n      </div>\r\n    </div>\r\n  </li>`;\r\n        })\r\n        .join(\"\");\r\n\r\n    const appHtml = `\r\n    <div class=\"container\">\r\n    <div class=\"loading-title\">Пожалуйста подождите, загружаю комментарии...</div>\r\n     <ul id=\"list\" class=\"comments\">${commentHtml}\r\n     </ul>\r\n     <br>\r\n     \r\n     ${_api_js__WEBPACK_IMPORTED_MODULE_0__.user ? `<div id=\"loading-comment\" class=\"hidden\">Комментарий добавляется...</div>\r\n      <div id=\"add-form-comment\" class=\"add-form hidden-add-form\">\r\n       <input type=\"text\" id=\"name-input\" value=\"${_api_js__WEBPACK_IMPORTED_MODULE_0__.user.name}\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" />\r\n       <textarea type=\"textarea\" id=\"comment-textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\"\r\n         rows=\"4\">${textValue}</textarea>\r\n       <div class=\"add-form-row\">\r\n         <button id=\"add-button\" class=\"add-form-button\">Написать</button>\r\n       </div>\r\n     </div>` : `<div class=\"login-alert\" id=\"login-alert\">Чтобы добавить комментарий, <button id=\"authorization\">авторизуйтесь</button></div>`}\r\n     \r\n   </div>`\r\n        \r\n   appElement.innerHTML = appHtml;\r\n   const loadingCommentTitle = document.querySelector(\".loading-title\");\r\n    loadingCommentTitle.style.display = \"none\";    \r\n\r\n   if (_api_js__WEBPACK_IMPORTED_MODULE_0__.user) {   \r\n   const nameInput = document.getElementById(\"name-input\");\r\n   (0,_script_js__WEBPACK_IMPORTED_MODULE_1__.eventeLikesButtons)({comments: _getComments_js__WEBPACK_IMPORTED_MODULE_2__.comments});\r\n   (0,_initListnerAddComment_js__WEBPACK_IMPORTED_MODULE_3__.initListnerAddComment)();\r\n   replyComment();\r\n   nameInput.disabled = true;\r\n  } else {\r\n    const buttonElement = document.getElementById(\"authorization\");\r\n    \r\n    buttonElement.addEventListener(\"click\", () => {\r\n      (0,_loginPage_js__WEBPACK_IMPORTED_MODULE_4__.renderLogin)();\r\n\r\n    })\r\n    \r\n  }\r\n};\r\n\r\n// Ответ на комментарий\r\nconst replyComment = () => {\r\n  const commentElements = document.querySelectorAll(\".comment-text\");\r\n\r\n  for (const commentElement of commentElements) {\r\n      commentElement.addEventListener(\"click\", () => {\r\n          const index = commentElement.dataset.index;\r\n          let commentInputElement = document.querySelector(\".add-form-text\");\r\n          commentInputElement.value = `${_getComments_js__WEBPACK_IMPORTED_MODULE_2__.comments[index].text} \\n ${_getComments_js__WEBPACK_IMPORTED_MODULE_2__.comments[index].name}`;\r\n      });\r\n  }\r\n};\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComment.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   eventeLikesButtons: () => (/* binding */ eventeLikesButtons),\n/* harmony export */   toCorrectVulnerability: () => (/* binding */ toCorrectVulnerability)\n/* harmony export */ });\n/* harmony import */ var _renderComment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComment.js */ \"./renderComment.js\");\n\r\n\r\n// Лайк\r\nconst eventeLikesButtons = ({ comments }) => {\r\n    const likesButtons = document.querySelectorAll(\".like-button\");\r\n\r\n    for (const likesButton of likesButtons) {\r\n        const index = likesButton.dataset.index;\r\n        likesButton.addEventListener(\"click\", () => {\r\n            const textValue = document.getElementById(\"comment-textarea\").value;\r\n            if (!comments[index].isClick) {\r\n                comments[index].isClick = true;\r\n                comments[index].active = \"-active-like\";\r\n                comments[index].likes += 1;\r\n            } else {\r\n                comments[index].isClick = false;\r\n                comments[index].active = \"\";\r\n                comments[index].likes -= 1;\r\n            }\r\n            (0,_renderComment_js__WEBPACK_IMPORTED_MODULE_0__.renderComment)(textValue);\r\n        });\r\n    }\r\n};\r\n\r\nconst toCorrectVulnerability = (string) => {\r\n    return string\r\n        .replaceAll(\"&\", \"&amp;\")\r\n        .replaceAll(\"<\", \"&lt;\")\r\n        .replaceAll(\">\", \"&gt;\")\r\n        .replaceAll('\"', \"&quot;\")\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;