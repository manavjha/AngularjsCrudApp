function signInModalRestore() {
    ! function(e) {
        window.open = function() {
            window.open = e;
            var t = e.apply(this, arguments),
                n = setInterval(function() {
                    t.closed && (clearInterval(n), BMS.Misc.fnBusy(!1, BMS.Modal.currentModal))
                }, 3e3);
            return t
        }
    }(window.open)
}

function firstLoad() {
    void 0, showcaseOverlay.init(function() {
        bannerInit()
    })
}

function toggleMobileNavigation(e) {
    void 0, "active" == e ? ($("body").removeClass("transform-body"), setTimeout(function() {
        $(".navbar-toggle, #main-body-wrapper-overlay, .mob-brand").data("navigationis", "inactive"), $("body").removeClass("open-mobile-menu"), $(".main-body-wrapper").css({
            marginTop: 0
        }), window.scrollTo(0, -_scrollPos)
    }, 300)) : "inactive" == e && (_scrollPos = -window.pageYOffset, $(".navbar-toggle, #main-body-wrapper-overlay, .mob-brand").data("navigationis", "active"), $("body").addClass("open-mobile-menu"), $("body").addClass("transform-body"), $(".main-body-wrapper").css({
        marginTop: _scrollPos
    }))
}

function embed(e, t) {
    if (t) {
        var n = !e.getAttribute("viewBox") && t.getAttribute("viewBox"),
            i = document.createDocumentFragment(),
            a = t.cloneNode(!0);
        for (n && e.setAttribute("viewBox", n); a.childNodes.length;) i.appendChild(a.firstChild);
        e.appendChild(i)
    }
}

function loadreadystatechange(e) {
    e.onreadystatechange = function() {
        if (4 === e.readyState) {
            var t = document.createElement("x");
            t.innerHTML = e.responseText, e.s.splice(0).map(function(e) {
                embed(e[0], t.querySelector("#" + e[1].replace(/(\W)/g, "\\$1")))
            }), nextXHRQueue()
        }
    }, e.onreadystatechange()
}

function svg4everybody(e) {
    function t() {
        for (var e = document.getElementsByTagName("use"), c = 0; c < e.length; c++) {
            var d = e[c],
                u = e[c].getAttribute("xlink:href").split("#")[0];
            if (u.length > 0) {
                var p = d.parentNode;
                if (p && /svg/i.test(p.nodeName)) {
                    var f = d.getAttribute("xlink:href");
                    if (i && n) {
                        var h = new Image,
                            g = p.getAttribute("width"),
                            v = p.getAttribute("height");
                        h.src = a(f, p, d), g && h.setAttribute("width", g), v && h.setAttribute("height", v), p.replaceChild(h, d)
                    } else if (r && (!s || s(f, p, d))) {
                        var m = f.split("#"),
                            y = m[0],
                            S = m[1];
                        if (p.removeChild(d), y.length) {
                            var w = l[y] = l[y] || new XMLHttpRequest;
                            w.s || (w.s = [], w.url_root = y, addToXHRQueue(w)), w.s.push([p, S]), loadreadystatechange(w)
                        }
                    }
                }
            }
        }
        o(t, 34)
    }
    e = e || {};
    var n, i = !1;
    if (i) {
        var a = e.fallback || function(e) {
            return e.replace(/\?[^#]+/, "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(e) || [""])[0]
        };
        n = "nosvg" in e ? e.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent), n && (document.createElement("svg"), document.createElement("use"))
    }
    var r = "polyfill" in e ? e.polyfill : i ? n || /\bEdge\/12\b|\bMSIE [1-8]\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537 : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537,
        s = e.validate,
        o = window.requestAnimationFrame || setTimeout,
        l = {};
    r && t()
}

function addToXHRQueue(e) {
    xhrQueue.push(e), 1 == xhrQueue.length && nextXHRQueue(e), void 0
}

function nextXHRQueue() {
    setTimeout(function() {
        xhrQueue[0] && (xhrQueue[0].open && xhrQueue[0].send && (xhrQueue[0].open("GET", xhrQueue[0].url_root), xhrQueue[0].send()), xhrQueue.splice(0, 1))
    }, 99)
}

function ratingFuncDesktop() {
    $(".rating-stars").on("mouseenter", function(e) {
        var t = $(this).attr("data-review-id");
        return "undefined" != typeof t && "" != t ? void $(document).off("mouseleave", $(this)) : (e.preventDefault(), e.stopPropagation(), $(".js-ratingSpan svg").on("mouseenter", function(e) {
            var t = $(this).parents(".rating-stars").attr("data-review-id");
            if ("undefined" != typeof t && "" != t) return void $(document).off("mouseleave", $(this));
            e.preventDefault(), e.stopPropagation();
            var n = $(this),
                i = n.parents(".rating-stars"),
                a = n.parents(".js-ratingSpan"),
                r = n.parents(".stars");
            r.nextAll().find(".js-ratingSpan").removeClass("active"), a.nextAll().removeClass("active"), r.prevAll().find(".js-ratingSpan").addClass("active"), a.prevAll().andSelf().addClass("active"), i.find(".js-ratingSpan").not("active").find(use).css({
                fill: "#e0e0e0"
            }), $(".__fivestar").length > 0 ? i.find(".js-ratingSpan.active").find(use).css({
                fill: "#cc3333"
            }) : i.find(".js-ratingSpan.active").find(use).css({
                fill: "#f3c600"
            });
            var s = a.data("value");
            i.siblings(".rate-o-meter").html(s), i.siblings(".rate-o-meter").attr("data-value", s)
        }), void $(".js-ratingSpan svg").on("click", function(e) {
            var t = $(this).parents(".rating-stars").attr("data-review-id");
            if ("undefined" == typeof t || "" == t) {
                e.preventDefault();
                var n = $(this),
                    i = n.parents(".rating-stars"),
                    a = n.parents(".js-ratingSpan"),
                    r = n.parents(".stars");
                r.nextAll().find(".js-ratingSpan").removeClass("selected"), a.nextAll().removeClass("selected"), i.find(".js-ratingSpan").not("selected").find(use).css({
                    fill: "#e0e0e0"
                }), $(".__fivestar").length > 0 ? (r.prevAll().find(".js-ratingSpan").addClass("selected").find(use).css({
                    fill: "#cc3333"
                }), a.prevAll().andSelf().addClass("selected").find(use).css({
                    fill: "#cc3333"
                })) : (r.prevAll().find(".js-ratingSpan").addClass("selected").find(use).css({
                    fill: "#f3c600"
                }), a.prevAll().andSelf().addClass("selected").find(use).css({
                    fill: "#f3c600"
                }));
                var s = a.data("value");
                i.siblings(".rate-o-meter").html(s), i.siblings(".rate-o-meter").attr("data-value", s), $(this).parents(".show-more-info").removeClass("showRating")
            }
        }))
    }), $(".rating-stars").on("mouseleave", function(e) {
        var t = $(this).attr("data-review-id");
        if ("undefined" != typeof t && "" != t) return void $(document).off("mouseenter", $(this));
        e.preventDefault(), e.stopPropagation();
        var n = $(this),
            i = n.find(".js-ratingSpan.selected");
        n.find(".js-ratingSpan").not("selected").removeClass("active").find(use).css({
            fill: "#e0e0e0"
        }), $(".__fivestar").length > 0 ? n.find(".js-ratingSpan.selected").find(use).css({
            fill: "#cc3333"
        }) : n.find(".js-ratingSpan.selected").find(use).css({
            fill: "#f3c600"
        });
        var a = $(i[i.length - 1]).data("value");
        void 0 !== a ? (n.siblings(".rate-o-meter").html(a), n.siblings(".rate-o-meter").attr("data-value", a)) : (n.siblings(".rate-o-meter").attr("data-value", 0), n.siblings(".rate-o-meter").html("0.0"))
    })
}

function ratingFuncMobile() {
    $(".rating-stars .js-ratingSpan svg").on("click", function(e) {
        var t = $(this).parents(".rating-stars").attr("data-review-id");
        if ("undefined" == typeof t || "" == t) {
            e.preventDefault();
            var n = $(this),
                i = n.parents(".rating-stars"),
                a = n.parents(".js-ratingSpan"),
                r = n.parents(".stars");
            r.nextAll().find(".js-ratingSpan").removeClass("selected"), a.nextAll().removeClass("selected"), i.find(".js-ratingSpan").not("selected").find(use).css({
                fill: "#e0e0e0"
            }), $(".__fivestar").length > 0 ? (n.find(".js-ratingSpan.selected").find(use).css({
                fill: "#cc3333"
            }), r.prevAll().find(".js-ratingSpan").addClass("selected").find(use).css({
                fill: "#cc3333"
            }), a.prevAll().andSelf().addClass("selected").find(use).css({
                fill: "#cc3333"
            })) : (r.prevAll().find(".js-ratingSpan").addClass("selected").find(use).css({
                fill: "#f3c600"
            }), a.prevAll().andSelf().addClass("selected").find(use).css({
                fill: "#f3c600"
            }));
            var s = a.data("value");
            i.siblings(".rate-o-meter").html(s), i.siblings(".rate-o-meter").attr("data-value", s), $(this).parents(".movie-card").find(".show-more-info-overlay").trigger("tap")
        }
    })
}
var BMS = {};
$.extend(!0, global, {
    strContentUrl: "//in.bmscdn.com",
    fbAppId: "165665113451029",
    strWltAppCode: "WEBWLT2",
    defImageURL: "",
    defFirstName: "Guest",
    strCurrencyCode: "Rs.",
    strOneCurrencyCode: "Re.",
    getDataUrl: "/serv/getData",
    reqRgnArr: ["home", "movies"],
    notReqRgnArr: ["static"],
    RgnCallBack: [],
    SignInCallBack: [],
    SignOutCallBack: []
}, global), BMS = {
    Region: {},
    Storage: {},
    Misc: {},
    SignIn: {},
    Validate: {},
    Notifications: {},
    Header: {},
    Giftcard: {},
    Modal: {},
    Experiences: {},
    Events: {},
    Ratings: {}
};
var XD = function() {
    var e, t, n, i = 1,
        a = this;
    return {
        postMessage: function(e, t, n) {
            t && (n = n || parent, a.postMessage ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (n.location = t.replace(/#.*$/, "") + "#" + +new Date + i++ + "&" + e))
        },
        receiveMessage: function(i, r) {
            a.postMessage ? (i && (n = function(e) {
                return !("string" == typeof r && e.origin !== r || "[object Function]" === Object.prototype.toString(r) && r(e.origin) === !1) && (i && i(e), void(i = !1))
            }), a.addEventListener ? a[i ? "addEventListener" : "removeEventListener"]("message", n, !1) : a[i ? "attachEvent" : "detachEvent"]("onmessage", n)) : (e && clearInterval(e), e = null, i && (e = setInterval(function() {
                var e = document.location.hash,
                    n = /^#?\d+&/;
                e !== t && n.test(e) && (t = e, i({
                    data: e.replace(n, "")
                }))
            }, 100)))
        }
    }
}();
"object" != typeof JSON && (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, i, a, r, s, o = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (r = l.length, n = 0; n < r; n += 1) s[n] = str(n, l) || "null";
                        return a = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + o + "]" : "[" + s.join(",") + "]", gap = o, a
                    }
                    if (rep && "object" == typeof rep)
                        for (r = rep.length, n = 0; n < r; n += 1) "string" == typeof rep[n] && (i = rep[n], a = str(i, l), a && s.push(quote(i) + (gap ? ": " : ":") + a));
                    else
                        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (a = str(i, l), a && s.push(quote(i) + (gap ? ": " : ":") + a));
                    return a = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + o + "}" : "{" + s.join(",") + "}", gap = o, a
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n)
                for (i = 0; i < n; i += 1) indent += " ";
            else "string" == typeof n && (indent = n);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, i, a = e[t];
                if (a && "object" == typeof a)
                    for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (i = walk(a, n), void 0 !== i ? a[n] = i : delete a[n]);
                return reviver.call(e, t, a)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), BMS.SignIn.CallBackArray = {}, BMS.SignIn.fnRegUser = function() {
        try {
            var e = $("#iRegUserEmail"),
                t = $("#iRegPwd"),
                n = $("#iRegCnfPwd");
            if (!BMS.Validate.email(e.val())) return BMS.Misc.fnSCusErrDisplay("dSignUpErrorEmail", "Please enter a valid email address", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iSignUpParent", "iRegUserEmail", "iRegPwd", "dSignUpErrorEmail", "iRegCnfPwd");
            if ("" == $.trim(t.val()) || "PASSWORD" == t.val()) return BMS.Misc.fnSCusErrDisplay("dSignUpErrorPassword", "Please enter a password", "e"), t.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iSignUpParent", "iRegUserEmail", "iRegPwd", "dSignUpErrorPassword", "iRegCnfPwd");
            if ("" == $.trim(n.val()) || n.val() != t.val()) return BMS.Misc.fnSCusErrDisplay("dSignUpErrorCnfPassword", "Passwords do not match", "e"), n.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iSignUpParent", "iRegUserEmail", "iRegPwd", "dSignUpErrorCnfPassword", "iRegCnfPwd");
            BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), BMS.Misc.fnDoSecureTrans({
                cmd: "SETPROFILE",
                p1: "SETPROFILE",
                p2: "0",
                p6: t.val(),
                p10: "|EMAIL=" + e.val() + "|",
                blnSupp: !0,
                fnCC: function(n) {
                    BMS.SignIn.fnAuthUser({
                        id: e.val(),
                        pwd: t.val()
                    }), BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Sign up", {
                        Mode: "BMS login",
                        Appcode: global.strAppCode
                    })
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Misc.fnSCusErrDisplay("dSignUpErrorCnfPassword", e, "e")
                }
            })
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnRegUser",
                err: i
            })
        }
    }, BMS.SignIn.fnValErrorCheck = function(e, t, n, i, a) {
        var r = $("#" + e),
            s = r.find("#" + t),
            o = r.find("#" + n),
            l = $("#" + i),
            c = void 0;
        return void 0 !== a && (c = $("#" + a)), $(document).keyup(function(e) {
            27 == e.keyCode && (l.hide(), o.val = "", s.val = "", o.removeClass("_error"), s.removeClass("_error"), void 0 !== c && (c.val = "", c.removeClass("_error")))
        }), "block" == l.css("display") && (o.is(":focus") ? (o.keypress(function() {
            l.hide(), o.removeClass("_error")
        }), s.bind("focus", function() {
            l.hide(), o.removeClass("_error"), s.unbind("focus")
        }), void 0 !== c && c.bind("focus", function() {
            l.hide(), o.removeClass("_error"), c.unbind("focus")
        })) : s.is(":focus") ? (s.keypress(function() {
            l.hide(), s.removeClass("_error")
        }), o.bind("focus", function() {
            l.hide(), s.removeClass("_error"), o.unbind("focus")
        }), void 0 !== c && c.bind("focus", function() {
            l.hide(), s.removeClass("_error"), c.unbind("focus")
        })) : void 0 !== c && c.is(":focus") && (c.keypress(function() {
            l.hide(), c.removeClass("_error")
        }), o.bind("focus", function() {
            l.hide(), c.removeClass("_error"), o.unbind("focus")
        }), s.bind("focus", function() {
            l.hide(), c.removeClass("_error"), s.unbind("focus")
        }))), !1
    }, BMS.SignIn.fnValLogIn = function(e) {
        try {
            var t = {
                username: "iUserName",
                password: "iPwd",
                usernameParent: "iUserNameParent",
                errorEmail: "dSignInErrorEmail",
                errorPassword: "dSignInErrorPassword"
            };
            $.extend(t, e);
            var n = $("#" + t.username),
                i = $("#" + t.password);
            if ("" == $.trim(n.val()) || "Email" == n.val()) return BMS.Misc.fnSCusErrDisplay("dSignInErrorEmail", "Please enter an email address", "e"), n.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck(t.usernameParent, t.username, t.password, t.errorEmail);
            if (!BMS.Validate.email(n.val())) return BMS.Misc.fnSCusErrDisplay("dSignInErrorEmail", "Please enter a valid email address", "e"), n.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck(t.usernameParent, t.username, t.password, t.errorEmail);
            if ("" == $.trim(i.val()) || "Password" == i.val()) return BMS.Misc.fnSCusErrDisplay("dSignInErrorPassword", "Please enter a password", "e"), i.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck(t.usernameParent, t.username, t.password, t.errorPassword);
            BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), BMS.Misc.fnGATracker({
                location: "SignInBox",
                action: "SignIn"
            }), BMS.SignIn.fnAuthUser({
                id: n.val(),
                pwd: i.val(),
                type: "logIn"
            })
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnValLogIn",
                err: a
            })
        }
    }, BMS.SignIn.fnValLogIn1 = function() {
        try {
            var e = $("#iUserName1"),
                t = $("#iPwd1");
            if ("" == $.trim(e.val()) || "Email" == e.val()) return BMS.Misc.fnSCusErrDisplay("dSignInErrorEmail", "Please enter an email address", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iUserNameParent", "iUserName1", "iPwd1", "dSignInErrorEmail");
            if (!BMS.Validate.email(e.val())) return BMS.Misc.fnSCusErrDisplay("dSignInErrorEmail", "Please enter a valid email address", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iUserNameParent", "iUserName1", "iPwd1", "dSignInErrorEmail");
            if ("" == $.trim(t.val()) || "Password" == t.val()) return BMS.Misc.fnSCusErrDisplay("dSignInErrorPassword", "Please enter a password", "e"), t.addClass("_error").focus(), void BMS.SignIn.fnValErrorCheck("iUserNameParent", "iUserName1", "iPwd1", "dSignInErrorPassword");
            BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), BMS.Misc.fnGATracker({
                location: "SignInBox",
                action: "SignIn"
            }), BMS.SignIn.fnAuthUser({
                id: e.val(),
                pwd: t.val(),
                type: "logIn"
            })
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnValLogIn",
                err: n
            })
        }
    }, BMS.SignIn.fnAuthUser = function(e) {
        try {
            var t = void 0 != e && void 0 != e.id && "" != e.id ? e.id : $("#iUserName").val(),
                n = void 0 != e && void 0 != e.pwd && "" != e.id ? e.pwd : $("#iPwd").val(),
                i = void 0 != e && void 0 != e.type && "" != e.type ? e.type : "";
            BMS.Misc.fnDoSecureTrans({
                cmd: "SIGNIN",
                p1: t,
                p2: n,
                blnSupp: !0,
                fnCC: function(e) {
                    BMS.SignIn.fnAfterAuth(e), "logIn" == i ? $(".modal .popover._signin-signup-popover-fixed").trigger("signinsignuptracking", ["stripsignin"]) : $(".modal .popover._signin-signup-popover-fixed").trigger("signinsignuptracking", ["stripsignup"])
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Misc.fnSCusErrDisplay("dSignInErrorPassword", e, "e")
                }
            })
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Signin.fnAuthUser",
                fnParams: e,
                err: a
            })
        }
    }, BMS.SignIn.fnAfterAuth = function(e) {
        try {
            var t = t || [];
            t.push(["uid", BMS.Misc.fnGVal({
                key: "MEMBERID",
                data: e
            })]), t.push(["email", BMS.Misc.fnGVal({
                key: "MEMBEREMAIL",
                data: e
            })]), "undefined" != typeof wzrk_push && wzrk_push(t), "undefined" != typeof _kmq && _kmq.push(["identify", BMS.Misc.fnGVal({
                key: "MEMBEREMAIL",
                data: e
            })]), BMS.Storage.set({
                name: "kmqIdentity",
                value: BMS.Misc.fnGVal({
                    key: "MEMBEREMAIL",
                    data: e
                }),
                sess: !1,
                expires: "Thu, 31 Dec 2099 23:59:59 GMT",
                storage: "C"
            }), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "loggedin",
                tvc_userid: BMS.Misc.fnGVal({
                    key: "MEMBERID",
                    data: e
                })
            }), e = unescape(e);
            var n = BMS.Misc.fnGVal({
                    key: "MEMBEREMAIL",
                    data: e
                }),
                i = BMS.Misc.fnGVal({
                    key: "EXPIRY",
                    data: e
                });
            "in.bms.bz" == location.host || "in.bookmyshow.com" == location.host ? ("undefined" != typeof pay && "undefined" != typeof pay.SVC && "undefined" != typeof pay.SSID ? "MMRM" == pay.SVC || "10075" == pay.SSID && "10078" == pay.SSID || BMS.Storage.set({
                name: "le",
                value: n,
                storage: "C",
                secure: !0,
                sess: !1,
                expires: new Date(i).toGMTString()
            }) : BMS.Storage.set({
                name: "le",
                value: n,
                storage: "C",
                secure: !0,
                sess: !1,
                expires: new Date(i).toGMTString()
            }), BMS.Storage.set({
                name: "ld",
                value: e,
                storage: "C",
                secure: !0,
                sess: !1,
                expires: new Date(i).toGMTString()
            }), BMS.Storage.set({
                name: "userCine",
                value: BMS.Misc.fnGVal({
                    key: "FAV",
                    data: e
                }),
                key: "fav",
                storage: "C",
                secure: !0
            }), BMS.Storage.set({
                name: "ld",
                value: BMS.Misc.fnGVal({
                    key: "NAME",
                    data: e
                }),
                key: "FIRSTNAME",
                storage: "C",
                secure: !0
            }), BMS.Storage.set({
                name: "ld",
                key: "LASTLOGIN",
                value: (new Date).toISOString(),
                storage: "C",
                secure: !0,
                sess: !1,
                expires: new Date(i).toGMTString()
            })) : (BMS.Storage.set({
                name: "le",
                value: n,
                storage: "C",
                sess: !1,
                expires: new Date(i).toGMTString()
            }), BMS.Storage.set({
                name: "ld",
                value: e,
                storage: "C",
                sess: !1,
                expires: new Date(i).toGMTString()
            }), BMS.Storage.set({
                name: "userCine",
                value: BMS.Misc.fnGVal({
                    key: "FAV",
                    data: e
                }),
                key: "fav",
                storage: "C"
            }), BMS.Storage.set({
                name: "ld",
                value: BMS.Misc.fnGVal({
                    key: "NAME",
                    data: e
                }),
                key: "FIRSTNAME",
                storage: "C"
            }), BMS.Storage.set({
                name: "ld",
                key: "LASTLOGIN",
                value: (new Date).toISOString(),
                storage: "C",
                sess: !1,
                expires: new Date(i).toGMTString()
            })), BMS.SignIn.fnGUserImage();
            var a = BMS.Storage.get({
                name: "ld",
                key: "FIRSTNAME",
                defVal: ""
            });
            "" == $.trim(a) && (a = "Guest"), $("#memberName strong").html(BMS.Misc.fnCapitalName(a)), BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Modal.currentModal && BMS.Modal.currentModal.hasClass("_signin-signup-popover-fixed") ? ($("body").css("top", "auto"), $(document).scrollTop(0), $("#signinPopupFixed").hide(), $(".modal.popovers-modal .__overlay-scroll-signin").fadeOut()) : $("#signinPopupFixed").is(":visible") && global.blnIsTouchScreen && ($("#signinPopupFixed").hide(), $(".modal.popovers-modal .__overlay-scroll-signin").fadeOut()), BMS.Misc.modal("signinPopup", !1);
            var r = "" != BMS.Misc.fnGVal({
                key: "NAME",
                data: BMS.Storage.get({
                    name: "ld"
                })
            }) ? BMS.Misc.fnGVal({
                key: "NAME",
                data: BMS.Storage.get({
                    name: "ld"
                })
            }) : "Guest";
            $("#dAfterSignInSuccess #spnUName").html(r), setTimeout(function() {
                BMS.Misc.modal("dAfterSignInSuccess", !0)
            }, 300), setTimeout(function() {
                BMS.Misc.modal("dAfterSignInSuccess", !1), BMS.SignIn.fnClose({
                    callBack: !0
                })
            }, 2500), location.pathname.search("mami") != -1 && location.reload()
        } catch (s) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnAfterAuth",
                err: s
            })
        }
    }, BMS.SignIn.fnClose = function(e) {
        try {
            if (e && 1 == e.callBack && void 0 != global.SignInCallBack && global.SignInCallBack.length > 0)
                for (var t = 0; t < global.SignInCallBack.length; t++) global.SignInCallBack[t].apply();
            BMS.SignIn.fnApplyCallbacks(), BMS.Misc.fnGATracker({
                location: "SignInBox",
                action: "NoThanks"
            }), void 0 != global.SignInCallBack && global.SignInCallBack.splice(global.SignInCallBack.length - 1, 1), void 0 != global.SignOutCallBack && global.SignOutCallBack.splice(global.SignOutCallBack.length - 1, 1)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnClose",
                fnParams: e,
                err: n
            })
        }
    }, BMS.SignIn.fnLogOut = function() {
        try {
            var e = BMS.Storage.get({
                name: "fbsr_" + global.fbAppId
            });
            "" != e && BMS.Storage.del({
                name: "fbsr_" + global.fbAppId
            }), BMS.Misc.fnBusy(!0);
            var t = BMS.Storage.get({
                    name: "ld",
                    key: "LSID",
                    defVal: ""
                }),
                n = BMS.Storage.get({
                    name: "ld",
                    key: "SEQUENCE",
                    defVal: ""
                }),
                i = BMS.Storage.get({
                    name: "ld",
                    key: "MEMBERID",
                    defVal: ""
                });
            BMS.Misc.fnDoSecureTrans({
                cmd: "SIGNOUT",
                p1: i,
                p2: n,
                p3: t,
                blnSupp: !0,
                fnCC: function() {
                    if ("undefined" != typeof gapi && "undefined" != typeof gapi.auth && gapi.auth.signOut(), BMS.Storage.del({
                            name: "ld"
                        }), BMS.Storage.del({
                            name: "wd"
                        }), BMS.Storage.del({
                            name: "isOtpGenerated"
                        }), BMS.Storage.del({
                            name: "PLUSIMAGEURL"
                        }), BMS.Storage.set({
                            name: "userCine",
                            key: "RL",
                            value: "",
                            sess: !1,
                            storage: "C"
                        }), void 0 != global.SignOutCallBack && global.SignOutCallBack.length > 0)
                        for (var e = 0; e < global.SignOutCallBack.length; e++) global.SignOutCallBack[e].apply();
                    "undefined" != typeof _kmq && _kmq.push(["clearIdentity"]), BMS.Storage.del({
                        name: "kmqIdentity"
                    }), BMS.Misc.fnBusy(!1), $(".select-overlay").click(), location.pathname.search("mami") != -1 && location.reload()
                },
                fnEC: function() {
                    if ("undefined" != typeof gapi && "undefined" != typeof gapi.auth && gapi.auth.signOut(), BMS.Storage.del({
                            name: "ld"
                        }), BMS.Storage.del({
                            name: "wd"
                        }), BMS.Storage.del({
                            name: "isOtpGenerated"
                        }), BMS.Storage.del({
                            name: "PLUSIMAGEURL"
                        }), BMS.Storage.set({
                            name: "userCine",
                            key: "RL",
                            value: "",
                            sess: !1,
                            storage: "C"
                        }), void 0 != global.SignOutCallBack && global.SignOutCallBack.length > 0)
                        for (var e = 0; e < global.SignOutCallBack.length; e++) global.SignOutCallBack[e].apply();
                    "undefined" != typeof _kmq && _kmq.push(["clearIdentity"]), BMS.Storage.del({
                        name: "kmqIdentity"
                    }), BMS.Misc.fnBusy(!1), $(".select-overlay").click(), location.pathname.search("mami") != -1 && location.reload()
                }
            }), $("#loggedInImg").attr("src", ""), $("#signInUName strong").html(""), $("#preSignIn").parent().removeClass("_logged"), $("#postSignIn").hide(), $("#preSignIn").show()
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnLogOut",
                fnParams: arguments,
                err: a
            })
        }
    }, BMS.SignIn.fnResetPwd = function() {
        try {
            var e = $("#iForgotEmail"),
                t = $("#dForgotError");
            if ("" == e.val()) return BMS.Misc.fnSCusErrDisplay("dForgotError", "Please enter your email address to reset your password", "e"), e.addClass("_error").focus(), void("block" == t.css("display") && e.is(":focus") && (e.keypress(function() {
                t.hide(), e.removeClass("_error")
            }), $(document).keyup(function(n) {
                27 == n.keyCode && (t.hide(), e.val = "", e.removeClass("_error"))
            })));
            if (!BMS.Validate.email(e.val())) return BMS.Misc.fnSCusErrDisplay("dForgotError", "Please enter a valid email address", "e"), e.addClass("_error").focus(), void("block" == t.css("display") && e.is(":focus") && (e.keypress(function() {
                t.hide(), e.removeClass("_error")
            }), $(document).keyup(function(n) {
                27 == n.keyCode && (t.hide(), e.val = "", e.removeClass("_error"))
            })));
            BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), BMS.Misc.fnDoSecureTrans({
                cmd: "SENDRESETPASSWORDURL",
                p1: e.val(),
                blnSupp: !0,
                fnCC: function() {
                    BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Misc.fnSCusErrDisplay("dForgotError", "Password reset link is emailed successfully", "s")
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Misc.fnSCusErrDisplay("dForgotError", e, "e")
                }
            })
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnResetPwd",
                err: n
            })
        }
    }, BMS.SignIn.fnFbWrapper = function() {
        try {
            return BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), void BMS.SignIn.fnFbLogin()
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnFbWrapper",
                fnParams: arguments,
                err: e
            })
        }
    }, BMS.SignIn.fnGPlusWrapper = function() {
        try {
            signInModalRestore(), BMS.Misc.fnBusy(!0, BMS.Modal.currentModal), BMS.SignIn.fnGPlusSignIn()
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnGPlusLogin",
                err: e
            })
        }
    }, BMS.SignIn.fnValRes = function() {
        try {
            var e = $("#iResendConfEmail"),
                t = $("#iResendConfMobile");
            if ("" == e.val()) return BMS.Misc.ErrDisplay("errDivFRGEmail", "Please enter an email address", "e"), e.addClass("_error").focus(), $("#iResendConfEmail").focus(), void BMS.SignIn.fnValErrorCheck("errDivFRGParent", "iResendConfEmail", "iResendConfMobile", "errDivFRGEmail");
            if (!BMS.Validate.email(e.val())) return BMS.Misc.ErrDisplay("errDivFRGEmail", "Please enter a valid email address", "e"), e.addClass("_error").focus(), $("#iResendConfEmail").focus(), void BMS.SignIn.fnValErrorCheck("errDivFRGParent", "iResendConfEmail", "iResendConfMobile", "errDivFRGEmail");
            if ("" == t.val()) return BMS.Misc.ErrDisplay("errDivFRGMobile", "Please enter a mobile number", "e"), t.addClass("_error").focus(), $("#iResendConfMobile").focus(), void BMS.SignIn.fnValErrorCheck("errDivFRGParent", "iResendConfEmail", "iResendConfMobile", "errDivFRGMobile");
            if (!BMS.Validate.mob(t.val())) return BMS.Misc.ErrDisplay("errDivFRGMobile", "Please enter a valid mobile number", "e"), t.addClass("_error").focus(), $("#iResendConfMobile").focus(), void BMS.SignIn.fnValErrorCheck("errDivFRGParent", "iResendConfEmail", "iResendConfMobile", "errDivFRGMobile");
            if (t.val().length < 10) return BMS.Misc.ErrDisplay("errDivFRGMobile", "Please enter a valid mobile number", "e"), t.addClass("_error").focus(), $("#iResendConfMobile").focus(), void BMS.SignIn.fnValErrorCheck("errDivFRGParent", "iResendConfEmail", "iResendConfMobile", "errDivFRGMobile");
            $("#iResendConfEmail, #iResendConfMobile").attr("disabled", "disabled"), $("#btnRes").hide(), $("#btndisab").show(), BMS.Misc.fnDoTrans({
                cmd: "RESENDCONFIRMATIONMAIL",
                p2: e.val(),
                p3: t.val(),
                fnCC: BMS.SignIn.fnResendSuc,
                fnEC: BMS.SignIn.fnResendFail,
                blnSupp: !0
            })
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnValRes",
                err: n
            })
        }
    }, BMS.SignIn.fnResendSuc = function(e) {
        try {
            $("#btnRes").show(), $("#btndisab").hide(), $("iResendConfEmail").val(""), $("iResendConfMobile").val(""), $("#iResendConfEmail, #iResendConfMobile").removeAttr("disabled"), $("#errDivFRG").addClass("_success"), $("#resendCofirmationPopup").show(), $("#iResendConfEmail,#iResendConfMobile").val(""), $("#resendCofirmationPopup").addClass("animateTop"), $(".popup-overlay").fadeIn(200), $(".main").addClass("make-blur"), $("body").addClass("_fixed"), BMS.Misc.ErrDisplay("errDivFRGMobile", "Confirmation sent successfully!", "")
        } catch (t) {
            fnErr({
                fnName: "BMS.SignIn.fnResendSuc",
                fnParams: e,
                err: t
            })
        }
    }, BMS.SignIn.fnResendFail = function(e) {
        try {
            $("#btnRes").show(), $("#btndisab").hide(), $("#iResendConfEmail, #iResendConfMobile").removeAttr("disabled"), $("#resendCofirmationPopup").show(), $("#iResendConfEmail,#iResendConfMobile").val(""), $("#resendCofirmationPopup").addClass("animateTop"), $(".popup-overlay").fadeIn(200), $(".main").addClass("make-blur"), $("body").addClass("_fixed"), "" != e && void 0 != e ? BMS.Misc.ErrDisplay("errDivFRGMobile", e, "e") : BMS.Misc.ErrDisplay("errDivFRGMobile", "Sorry, something went wrong here. Try again after some time! .", "e")
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnResendFail",
                fnParams: e,
                err: t
            })
        }
    }, BMS.SignIn.fnDoSubMailErrorCheck = function(e, t, n) {
        var i = $("#" + e),
            a = i.find("#" + t),
            r = $("#" + n);
        "block" == r.css("display") && a.is(":focus") && (a.keypress(function() {
            r.hide(), a.removeClass("_error")
        }), $(document).keyup(function(e) {
            27 == e.keyCode && (r.hide(), a.removeClass("_error"), a.val = "")
        }))
    }, BMS.SignIn.fnDoSubMail = function() {
        try {
            var e = $("#subEmailmob"),
                t = "",
                n = "";
            if ("" == e.val()) return BMS.Misc.ErrDisplay("errDivSUB", "Please enter a valid mobile number or email address", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnDoSubMailErrorCheck("subEmailmobParent", "subEmailmob", "errDivSUB");
            if (e.val($.trim(e.val()).replace(/[ ]+/gi, "")), isNaN(e.val())) {
                if (t = "|EMAIL=" + e.val() + "|", !BMS.Validate.email(e.val())) return BMS.Misc.ErrDisplay("errDivSUB", "Please enter a valid email address", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnDoSubMailErrorCheck("subEmailmobParent", "subEmailmob", "errDivSUB");
                n = "EMAIL"
            } else {
                if (t = "|MOBILENO=" + e.val() + "|", !BMS.Validate.mob(e.val())) return BMS.Misc.ErrDisplay("errDivSUB", "Please enter a valid mobile number", "e"), e.addClass("_error").focus(), void BMS.SignIn.fnDoSubMailErrorCheck("subEmailmobParent", "subEmailmob", "errDivSUB");
                n = "MOBILE"
            }
            BMS.Misc.fnBusy(!0), BMS.Misc.fnDoTrans({
                cmd: "SETPROFILE",
                p1: "NEWSLETTER",
                p2: "0",
                p10: t,
                fnCC: function(t) {
                    BMS.Misc.modal("subscribeNewsletters", !1), $("#popover-rating-msg").html("Thank you for registering. Look forward to your weekly alerts!"), BMS.Misc.modal("review-rating-response", !0), "EMAIL" == n ? BMS.Storage.set({
                        name: "EMAILSUBSCRIPTION",
                        value: "Y",
                        storage: "C"
                    }) : "MOBILE" == n && $("#MOBSUBY").length > 0 && e.val() == $("#acntDtls #mobile").val() && BMS.Storage.set({
                        name: "MOBILESUBSCRIPTION",
                        value: "Y",
                        storage: "C"
                    }), e.val(""), BMS.Misc.fnBusy(!1)
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1)
                }
            })
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "fnDoSubMail",
                fnParams: arguments,
                err: i
            })
        }
    }, BMS.Misc.ErrDisplay = function(e, t, n) {
        try {
            $("#" + e).text(t), $("#" + e).show()
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "BMs.Misc.fnSCusErrDisplay",
                fnParams: e + ", " + t + ", " + n,
                err: i
            })
        }
    }, BMS.SignIn.fnGUserImage = function() {
        try {
            if (BMS.Storage.isset({
                    name: "ld"
                })) {
                var e = "Y" == BMS.Storage.get({
                        name: "ld",
                        key: "ISFCONNECTLOGIN"
                    }),
                    t = "Y" == BMS.Storage.get({
                        name: "ld",
                        key: "ISPLUSLOGIN"
                    }),
                    n = {};
                n = e ? {
                    SOCIALID: "FB"
                } : t ? {
                    SOCIALID: "PLUS"
                } : {
                    SOCIALID: "EMAIL"
                }, BMS.Misc.fnGetUserImage(n, function(e) {
                    var t = BMS.Storage.get({
                            name: "ld",
                            key: "FIRSTNAME"
                        }),
                        i = BMS.Storage.get({
                            name: "ld",
                            key: "LASTNAME"
                        }),
                        a = t + " " + i;
                    $("#loggedInImg").attr("src", e), $("#signInUName strong").html(a), "undefined" != typeof pageName && "myprofile" == pageName && (BMS.SignIn.UserInfo = {
                        strLoginType: n.SOCIALID,
                        strImageURL: e
                    }), $("#preSignIn").is(":visible") && ($("#preSignIn").parent().addClass("_logged"), $("#preSignIn").hide(), $("#postSignIn").css("display", "block"))
                })
            }
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnCheckLogin",
                fnParams: strData,
                err: i
            })
        }
    }, BMS.SignIn.fnSignIn = function(e) {
        try {
            e ? ("" != $("#dSignInErrorEmail").text() && $("#dSignInErrorEmail").text("").hide(), "" != $("#dSignInErrorPassword").text() && $("#dSignInErrorPassword").text("").hide(), BMS.Misc.modal("signinPopup", !0)) : BMS.Misc.modal("signinPopup", !1)
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnSignIn",
                fnParams: e,
                err: t
            })
        }
    }, BMS.SignIn.fnRegister = function(e, t) {
        try {
            BMS.SignIn.CallBackArray[e] = t
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnRegister",
                fnParams: e,
                err: n
            })
        }
    }, BMS.SignIn.fnUnregister = function(e) {
        try {
            Object.keys(BMS.SignIn.CallBackArray).indexOf(e) != -1 && delete BMS.SignIn.CallBackArray[e]
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnRegister",
                fnParams: e,
                err: t
            })
        }
    }, BMS.SignIn.fnApplyCallbacks = function() {
        try {
            Object.keys(BMS.SignIn.CallBackArray).length > 0 && $.each(BMS.SignIn.CallBackArray, function(e, t) {
                t.apply()
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnApplyCallbacks",
                err: e
            })
        }
    }, BMS.SignIn.fnResetPassword = function() {
        try {
            var e = $.trim($("#npwd").val()),
                t = $.trim($("#cnpwd").val());
            if ("" == e) return BMS.Misc.fnSCusErrDisplay("RP_Err", "Please Enter a Password.", "e"), void $("#npwd").focus();
            if (e.toLowerCase() == $.trim($("#npwd").attr("placeholder")).toLowerCase()) return BMS.Misc.fnSCusErrDisplay("RP_Err", "Please Enter a valid Password.", "e"), void $("#npwd").focus();
            if ("" == t) return BMS.Misc.fnSCusErrDisplay("RP_Err", "Please Enter a Confirm Password.", "e"), void $("#cnpwd").focus();
            if (t.toLowerCase() == $.trim($("#cnpwd").attr("placeholder")).toLowerCase()) return BMS.Misc.fnSCusErrDisplay("RP_Err", "Please Enter a valid Confirm Password.", "e"), void $("#cnpwd").focus();
            if ($.trim(e.toLowerCase()) != $.trim(t.toLowerCase())) return void BMS.Misc.fnSCusErrDisplay("RP_Err", "New Password and Confirm New Password doesn't match.", "e");
            BMS.Misc.fnBusy(!0, $resendTabs), BMS.Misc.fnDoSecureTrans({
                cmd: "RESETPASSWORD",
                p1: rstPwdData,
                p2: e,
                p3: "|AUTOLOGIN=" + autoLogin + "|",
                blnSupp: !0,
                fnCC: function(e) {
                    BMS.Misc.fnBusy(!1, $resendTabs), $("#npwd").val(""), $("#cnpwd").val(""), "Y" == autoLogin ? (BMS.SignIn.fnAfterAuth(e), BMS.Misc.fnSCusErrDisplay("RP_Err", "Your password has been successfully updated and you have been logged in.", ""), window.location.href = "/myprofile/") : BMS.Misc.fnSCusErrDisplay("RP_Err", "Your password has been successfully updated.", "");
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1, $resendTabs), $("#npwd").val(""), $("#cnpwd").val(""), BMS.Misc.fnSCusErrDisplay("RP_Err", unescape(e), "e")
                }
            })
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnResetPassword",
                err: n
            })
        }
    }, BMS.SignIn.fnDeactivateAccnt = function() {
        try {
            BMS.Misc.fnBusy(!0);
            var e = BMS.Storage.get({
                    name: "ld",
                    key: "MEMBEREMAIL"
                }),
                t = BMS.Storage.get({
                    name: "ld",
                    key: "MEMBERID"
                }),
                n = BMS.Storage.get({
                    name: "ld",
                    key: "LSID"
                });
            BMS.Misc.fnDoSecureTrans({
                cmd: "DEACTIVATEMEMBER",
                p1: t,
                p2: e,
                p3: n,
                blnSupp: !0,
                fnCC: function() {
                    if (BMS.Storage.del({
                            name: "ld"
                        }), void 0 != global.SignOutCallBack && global.SignOutCallBack.length > 0)
                        for (var e = 0; e < global.SignOutCallBack.length; e++) global.SignOutCallBack[e].apply()
                },
                fnEC: function() {
                    if (BMS.Storage.del({
                            name: "ld"
                        }), void 0 != global.SignOutCallBack && global.SignOutCallBack.length > 0)
                        for (var e = 0; e < global.SignOutCallBack.length; e++) global.SignOutCallBack[e].apply()
                }
            })
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnDeactivateAccnt",
                err: i
            })
        }
    }, $(document).ready(function() {
        BMS.SignIn.fnGUserImage(), $("#iUserName, #iPwd").doEnter({
            callback: BMS.SignIn.fnValLogIn
        }), $("#iUserName1, #iPwd1").doEnter({
            callback: BMS.SignIn.fnValLogIn1
        }), $("#iRegCnfPwd, #iRegUserEmail, #iRegPwd").doEnter({
            callback: BMS.SignIn.fnRegUser
        }), $("#iForgotEmail").doEnter({
            callback: BMS.SignIn.fnResetPwd
        }), BMS.Misc.fnGetSocialKeys()
    }), BMS.SignIn.fnFbGetLoginStatus = function() {
        try {
            FB.getLoginStatus(function(e) {
                "connected" === e.status && (global.lngFBAT = e.authResponse.accessToken, global.strFBProfileURL = e.authResponse.userID, BMS.SignIn.fnFbGetMemberDetails())
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnFbGetLoginStatus",
                err: e
            })
        }
    }, BMS.SignIn.fnFbLogin = function() {
        try {
            navigator.userAgent.match("CriOS") ? (BMS.Storage.set({
                name: "fbLogin",
                value: "1",
                storage: "C"
            }), window.open("https://www.facebook.com/dialog/oauth?client_id=" + global.fbAppId + "&redirect_uri=" + document.location.href + "&scope=" + global.FBPriviledges, "", null)) : FB.login(function(e) {
                e.authResponse ? (global.lngFBAT = e.authResponse.accessToken, global.strFBProfileURL = e.authResponse.userID, BMS.SignIn.fnFbGetMemberDetails(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Sign up", {
                    Mode: "Facebook",
                    Appcode: global.strAppCode
                })) : (void 0, BMS.Misc.fnBusy(!1, BMS.Modal.currentModal))
            }, {
                scope: global.FBPriviledges,
                return_scopes: !0
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnFbLogin",
                err: e
            })
        }
    }, BMS.SignIn.fnFbGetMemberDetails = function() {
        try {
            FB.api("/me", function(e) {
                var t = "";
                "undefined" != typeof BMS.SignIn.SocialConnect && "FB" == BMS.SignIn.SocialConnect && (t = "|MEMBEREMAIL=" + BMS.Storage.get({
                    name: "ld",
                    key: "MEMBEREMAIL"
                }) + "|LSID=" + BMS.Storage.get({
                    name: "ld",
                    key: "LSID"
                }) + "|"), BMS.Misc.fnDoSecureTrans({
                    cmd: "SAVEUSERSOCIALMEDIADETAILS",
                    p1: "FB",
                    p2: "|FBAT=" + global.lngFBAT + "|",
                    p3: t,
                    blnSupp: !1,
                    fnCC: function(e) {
                        BMS.SignIn.fnAfterAuth(e), $(".modal .popover._signin-signup-popover-fixed").trigger("signinsignuptracking", ["fb"])
                    },
                    fnEC: function(e) {
                        BMS.Misc.fnBusy(!1)
                    }
                })
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnFbGetMemberDetails",
                err: e
            })
        }
    }, $(document).ready(function() {
        navigator.userAgent.match("CriOS") && "1" == BMS.Storage.get({
            name: "fbLogin",
            storage: "C"
        }) && (BMS.Misc.fnBusy(!0), setTimeout(function() {
            BMS.SignIn.fnFbGetLoginStatus(), BMS.Storage.del({
                name: "fbLogin",
                storage: "C"
            })
        }, 2e3))
    }), window.___gcfg = {
        lang: "en-US",
        parsetags: "explicit"
    }, BMS.SignIn.fnGPlusSignIn = function() {
        try {
            gapi.auth.authorize({
                client_id: global.plusAppId,
                scope: global.plusPrivileges,
                immediate: !1,
                authuser: -1
            }, function(e) {
                if (e.status.signed_in) {
                    var t = e.access_token;
                    BMS.SignIn.fnGetGPlusUserDetails(function(e) {
                        e.lngGPlusAT = t, BMS.SignIn.fnGetSocialDetailsFromIS(e), BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Sign up", {
                            Mode: "Google Plus",
                            Appcode: global.strAppCode
                        })
                    })
                }
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnGPlusSignIn",
                err: e
            })
        }
    }, BMS.SignIn.fnGetGPlusUserDetails = function(e) {
        try {
            gapi.client.load("plus", "v1", function() {
                var t = gapi.client.plus.people.get({
                    userId: "me",
                    key: ""
                });
                t.execute(function(t) {
                    var n = {
                        imgUrl: "undefined" != typeof t && "undefined" != typeof t.image ? t.image.url : ""
                    };
                    e(n)
                })
            })
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnGetGPlusUserDetails",
                err: t
            })
        }
    }, BMS.SignIn.fnCallToGetGPlusUserDetails = function(e) {
        try {
            BMS.Misc.fnAjax({
                url: "https://www.googleapis.com/plus/v1/people/me",
                data: "access_token=" + BMS.Misc.fnGVal({
                    key: "PLUSACCESSTOKEN",
                    data: BMS.Storage.get({
                        name: "ld"
                    })
                }),
                type: "GET",
                success: function(t) {
                    e("" != t.image.url ? t : null)
                },
                error: function(t, n, i) {
                    e(null)
                }
            })
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnCallToGetGPlusUserDetails",
                err: t
            })
        }
    }, BMS.SignIn.fnGetSocialDetailsFromIS = function(e) {
        try {
            var t = "";
            "undefined" != typeof BMS.SignIn.SocialConnect && "PLUS" == BMS.SignIn.SocialConnect && (t = "|MEMBEREMAIL=" + BMS.Storage.get({
                name: "ld",
                key: "MEMBEREMAIL"
            }) + "|LSID=" + BMS.Storage.get({
                name: "ld",
                key: "LSID"
            }) + "|"), BMS.Misc.fnDoSecureTrans({
                cmd: "SAVEUSERSOCIALMEDIADETAILS",
                p1: "PLUS",
                p2: "|PLUSAT=" + e.lngGPlusAT + "|",
                p3: t,
                blnSupp: !1,
                fnCC: function(e) {
                    BMS.SignIn.fnAfterAuth(e), $(".modal .popover._signin-signup-popover-fixed").trigger("signinsignuptracking", ["gplus"])
                },
                fnEC: function(e) {
                    BMS.Misc.fnBusy(!1)
                }
            })
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.SignIn.fnGetSocialDetailsFromIS",
                err: n
            })
        }
    }, BMS.Storage = {
        _defaults: {
            name: "",
            key: "",
            value: "",
            storage: "L",
            sess: !0,
            path: "/",
            defVal: "",
            expires: "Thu, 31 Dec 2020 23:59:59 GMT",
            secure: !1
        }
    }, BMS.Storage.get = function(e) {
        try {
            var t = (void 0 != e && void 0 != e.name && "" != e.name ? e.name : BMS.Storage._defaults.name, void 0 != e && void 0 != e.defVal && "" != e.defVal ? e.defVal : BMS.Storage._defaults.defVal),
                n = e.name,
                i = e.name + "=",
                a = document.cookie,
                r = -1,
                s = -1,
                o = "";
            return "undefined" != typeof localStorage && null != localStorage.getItem(n) ? o = localStorage.getItem(n) : a.length > 0 && a.indexOf(i) != -1 ? (r = a.indexOf(i), r += i.length, s = a.indexOf(";", r), s = s == -1 ? a.length : s, o = a.substring(r, s)) : "undefined" != typeof sessionStorage && null != sessionStorage.getItem(n) && (o = sessionStorage.getItem(n)), o = decodeURIComponent(o), "undefined" != typeof e && "" != e.key && "undefined" != typeof e.key && (o = BMS.Misc.fnGVal({
                key: e.key,
                data: o,
                defVal: t
            })), o
        } catch (l) {
            BMS.Misc.fnErr({
                fnName: "BMS.Storage.get",
                fnParams: e,
                err: l
            })
        }
    }, BMS.Storage.set = function(e) {
        try {
            var t = void 0 != e.name && "" != e.name ? e.name : BMS.Storage._defaults.name,
                n = void 0 != e.key && "" != e.key ? e.key : BMS.Storage._defaults.key,
                i = void 0 != e.value && "" != e.value ? e.value : BMS.Storage._defaults.value,
                a = void 0 != e.storage && "" != e.storage ? e.storage : BMS.Storage._defaults.storage,
                r = void 0 != e.sess ? e.sess : BMS.Storage._defaults.sess,
                s = void 0 != e.expires && "" != e.expires ? e.expires : BMS.Storage._defaults.expires,
                o = void 0 != e.path && "" != e.path ? e.path : BMS.Storage._defaults.path,
                l = void 0 != e.secure ? e.secure : BMS.Storage._defaults.secure;
            if (a = a.toUpperCase(), "" != n) {
                for (var c, d = BMS.Storage.get({
                        name: t
                    }), u = d.split("|"), p = new Array, f = 0; f < u.length; f++) "" != u[f] && (c = u[f].split("="), c[0] != n && p.push(new Array(c[0], c[1])));
                var h = "";
                h += "|" + n + "=" + i;
                for (var g = 0; g < p.length; g++) h += "|" + p[g][0] + "=" + p[g][1];
                h += "|", i = h
            }
            i = encodeURIComponent(i), "" == a || "L" == a ? "undefined" != typeof localStorage ? localStorage.setItem(t, i) : document.cookie = escape(t) + "=" + i + (r ? "" : "; expires=" + s) + "; path=" + o + (l ? ";secure;" : "") : "C" == a ? document.cookie = escape(t) + "=" + i + (r ? "" : "; expires=" + s) + "; path=" + o + (l ? ";secure;" : "") : "S" == a && ("undefined" != typeof sessionStorage ? sessionStorage.setItem(t, i) : document.cookie = escape(t) + "=" + i + (r ? "" : "; expires=" + s) + "; path=" + o + (l ? ";secure;" : ""))
        } catch (v) {
            BMS.Misc.fnErr({
                fnName: "BMS.Storage.set",
                fnParams: e,
                err: v
            })
        }
    }, BMS.Storage.isset = function(e) {
        try {
            var t = "undefined" != typeof e.name && "" != e.name ? e.name : BMS.Storage._defaults.name,
                n = "undefined" != typeof e.key && "" != e.key ? e.key : BMS.Storage._defaults.key,
                i = "" != BMS.Storage.get({
                    name: t
                });
            if (i) {
                if ("" != n) {
                    var a = BMS.Storage.get({
                        name: t
                    });
                    return "" != BMS.Misc.fnGVal({
                        key: n,
                        data: a
                    })
                }
                return !0
            }
            return !1
        } catch (r) {
            BMS.Misc.fnErr({
                fnName: "BMS.Storage.isset",
                fnParams: e,
                err: r
            })
        }
    }, BMS.Storage.del = function(e) {
        try {
            var t = "undefined" != typeof e.name && "" != e.name ? e.name : BMS.Storage._defaults.name,
                n = "undefined" != typeof e.path && "" != e.path ? e.path : BMS.Storage._defaults.path,
                i = document.cookie;
            "undefined" != typeof localStorage && null != localStorage.getItem(t) ? localStorage.removeItem(t) : i.indexOf(t + "=") != -1 ? document.cookie = escape(t) + "=; expires=Thu, 01 Jan 2012 00:00:01 GMT; path=" + n : "undefined" != typeof sessionStorage && null != sessionStorage.getItem(t) && sessionStorage.removeItem(t)
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Storage.del",
                fnParams: e,
                err: a
            })
        }
    }, BMS.Misc.fnAjax = function(e) {
        try {
            var t = void 0 == e.async || "" == e.async || e.async,
                n = void 0 != e.beforeSend && "" != e.beforeSend ? e.beforeSend : "",
                i = void 0 == e.cache || "" == e.cache || e.cache,
                a = void 0 != e.contentType && "" != e.contentType ? e.contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                r = void 0 != e.data && "" != e.data ? e.data : "",
                s = void 0 != e.dataType && "" != e.dataType ? e.dataType : "",
                o = void 0 != e.error && "" != e.error && e.error,
                l = (void 0 != e.suppress && "" != e.suppress && e.suppress, {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-store"
                });
            l = void 0 != e.headers && "" != e.headers ? $.extend(l, e.headers) : l;
            var c = void 0 != e.success && "" != e.success && e.success,
                d = void 0 != e.timeout && "" != e.timeout ? e.timeout : 3e5,
                u = void 0 != e.type && "" != e.type ? e.type : "GET",
                p = e.url;
            $.support.cors = !0, $("#glErrDiv").is(":visible") && "CANCELTRANS" != r.c && $("#glErrDiv").hide(), $.ajax({
                async: t,
                beforesend: n,
                cache: i,
                contentType: a,
                data: r,
                dataType: s,
                error: function(e, t, n) {
                    0 != e.status && o(e, t, n)
                },
                headers: l,
                success: function(e) {
                    c && c(e)
                },
                timeout: d,
                type: u,
                url: p
            })
        } catch (f) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnAjax1",
                fnParams: e,
                err: f
            })
        }
    }, BMS.Misc.fnDoTrans = function(e) {
        try {
            var t = void 0 != e.AppC && "" != e.AppC ? e.AppC : global.strAppCode,
                n = void 0 != e.venCode && "" != e.venCode ? e.venCode : "",
                i = void 0 != e.transId && "" != e.transId ? e.transId : 0,
                a = void 0 != e.cmd && "" != e.cmd ? e.cmd : "",
                r = void 0 != e.p1 && "" != e.p1 ? e.p1 : "",
                s = void 0 != e.p2 && "" != e.p2 ? e.p2 : "",
                o = void 0 != e.p3 && "" != e.p3 ? e.p3 : "",
                l = void 0 != e.p4 && "" != e.p4 ? e.p4 : "",
                c = void 0 != e.p5 && "" != e.p5 ? e.p5 : "",
                d = void 0 != e.p6 && "" != e.p6 ? e.p6 : "",
                u = void 0 != e.p7 && "" != e.p7 ? e.p7 : "",
                p = void 0 != e.p8 && "" != e.p8 ? e.p8 : "",
                f = void 0 != e.p9 && "" != e.p9 ? e.p9 : "",
                h = void 0 != e.p10 && "" != e.p10 ? e.p10 : "",
                g = void 0 != e.fnCC && e.fnCC,
                v = void 0 != e.fnEC && e.fnEC,
                m = void 0 != e.ccObj && e.ccObj,
                y = void 0 != e.ecObj && e.ecObj,
                S = void 0 != e.blnSupp && e.blnSupp,
                w = "strCommand: " + a + ", strAppCode: " + t + ", strVenueCode:" + n + ", lngTransId:" + i + ", strParam1: " + r + ", strParam2: " + s + ", strParam3: " + o + ", strParam4:" + l + ", strParam5:" + c + ", strParam6:" + d + ", strParam7:" + u + ", strParam8:" + p + ", strParam9: " + f + ", strParam10: " + h + ", blnSuppress: " + S;
            $("#glErrDiv").is(":visible") && "CANCELTRANS" != a && $("#glErrDiv").hide(), BMS.Misc.fnAjax({
                data: {
                    a: t,
                    v: n,
                    t: i,
                    c: a,
                    p1: r,
                    p2: s,
                    p3: o,
                    p4: l,
                    p5: c,
                    p6: d,
                    p7: u,
                    p8: p,
                    p9: f,
                    p10: h
                },
                dataType: "xml",
                error: function(e, t, n) {
                    S || (BMS.Misc.fnBusy(!1), BMS.Misc.fnGlobalErr({
                        eMess: "Sorry, There is a problem with the internet connection. Please try after some time.",
                        eCode: e.status,
                        eCmd: w,
                        eRFn: "function: BMS.Misc.fnDoTrans"
                    }))
                },
                success: function(e) {
                    for (var t = {}, n = $(e).find("objExecuteResult").children().length, i = 0; i < n; i++) {
                        var a = $(e).find("objExecuteResult").children().eq(i);
                        t[a.get(0).nodeName] = a.text()
                    }
                    "true" == t.blnSuccess ? g && g(m ? t : t.strData) : (S || (BMS.Misc.fnBusy(!1), BMS.Misc.fnGlobalErr({
                        eMess: t.strException,
                        eCode: t.intExceptionEx,
                        eCmd: w,
                        eRFn: "function: BMS.Misc.fnDoTrans"
                    })), v && v(y ? t : t.strException))
                },
                suppress: S,
                type: "POST",
                url: "https:" == location.protocol || 1 == e.secure ? "/serv/doSecureTrans.bms" : "/serv/doTrans.bms"
            })
        } catch (b) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnDoTrans",
                fnParams: e,
                err: b
            })
        }
    }, BMS.Misc.fnDoSecureTrans = function(e) {
        function t(e) {
            return e = e.toString().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""), e = e.toString().replace(/(onload|onerror|onclick|onhover|onmouse)/gi, "")
        }
        try {
            var n = void 0 != e.AppC && "" != e.AppC ? e.AppC : global.strAppCode,
                i = void 0 != e.venCode && "" != e.venCode ? e.venCode : "",
                a = void 0 != e.transId && "" != e.transId ? e.transId : 0,
                r = void 0 != e.cmd && "" != e.cmd ? e.cmd : "",
                s = void 0 != e.p1 && "" != e.p1 ? e.p1 : "",
                o = void 0 != e.p2 && "" != e.p2 ? e.p2 : "",
                l = void 0 != e.p3 && "" != e.p3 ? e.p3 : "",
                c = void 0 != e.p4 && "" != e.p4 ? e.p4 : "",
                d = void 0 != e.p5 && "" != e.p5 ? e.p5 : "",
                u = void 0 != e.p6 && "" != e.p6 ? e.p6 : "",
                p = void 0 != e.p7 && "" != e.p7 ? e.p7 : "",
                f = void 0 != e.p8 && "" != e.p8 ? e.p8 : "",
                h = void 0 != e.p9 && "" != e.p9 ? e.p9 : "",
                g = void 0 != e.p10 && "" != e.p10 ? e.p10 : "",
                v = (void 0 != e.type && "" != e.type ? e.type : "", void 0 != e.fnCC && e.fnCC),
                m = void 0 != e.fnEC && e.fnEC,
                y = void 0 != e.ccObj && e.ccObj,
                S = void 0 != e.ecObj && e.ecObj,
                w = void 0 != e.blnSupp && e.blnSupp,
                b = "strCommand: " + r + ", strAppCode: " + n + ", strVenueCode:" + i + ", lngTransId:" + a + ", strParam1:" + s + ", strParam2: " + o + ", strParam3: " + l + ", strParam4:" + c + ", strParam5:" + d + ", strParam6:" + u + ", strParam7:" + p + ", strParam8:" + f + ", strParam9: " + h + ", strParam10: " + g + ", blnSuppress: " + w,
                M = "https://" + location.host;
            "in.bookmyshow.local" == location.host && (M = location.protocol + "//" + location.host);
            var C = "a=" + encodeURIComponent(n) + "&v=" + encodeURIComponent(i) + "&t=" + encodeURIComponent(a) + "&c=" + encodeURIComponent(r) + "&p1=" + encodeURIComponent(s) + "&p2=" + encodeURIComponent(o) + "&p3=" + encodeURIComponent(l) + "&p4=" + encodeURIComponent(c) + "&p5=" + encodeURIComponent(d) + "&p6=" + encodeURIComponent(u) + "&p7=" + encodeURIComponent(p) + "&p8=" + encodeURIComponent(f) + "&p9=" + encodeURIComponent(h) + "&p10=" + encodeURIComponent(g),
                k = M + "/serv/doSecureTrans.bms",
                _ = BMS.Misc.fnBrowsVer();
            if (_ < 8) k = k + "?" + C, fnData = function(e) {
                var t = $.parseXML(e.response),
                    n = $(t).find("strData").text();
                if ("true" == $(t).find("blnSuccess").text()) v && v(y ? n : n);
                else {
                    if (!w) {
                        $(t).find("strException").text(), $(t).find("intExceptionEx").text();
                        BMS.Misc.fnBusy(!1), BMS.Misc.fnGlobalErr({
                            eMess: n.strException,
                            eCode: n.intExceptionEx,
                            eCmd: b,
                            eRFn: "function: BMS.Misc.fnDoSecureTrans"
                        })
                    }
                    m && m(S ? n : $(t).find("strException").text())
                }
            }, $.getScript(k + "&type=jsonp&callback=fnData");
            else {
                var B = $("#xd_form");
                0 == B.length && (B = $("<form style='display:none;' id='xd_form' action='" + k + "?type=iframe#" + encodeURIComponent(document.location.href) + "' method='POST' enctype='multipart/form-data' target='xd_frame'></form>"), $("body").append(B)), B.html("");
                var x = "<input type='hidden' name='a' value='" + t(n) + "' />";
                x += "<input type='hidden' name='v' value='" + t(i) + "' />", x += "<input type='hidden' name='t' value='" + t(a) + "' />", x += "<input type='hidden' name='c' value='" + t(r) + "' />", x += "<input type='hidden' name='p1' value='" + t(s) + "' />", x += "<input type='hidden' name='p2' value='" + t(o) + "' />", x += "<input type='hidden' name='p3' value='" + t(l) + "' />", x += "<input type='hidden' name='p4' value='" + t(c) + "' />", x += "<input type='hidden' name='p5' value='" + t(d) + "' />", x += "<input type='hidden' name='p6' value='" + t(u) + "' />", x += "<input type='hidden' name='p7' value='" + t(p) + "' />", x += "<input type='hidden' name='p8' value='" + t(f) + "' />", x += "<input type='hidden' name='p9' value='" + t(h) + "' />", x += "<input type='hidden' name='p10' value='" + t(g) + "' />", B.html(x);
                var E = $("#xd_frame");
                0 == E.length && (E = $('<iframe id="xd_frame" name="xd_frame" style="display:none;"></iframe>'), $("body").append(E)), B.submit(), XD.receiveMessage(function(e) {
                    for (var t = $.parseXML($.parseJSON(e.data).response), n = {}, i = $(t).find("objExecuteResult").children().length, a = 0; a < i; a++) {
                        var r = $(t).find("objExecuteResult").children().eq(a);
                        n[r.get(0).nodeName] = r.text()
                    }
                    if ("true" == n.blnSuccess) v && v(y ? n : n.strData);
                    else {
                        if (!w) {
                            n.strException, n.intExceptionEx;
                            BMS.Misc.fnBusy(!1), BMS.Misc.fnGlobalErr({
                                eMess: n.strException,
                                eCode: n.intExceptionEx,
                                eCmd: b,
                                eRFn: "function: BMS.Misc.fnDoSecureTrans"
                            })
                        }
                        m && m(S ? n : n.strException)
                    }
                }, M)
            }
        } catch (T) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnDoSecureTrans",
                fnParams: e,
                err: T
            })
        }
    }, BMS.Misc.fnWsData = function(e) {
        try {
            var t = void 0 != e.AppC && "" != e.AppC ? e.AppC : global.strAppCode,
                n = void 0 != e.venCode && "" != e.venCode ? e.venCode : "",
                i = void 0 != e.transId && "" != e.transId ? e.transId : 0,
                a = void 0 != e.cmd && "" != e.cmd ? e.cmd : "",
                r = void 0 != e.eventType && "" != e.eventType ? e.eventType : "",
                s = void 0 != e.evtCode && "" != e.evtCode ? e.evtCode : "",
                o = void 0 != e.srCode && "" != e.srCode ? e.srCode : "",
                l = void 0 != e.sessDet && "" != e.sessDet ? e.sessDet : "",
                c = void 0 != e.sessId && "" != e.sessId ? e.sessId : "",
                d = void 0 != e.email && "" != e.email ? e.email : "",
                u = void 0 != e.lsid && "" != e.lsid ? e.lsid : "",
                p = void 0 != e.compCode && "" != e.compCode ? e.compCode : "",
                f = void 0 != e.producer && "" != e.producer ? e.producer : "",
                h = void 0 != e.data && "" != e.data ? e.data : "",
                g = void 0 != e.retType && "" != e.retType ? e.retType : "js",
                v = !(void 0 == e.fnCC || !e.fnCC) && e.fnCC,
                m = !(void 0 == e.fnEC || !e.fnEC) && e.fnEC,
                y = void 0 != e.blnSupp && e.blnSupp,
                S = "strCommand: " + a + ", strAppCode: " + t + ", strVenueCode:" + n + ", lngTransId" + i + ", strEvent" + r + ", strEventCodes: " + s + ", strSRCode: " + o + ", strSessDet:" + l + ", lngSessId:" + c + ", strEmail:" + d + ", strLSID:" + u + ", strCompCode:" + p + ", strProducer: " + f + ", strData: " + h + ", strRetType: " + g;
            $("#glErrDiv").is(":visible") && $("#glErrDiv").hide(), BMS.Misc.fnAjax({
                data: {
                    strApp: t,
                    strVC: n,
                    lngTrans: i,
                    strCmd: a,
                    strET: r,
                    strEC: s,
                    strSRC: o,
                    strSD: l,
                    strSID: c,
                    strLE: d,
                    strLSID: u,
                    strComp: p,
                    strProducer: f,
                    strData: unescape(h),
                    strCase: g
                },
                dataType: "xml",
                error: function(t, n, i) {
                    BMS.Misc.fnErr({
                        fnName: "wsData",
                        fnParams: e
                    })
                },
                success: function(e) {
                    var t = escape($(e).find("json" == g ? "strGetDataForJSONResult" : "strGetDataForJavaScriptResult").eq(0).text());
                    if ("" != t) v && v(t);
                    else if (!y)
                        if (m) m(t);
                        else {
                            BMS.Misc.fnBusy(!1);
                            e.split("-");
                            BMS.Misc.fnGlobalErr({
                                eMess: "Sorry, there seems to be a connectivity problem with the cinema. Please try after some time.",
                                eCmd: S,
                                eRFn: "function: BMS.Misc.fnWsData"
                            })
                        }
                },
                type: "post",
                url: "/serv/wsData.bms"
            })
        } catch (w) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnWsData",
                fnParams: e,
                err: w
            })
        }
    }, BMS.Misc.fnGVal = function(e) {
        try {
            for (var t = e.key, n = e.data, i = void 0 != e.splitA && "" != e.splitA ? e.splitA : "|", a = void 0 != e.splitB && "" != e.splitB ? e.splitB : "=", r = void 0 != e.defVal && "" != e.defVal ? e.defVal : "", s = n.split(i), o = "", l = 0; l < s.length; l++) {
                var c = s[l].split(a);
                if (c[0].toUpperCase() == t.toUpperCase()) {
                    o = c[1];
                    break
                }
            }
            return "" != o ? o : r
        } catch (d) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGVal",
                fnParams: arguments,
                err: d
            })
        }
    }, BMS.Misc.fnGPipeDelimitedString = function(e) {
        try {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
            return t = 0 == t.length ? "" : "|" + t.join("|") + "|"
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGPipeDelimitedString",
                fnParams: e,
                err: i
            })
        }
    }, BMS.Misc.fnUrlName = function(e) {
        try {
            return e = e.replace(/[^a-zA-Z 0-9]+/g, ""), e = e.replace(new RegExp(" ", "gi"), "-"), e = e.replace(/-+/gi, "-")
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnUrlName",
                fnParams: e,
                err: t
            })
        }
    }, BMS.Misc.fnGATracker = function(e) {
        try {
            var t = location.pathname.replace(/\//g, ""),
                n = "" == t ? "home" : t,
                i = "" != e.location ? "-" + e.location : "",
                a = "" != e.action ? "-" + e.action : "",
                r = n + i + a;
            "undefined" != typeof ga && ga("send", "pageview", r), "undefined" != typeof wzrk_pushSiteEvent && wzrk_pushSiteEvent(r)
        } catch (s) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGATracker",
                fnParams: arguments,
                err: s
            })
        }
    }, BMS.Misc.fnBrowsVer = function() {
        try {
            if (rv = -1, "Microsoft Internet Explorer" == navigator.appName) {
                var e = navigator.userAgent,
                    t = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                null != t.exec(e) && (rv = parseFloat(RegExp.$1))
            } else rv = 999;
            return rv
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnBrowsVer",
                err: n
            })
        }
    }, BMS.Misc.fnCapitalName = function(e) {
        try {
            for (var t = $.trim(e).split(" "), n = "", i = 0; i < t.length; i++) "" != t[i] && (n += t[i].substr(0, 1).toUpperCase() + t[i].substr(1, t[i].length) + " ");
            return n
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnCapitalName",
                err: a
            })
        }
    }, BMS.Misc.fnGetUserImage = function(e, t) {
        try {
            var n = e.SOCIALID,
                i = "";
            i = global.strContentUrl + "/webin/common/default-user.png", "FB" == n ? (imageURL = "https://graph.facebook.com/" + BMS.Misc.fnGVal({
                key: "FBID",
                data: BMS.Storage.get({
                    name: "ld"
                })
            }) + "/picture?width=100&height=100", t(imageURL)) : "PLUS" == n ? "" == BMS.Storage.isset({
                name: "PLUSIMAGEURL"
            }) ? BMS.Misc.fnAjax({
                url: "https://www.googleapis.com/plus/v1/people/me",
                data: "access_token=" + BMS.Misc.fnGVal({
                    key: "PLUSACCESSTOKEN",
                    data: BMS.Storage.get({
                        name: "ld"
                    })
                }),
                type: "GET",
                success: function(e) {
                    "" != e.image.url ? (BMS.Storage.set({
                        name: "PLUSIMAGEURL",
                        value: e.image.url,
                        storage: "C"
                    }), t(e.image.url)) : t(i)
                },
                error: function(e, n, a) {
                    t(i)
                }
            }) : t(BMS.Storage.get({
                name: "PLUSIMAGEURL"
            })) : t(i)
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGetUserImage",
                err: a
            })
        }
    }, BMS.Misc.fnGetSocialKeys = function() {
        try {
            BMS.Misc.fnAjax({
                url: global.getDataUrl,
                data: {
                    cmd: "APPDETAILS",
                    app: "ALL"
                },
                type: "GET",
                dataType: "json",
                success: function(e) {
                    global.fbAppId = BMS.Misc.fnGVal({
                        key: "FB_APPID",
                        data: e.FB
                    }), global.FBPriviledges = BMS.Misc.fnGVal({
                        key: "FB_PRIVILEGES",
                        data: e.FB
                    }), global.plusAppId = BMS.Misc.fnGVal({
                        key: "PLUS_CLIENTID",
                        data: e.PLUS
                    }), global.plusPrivileges = BMS.Misc.fnGVal({
                        key: "PLUS_PRIVILEGES",
                        data: e.PLUS
                    }).split("&nbsp;").join(" "), "undefined" != typeof FB ? FB.init({
                        appId: global.fbAppId,
                        status: !1,
                        xfbml: !0,
                        version: "v2.2"
                    }) : $.getScript(socialJS, function() {
                        FB.init({
                            appId: global.fbAppId,
                            status: !1,
                            xfbml: !0,
                            version: "v2.2"
                        })
                    })
                },
                error: function(e) {}
            })
        } catch (e) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGetSocialKeys",
                err: e
            })
        }
    }, BMS.Misc.modal = function(e, t) {
        try {
            $(document).scrollTop(), $(".modal .__overlay"), $(".main-body-wrapper"), $(".select-overlay");
            t ? BMS.Modal.fnShowModal(e) : BMS.Modal.fnHideModal()
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.modal",
                fnParams: e + " " + t,
                err: n
            })
        }
    }, BMS.Misc.fnShowSuccessModal = function(e, t) {
        try {
            $("#popover-rating-msg").html(t), BMS.Modal.fnShowModal(e), setTimeout(function() {
                BMS.Modal.fnHideModal()
            }, 2500)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnShowSuccessModal",
                fnParams: e + "" + t,
                err: n
            })
        }
    }, BMS.Misc.fnBtnProcessing = function(e, t) {
        try {
            t ? $("#" + e).addClass("_processing") : $("#" + e).removeClass("_processing")
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnBtnProcessing",
                fnParams: e + " " + t,
                err: n
            })
        }
    }, BMS.Misc.fnDoFloat = function() {
        try {
            if ("undefined" == typeof BMS.Modal.currentModal || null == BMS.Modal.currentModal) return void clearTimeout(BMS.Misc.fnDoFloat.objTimer);
            if (!global.blnIsTouchScreen) {
                var e = {
                        x: parseInt(BMS.Modal.currentModal.css("padding-top").replace("px", "")) + parseInt(BMS.Modal.currentModal.css("margin-top").replace("px", "")) + parseInt(BMS.Modal.currentModal.css("border-top-width").replace("px", "")),
                        y: parseInt(BMS.Modal.currentModal.css("padding-left").replace("px", "")) + parseInt(BMS.Modal.currentModal.css("margin-left").replace("px", "")) + parseInt(BMS.Modal.currentModal.css("border-left-width").replace("px", ""))
                    },
                    t = {
                        top: ($(window).height() - BMS.Modal.currentModal.height()) / 2 - e.x,
                        left: ($(window).width() - BMS.Modal.currentModal.width()) / 2 - e.y
                    };
                return BMS.Modal.currentModal.css({
                    top: t.top
                }), clearTimeout(BMS.Misc.fnDoFloat.objTimer), BMS.Misc.fnDoFloat.objTimer = setTimeout(function() {}, 5e4), BMS.Modal.currentModal
            }
            var n = BMS.Modal.currentModal.height();
            void 0;
            var i = $(window).height(),
                a = 0;
            a = n < i ? parseInt((i - n) / 2) + window.pageYOffset : 10 + window.pageYOffset, BMS.Modal.currentModal.css({
                top: a
            })
        } catch (r) {
            void 0
        }
    }, BMS.Misc.fnGlobalErr = function(e) {
        try {
            var t = "Whoa there! Something went wrong with our script. Please refresh the page and try again",
                n = void 0 != e.eMess && "" != e.eMess ? e.eMess : t,
                i = void 0 != e.eCode && "" != e.eCode ? e.eCode : "GEN";
            void 0 != e.eCmd && "" != e.eCmd ? "Command: " + e.eCmd : "", void 0 != e.eRFn && "" != e.eRFn ? "Function: " + e.eRFn : "", void 0 != e.blnSucc && "" != e.blnSucc && e.blnSucc;
            "-21059" == i && (blnActiveTrans = "True"), "" != i ? $("#globalErrMsg").html(n).show() : $("#globalErrMsg").html(e).hide(), $("#dActualErrorMsg").html(JSON.stringify(e)), BMS.Misc.modal("error-div", !0)
        } catch (a) {
            BMS.Misc.fnDispErr({
                fnName: "BMS.Misc.fnGlobalErr",
                fnParams: e,
                err: a
            })
        }
    }, BMS.Misc.fnGlobalSportsErr = function(e) {
        try {
            var t = "Whoa there! Something went wrong with our script. Please refresh the page and try again",
                n = void 0 != e.eMess && "" != e.eMess ? e.eMess : t,
                i = void 0 != e.eCode && "" != e.eCode ? e.eCode : "GEN";
            void 0 != e.eCmd && "" != e.eCmd ? "Command: " + e.eCmd : "", void 0 != e.eRFn && "" != e.eRFn ? "Function: " + e.eRFn : "", void 0 != e.blnSucc && "" != e.blnSucc && e.blnSucc;
            void 0, "" != i ? $("#globalSportsErrMsg").html(n).show() : $("#globalSportsErrMsg").html(e).hide(), $("#dActualSportsErrorMsg").html(JSON.stringify(e)), BMS.Misc.modal("error-sports-div", !0)
        } catch (a) {
            BMS.Misc.fnDispErr({
                fnName: "BMS.Misc.fnGlobalSportsErr",
                fnParams: e,
                err: a
            })
        }
    }, BMS.Misc.fnDispErr = function(e) {
        return void 0, !1
    }, BMS.Misc.fnErr = function(e) {
        void 0 == e.supp || e.supp, void 0 != e.fnParams && "" != e.fnParams ? e.fnParams : "";
        void 0, $("#globalErrMsg").html("Error : " + e.fnName + " Error is " + e.err), "undefined" != typeof BMS.Modal.currentModal && null != BMS.Modal.currentModal && BMS.Misc.modal("error-div", !0)
    }, BMS.Misc.fnSCusErrDisplay = function(e, t, n) {
        try {
            $("#" + e).clearQueue();
            var i = "";
            "e" == n ? (i += '<span class="__icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">;<use xlink:href="/icons/common-icons.svg#icon-error"></use></svg></span>', i += '<span class="__text">' + t + "</span>", $("#" + e).removeClass("_success").addClass("_error").html(i).show()) : "w" == n ? (i += '<span class="__icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">;<use xlink:href="/icons/common-icons.svg#icon-warning"></use></svg></span>', i += '<span class="__text">' + t + "</span>", $("#" + e).removeClass("_error").addClass("_warning").html(i).animate({
                height: "toggle",
                opacity: "show"
            }, {
                queue: !1
            }, "slow").delay(5e3).animate({
                height: "toggle",
                opacity: "hide"
            }, "fast", function(e) {
                $(this).hide()
            })) : "i" == n ? (i += '<span class="__icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">;<use xlink:href="/icons/common-icons.svg#icon-info"></use></svg></span>', i += '<span class="__text">' + t + "</span>", $("#" + e).removeClass("_error").addClass("_info").html(i).animate({
                height: "toggle",
                opacity: "show"
            }, {
                queue: !1
            }, "slow").delay(5e3).animate({
                height: "toggle",
                opacity: "hide"
            }, "fast", function(e) {
                $(this).hide()
            })) : "s" == n && (i += '<span class="__icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">;<use xlink:href="/icons/common-icons.svg#icon-success"></use></svg></span>', i += '<span class="__text">' + t + "</span>", $("#" + e).removeClass("_error").addClass("_success").html(i).show())
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnSCusErrDisplay",
                fnParams: e + ", " + t + ", " + n,
                err: a
            })
        }
    }, BMS.Misc.fnChangeUrl = function(e) {
        try {
            var t = "undefined" != typeof e.URL ? e.URL : "",
                n = "undefined" != typeof e.event ? e.event : "";
            window.history.pushState(null, null, t), "" != n && n.preventDefault()
        } catch (i) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnChangeUrl",
                fnParams: e,
                err: i
            })
        }
    }, BMS.Misc.fnBusy = function(e, t) {
        try {
            if (e)
                if (t) {
                    var n = '<div class="qb-loader-wrapper"><div class="qb-loader">\t\t    \t\t<span class="reel __roll1">\t\t\t\t\t\t<span class="mini-circle"></span>\t\t\t\t\t\t<span class="mini-circle __center"></span>\t\t\t\t\t\t<span class="mini-circle __left"></span>\t\t\t\t\t\t<span class="mini-circle __right"></span>\t\t\t\t\t\t<span class="mini-circle __bottom"></span>\t\t\t\t\t</span>\t\t\t\t</div></div>';
                    t.addClass("_add-movie-spinner"), setTimeout(function() {
                        t.prepend(n)
                    }, 200)
                } else handlePopups.freezeDocument(), $("#dBusy").show(), $(".__busy-div-overlay").show();
            else if (t) {
                var i = t.find(".qb-loader-wrapper");
                i.addClass("_fade-out"), setTimeout(function() {
                    i.remove(), t.removeClass("_add-movie-spinner")
                }, 300)
            } else handlePopups.releaseDocument(), $("#dBusy").hide(), $(".__busy-div-overlay").hide()
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnBusy",
                err: a
            })
        }
    }, BMS.Misc.fnCover = function(e) {
        try {
            void 0
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnCover",
                err: t
            })
        }
    }, BMS.Misc.fnGoTo = function(e) {
        try {
            setTimeout("window.location.href='" + e + "'", 0)
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.fnGoTo",
                fnParams: arguments,
                err: t
            })
        }
    }, BMS.Misc.IsValidDate = function(e, t, n) {
        try {
            var i = t + "/" + e + "/" + n,
                a = new Date(i);
            return a.getDate() == e && (a.getMonth() == t - 1 && a.getFullYear() == n)
        } catch (r) {
            BMS.Misc.fnErr({
                fnName: "BMS.Misc.IsValidDate",
                fnParams: e + " " + t + " " + n,
                err: r
            })
        }
    }, BMS.Misc.fnGQS = function(e, t) {
        try {
            for (var t = void 0 != t ? t : "", n = window.location.search.substring(1), i = n.split("&"), a = 0; a < i.length; a++) {
                var r = i[a].split("=");
                if (r[0] == e) return r[1]
            }
            return t
        } catch (s) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnGQS",
                fnParams: arguments,
                err: s
            })
        }
    }, BMS.Misc.fnPushEventDataToAnalytics = function(e, t, n, i) {
        try {
            var a = $.extend(!0, {}, n),
                r = ($.extend(!0, {}, n), $.extend(!0, {}, i));
            $.inArray("WR", e) != -1 && "undefined" != typeof clevertap && "undefined" != typeof clevertap.event && clevertap.event.push(t, a), $.inArray("GA", e) == -1 && $.inArray("GTM", e) == -1 || "undefined" != typeof dataLayer && dataLayer.push(r)
        } catch (s) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnPushEventDataToAnalytics",
                fnParams: arguments,
                err: s
            })
        }
    }, BMS.Misc.fnPushNotificationsFromClevertap = function(e, t, n, i, a) {
        try {
            e = e ? e : "Get Personalized Updates", t = t ? t : "Get notified when we find something interesting that you'll love!", n = n ? n : "OK", i = i ? i : "Not Now", a = a ? a : "#c02c3a", "undefined" != typeof clevertap && "undefined" != typeof clevertap.notifications && clevertap.notifications.push(e, t, n, i, a)
        } catch (r) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnPushNotificationsFromClevertap",
                fnParams: arguments,
                err: r
            })
        }
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        return $.inArray(e, this)
    });
var handlePopups = {
    scrollPos: null,
    initialScrollPos: null,
    freezeDocument: function(e) {
        this.scrollPos = $(document).scrollTop(), this.scrollPos <= 0 ? this.initialScrollPos = Math.abs(parseInt($("body").css("margin-top"))) : this.initialScrollPos = this.scrollPos, e && ($showCaseCarousel = $("#showcase-primary .showcase-carousel"), $showCaseCarousel.hasClass("slick-initialized") && $showCaseCarousel.slick("slickPause"), pausePrimaryShowcase = !0), $("body").css("margin-top", -this.initialScrollPos), $("body").addClass("_fixed")
    },
    releaseDocument: function() {
        $("body").removeClass("_fixed"), $("body").css("margin-top", 0), $(document).scrollTop(this.initialScrollPos), $("#showcase-primary .showcase-carousel").slick("slickPlay")
    }
};
BMS.Misc.fnPopup = function(e) {
        try {
            var t = e.url,
                n = (void 0 != e.modal && "" != e.modal && e.modal, void 0 != e.height && "" != e.height ? e.height : 552),
                i = void 0 != e.width && "" != e.width ? e.width : 800,
                a = "width=" + i + "px, height=" + n + "px, center=yes, status=no, toolbar=no, location=no, menubar=no, scrollbars=yes, resizable=no, position=absolute, left= 200px; top=135px;";
            return window.open(t, "_blank", a)
        } catch (r) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnPopup",
                fnParams: arguments,
                err: r
            })
        }
    }, BMS.Misc.fnSvgAsset = function(e) {
        try {
            var t = e.split("/"),
                n = t[2],
                i = "";
            return global.svgManifest && global.svgManifest.hasOwnProperty(n) && (i = "/" + t[1] + "/" + global.svgManifest[n]), "" == i ? e : i
        } catch (a) {
            BMS.Misc.fnErr({
                fnName: "misc.js - BMS.Misc.fnSvgAsset",
                fnParams: arguments,
                err: a
            })
        }
    }, BMS.Misc.Router = function() {
        var e = {},
            t = {},
            n = !0,
            i = "",
            a = function(n, i, a, r) {
                a && "function" == typeof a && (e.hasOwnProperty(n) || (e[n] = []), e[n].push({
                    key: i,
                    callback: a
                })), r && "function" == typeof r && (t.hasOwnProperty(n) || (t[n] = []), t[n].push({
                    key: i,
                    callback: r
                }))
            },
            r = function(n, i) {
                if (!$.isEmptyObject(e) && e.hasOwnProperty(n)) {
                    var a = null;
                    e[n].forEach(function(e, t) {
                        if (e.key === i) return a = t, !1
                    }), null !== a && e[n].splice(a, 1)
                }
                if (!$.isEmptyObject(t) && t.hasOwnProperty(n)) {
                    var r = null;
                    t[n].forEach(function(e, t) {
                        if (e.key === i) return r = t, !1
                    }), null !== r && t[n].splice(r, 1)
                }
            },
            s = function(e, t) {
                void 0 === t && (t = !0), n = !!t, n === !1 && setTimeout(function() {
                    n = !0
                }, 100), "" === e || void 0 === e || null === e ? window.history.back() : window.location.hash = "!" + e
            },
            o = function(a) {
                if (!n) return void(n = !0);
                var r, s = !1;
                "undefined" != typeof a.newURL ? (r = a.newURL.split("#"), s = !0) : r = window.location.hash.split("#");
                var o = r[1];
                void 0 !== o && (o = o.substr(1));
                var l;
                l = "undefined" != typeof a.oldURL ? a.oldURL.split("#") : i.split("#");
                var c = l[1];
                void 0 !== c && (c = c.substr(1)), l.length < r.length ? e.hasOwnProperty(o) && e[o].forEach(function(e) {
                    e.callback.call()
                }) : l.length === r.length ? (t.hasOwnProperty(c) && t[c].forEach(function(e) {
                    e.callback.call()
                }), e.hasOwnProperty(o) && e[o].forEach(function(e) {
                    e.callback.call()
                })) : t.hasOwnProperty(c) && t[c].forEach(function(e) {
                    e.callback.call()
                }), i = window.location.hash
            };
        return window.addEventListener("hashchange", o), {
            registerRoute: a,
            unregisterRoute: r,
            triggerRoute: s
        }
    }(), BMS.Misc.fnToMoneyFormat = function(e) {
        try {
            e += "",
                x = e.split("."), x1 = x[0], x2 = x.length > 1 ? "." + x[1] : "";
            for (var t = /(\d+)(\d{3})/, n = 0, i = String(x1).length, a = parseInt(i / 2 - 1); t.test(x1) && (n > 0 ? x1 = x1.replace(t, "$1,$2") : (x1 = x1.replace(t, "$1,$2"), t = /(\d+)(\d{2})/), n++, a--, 0 != a););
            return x1 + x2
        } catch (r) {
            return e
        }
    }, $(document).ready(function() {
        if ($(window).resize(function() {
                BMS.Modal.currentModal && BMS.Misc.fnDoFloat()
            }), $("#app-install-wrap .__cancel-icon").click(function() {
                $("#app-install-wrap").slideUp(300), BMS.Storage.set({
                    name: "appInstallWrapper",
                    value: "set",
                    storage: "C",
                    sess: !0
                })
            }), $(".social-share-links").length > 0) {
            $("[data-share-button]").click(function() {
                var e = $(".social-share-links");
                e.is(":visible") ? e.slideUp() : e.slideDown()
            });
            var e = !1;
            "undefined" != typeof isTouchScreen ? e = isTouchScreen : "undefined" != typeof global.blnIsTouchScreen && (e = global.blnIsTouchScreen), e ? $(".social-share-links").socialSharer({
                buttons: ["facebook", "twitter", "googleplus", "whatsapp"],
                config: {
                    showCount: !1
                }
            }) : $(".social-share-links").socialSharer({
                buttons: ["facebook", "twitter", "googleplus"],
                config: {
                    showCount: !1
                }
            })
        }
        $("[data-hidden-html-target]").each(function() {
            var e = $(this),
                t = e.attr("id"),
                n = e.attr("data-hidden-html-target"),
                i = $("#" + t).html();
            $(n).html($(n).html() + i), $("#" + t).remove()
        })
    }),
    function(e) {
        e.fn.modal = function() {
            BMS.Modal.currentModal = null;
            var t = e(".modal .__overlay"),
                n = e(".main-body-wrapper"),
                i = (e(".modal .popover"), "_animateTop"),
                a = "_make-blur",
                r = e(".select-overlay");
            e("[data-modal]").tap(function() {
                var t = e(this).attr("data-modal");
                BMS.Modal.fnShowModal(t)
            }), e(".__dismiss").tap(function() {
                BMS.Modal.fnHideModal()
            }), t.tap(function() {
                "qty-sel" != e(BMS.Modal.currentModal).attr("id") && "lottery-form" != e(BMS.Modal.currentModal).attr("id") && "oneClickWalletPop" != e(BMS.Modal.currentModal).attr("id") && BMS.Modal.fnHideModal()
            }), BMS.Modal.fnShowModal = function(s) {
                e(document).scrollTop();
                if (null != BMS.Modal.currentModal && (BMS.Modal.currentModal.removeClass(i), BMS.Modal.currentModal.hide(), --handlePopups.activeModals), r.is(":visible") && r.click(), "signinPopup" == s && (e("#iPwd").prop("type", "password"), "" != e("#dSignInErrorEmail").text() && e("#dSignInErrorEmail").text("").hide(), "" != e("#dSignInErrorPassword").text() && e("#dSignInErrorPassword").text("").hide()), BMS.Modal.currentModal = e("#" + s), t.css("opacity", 0).show(), t.transition({
                        opacity: 1
                    }, 200), n.addClass(a), handlePopups.freezeDocument(!0), BMS.Misc.fnDoFloat(), setTimeout("BMS.Misc.fnDoFloat()", 50), "dRatConf" != s && "signupPopup" != s && "rblCallout" != s && e(BMS.Modal.currentModal).find("input").val(""), BMS.Modal.currentModal.show(), "locationPopup" == s && global.blnIsTouchScreen) {
                    void 0;
                    var o = e(window).height() - (e(".location-header", "#locationPopup").outerHeight() + 20);
                    void 0, e(".location-container", "#locationPopup").css({
                        "max-height": o
                    }), BMS.Misc.fnDoFloat()
                }
                $focusElem = e(BMS.Modal.currentModal).find("input[type=text],input[type=email],input[type=number],textarea,select").filter(":visible:first"), "" != $focusElem && setTimeout(function() {
                    "signinPopup" == s && global.blnIsTouchScreen || "locationPopup" == s && global.blnIsTouchScreen || $focusElem.focus()
                }, 200)
            }, BMS.Modal.fnHideModal = function() {
                void 0;
                var r = window.location.href.split("/")[4];
                "plays" != r && "plays_v1" != r || (e(".stars").find("use").css({
                    fill: "#e0e0e0"
                }), e(".rate-o-meter").text("0.0"));
                var s = BMS.Storage.get({
                    name: "lngTransId"
                });
                if (!_.isEmpty(e(".js-merc-link").attr("data-merc")))
                    if (_.isEmpty(s)) e(".js-merc-link").attr("data-merc", !1), "undefined" != typeof BMS.Modal.currentModal && null != BMS.Modal.currentModal && (BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Modal.currentModal.hide(), handlePopups.releaseDocument(), n.removeClass(a), BMS.Modal.currentModal.removeClass(i), BMS.Modal.currentModal = null);
                    else {
                        var o = confirm("Closing the Merchandise Store will cancel the transaction, Do you wish to proceed?");
                        if (!o) return;
                        Checkout.cancelMerchandiseTransaction(), BMS.Storage.del({
                            name: "lngTransId"
                        }), e(".js-merc-link").attr("data-merc", !1), t.fadeOut(), "undefined" != typeof BMS.Modal.currentModal && null != BMS.Modal.currentModal && (BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Modal.currentModal.hide(), handlePopups.releaseDocument(), n.removeClass(a), BMS.Modal.currentModal.removeClass(i), BMS.Modal.currentModal = null, location.reload())
                    }
                t.fadeOut(), "undefined" != typeof BMS.Modal.currentModal && null != BMS.Modal.currentModal && (BMS.Misc.fnBusy(!1, BMS.Modal.currentModal), BMS.Modal.currentModal.hide(), handlePopups.releaseDocument(), n.removeClass(a), BMS.Modal.currentModal.removeClass(i), BMS.Modal.currentModal = null, e("html").removeClass("no-scroll"))
            }
        }
    }(jQuery), $(document).ready(function() {
        $("body").modal()
    }), BMS.Validate.address = function(e) {
        try {
            if (e && e.length < 5) return !1;
            var t = /^[a-zA-Z0-9 \\\/;:.,-]+$/g;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.address",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.chkName = function(e) {
        try {
            return e = $.trim(e), pattern = /^([a-zA-Z\s]+)$/, !(e.indexOf("`") > -1) && pattern.test(e)
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "fnVal.name",
                fnParams: e,
                err: t
            })
        }
    }, BMS.Validate.email = function(e) {
        try {
            var t = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
            return !(e.indexOf(",") > -1) && t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.email",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.date = function(e) {
        try {
            var t = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.date",
                fnParams: strEmail,
                err: n
            })
        }
    }, BMS.Validate.mob = function(e) {
        try {
            var t = /^[789]\d{9}$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.mob",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.pancard = function(e) {
        try {
            var t = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Validate.pancard",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.ifsc = function(e) {
        try {
            var t = /^[a-zA-Z0-9]+$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Validate.ifsc",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.number = function(e) {
        try {
            var t = /^\d+$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.address",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.rblpancard = function(e) {
        try {
            var t = /^([a-zA-Z]{3})([P,p]{1})([a-zA-Z]{1})(\d{4})([a-zA-Z]{1})$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Validate.pancard",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.pincode = function(e) {
        try {
            var t = /^[0-9]{6}$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "BMS.Validate.pincode",
                fnParams: e,
                err: n
            })
        }
    }, BMS.Validate.otp = function(e) {
        try {
            if (e && e.length < 6) return !1;
            var t = /^\d+$/;
            return t.test(e)
        } catch (n) {
            BMS.Misc.fnErr({
                fnName: "fnVal.otp",
                fnParams: e,
                err: n
            })
        }
    };
var primaryShowcase = $("#showcase-primary .showcase-carousel"),
    pausePrimaryShowcase = !1,
    handlePopups = {
        scrollPos: null,
        initialScrollPos: null,
        activeModals: 0,
        escKeyHandler: function(e) {
            27 != e.keyCode && 27 != e.which || (null !== BMS.Modal.currentModal ? BMS.Modal.fnHideModal() : $(".select-overlay").click())
        },
        freezeDocument: function(e) {
            try {
                if (e = $.extend({}, e), this.activeModals++, this.activeModals > 1) return !1;
                $(document).bind("keyup", this.escKeyHandler), this.scrollPos = $(document).scrollTop(), this.scrollPos <= 0 ? this.initialScrollPos = Math.abs(parseInt($("body").css("margin-top"))) : this.initialScrollPos = this.scrollPos, primaryShowcase && primaryShowcase.length && primaryShowcase.hasClass("slick-initialized") && primaryShowcase.slick("slickPause"), pausePrimaryShowcase = !0, global.blnIsTouchScreen && !e.popover || ($("body").css("margin-top", -this.initialScrollPos), $("body").addClass("_fixed"), primaryShowcase && primaryShowcase.length && primaryShowcase.hasClass("slick-initialized") && primaryShowcase.slick("slickPause"))
            } catch (t) {
                BMS.Misc.fnErr({
                    fnName: "handlePopups.freezeDocument",
                    err: t
                })
            }
        },
        releaseDocument: function(e) {
            try {
                this.activeModals--, this.activeModals < 1 && ($("body").hasClass("_fixed") && ($("body").removeClass("_fixed"), $("body").css("margin-top", 0), $(document).scrollTop(this.initialScrollPos)), primaryShowcase && primaryShowcase.length && primaryShowcase.hasClass("slick-initialized") && primaryShowcase.slick("slickPlay"), $(document).unbind("keyup", this.escKeyHandler), this.activeModals = 0)
            } catch (t) {
                BMS.Misc.fnErr({
                    fnName: "handlePopups.releaseDocument",
                    err: t
                })
            }
        }
    },
    onPrimaryShowcaseInit = function(e, t) {
        pausePrimaryShowcase && $("#showcase-primary .showcase-carousel").slick("slickPause")
    },
    initCarousel = {
        banner: function() {
            $("#showcase-primary .showcase-carousel").on("init", function(e, t) {
                _.delay(onPrimaryShowcaseInit, 500, e, t)
            }), $("#showcase-primary .showcase-carousel").slick({
                centerMode: !0,
                slidesToShow: 1,
                arrows: !0,
                dots: !0,
                speed: 1e3,
                autoplay: !0,
                pauseOnHover: !0,
                adaptiveHeight: !1,
                variableWidth: !0
            })
        },
        handpick: function() {
            $("#handpick-carousel .showcase-carousel")[0] && $("#handpick-carousel .showcase-carousel").slick({
                centerMode: !0,
                slidesToShow: 1,
                arrows: !0,
                dots: !1,
                speed: 1e3,
                autoplay: !1,
                pauseOnHover: !1,
                adaptiveHeight: !1,
                variableWidth: !0
            })
        }
    },
    initializeWOW = function() {
        window.wow = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: -50,
            live: !0,
            lazyLoad: !0,
            lazyLoadOffset: -100
        }), wow.init()
    },
    triggerWOWScroll = function() {
        window.stopWowLoad = !1, setTimeout(function() {
            "undefined" != typeof wow && (wow.scrolled = !0, wow.scrollCallback())
        }, 5)
    },
    bannerInit = function() {
        function e(e) {
            if (!_.isUndefined(e) && !_.isEmpty(e)) return e.find(".slick-current").find("img").attr("src")
        }

        function t(t) {
            var n = e(t);
            if (!_.isUndefined(n) && n.length) {
                n = n.toLowerCase();
                var i = $(".dilwale-countdown"),
                    a = new Date,
                    r = a.getMonth() + 1,
                    s = a.getDate(),
                    o = a.getFullYear(),
                    l = o + "/" + r + "/" + s,
                    c = "2016/11/18",
                    d = "2016/11/19",
                    u = [];
                l != c && l != d || (u = ["pets-web", "tum_bin"]), !window.netflixShowCaseItemLoaded && n.indexOf("netflix") > -1 && "undefined" != typeof fnTrackNetflixShowcaseItem && (n.indexOf("netflix_dd") > -1 ? fnTrackNetflixShowcaseItem("DD", "view") : n.indexOf("netflix_hoc") > -1 && fnTrackNetflixShowcaseItem("HOC", "view"), window.netflixShowCaseItemLoaded = !0);
                for (var p = !1, f = 0; f < u.length; f++) n.indexOf(u[f].toLowerCase()) > -1 && (p = !0);
                p && i.length ? i.removeClass("_active") : "true" == i.attr("data-checkQBFixed") ? i.addClass("_active") : i.removeClass("_active")
            }
        }
        var n = $("#showcase-primary .showcase-carousel").find(".showcase-card").eq(0).find("img");
        if (n[0]) {
            window.stopWowLoad = !0, $(".bannerLoadCover").remove(), $("#showcase-primary .showcase-carousel").removeClass("_none");
            var i = $("#showcase-primary").find(".banner-container").length;
            i < 2 && $("#showcase-primary").find(".banner-container").eq(0).clone().appendTo($("#showcase-primary").find(".showcase-carousel")), $("#showcase-primary .showcase-carousel").on("init", function() {
                t($(this))
            }), $("#showcase-primary .showcase-carousel").slick({
                centerMode: !0,
                slidesToShow: 1,
                arrows: !0,
                dots: !0,
                speed: 1e3,
                autoplay: !0,
                pauseOnHover: !0,
                adaptiveHeight: !1,
                variableWidth: !0
            });
            var a = new Date,
                r = a.getMonth() + 1,
                s = a.getDate(),
                o = a.getFullYear();
            $("#showcase-primary .showcase-carousel").on("afterChange", function() {
                t($(this))
            }), triggerWOWScroll()
        }
    },
    isOverlayInitialized = !1,
    showcaseOverlay = {
        isDismissed: !1,
        init: function(e) {
            if (1 != isOverlayInitialized) {
                isOverlayInitialized = !0;
                var t = $("#showcase-primary .showcase-overlay").find(".overlay-card").eq(0).find("img");
                if (!t[0]) return void e();
                window.stopWowLoad = !0, $(".home-wrapper").one("click", function() {
                    showcaseOverlay.dismiss()
                }), $(".__dismiss", "#showcase-primary").removeClass("_none").one("click", function() {
                    showcaseOverlay.dismiss(), window.location.hash = ""
                }), $("#showcase-primary .showcase-overlay").find(".__bg").css({
                    "background-image": "url(" + t.attr("src") + ")"
                }), $(".bannerLoadCover").remove(), triggerWOWScroll();
                var n = $(".overlay-card", "#showcase-primary");
                n.hasClass("_video") && n.find(".__play").one("click", function() {
                    setTimeout(function() {
                        showcaseOverlay.dismiss()
                    }, 100)
                }), setTimeout(function() {
                    showcaseOverlay.dismiss()
                }, 1e4);
                var i = $("#showcase-primary .showcase-carousel").find("img").eq(0);
                i.attr("src", i.data("lazy")).removeAttr("data-lazy")
            }
        },
        dismiss: function() {
            this.isDismissed || (this.isDismissed = !0, $("#showcase-primary .showcase-overlay").addClass("puff-reverse"), $(".top-banner-wrapper").removeClass("_overlay"), setTimeout(function() {
                BMS.Storage.isset({
                    name: "Rgn"
                }) && $("body").removeClass("_fixed"), global.blnIsTouchScreen || $("#quickbook-wrapper").removeClass("_curtain"), $(".home-wrapper").transition({
                    opacity: 1
                }, 300), $("#navbar").removeClass("none")
            }, 305), bannerInit())
        }
    };
"undefined" != typeof WOW && initializeWOW(), "undefined" != typeof showCaseHandler && showCaseHandler.registerCallback({
    key: "firstLoad",
    callback: firstLoad
}), $(document).ready(function() {
    $("#mob-toggle-menu ul");
    $(".navbar-toggle").on("click", function() {}), isOverlayInitialized || window.isReactShowcase || showcaseOverlay.init(function() {
        bannerInit()
    }), "undefined" != typeof WOW && "undefined" == typeof window.wow && initializeWOW(), global.blnIsTouchScreen && $("body").addClass("_touch");
    var e = $(".primary"),
        t = $(".secondary"),
        n = window.pageYOffset,
        i = (t.height(), $("#quickbook-wrapper")),
        a = 0,
        r = !1,
        s = !1;
    i.length && 1 !== i.data("always-fixed") && (a = i.find(".search-container").offset().top - i.find(".search-box-container").height() - 51);
    var o = null;
    $(document);
    global.blnIsTouchScreen || $(window).on("scroll", function(l) {
        if ($("#quickbook-wrapper").hasClass("_fixed") ? ($(".dilwale-countdown").removeClass("_active"), $(".dilwale-countdown").attr("data-checkQBFixed", "false")) : ($(".dilwale-countdown").addClass("_active"), $(".dilwale-countdown").attr("data-checkQBFixed", "true")), !BMS.ddOpen) {
            var c = window.pageYOffset;
            o && c > n + 30 && clearTimeout(o), 0 !== a && (window.pageYOffset >= a ? r || (r = !0, i.addClass("_fixed")) : r && (r = !1, i.removeClass("_fixed"))), c > a ? c > n + 30 ? o = setTimeout(function() {
                s || (e.addClass("scroll-animation"), s = !0, t.addClass("scroll-animation"), i.addClass("_fixed _primary-hidden _animated"))
            }, 200) : c < n - 40 && (o = setTimeout(function() {
                s && (e.removeClass("scroll-animation"), s = !1, t.removeClass("scroll-animation"), o = null, i.removeClass("_primary-hidden"))
            }, 300)) : c < n && (o && clearTimeout(o), o = setTimeout(function() {
                e.removeClass("scroll-animation"), s = !1, t.removeClass("scroll-animation"), o = null, 0 == a ? i.removeClass("_primary-hidden") : i.removeClass("_primary-hidden _fixed _animated")
            }, 200)), n = c
        }
    }), "home" != pageName && initCarousel.handpick(), $(".universal-search-toggle").click(function() {
        $("#search-keywords").val("").focus(), $(this).is(":checked") ? $(".__right").transition({
            opacity: 0
        }) : $(".__right").transition({
            opacity: 1
        })
    }), $("#showcase-primary .showcase-carousel").on("mouseenter", '.banner-container[aria-hidden="false"]', function() {
        $("#showcase-primary .showcase-carousel").slick("slickPause")
    }), $("#showcase-primary .showcase-carousel").on("mouseleave", '.banner-container[aria-hidden="false"]', function() {
        $("#showcase-primary .showcase-carousel").slick("slickPlay")
    }), $(".play-trailer > svg").on("mouseenter", function() {
        $(this).closest(".showcase-card").find(".__hover-overlay").addClass("scale-up")
    }), $(".play-trailer > svg").on("mouseleave", function() {
        $(this).closest(".showcase-card").find(".__hover-overlay").removeClass("scale-up")
    }), $(".play-trailer > svg").click(function() {
        var e = ($(window).height(), $(window).width(), $(this));
        $(".main").css({
            "-webkit-filter": "blur(10px)"
        }), $(".popup-overlay").append(e.parent(".play-trailer").siblings(".__bg").data("url")).fadeIn(), $(".popup-overlay").css({
            background: "rgba(0, 0, 0, 0.7)"
        }), $(".popup-overlay iframe").css({
            position: "absolute",
            left: 0,
            right: 0,
            margin: "auto",
            top: 0,
            bottom: 0
        })
    }), $(".popup-overlay").click(function() {
        $(".main").css({
            "-webkit-filter": "blur(0px)"
        }), $(".popup-overlay iframe").remove(), $(this).hide()
    }), $(".select-overlay").click(function() {
        BMS.Header.fnHideSelectOverlay()
    }), $(".__dismiss", ".mobile-menu").click(function() {
        BMS.Header.fnHideSelectOverlay()
    }), $(".dd-tab-list").on("mouseenter", ".tab-toggle", function() {
        var e = $(this).closest(".dd-tab");
        e.find(".dd-tab-list").find(".tab-toggle._active").removeClass("_active"), e.find(".dd-tab-content").find(".tab-content._active").removeClass("_active"), $(this).addClass("_active");
        var t, n;
        t = $(this).attr("data-toggle"), n = $(this).closest(".dd-tab").find("#" + t), n.addClass("_active"), wow && setTimeout(function() {
            wow.scrolled = !0, wow.scrollHandler()
        }, 100)
    });
    var l = {
        dayPart: function() {
            try {
                var e = new Date,
                    t = e.getHours();
                return t >= 0 && t < 12 ? "Monring" : t >= 12 && t < 17 ? "Afternoon" : t >= 17 && t < 21 ? "Evening" : "Night"
            } catch (n) {
                void 0
            }
        },
        userMode: function() {
            try {
                return BMS.Storage.get({
                    name: "ld",
                    key: "MEMBERID",
                    storage: "C"
                }) ? "Logged IN" : "Guest Mode"
            } catch (e) {
                void 0
            }
        },
        visitorId: function() {
            try {
                return visitorId = ga.getAll().length > 0 ? ga.getAll()[0].get("clientId") : ""
            } catch (e) {
                void 0
            }
        },
        pageType: function() {
            try {
                return "undefined" != typeof byWhat ? "ET" == byWhat ? "buytickets-movies" : "buytickets-cinema" : pageName
            } catch (e) {
                void 0
            }
        }
    };
    $("a.nav-link, a.right-nav-link").on("click", function() {
        $this = $(this), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
            event: "nav_left_common_page_1",
            session_daypart: l.dayPart(),
            domain: "bms_web",
            visitor_id: l.visitorId(),
            user_mode: l.userMode(),
            pagetype: l.pageType(),
            product_type: $this.text().toUpperCase()
        })
    }), $("[data-nav-menu]").on("click", function() {
        $this = $(this), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
            event: "nav_left_common_page_1",
            session_daypart: l.dayPart(),
            domain: "bms_web",
            visitor_id: l.visitorId(),
            user_mode: l.userMode(),
            pagetype: l.pageType(),
            product_type: $this.attr("data-nav-menu")
        })
    }), $(".navbar-toggle").on("tap", function(e) {
        BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
            event: "nav_left_common_page_1",
            session_daypart: l.dayPart(),
            domain: "bms_web",
            visitor_id: l.visitorId(),
            user_mode: l.userMode(),
            pagetype: l.pageType(),
            product_type: "Mobile Naigation"
        })
    }), $("#preSignIn").on("tap", function() {
        BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
            event: "nav_left_common_page_1",
            session_daypart: l.dayPart(),
            domain: "bms_web",
            visitor_id: l.visitorId(),
            user_mode: l.userMode(),
            pagetype: l.pageType(),
            product_type: "SIGN IN"
        })
    }), $(".wallet-header .wallet-link, .wallet-header .__wallet-header-btn a").off(".walletClick").on("tap.walletClick", BMS.Header.fnPushWalletClickToAnalytics)
}), BMS.Header.fnGetWalletBalance = function() {
    try {
        if ("A" == BMS.Storage.get({
                name: "ld",
                key: "WALLETSTATUS",
                storage: "C"
            }))
            if (window.walBalance) BMS.Header.fnGetWalletBalanceSuccess();
            else {
                var e = BMS.Storage.get({
                        name: "ld",
                        key: "MEMBERID",
                        storage: "C"
                    }),
                    t = BMS.Storage.get({
                        name: "ld",
                        key: "LSID",
                        storage: "C"
                    });
                BMS.Header.fnShowHideWalletBalance(!1), BMS.Misc.fnWsData({
                    AppC: global.strAppCode,
                    transId: 0,
                    cmd: "GETWALLETBALANCE",
                    retType: "json",
                    lsid: t,
                    data: escape("|WALLETID=" + e + "|MEMBERID=" + e + "|LSID=" + t + "|"),
                    fnCC: BMS.Header.fnGetWalletBalanceSuccess,
                    supp: !0,
                    fnEC: BMS.Header.fnGetWalletBalanceError
                }), global.SignOutCallBack.push(function() {
                    BMS.Header.fnShowHideWalletBalance(!0, "", !1), window.walBalance && (window.walBalance = null)
                })
            } else BMS.Header.fnShowHideWalletBalance(!0, "", !1)
    } catch (n) {
        BMS.Misc.fnErr({
            fnName: "BMS.Header.fnGetWalletBalance",
            fnParams: arguments,
            err: n
        })
    }
}, BMS.Header.fnGetWalletBalanceSuccess = function(e) {
    var t = e ? $.parseJSON(unescape(e)) : {},
        n = e && t.BookMyShow && t.BookMyShow.TotalBalance ? parseFloat(t.BookMyShow.TotalBalance).toFixed(2) : window.walBalance;
    e && (window.walBalance = n), BMS.Header.fnShowHideWalletBalance(!0, n ? global.strCurrencyCode + " " + n : "", !0)
}, BMS.Header.fnGetWalletBalanceError = function(e) {
    BMS.Header.fnShowHideWalletBalance(!0, "", !1), void 0
}, BMS.Header.fnShowHideWalletBalance = function(e, t, n) {
    var i = $(".wallet-header .__wallet-header-btn a");
    if (e) {
        if ($(".wallet-header .__wallet-reel .mini").removeClass("__start-anim"), $(".wallet-header .__wallet-reel").hide(), t && n) {
            $(".wallet-header .__wallet-balance").html(t).show();
            var a = t.split("Rs.");
            parseFloat(a[1] ? a[1].trim() : 0) < 100 ? $(".wallet-header .__wallet-header-btn").show() : $(".wallet-header .__wallet-header-btn").hide()
        } else n || ($(".wallet-header .__wallet-balance").html("").hide(), $(".wallet-header .__wallet-header-btn").show());
        i.text(i.data(n ? "wallet-text" : "wallet-activate"))
    } else $(".wallet-header .__wallet-reel .mini").addClass("__start-anim"), $(".wallet-header .__wallet-reel").show(), $(".wallet-header .__wallet-balance").html("").hide(), $(".wallet-header .__wallet-header-btn").hide()
}, BMS.Header.fnPushWalletClickToAnalytics = function(e) {
    e.stopPropagation();
    var t = $(".__wallet-balance").text(),
        n = pageName ? pageName : location.pathname,
        i = t ? t.split("Rs.")[1] : null;
    "buytickets" === pageName && (n = "ET" == byWhat ? "buytickets-movies" : "buytickets-cinema"), i = i ? i.trim() : "", BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
        event: "profilewalletclick_common_page_9",
        pagetype: n,
        wallet_label: $(this).text().trim(),
        user_wallet_balance: i
    })
}, BMS.Header.fnHeaderDD = function(e, t) {
    try {
        if ("toggle" == t) {
            var n = $(e).attr("id"),
                i = "";
            if ($("[data-role=dHeaderDD]").each(function() {
                    $(this).is(":visible") && (i = $(this).attr("data-id"))
                }), $("[data-role=dHeaderDD]").hide(), "" != i && n != i && handlePopups.releaseDocument({
                    popover: !0
                }), n == i) "dTopRgnDD" == n ? $("#" + n).removeClass("_active") : "dNotifDD" == n && $(".notification-dropdown-wrapper").hide(), BMS.Header.fnHideSelectOverlay(), $("#quickbook-wrapper").removeClass("_inactive"), $("[data-id='" + n + "']").hide();
            else if ($(".notification-dropdown-wrapper").hide(), $(".select-overlay").show(), $("#quickbook-wrapper").addClass("_inactive"), handlePopups.freezeDocument({
                    popover: !0
                }), $("[data-id='" + n + "']").show(), "dTopRgnDD" == n) $("#" + n).addClass("_active");
            else if ("dNotifDD" == n) $(".notification-dropdown-wrapper").show();
            else if ("postSignIn" === n) {
                var a = $(".transaction-details .wallet-details #BALANCE");
                "myprofile" === pageName && 1 === a.length && BMS.Header.fnShowHideWalletBalance(!0, a.text(), !0), "payment" !== pageName && 1 !== a.length && BMS.Storage.get({
                    name: "ld",
                    storage: "C"
                }) && BMS.Header.fnGetWalletBalance()
            }
            if ("dTopRgnDD" == n)
                if (global.blnIsTouchScreen) {
                    var r = $(window).height() - $(".primary", ".mobile-menu").height();
                    r && $(".location-search-container").css({
                        "max-height": r
                    })
                } else $("[data-id='" + n + "'] #inp_RegionSearch_top").focus();
            if ("dNotifDD" == n && global.blnIsTouchScreen) {
                var r = $(window).height() - $(".primary", ".mobile-menu").height();
                r && $("#notification").css({
                    "max-height": r
                })
            }
        }
    } catch (s) {
        BMS.Misc.fnErr({
            fnName: "BMS.Header.fnHeaderDD",
            err: s
        })
    }
}, window.loop = 0, BMS.Header.fnHideSelectOverlay = function() {
    try {
        window.loop++, $("[data-role=dHeaderDD]").hide(), $("#quickbook-wrapper").removeClass("_inactive"), $("#dTopRgnDD").removeClass("_active"), $(".notification-dropdown-wrapper").hide(), handlePopups.releaseDocument(), $(".select-overlay").hide()
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Header.fnHideSelectOverlay",
            err: e
        })
    }
}, BMS.Header.fnChangeLang = function(e) {
    var t = BMS.Storage.get({
            name: "lang",
            storage: "C"
        }),
        n = e.attr("data-val"),
        i = $("li[data-val ='" + t + "']"),
        a = i.attr("data-name"),
        r = e.attr("data-name");
    a != r && ("" == n || "eng" == n ? BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
        event: "multilingual_lswitch_back",
        current_language: void 0 != a ? a : "English",
        switchedback_language: r,
        appcode: global.strAppCode
    }) : BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
        event: "multilingual_lang_change",
        previous_language: void 0 != a ? a : "English",
        current_language: r,
        appcode: global.strAppCode
    })), BMS.Storage.set({
        name: "lang",
        value: n,
        storage: "C",
        sess: !1
    }), BMS.Misc.fnBusy(!0), location.reload(!0)
}, BMS.Header.switchLangDropDown = function() {
    $("#dLangWrap .downChevron, #dLangWrapMob .downChevron").toggleClass("rotate"), $("#dLangWrap .optWrapper, #dLangWrapMob .optWrapper").toggleClass("open")
}, BMS.Header.fnShowLanguage = function() {
    global.blnIsTouchScreen ? ($("#dLangWrap").hide(), $("#dLangWrapMob").show()) : $("#dLangWrap").show(), $("#dLangWrap .optWrapper li, #dLangWrapMob .optWrapper li").on("click", function() {
        BMS.Header.fnChangeLang($(this)), $(".SlectBox span").html($(this).text()), $("#dLangWrap .optWrapper, #dLangWrapMob .optWrapper li").removeClass("open")
    });
    var e = BMS.Storage.get({
        name: "lang",
        storage: "C"
    });
    if ("" == e) $(".SlectBox span").html("English");
    else {
        $check = $("li[data-val ='" + e + "']");
        var t = $check.text().trim();
        $(".SlectBox span").html(t)
    }
}, $(document).ready(function() {
    if ("" != BMS.Storage.get({
            name: "Rgn",
            storage: "C"
        }) && "|Code=ALL|" != BMS.Storage.get({
            name: "Rgn",
            storage: "C"
        })) {
        var e = BMS.Misc.fnGQS("multilingual");
        1 == e && (BMS.Header.fnShowLanguage(), setTimeout(function() {
            $("li[data-val = eng]").show()
        }, 200));
        var t = BMS.Storage.get({
            name: "lang",
            storage: "C"
        }) || "eng";
        $("#dLangWrap .optWrapper li[data-val='" + t + "'], #dLangWrapMob .optWrapper li[data-val='" + t + "']").hide(), $(".navbar-toggle, #main-body-wrapper-overlay, .mob-brand").on("tap", function(e) {
            BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "nav_SPL_page_2"
            }), e.stopPropagation(), e.preventDefault();
            var t = $(this).data("navigationis");
            toggleMobileNavigation(t)
        }), BMS.Header.fnShowLanguage()
    }
});
var _scrollPos = 0;
ContentReport = {
    init: function() {
        "undefined" == typeof blnReCaptchaScriptLoaded && (void 0, $.ajax({
            async: !0,
            url: "//www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",
            dataType: "script"
        })), $("#categorySelectfooter").SumoSelect({
            csvDispCount: 5,
            placeholder: "--Select one category--"
        }), $("#report-abuse-footer").on("click", "#btnSubmitfooter", this.fnReportSubmit), BMS.Storage.isset({
            name: "ld"
        }) && $("#iemailfooter").attr("value", BMS.Misc.fnGVal({
            key: "MEMBEREMAIL",
            data: BMS.Storage.get({
                name: "ld"
            })
        })), $(".error-popup-message").on("click", "#reportScreenfail", this.fnClearReport), $(".success-message").on("click", "#reportScreensuc", this.fnClearReport), $(".__report-content-close").on("click", this.reportPopupClose), $("#categorySelectfooter").on("change", this.categoryChangeListener), $("#fnamefooter").change(this.nameChangeListener), $("#lnamefooter").change(this.lnameChangeListener), $("#iassociationfooter").change(this.associationChangeListener), $("#iemailfooter").change(this.emailChangeListener), $("#iphonenumberfooter").change(this.phoneChangeListener), $("#ipr-housefooter").change(this.prChangeListener), $("#sm-description").change(this.descriptionChangeListener), blnReCaptchaScriptLoaded = !0
    },
    categoryChangeListener: function(e) {
        var t = $(this).val();
        "null" != t && $(".input-container.category").removeClass("_error")
    },
    nameChangeListener: function(e) {
        var t = $(this).val();
        t.length > 0 && $(this).removeClass("_error")
    },
    lnameChangeListener: function(e) {
        var t = $(this).val();
        t.length > 0 && $(this).removeClass("_error")
    },
    associationChangeListener: function(e) {
        var t = $(this).val();
        t.length > 0 && $(this).removeClass("_error")
    },
    emailChangeListener: function(e) {
        var t = $(this).val();
        BMS.Validate.email(t) && $(this).removeClass("_error")
    },
    phoneChangeListener: function(e) {
        var t = $(this).val(),
            n = /^\d{10}$/;
        t.match(n) && $(this).removeClass("_error")
    },
    prChangeListener: function(e) {
        var t = $(this).val();
        t.length > 0 && $(this).removeClass("_error")
    },
    descriptionChangeListener: function(e) {
        var t = $(this).val();
        t.length > 0 && $(this).removeClass("_error")
    },
    reportPopupClose: function(e) {
        $("body").removeClass("_fixed"), BMS.Modal.fnHideModal(), ContentReport.fnClearReport()
    },
    reportButtonClickListener: function() {
        ContentReport.init(), BMS.Modal.fnShowModal("report-abuse-footer", !0), $("body").removeClass("_fixed"), $("body").css("margin-top", "0"), ContentReport.resetInputValue(), ContentReport.fnClearReport(), BMS.Storage.isset({
            name: "ld"
        }) && (void 0, $("#iemailfooter").val(BMS.Misc.fnGVal({
            key: "MEMBEREMAIL",
            data: BMS.Storage.get({
                name: "ld"
            })
        })))
    },
    fnClearReport: function() {
        $(".report-form").removeClass("_hide"), $(".policy-container").css("display", "block"), $(".success-message").addClass("_hide"), $(".error-popup-message").addClass("_hide"), $(".input-container").removeClass("_error")
    },
    fnReportSubmit: function() {
        var e = $("#iemailfooter"),
            t = $("#categorySelectfooter"),
            n = $("#idetailsfooter"),
            i = $("#fnamefooter"),
            a = $("#lnamefooter"),
            r = $("#iassociationfooter"),
            s = $("#iphonenumberfooter"),
            o = $("#ipr-housefooter"),
            l = $("#sm-description"),
            c = $("#report-tnc"),
            d = $("#sm-linksfooter");
        $("#g-recaptcha-response-1").length ? captcha = $("#g-recaptcha-response-1").val() : captcha = grecaptcha.getResponse();
        var u = (captcha.length, /^\d{10}$/);
        if (null == t.val()) return t.focus(), $(".input-container.category").addClass("_error"), !1;
        if (!BMS.Validate.chkName(i.val())) return i.focus(), $(".input-container #fnamefooter").addClass("_error"), !1;
        if (!BMS.Validate.chkName(a.val())) return a.focus(), $(".input-container #lnamefooter").addClass("_error"), !1;
        if (!BMS.Validate.chkName(r.val())) return r.focus(), $(".input-container #iassociationfooter").addClass("_error"), !1;
        if (!BMS.Validate.email(e.val())) return e.focus(), $(".input-container #iemailfooter").addClass("_error"), !1;
        if (!s.val().match(u)) return s.focus(), $(".input-container #iphonenumberfooter").addClass("_error"), !1;
        if (0 == o.val().length) return o.focus(), $(".input-container #ipr-housefooter").addClass("_error"), !1;
        if (0 == l.val().length) return l.focus(), $(".input-container #sm-description").addClass("_error"), !1;
        if (!$(c).is(":checked")) return $(".report-abuse-terms").css("background-color", "#f2dede"), !1;
        if (0 == captcha.length) return $(".input-container.captcha-container").addClass("_error"), !1;
        var p = {
            txtName: "" != i.val() ? i.val() : "",
            txtLname: "" != a.val() ? a.val() : "",
            txtAssociation: "" != r.val() ? r.val() : "",
            txtPhoneNo: "" != s.val() ? s.val() : "",
            txtPRHouse: "" != o.val() ? o.val() : "",
            txtSocialLinks: "" != d.val() ? d.val() : "",
            txtEmail: "" != e.val() ? e.val() : "",
            txtCategory: "" != t.val() ? t.val() : "",
            txtCategoryString: "" != $("#categorySelectfooter option:selected").text() ? $("#categorySelectfooter option:selected").text() : "",
            txtDetails: "" != n.val() ? n.val() : "",
            txtDescription: "" != l.val() ? l.val() : "",
            txtCaptcha: "" != captcha ? captcha : "",
            txtPageUrl: window.location.href
        };
        ContentReport.submitForm(p, function(e, t) {
            "invalid_captcha" == e ? ($("#iCaptcha").attr("src", ""), $("#iCaptcha").attr("src", "/captcha/captcha2?" + (new Date).getTime()).one("load", function() {
                $(".input-container.captcha-container").addClass("_error"), captcha.val("")
            })) : "error" != e && _.isEmpty(e) ? ($(".report-form").addClass("_hide"), $(".report-abuse-terms").css("display", "none"), $(".policy-container").css("display", "none"), $(".error-popup-message").addClass("_hide"), $(".success-message").removeClass("_hide"), ContentReport.resetInputValue()) : ($(".input-container").removeClass("_error"), $(".report-form").addClass("_hide"), $(".report-abuse-terms").css("display", "none"), $(".policy-container").css("display", "none"), $(".success-message").addClass("_hide"), $(".error-popup-message").removeClass("_hide"), ContentReport.resetInputValue())
        })
    },
    resetInputValue: function() {
        $("#categorySelectfooter").val("null"), $("#categorySelectfooter")[0].sumo.reload(), $("#idetailsfooter").val(""), BMS.Storage.isset({
            name: "ld"
        }) ? (void 0, $("#iemailfooter").val(BMS.Misc.fnGVal({
            key: "MEMBEREMAIL",
            data: BMS.Storage.get({
                name: "ld"
            })
        }))) : $("#iemailfooter").val(""), $("#captcha").val(""), $("#fnamefooter").val(""), $("#iassociationfooter").val(""), $("#iphonenumberfooter").val(""), $("#ipr-housefooter").val(""), $("#sm-linksfooter").val(""), $("#iCaptcha").attr("src", ""), $("#iCaptcha").attr("src", "/captcha/captcha2?" + (new Date).getTime()), $(".input-container").find("input").removeClass("_error"), $(".input-container").removeClass("_error")
    },
    submitForm: function(e, t) {
        try {
            var n = e.txtName,
                i = e.txtLname,
                a = e.txtAssociation,
                r = e.txtPhoneNo,
                s = e.txtPRHouse,
                o = e.txtSocialLinks,
                l = e.categorySelect,
                c = e.txtDetails,
                d = e.txtEmail,
                u = e.txtPageUrl,
                p = e.txtCategoryString,
                f = e.txtDescription,
                h = e.txtCaptcha;
            void 0, BMS.Misc.fnAjax({
                url: global.getDataUrl + "?cmd=REPORTCONTENT",
                data: {
                    txtName: n,
                    txtLname: i,
                    txtAssociation: a,
                    txtPhoneNo: r,
                    txtPRHouse: s,
                    txtSocialLinks: o,
                    txtEmail: d,
                    categorySelect: l,
                    categorySelectString: p,
                    txtDetails: c,
                    txtDescription: f,
                    resptext: h,
                    pageUrl: u
                },
                type: "POST",
                success: function(e) {
                    void 0, "success" == e ? t(null, e) : "invalid_captcha" == e ? t("invalid_captcha", null) : t("error", null)
                },
                error: function(e, n, i) {
                    t(i, null)
                }
            })
        } catch (g) {
            BMS.Misc.fnErr({
                fnName: "ContentReport.submitForm",
                err: g
            })
        }
    }
};
var recaptcha1, onloadCallback = function() {
    recaptcha1 = grecaptcha.render("recaptcha1", {
        sitekey: "6LcDIycTAAAAAJuYsBa4m4DcRopeXcQVOiWpDd3p",
        theme: "light"
    })
};
! function(e) {
    var t = {
        sanitize: {
            date: function(e) {
                return new Date(e.substr(0, 4) + " " + e.substr(4, 2) + " " + e.substr(6, 2) + " " + e.substr(8, 2) + ":" + e.substr(10, 2))
            },
            time: function(e) {
                var t = e.getHours(),
                    n = e.getMinutes(),
                    i = !1;
                return t > 12 ? (t -= 12, i = !0) : 12 === t ? i = !0 : 0 === t && (t = 12), n < 10 && (n = "0" + n), i = i ? "pm" : "am", t + ":" + n + " " + i
            },
            "boolean": function(e) {
                return "string" == typeof e ? "Y" == e ? e = !0 : "N" == e ? e = !1 : e : ("object" != typeof e && "array" != typeof e || _.each(e, function(n, i) {
                    e[i] = t.sanitize["boolean"](n)
                }), e)
            }
        },
        venueName: function(e) {
            return e.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/\s/g, "-").toLowerCase() + "/cinema"
        },
        render: function(e, t, n) {
            e = e.split("\n").join("");
            var i, a, r, s, o, l, c = /([$\^\\\/()|?+*\[\]{}.\-])/g;
            return n = n || {}, l = "{{}}", s = l.length, o = Math.ceil(s / 2), a = l.substr(0, o).replace(c, "\\$1"), r = l.substr(o, s).replace(c, "\\$1") || a, i = new RegExp(a + "[^" + a + r + "]+" + r, "g"), e.replace(i, function(e) {
                var n, i = e.slice(o, -o),
                    a = i.split("."),
                    r = 0,
                    s = a.length;
                if (i in t) n = t[i];
                else
                    for (n = t; r < s; r++) {
                        if (!(a[r] in n)) return e;
                        n = n[a[r]]
                    }
                return n
            })
        },
        difference: function(e) {
            for (var t = [], n = e.length - 1, i = 0; i < e.length - 1; i++)
                if (i != n) return parseInt(e[i]) > parseInt(e[i + 1]) ? t.push(parseInt(e[i]) - parseInt(e[i + 1])) : t.push(parseInt(e[i + 1]) - parseInt(e[i]))
        },
        getLatLongDistance: function(e, t) {
            var n = e.lat,
                i = t.lat,
                a = e.lng,
                r = t.lng,
                s = function(e) {
                    return e * (Math.PI / 180)
                },
                o = 6371,
                l = s(i - n),
                c = s(r - a),
                d = Math.sin(l / 2) * Math.sin(l / 2) + Math.cos(s(n)) * Math.cos(s(i)) * Math.sin(c / 2) * Math.sin(c / 2),
                u = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d)),
                p = o * u;
            return p.toFixed(2)
        },
        between: function(e, t) {
            var n = Math.min.apply(Math, [e, t]),
                i = Math.max.apply(Math, [e, t]);
            return this > n && this < i
        },
        getCatAvailability: function(e) {
            e = parseInt(e), e < 0 && (e = 0);
            for (var t = 0; t < availSeatRange.length; t++) {
                var n = function() {
                    var n = availSeatRange[t].range.split("-");
                    return e >= parseInt(n[0]) && e <= parseInt(n[1])
                }();
                if (n) return availSeatRange[t]
            }
        },
        generateTooltip: function() {
            $tooltipObjects = e("[data-tooltip]"), $tooltipObjects.each(function(t, n) {
                n = e(n);
                var i = n.attr("data-tooltip");
                n.append('<div class="__toolBlock">                               <span class="__tooltip">' + i + '</span>                               <span class="__arrow"></span>                             </div>')
            })
        }
    };
    BMS.Misc = BMS.Misc || {}, BMS.Misc.Helpers = t
}(jQuery), BMS.Region.fnPgLd = function() {
    try {
        "undefined" != typeof pageName && global.notReqRgnArr.indexOf(pageName) != -1 ? BMS.Region.fnChkRgn(!1) : BMS.Region.fnChkRgn(!0), $("#locationPopup .__icon-back").on("click", function() {
            $("#spnRgnHeadTxt").removeClass("applyMarginLeft"), $("#spnRgnHeadTxt").addClass("removeMarginLeft"), $("#spnRgnHeadTxt").html("PICK YOUR STATE"), $("#div_States").fadeIn(), $(".city-list").fadeOut(), $(this).fadeOut()
        }), $("#inp_RegionSearch").on("blur", function() {
            $("[data-id=inp_RegionSearch]").hide()
        }), $("#inp_RegionSearch_top").on("blur", function() {
            $("[data-id=inp_RegionSearch_top]").hide()
        })
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnPgLd",
            err: e
        })
    }
}, BMS.Region.fnChkRgn = function(e) {
    try {
        if (0 != $("#locationPopup").length) {
            if (!e) return;
            var t = BMS.Storage.get({
                name: "Rgn",
                key: "Code"
            });
            BMS.Storage.get({
                name: "Rgn",
                key: "Code"
            }), BMS.Storage.get({
                name: "Rgn",
                key: "text"
            });
            if ("" == t || "ALL" == t) $("#spnSelectedRegion").html("SELECT A REGION"), BMS.Region.fnChkRegRequired(function(e) {
                e ? ($("#dTopRgnDD").click(), $("#quickbook-wrapper").addClass("_inactive"), $(".select-overlay").unbind("click"), $("[data-group=top-nav]").removeAttr("onclick")) : ($("#dTopRgnDD").click(), $("#quickbook-wrapper").addClass("_inactive"))
            });
            else {
                var n = BMS.Storage.get({
                        name: "Rgn",
                        key: "text"
                    }),
                    i = BMS.Storage.get({
                        name: "Rgn",
                        key: "subregionDetails"
                    }),
                    a = "" != i ? JSON.parse(i) : "";
                a ? $("#spnSelectedRegion").html(a.SubRegionName) : "NCR" === t ? $("#spnSelectedRegion").html("NCR") : $("#spnSelectedRegion").html(n)
            }
        }
    } catch (r) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnChkRgn",
            err: r
        })
    }
}, BMS.Region.fnChkRegRequired = function(e) {
    try {
        var t = !0;
        e(t)
    } catch (n) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnChkRegRequired",
            err: n
        })
    }
}, BMS.Region.fnRegionFilter = function(e) {
    try {
        for (var t = e.which ? e.which : e.keyCode, n = [8, 13, 46, 37, 38, 39, 40, 9], i = 65; i <= 90; i++) n.push(i);
        for (var i = 97; i <= 122; i++) n.push(i);
        if ($.inArray(t, n) < 0) return !1;
        $("#uRgnLst_top > li.active");
        if (38 == t) {
            var a = $("[data-id=inp_RegionSearch_top] ul").children().first(),
                r = $("[data-id=inp_RegionSearch_top] ul .active").prev(),
                s = $(r).find("a").text();
            return void(r != a ? ($(r).next().removeClass("active"), $(r).addClass("active"), $("#inp_RegionSearch_top").val(s)) : $("#inp_RegionSearch_top").val($(a).find("a").text()))
        }
        if (40 == t) {
            var o = $("[data-id=inp_RegionSearch_top] ul").children().last(),
                r = $("[data-id=inp_RegionSearch_top] ul .active").next(),
                s = $(r).find("a").text();
            return void(r != o ? ($(r).prev().removeClass("active"), $(r).addClass("active"), $("#inp_RegionSearch_top").val(s)) : $("#inp_RegionSearch_top").val($(o).find("a").text()))
        }
        if (37 == t || 39 == t) return;
        var l = e.target.value,
            c = e.target.id;
        if ("" == l) return void $("#div_RegResponse").hide();
        var d = new RegExp("\\b" + l.toUpperCase() + "\\w*\\b", "gi"),
            u = ["Mumbai", "Mumbai : Western", "Mumbai : South Central", "Navi Mumbai", "Kalyan", "Ulhasnagar", "Delhi", "Faridabad", "Ghaziabad", "Gurgaon", "Noida", "National Capital Region (NCR)"],
            p = new Array;
        $.each(regionlst, function(e, t) {
            $.each(t, function(e, t) {
                d = new RegExp("\\b" + l.toUpperCase() + "\\w*\\b", "gi"), d.test(t.alias.toUpperCase()) && $.inArray(t.alias, u) == -1 && p.push(new Array(t.code, t.alias))
            })
        });
        for (var f = 0; f < regionalias.length; f++) {
            for (var h = !1, g = 0; g < regionalias[f].Alias.length; g++)
                if (d.test(regionalias[f].Alias[g].toUpperCase())) {
                    h = !0;
                    break
                }
            h && p.push(new Array(regionalias[f].code, regionalias[f].name))
        }(d.test("BOMBAY") || d.test("MUMBAI") || d.test("MUMBAI WESTERN") || d.test("Mumbai South Central") || d.test("NAVI MUMBAI") || d.test("KALYAN") || d.test("ULHASNAGAR")) && p.push(new Array("MUMBAI", "Mumbai")), (d.test("NATIONAL CAPITAL REGION") || d.test("NCR") || d.test("DELHI") || d.test("FARIDABAD") || d.test("GHAZIABAD") || d.test("GURGAON") || d.test("NOIDA")) && p.push(new Array("NCR", "National Capital Region (NCR)"));
        for (var v = [], m = "", y = 6, g = 0, S = 0; S < p.length; S++) $.inArray(p[S][1], v) == -1 && g < y && (m += "" == m ? '<li class="active" data-pos="1" style="width: 100%;" id="' + p[S][0] + '"><a href="javascript:BMS.Region.fnSTopReg(\'' + p[S][0] + "','" + p[S][1] + "');\">" + p[S][1] + "</a></li>" : '<li style="width: 100%;" id="' + p[S][0] + '"><a href="javascript:BMS.Region.fnSTopReg(\'' + p[S][0] + "','" + p[S][1] + "');\">" + p[S][1] + "</a></li>", g++), v.push(p[S][1]);
        return "" != m ? ($("[data-id=" + c + "] ul").html(m), $("[data-id=" + c + "]").show()) : $("[data-id=" + c + "]").hide(), "" == l && $("[data-id=" + c + "]").hide(), !0
    } catch (w) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnRegionFilter",
            err: w
        })
    }
}, BMS.Region.fnSwStates = function(e) {
    try {
        var t = "",
            n = "",
            i = 0;
        if ($("#div_States").children().each(function() {
                $(this).removeClass("_active")
            }), "" == e.trim()) $.each(statelist, function(e, n) {
            t += '<div class="location-pills" onClick="BMS.Region.fnSwStates(\'' + n.alias.trim() + '\')" data-name="' + BMS.Misc.fnUrlName(n.alias.trim()).toLowerCase() + '">', t += '<span class="location-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">  <use xlink:href="/icons/regions-icons.svg#icon-' + BMS.Misc.fnUrlName(n.alias.trim()).toLowerCase() + '"></use> </svg></span>', t += '<div class="location-name">' + n.name.toUpperCase() + "</div>", t += "</div>", i++
        }), $("#div_States").html(t), $(".city-list").hide(), $("#locationPopup .__icon-back").fadeOut(), $("#div_States").show(), $("#spnRgnHeadTxt").html("PICK YOUR STATE"), BMS.Misc.modal("locationPopup", !0);
        else {
            var a = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">  <use xlink:href="/icons/regions-icons.svg#icon-' + BMS.Misc.fnUrlName(e.trim()).toLowerCase() + '"></use> </svg>',
                r = _.filter(statelist, function(t) {
                    return t.alias === e
                })[0].name,
                s = "";
            s += '<img src="' + global.strContentUrl + "/webin/common/region-banners/" + BMS.Misc.fnUrlName(e.trim()).toLowerCase() + '.jpg" alt="">', s += '<div class="overlay">', s += '<span class="location-icon"></span>', s += '<div class="location-name">' + r.trim() + "</div>", s += "</div>";
            var o = "" != e ? e : Object.keys(regionlst)[0],
                n = "",
                i = 0;
            regionlst.hasOwnProperty(o) && ($.each(regionlst, function(e, t) {
                if (e == o) {
                    for (var i = 0; i < t.length; i++) i % 6 == 0 && (n += '<div class="__list-col">'), n += '<p id="' + t[i].code + '" onclick="BMS.Region.fnSetRegion(\'' + o + "', '" + t[i].code + '\')" data-name="' + t[i].alias + '"> - ' + t[i].name + "</p>", i % 6 == 5 && (n += "</div>");
                    n += "</div>"
                }
            }), $("#spnRgnHeadTxt").html("PICK YOUR CITY"), $("#spnRgnHeadTxt").removeClass("removeMarginLeft"), $("#spnRgnHeadTxt").addClass("applyMarginLeft"), $(".city-list .__city-banner").html(s), $(".city-list .location-icon").html(a), $("#div_CityName").html(n), $("#div_States").fadeOut(), $(".city-list").fadeIn(), $("#locationPopup .__icon-back").fadeIn())
        }
    } catch (l) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnSwStates",
            err: l
        })
    }
}, BMS.Region.fnSetRegion = function(e, t) {
    try {
        BMS.Misc.fnBusy(!0);
        var n, i = "undefined" != typeof $("#" + t).attr("data-subreg") && "Y" == $("#" + t).attr("data-subreg");
        n = "Maharashtra" == e && i ? "Mumbai" : "NCR" == e && i ? "National Capital Region (NCR)" : $("#" + t).attr("data-name"), global.tmpCk = BMS.Region.fnGRgn(), global.ck = t, $("#spnSelectedRegion").html(n), BMS.Region.fnSetSubRgnCookie(n, t), "undefined" != typeof blnIsRegionRouting && 1 == blnIsRegionRouting ? BMS.Region.fnUpdateUrl(n, !0) : BMS.Region.fnUpdateUrl(n, !1)
    } catch (a) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnSetRegion",
            err: a
        })
    }
}, BMS.Region.fnSTopReg = function(e, t) {
    try {
        BMS.Misc.fnBusy(!0), global.tmpCk = BMS.Region.fnGRgn(), global.ck = e, $("#spnSelectedRegion").html(t), BMS.Region.fnSetSubRgnCookie(t, e), "undefined" != typeof blnIsRegionRouting && 1 == blnIsRegionRouting ? BMS.Region.fnUpdateUrl(t, !0) : BMS.Region.fnUpdateUrl(t, !1)
    } catch (n) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnSTopReg",
            err: n
        })
    }
}, BMS.Region.fnOtherRegionCallBack = function() {
    try {
        var e = (global.tmpCk, global.ck);
        fnUpdateUrl(e), BMS.Misc.fnBusy(!1)
    } catch (t) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnOtherRegionCallBack",
            err: t
        })
    }
}, BMS.Region.fnUpdateUrl = function(e, t) {
    if (t === !0) {
        var n = location.pathname,
            i = "/";
        i += BMS.Misc.fnUrlName(e).toLowerCase(), i += ("/" + n.split("/").splice(2, n.split("/").length).join("/")).replace(/\/$/, ""), i += location.search, i += location.hash, window.location.href = i
    } else window.location.reload()
}, BMS.Region.fnRedirectToRegionPage = function() {
    try {
        if ("undefined" != typeof blnIsRegionRouting && 1 == blnIsRegionRouting) {
            var e = location.pathname,
                t = "/";
            t += BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "text"
            })).toLowerCase(), t += ("/" + e.split("/").splice(2, e.split("/").length).join("/")).replace(/\/$/, ""), t += location.search, t += location.hash, BMS.Region.fnSendRegionData(function() {
                location.href = t
            })
        } else BMS.Region.fnSendRegionData(function() {
            BMS.Misc.fnBusy(!1)
        })
    } catch (n) {
        BMS.Misc.fnErr({
            fnName: "BMS.Misc.fnErr",
            err: n
        })
    }
}, BMS.Region.fnSendRegionData = function(e) {
    try {
        var t = BMS.Storage.get({
                name: "Rgn"
            }),
            n = BMS.Storage.get({
                name: "ld"
            });
        if ("" !== n) {
            var i = BMS.Misc.fnGVal({
                    data: t,
                    key: "Code"
                }),
                a = BMS.Misc.fnGVal({
                    data: n,
                    key: "MEMBERID"
                }),
                r = BMS.Misc.fnGVal({
                    data: n,
                    key: "LSID"
                });
            BMS.Misc.fnDoSecureTrans({
                cmd: "SETPROFILE",
                p1: "SETPROFILE",
                p2: a,
                p3: r,
                p10: "|REGIONCODE=" + i + "|",
                fnCC: function(t) {
                    e()
                },
                fnEC: function(t) {
                    e()
                },
                blnSupp: !0
            })
        } else e()
    } catch (s) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnSendRegionData",
            err: s
        })
    }
}, BMS.Region.fnHideRegSel = function() {
    try {
        $("#locationPopup").is(":visible") ? BMS.Misc.modal("locationPopup", !1) : $("[data-id=dTopRgnDD]").is(":visible") && BMS.Header.fnHideSelectOverlay(), $(".select-overlay").click(function() {
            BMS.Header.fnHideSelectOverlay()
        })
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnHideRegSel",
            err: e
        })
    }
}, BMS.Region.fnGRgn = function() {
    try {
        return BMS.Storage.get({
            name: "Rgn",
            key: "Code"
        })
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Region.fnGRgn",
            err: e
        })
    }
}, BMS.Region.fnSetSubRgnCookie = function(e, t) {
    try {
        var n = !1,
            i = !1;
        if (BMS.Storage.set({
                name: "Rgn",
                value: "",
                storage: "C",
                sess: !1
            }), "undefined" != typeof global.arrBreakRgn && $.each(global.arrBreakRgn, function(t, a) {
                n = "undefined" != typeof subregionlist[a], n && $.each(subregionlist[a], function(t, n) {
                    if (i = BMS.Misc.fnUrlName(n.SubRegionName.trim().toLowerCase()) == e.trim().toLowerCase()) return BMS.Storage.set({
                        name: "Rgn",
                        key: "subregionDetails",
                        value: JSON.stringify(n),
                        storage: "C",
                        sess: !1
                    }), BMS.Storage.set({
                        name: "Rgn",
                        key: "text",
                        value: n.SubRegionName.trim(),
                        storage: "C",
                        sess: !1
                    }), BMS.Storage.set({
                        name: "Rgn",
                        key: "Code",
                        value: n.RegionCode.trim(),
                        storage: "C",
                        sess: !1
                    }), $("#spnSelectedRegion").html(n.SubRegionName.trim()), !1
                })
            }), i) return !1;
        BMS.Storage.set({
            name: "Rgn",
            key: "text",
            value: e,
            storage: "C",
            sess: !1
        }), BMS.Storage.set({
            name: "Rgn",
            key: "Code",
            value: t,
            storage: "C",
            sess: !1
        })
    } catch (a) {
        void 0
    }
}, $(document).ready(function() {
    BMS.Region.fnPgLd();
    try {
        "undefined" != typeof global.arrBreakRgn && $.each(global.arrBreakRgn, function(e, t) {
            var n, i = "undefined" != typeof subregionlist[t];
            i && $.each(subregionlist[t], function(e, t) {
                var i = regionlst[t.RegionCode] || regionlst[t.RegionName],
                    a = !1;
                $.each(i, function(e, n) {
                    if (t.SubRegionCode == n.code) return void(a = !0)
                }), "undefined" != typeof i && a === !1 && i.push({
                    code: t.SubRegionCode.trim(),
                    name: t.SubRegionName.trim(),
                    alias: t.SubRegionName.trim(),
                    IsCollectionActive: "Y"
                }), $.each(statelist, function(e, i) {
                    n = i.name.toLowerCase() == t.RegionCode.toLowerCase() || i.name.toLowerCase() == t.RegionName.toLowerCase(), n && $.inArray(t.SubRegionCode, statelist[e].regions) === -1 && statelist[e].regions.push(t.SubRegionCode)
                })
            })
        })
    } catch (e) {
        void 0
    }
}), BMS.Notifications.notifCount = 0, BMS.Notifications.generateHTML = function(e, t) {
    try {
        var n = "";
        BMS.Storage.isset({
            name: "ld",
            key: "MEMBERID",
            storage: "C"
        });
        if (BMS.Storage.get({
                name: "markedViewId",
                key: "marked",
                storage: "L"
            })) var i = BMS.Storage.get({
            name: "markedViewId",
            key: "marked",
            storage: "L"
        }).split(",");
        else var i = BMS.Storage.get({
            name: "notificationId",
            key: "Viewed",
            storage: "L"
        }).split(",");
        for (var a in e)
            if (e.hasOwnProperty(a)) {
                var r = i ? $.inArray(e[a]._id + "-" + t, i) : -1;
                if ("N" == t) var s = 0 == e[a].viewed && r == -1;
                else if ("A" == t) var s = r == -1;
                var o = s ? '<span class="new-notification-btn">NEW</span>' : "",
                    l = "",
                    c = "" != e[a].imgURL ? "btn _offer" : "btn _offer-normal",
                    d = "" != e[a].imgURL ? "_notification-time-c" : "_notification-time";
                o = o + '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-' + e[a].type.toLowerCase() + '"></use></svg>';
                for (var u in e[a].callToAction) "object" == typeof e[a].callToAction[u] && "" != e[a].callToAction[u].text && ("" == e[a].callToAction[u].text && (c = ""), l += '<a class="' + c + '" href="' + e[a].callToAction[u].link + '" target="' + e[a].callToAction[u].target + '">' + e[a].callToAction[u].text + "</a> ");
                if ("" != e[a].imgURL) {
                    var p = s ? "_unread" : "";
                    n += '<div class="banner-notification child-notifications ' + p + '" notif_id="' + e[a]._id + "-" + t + '"><div><img alt="banner" src="' + e[a].imgURL + '" onerror="this.src=\'//in.bmscdn.com/Events/Large/NoImage.jpg\'" ><div class="b-notification-content type-1"><div class="col20"><div class="_not-icon">' + o + '</div></div><div class="col80 _notification-detail"><p><strong>' + e[a].shortTxt + "</strong> " + e[a].longTxt + '</p><div class="btn-container">' + l + '<span class="' + d + '"> ' + e[a].timeAgo + " </span></div></div></div></div></div>"
                } else {
                    var f = "";
                    switch (e[a].type) {
                        case "events":
                            f = "type-1";
                            break;
                        default:
                            f = "type-2"
                    }
                    n += '<div class="text-notification child-notifications ' + f + '" notif_id="' + e[a]._id + "-" + t + '"><div class="col20"><div class="_not-icon">' + o + '</div></div><div class="col80"><p><strong>' + e[a].shortTxt + "</strong> " + e[a].longTxt + '</p><div class="btn-container">' + l + '<span class="' + d + '"> ' + e[a].timeAgo + " </span></div></div></div>"
                }
                s && ++BMS.Notifications.notifCount
            }
        return n
    } catch (h) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.generateHTML",
            err: h
        })
    }
}, BMS.Notifications.getData = function() {
    try {
        var e = BMS.Storage.get({
            name: "notificationId",
            key: "Viewed",
            storage: "L"
        });
        BMS.Misc.fnAjax({
            url: "/serv/getData",
            type: "GET",
            data: {
                cmd: "GETNOTIF",
                viewed_notif: e,
                v: Math.random().toString().substr(0, 6)
            },
            success: function(e) {
                if (e.error);
                else {
                    var t = "";
                    if (null == e.announcements && null == e.notifications || 0 == e.announcements.length && 0 == e.notifications.length ? t += "" : (null == e.announcements && (e.announcements = []), null == e.notifications && (e.notifications = []), t += BMS.Notifications.generateHTML(e.announcements, "A") + BMS.Notifications.generateHTML(e.notifications, "N")), $("#notification").html(t), 0 == BMS.Notifications.notifCount && "" == t) {
                        var n = '<div class="empty-notification"><div class="notif-bell"><span class="__icon" style="height: 50px; width: 50px;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#1CBAB1" d="M77.5,79.3c-1.6,0-3.4-3.4-3.4-7.8V48.7h0C73.9,35.2,63.3,24,49.4,21.6c-0.3-2.8-2.7-5-5.5-5s-5.3,2.2-5.5,5C24.3,24,13.7,35.2,13.6,48.7h0v22.7c0,4.5-1.8,7.8-3.4,7.8c-1.9,0-3.4,1.5-3.4,3.4c0,1.9,1.5,3.4,3.4,3.4h23.7c0.6,5,4.8,9,10,9s9.4-3.9,10-9h23.7c1.9,0,3.4-1.5,3.4-3.4C80.8,80.8,79.3,79.3,77.5,79.3z M43.8,18.8c1.5,0,2.8,1,3.2,2.5c-1.1-0.1-2.1-0.2-3.2-0.2s-2.2,0.1-3.2,0.2C41,19.8,42.3,18.8,43.8,18.8z M15.8,71.5V49c0-14.2,12.6-25.7,28-25.7s28,11.5,28,25.7v22.4c0,3.3,0.8,6,2,7.8H13.8C15,77.5,15.8,74.7,15.8,71.5z M43.8,92.8c-3.9,0-7.2-2.9-7.7-6.7h15.5C51,89.8,47.8,92.8,43.8,92.8zM77.5,83.8H10.2c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h67.3c0.6,0,1.1,0.5,1.1,1.1S78.1,83.8,77.5,83.8z"/><path fill="#1CBAB1" d="M50.6,63.6c-0.6,0-1.1,0.5-1.1,1.1c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6c0-0.6-0.5-1.1-1.1-1.1c-0.6,0-1.1,0.5-1.1,1.1c0,4.3,3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8C51.7,64.1,51.2,63.6,50.6,63.6z"/><path fill="#1CBAB1" d="M34.9,56.9h-4.5c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h4.5c0.6,0,1.1-0.5,1.1-1.1C36,57.4,35.5,56.9,34.9,56.9z"/><path fill="#1CBAB1" d="M57.3,56.9h-4.5c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h4.5c0.6,0,1.1-0.5,1.1-1.1C58.4,57.4,57.9,56.9,57.3,56.9z"/><polygon fill="#56798C" points="73.2,18.9 67.5,18.9 73.2,14 73.2,10.7 61.8,10.7 61.8,14 67.4,14 61.8,18.7 61.8,22.1 73.2,22.1"/><polygon fill="#56798C" points="76.1,10.3 80.2,10.3 76,13.9 76,16.4 84.6,16.4 84.6,14 80.3,14 84.6,10.3 84.6,7.9 76.1,7.9"/><polygon fill="#56798C" points="87.5,6.6 90.2,6.6 87.5,9 87.4,10.7 93.1,10.7 93.1,9.1 90.3,9.1 93.1,6.6 93.2,5 87.5,5"/></g><path fill="#F4F4F4" stroke="#1CBAB1" stroke-width="2" stroke-miterlimit="10" d="M-32.6-26.2c0-3,2.4-5.5,5.5-5.5v-13.4c0-3.4-2.7-6.1-6.1-6.1H-93c-3.4,0-6.1,2.7-6.1,6.1v13.4c3,0,5.5,2.4,5.5,5.5c0,3-2.4,5.5-5.5,5.5v13.4c0,3.4,2.7,6.1,6.1,6.1h59.8c3.4,0,6.1-2.7,6.1-6.1v-13.4C-30.2-20.7-32.6-23.2-32.6-26.2z"/></svg></span></div><div class="empty-notif"><p class="__text">Nothing that rings a <span class="__red-text">bell!</span></p></div></div>';
                        $("#notification-count").html("").removeClass("__alerts-bubble"), $("#notification").html(n)
                    } else BMS.Notifications.notifCount > 0 && ($("#notification-count").html(BMS.Notifications.notifCount), $("#notification-count").hasClass("__alerts-bubble") || $("#notification-count").addClass("__alerts-bubble"));
                    BMS.Storage.isset({
                        name: "ld"
                    }) && BMS.Storage.set({
                        name: "notificationId",
                        key: "Viewed",
                        storage: "L",
                        value: ""
                    })
                }
            },
            error: function(e) {
                BMS.Misc.fnErr({
                    fnName: "BMS.Notifications.getData.fnAjax.error",
                    err: e
                })
            }
        })
    } catch (t) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.getData",
            err: t
        })
    }
}, BMS.Notifications.callMarkNotif = function(e) {
    try {
        var t = BMS.Storage.get({
                name: "notificationId",
                key: "Viewed",
                storage: "L"
            }),
            n = {
                notificationId: t
            };
        BMS.Misc.fnAjax({
            url: "/serv/getData",
            type: "GET",
            data: {
                cmd: "MARKNOTIFVIEWED",
                id: n.notificationId
            },
            success: function(t) {
                var i = BMS.Storage.get({
                    name: "markedViewId",
                    key: "marked",
                    storage: "L"
                });
                if (i) {
                    var a = n.notificationId.split(","),
                        r = "";
                    $.each(a, function(e, t) {
                        var n = t && i.indexOf(t) == -1 ? "," + t : "";
                        r += n
                    });
                    var s = i + r
                } else if (n.notificationId) var s = n.notificationId;
                s && BMS.Storage.set({
                    name: "markedViewId",
                    key: "marked",
                    storage: "L",
                    value: s
                }), 1 == e && BMS.Notifications.getData()
            },
            error: function(e) {
                BMS.Misc.fnErr({
                    fnName: "BMS.Notifications.callMarkNotif.fnAjax.error",
                    err: e
                })
            }
        })
    } catch (i) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.callMarkNotif",
            err: i
        })
    }
}, BMS.Notifications.setAndGetData = function() {
    try {
        BMS.Notifications.callMarkNotif(1)
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.setAndGetData",
            err: e
        })
    }
}, BMS.Notifications.setViewed = function() {
    try {
        BMS.Notifications.callMarkNotif(0), $("#notification-count").html("").removeClass("__alerts-bubble")
    } catch (e) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.setViewed",
            err: e
        })
    }
}, BMS.Notifications.callSetViewed = function() {
    try {
        var e = BMS.Storage.isset({
                name: "ld",
                key: "MEMBERID",
                storage: "C"
            }),
            t = [];
        if (BMS.Storage.get({
                name: "markedViewId",
                key: "marked",
                storage: "L"
            })) var n = BMS.Storage.get({
            name: "markedViewId",
            key: "marked",
            storage: "L"
        }).split(",");
        else var n = [];
        $(".child-notifications").each(function() {
            var e = $(this).attr("notif_id");
            $.inArray(e, n) == -1 && t.push(e)
        }), BMS.Storage.set({
            name: "notificationId",
            key: "Viewed",
            storage: "L",
            value: t
        }), e && BMS.Notifications.setViewed(), $("#notification-count").html("").removeClass("__alerts-bubble")
    } catch (i) {
        BMS.Misc.fnErr({
            fnName: "BMS.Notifications.callSetViewed",
            err: i
        })
    }
};
var retInt = "";
BMS.Notifications.checkNotif = function() {
        try {
            if ($("#notification").length > 0) {
                var e = BMS.Storage.isset({
                    name: "ld",
                    key: "MEMBERID",
                    storage: "C"
                });
                e ? BMS.Notifications.setAndGetData() : BMS.Notifications.getData()
            }
        } catch (t) {
            BMS.Misc.fnErr({
                fnName: "BMS.Notifications.checkNotif",
                err: t
            })
        }
    }, $(function() {
        BMS.Notifications.checkNotif(), global.SignInCallBack.push(function() {
            setTimeout(function() {
                BMS.Notifications.notifCount = 0, $(".notification-dropdown-wrapper").hide(), BMS.Notifications.setAndGetData()
            }, 50)
        }), $(".notification-alert").click(function() {
            BMS.Notifications.callSetViewed()
        })
    }), window.stopWowLoad = !1,
    function() {
        var e, t, n, i, a, r = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            s = [].indexOf || function(e) {
                for (var t = 0, n = this.length; t < n; t++)
                    if (t in this && this[t] === e) return t;
                return -1
            };
        t = function() {
            function e() {}
            return e.prototype.extend = function(e, t) {
                var n, i;
                for (n in t) i = t[n], null == e[n] && (e[n] = i);
                return e
            }, e.prototype.isMobile = function(e) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
            }, e.prototype.createEvent = function(e, t, n, i) {
                var a;
                return null == t && (t = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (a = document.createEvent("CustomEvent"), a.initCustomEvent(e, t, n, i)) : null != document.createEventObject ? (a = document.createEventObject(), a.eventType = e) : a.eventName = e, a
            }, e.prototype.emitEvent = function(e, t) {
                return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
            }, e.prototype.addEvent = function(e, t, n) {
                return null != e.addEventListener ? e.addEventListener(t, n, !1) : null != e.attachEvent ? e.attachEvent("on" + t, n) : e[t] = n
            }, e.prototype.removeEvent = function(e, t, n) {
                return null != e.removeEventListener ? e.removeEventListener(t, n, !1) : null != e.detachEvent ? e.detachEvent("on" + t, n) : delete e[t]
            }, e.prototype.innerHeight = function() {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, e
        }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
            function e() {
                this.keys = [], this.values = []
            }
            return e.prototype.get = function(e) {
                var t, n, i, a, r;
                for (r = this.keys, t = i = 0, a = r.length; i < a; t = ++i)
                    if (n = r[t], n === e) return this.values[t]
            }, e.prototype.set = function(e, t) {
                var n, i, a, r, s;
                for (s = this.keys, n = a = 0, r = s.length; a < r; n = ++a)
                    if (i = s[n], i === e) return void(this.values[n] = t);
                return this.keys.push(e), this.values.push(t)
            }, e
        }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
            function e() {
                "undefined" != typeof console && null !== console && void 0, "undefined" != typeof console && null !== console && void 0
            }
            return e.notSupported = !0, e.prototype.observe = function() {}, e
        }()), i = this.getComputedStyle || function(e, t) {
            return this.getPropertyValue = function(t) {
                var n;
                return "float" === t && (t = "styleFloat"), a.test(t) && t.replace(a, function(e, t) {
                    return t.toUpperCase()
                }), (null != (n = e.currentStyle) ? n[t] : void 0) || null
            }, this
        }, a = /(\-([a-z]){1})/g, this.WOW = function() {
            function a(e) {
                null == e && (e = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return a.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !1,
                live: !0,
                lazyLoad: !0,
                lazyLaodOffset: -100,
                callback: null
            }, a.prototype.init = function() {
                var e;
                return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, a.prototype.start = function() {
                var t, n, i, a;
                if (this.stopped = !1, this.boxes = function() {
                        var e, n, i, a;
                        for (i = this.element.querySelectorAll("." + this.config.boxClass), a = [], e = 0, n = i.length; e < n; e++) t = i[e], a.push(t);
                        return a
                    }.call(this), this.all = function() {
                        var e, n, i, a;
                        for (i = this.boxes, a = [], e = 0, n = i.length; e < n; e++) t = i[e], a.push(t);
                        return a
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (a = this.boxes, this.mobile() && this.resetStyle(), n = 0, i = a.length; n < i; n++) t = a[n], this.mobile() || this.applyStyle(t, !0), this.isClosetoViewport(t) && !stopWowLoad && this.lazyLoad(t);
                if (this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) return new e(function(e) {
                    return function(t) {
                        var n, i, a, r, s;
                        for (s = [], n = 0, i = t.length; n < i; n++) r = t[n], s.push(function() {
                            var e, t, n, i;
                            for (n = r.addedNodes || [], i = [], e = 0, t = n.length; e < t; e++) a = n[e], i.push(this.doSync(a));
                            return i
                        }.call(e));
                        return s
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
            }, a.prototype.stop = function() {
                if (this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval)
            }, a.prototype.sync = function(t) {
                if (e.notSupported) return this.doSync(this.element)
            }, a.prototype.doSync = function(e) {
                var t, n, i, a, r;
                if (null == e && (e = this.element), 1 === e.nodeType) {
                    for (e = e.parentNode || e, a = e.querySelectorAll("." + this.config.boxClass), r = [], n = 0, i = a.length; n < i; n++) t = a[n], s.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() || this.mobile() ? this.resetStyle() : this.applyStyle(t, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                    return r
                }
            }, a.prototype.lazyLoad = function(e) {
                var t, n, i, a;
                if (a = global.blnIsTouchScreen ? "data-mobile" : "data-src", i = e.querySelectorAll("img[" + a + "]"), i && this.config.lazyLoad)
                    for (var r = 0; r < i.length; r++)
                        if (n = i[r], t = n.getAttribute(a), "" != t) {
                            var s = $(n);
                            s.parent().find(".img-placeholder").hide(), n.setAttribute("src", t), s.one("error", function(e) {
                                var t = $(this).attr("data-error");
                                this.setAttribute("src", t)
                            }), s.one("load", function() {
                                $(this).parents(".is-loading").removeClass("is-loading")
                            })
                        }
            }, a.prototype.show = function(e) {
                return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
            }, a.prototype.applyStyle = function(e, t) {
                var n, i, a;
                return i = e.getAttribute("data-wow-duration"), n = e.getAttribute("data-wow-delay"), a = e.getAttribute("data-wow-iteration"), this.animate(function(r) {
                    return function() {
                        return r.customStyle(e, t, i, n, a)
                    }
                }(this))
            }, a.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(e) {
                    return window.requestAnimationFrame(e)
                } : function(e) {
                    return e()
                }
            }(), a.prototype.resetStyle = function() {
                var e, t, n, i, a;
                for (i = this.boxes, a = [], t = 0, n = i.length; t < n; t++) e = i[t], a.push(e.style.visibility = "visible");
                return a
            }, a.prototype.resetAnimation = function(e) {
                var t;
                if (e.type.toLowerCase().indexOf("animationend") >= 0) return t = e.target || e.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim()
            }, a.prototype.customStyle = function(e, t, n, i, a) {
                return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", n && this.vendorSet(e.style, {
                    animationDuration: n
                }), i && this.vendorSet(e.style, {
                    animationDelay: i
                }), a && this.vendorSet(e.style, {
                    animationIterationCount: a
                }), this.vendorSet(e.style, {
                    animationName: t ? "none" : this.cachedAnimationName(e)
                }), e
            }, a.prototype.vendors = ["moz", "webkit"], a.prototype.vendorSet = function(e, t) {
                var n, i, a, r;
                i = [];
                for (n in t) a = t[n], e["" + n] = a, i.push(function() {
                    var t, i, s, o;
                    for (s = this.vendors, o = [], t = 0, i = s.length; t < i; t++) r = s[t], o.push(e["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = a);
                    return o
                }.call(this));
                return i
            }, a.prototype.vendorCSS = function(e, t) {
                var n, a, r, s, o, l;
                for (o = i(e), s = o.getPropertyCSSValue(t), r = this.vendors, n = 0, a = r.length; n < a; n++) l = r[n], s = s || o.getPropertyCSSValue("-" + l + "-" + t);
                return s
            }, a.prototype.animationName = function(e) {
                var t;
                try {
                    t = this.vendorCSS(e, "animation-name").cssText
                } catch (n) {
                    t = i(e).getPropertyValue("animation-name")
                }
                return "none" === t ? "" : t
            }, a.prototype.cacheAnimationName = function(e) {
                return this.animationNameCache.set(e, this.animationName(e))
            }, a.prototype.cachedAnimationName = function(e) {
                return this.animationNameCache.get(e)
            }, a.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, a.prototype.scrollCallback = function() {
                var e;
                if (this.scrolled && (this.scrolled = !1, this.boxes = function() {
                        var t, n, i, a;
                        for (i = this.boxes, a = [], t = 0, n = i.length; t < n; t++) e = i[t], e && (this.isClosetoViewport(e) && !stopWowLoad && this.lazyLoad(e), this.isVisible(e) && this.isClosetoViewport(e) && (this.show(e), !stopWowLoad) || a.push(e));
                        return a
                    }.call(this), !this.boxes.length && !this.config.live)) return this.stop()
            }, a.prototype.offsetTop = function(e) {
                for (var t; void 0 === e.offsetTop;) e = e.parentNode;
                for (t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop;
                return t
            }, a.prototype.isPositionFixed = function(e) {
                var t;
                for (t = i(e).position; e.parentNode && "body" !== e.parentNode.localName && "fixed" !== t && (t = i(e).position, "fixed" !== t);) e = e.parentNode;
                return "fixed" === t
            }, a.prototype.isVisible = function(e) {
                var t, n, i, a, r, s = window.pageYOffset,
                    o = $(e),
                    l = e.className;
                if (l.indexOf("fixed-card") > -1) {
                    var c = o.parents(".fixed-wrapper");
                    if (!c.is(":visible")) return !1;
                    s = c.scrollTop()
                }
                return n = e.getAttribute("data-wow-offset") || this.config.offset, r = s, a = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(e), t = i + e.clientHeight, i <= a && t >= r
            }, a.prototype.isClosetoViewport = function(e) {
                var t, n, i, a, r, s = window.pageYOffset,
                    o = $(e),
                    l = e.className;
                if (l.indexOf("fixed-card") > -1) {
                    var c = o.parents(".fixed-wrapper");
                    if (!c.is(":visible")) return !1;
                    s = c.scrollTop()
                }
                return n = parseInt(this.config.lazyLoadOffset), r = s, a = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(e), 0 != e.clientHeight && (t = i + e.clientHeight, i <= a && t >= r)
            }, a.prototype.util = function() {
                return null != this._util ? this._util : this._util = new t
            }, a.prototype.disabled = function() {
                return !1
            }, a.prototype.mobile = function() {
                return this.util().isMobile(navigator.userAgent)
            }, a
        }()
    }.call(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(e.jQuery)
    }(this, function(e) {
        function t(e) {
            if (e in u.style) return e;
            for (var t = ["Moz", "Webkit", "O", "ms"], n = e.charAt(0).toUpperCase() + e.substr(1), i = 0; i < t.length; ++i) {
                var a = t[i] + n;
                if (a in u.style) return a
            }
        }

        function n() {
            return u.style[p.transform] = "", u.style[p.transform] = "rotateY(90deg)", "" !== u.style[p.transform]
        }

        function i(e) {
            return "string" == typeof e && this.parse(e), this
        }

        function a(e, t, n) {
            t === !0 ? e.queue(n) : t ? e.queue(t, n) : e.each(function() {
                n.call(this)
            })
        }

        function r(t) {
            var n = [];
            return e.each(t, function(t) {
                t = e.camelCase(t), t = e.transit.propertyMap[t] || e.cssProps[t] || t, t = l(t), p[t] && (t = l(p[t])), e.inArray(t, n) === -1 && n.push(t)
            }), n
        }

        function s(t, n, i, a) {
            var s = r(t);
            e.cssEase[i] && (i = e.cssEase[i]);
            var o = "" + d(n) + " " + i;
            parseInt(a, 10) > 0 && (o += " " + d(a));
            var l = [];
            return e.each(s, function(e, t) {
                l.push(t + " " + o)
            }), l.join(", ")
        }

        function o(t, n) {
            n || (e.cssNumber[t] = !0), e.transit.propertyMap[t] = p.transform, e.cssHooks[t] = {
                get: function(n) {
                    var i = e(n).css("transit:transform");
                    return i.get(t)
                },
                set: function(n, i) {
                    var a = e(n).css("transit:transform");
                    a.setFromString(t, i), e(n).css({
                        "transit:transform": a
                    })
                }
            }
        }

        function l(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }

        function c(e, t) {
            return "string" != typeof e || e.match(/^[\-0-9\.]+$/) ? "" + e + t : e
        }

        function d(t) {
            var n = t;
            return "string" != typeof n || n.match(/^[\-0-9\.]+/) || (n = e.fx.speeds[n] || e.fx.speeds._default), c(n, "ms")
        }
        e.transit = {
            version: "0.9.12",
            propertyMap: {
                marginLeft: "margin",
                marginRight: "margin",
                marginBottom: "margin",
                marginTop: "margin",
                paddingLeft: "padding",
                paddingRight: "padding",
                paddingBottom: "padding",
                paddingTop: "padding"
            },
            enabled: !0,
            useTransitionEnd: !1
        };
        var u = document.createElement("div"),
            p = {},
            f = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        p.transition = t("transition"), p.transitionDelay = t("transitionDelay"), p.transform = t("transform"), p.transformOrigin = t("transformOrigin"), p.filter = t("Filter"), p.transform3d = n();
        var h = {
                transition: "transitionend",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                WebkitTransition: "webkitTransitionEnd",
                msTransition: "MSTransitionEnd"
            },
            g = p.transitionEnd = h[p.transition] || null;
        for (var v in p) p.hasOwnProperty(v) && "undefined" == typeof e.support[v] && (e.support[v] = p[v]);
        return u = null, e.cssEase = {
            _default: "ease",
            "in": "ease-in",
            out: "ease-out",
            "in-out": "ease-in-out",
            snap: "cubic-bezier(0,1,.5,1)",
            easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        }, e.cssHooks["transit:transform"] = {
            get: function(t) {
                return e(t).data("transform") || new i
            },
            set: function(t, n) {
                var a = n;
                a instanceof i || (a = new i(a)), "WebkitTransform" !== p.transform || f ? t.style[p.transform] = a.toString() : t.style[p.transform] = a.toString(!0), e(t).data("transform", a)
            }
        }, e.cssHooks.transform = {
            set: e.cssHooks["transit:transform"].set
        }, e.cssHooks.filter = {
            get: function(e) {
                return e.style[p.filter]
            },
            set: function(e, t) {
                e.style[p.filter] = t
            }
        }, e.fn.jquery < "1.8" && (e.cssHooks.transformOrigin = {
            get: function(e) {
                return e.style[p.transformOrigin]
            },
            set: function(e, t) {
                e.style[p.transformOrigin] = t
            }
        }, e.cssHooks.transition = {
            get: function(e) {
                return e.style[p.transition]
            },
            set: function(e, t) {
                e.style[p.transition] = t
            }
        }), o("scale"), o("scaleX"), o("scaleY"), o("translate"), o("rotate"), o("rotateX"), o("rotateY"), o("rotate3d"), o("perspective"), o("skewX"), o("skewY"), o("x", !0), o("y", !0), i.prototype = {
            setFromString: function(e, t) {
                var n = "string" == typeof t ? t.split(",") : t.constructor === Array ? t : [t];
                n.unshift(e), i.prototype.set.apply(this, n)
            },
            set: function(e) {
                var t = Array.prototype.slice.apply(arguments, [1]);
                this.setter[e] ? this.setter[e].apply(this, t) : this[e] = t.join(",")
            },
            get: function(e) {
                return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0
            },
            setter: {
                rotate: function(e) {
                    this.rotate = c(e, "deg")
                },
                rotateX: function(e) {
                    this.rotateX = c(e, "deg")
                },
                rotateY: function(e) {
                    this.rotateY = c(e, "deg")
                },
                scale: function(e, t) {
                    void 0 === t && (t = e), this.scale = e + "," + t
                },
                skewX: function(e) {
                    this.skewX = c(e, "deg")
                },
                skewY: function(e) {
                    this.skewY = c(e, "deg")
                },
                perspective: function(e) {
                    this.perspective = c(e, "px")
                },
                x: function(e) {
                    this.set("translate", e, null)
                },
                y: function(e) {
                    this.set("translate", null, e)
                },
                translate: function(e, t) {
                    void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== e && void 0 !== e && (this._translateX = c(e, "px")), null !== t && void 0 !== t && (this._translateY = c(t, "px")), this.translate = this._translateX + "," + this._translateY
                }
            },
            getter: {
                x: function() {
                    return this._translateX || 0
                },
                y: function() {
                    return this._translateY || 0
                },
                scale: function() {
                    var e = (this.scale || "1,1").split(",");
                    return e[0] && (e[0] = parseFloat(e[0])), e[1] && (e[1] = parseFloat(e[1])), e[0] === e[1] ? e[0] : e
                },
                rotate3d: function() {
                    for (var e = (this.rotate3d || "0,0,0,0deg").split(","), t = 0; t <= 3; ++t) e[t] && (e[t] = parseFloat(e[t]));
                    return e[3] && (e[3] = c(e[3], "deg")), e
                }
            },
            parse: function(e) {
                var t = this;
                e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(e, n, i) {
                    t.setFromString(n, i)
                })
            },
            toString: function(e) {
                var t = [];
                for (var n in this)
                    if (this.hasOwnProperty(n)) {
                        if (!p.transform3d && ("rotateX" === n || "rotateY" === n || "perspective" === n || "transformOrigin" === n)) continue;
                        "_" !== n[0] && (e && "scale" === n ? t.push(n + "3d(" + this[n] + ",1)") : e && "translate" === n ? t.push(n + "3d(" + this[n] + ",0)") : t.push(n + "(" + this[n] + ")"))
                    }
                return t.join(" ")
            }
        }, e.fn.transition = e.fn.transit = function(t, n, i, r) {
            var o = this,
                l = 0,
                c = !0,
                u = e.extend(!0, {}, t);
            "function" == typeof n && (r = n, n = void 0), "object" == typeof n && (i = n.easing, l = n.delay || 0, c = "undefined" == typeof n.queue || n.queue, r = n.complete, n = n.duration), "function" == typeof i && (r = i, i = void 0), "undefined" != typeof u.easing && (i = u.easing, delete u.easing), "undefined" != typeof u.duration && (n = u.duration, delete u.duration), "undefined" != typeof u.complete && (r = u.complete, delete u.complete), "undefined" != typeof u.queue && (c = u.queue, delete u.queue), "undefined" != typeof u.delay && (l = u.delay, delete u.delay), "undefined" == typeof n && (n = e.fx.speeds._default), "undefined" == typeof i && (i = e.cssEase._default), n = d(n);
            var f = s(u, n, i, l),
                h = e.transit.enabled && p.transition,
                v = h ? parseInt(n, 10) + parseInt(l, 10) : 0;
            if (0 === v) {
                var m = function(e) {
                    o.css(u), r && r.apply(o), e && e()
                };
                return a(o, c, m), o
            }
            var y = {},
                S = function(t) {
                    var n = !1,
                        i = function() {
                            n && o.unbind(g, i), v > 0 && o.each(function() {
                                this.style[p.transition] = y[this] || null
                            }), "function" == typeof r && r.apply(o), "function" == typeof t && t()
                        };
                    v > 0 && g && e.transit.useTransitionEnd ? (n = !0, o.bind(g, i)) : window.setTimeout(i, v), o.each(function() {
                        v > 0 && (this.style[p.transition] = f), e(this).css(u)
                    })
                },
                w = function(e) {
                    this.offsetWidth, S(e)
                };
            return a(o, c, w), this
        }, e.transit.getTransitionValue = s, e
    }),
    function(e) {
        e.fn.tabs = function(t) {
            var n, i, a = e(this),
                r = a.find(".tab-toggle");
            r.on("click", function(t) {
                n = e(this).attr("data-toggle"), i = a.find("#" + n), a.find(".tab-content._active").removeClass("_active"), a.find(".tab-toggle._active").removeClass("_active"), i.addClass("_active"), i.find(".dd-cards"), e(this).addClass("_active")
            })
        }
    }(jQuery),
    function() {
        var e = {
            mailcheck: {
                threshold: 5,
                defaultDomains: ["gmail.com", "yahoo.com", "yahoo.co.in", "hotmail.com", "in.com", "sify.com", "rediffmail.com", "ymail.com", "yahoo.in", "rediff.com", "rocketmail.com", "live.com", "live.in", "google.com", "indiatimes.com", "mail.com", "bookmyshow.com", "bigtree.in", "ovi.com", "aol.com", "aol.in", "indiya.com", "vsnl.net", "india.com", "eth.net", "talktalk.com", "airtelmail.in", "inbox.com", "hotmail.co.uk", "yahoomail.co.in", "msn.com", "satyam.com", "live.co.uk", "yahoo.com.au", "hotmail.ca", "cooltoad.com", "zmail.com", "sifymail.com", "facebook.com", "rediffmail.co.in", "gmail.co.in", "bsnl.co.in", "hotmail.in", "boxbe.com", "webdunia.com", "mail.yahoo.co.in", "outlook.in", "outlook.com", "rediffmail.in", "comcast.net", "yahoo.co.uk", "yahoo.ca", "btinternet.com", "zoho.com", "me.com", "mac.com", "live.com", "googlemail.com", "verizon.net", "sbcglobal.net", "att.net", "gmx.com"],
                defaultTopLevelDomains: ["co.uk", "co.in", "com", "net", "org", "info", "edu", "gov", "mil", "in", "ca", "com.au"],
                run: function(t) {
                    t.domains = t.domains || e.mailcheck.defaultDomains, t.topLevelDomains = t.topLevelDomains || e.mailcheck.defaultTopLevelDomains, t.distanceFunction = t.distanceFunction || e.sift3Distance;
                    var n = e.mailcheck.suggest(encodeURI(t.email), t.domains, t.topLevelDomains, t.distanceFunction);
                    n ? t.suggested && t.suggested(n) : t.empty && t.empty()
                },
                suggest: function(e, t, n, i) {
                    e = e.toLowerCase();
                    var a = this.splitEmail(e),
                        r = this.findClosestDomain(a.domain, t, i);
                    if (r) {
                        if (r != a.domain) return {
                            address: a.address,
                            domain: r,
                            full: a.address + "@" + r
                        }
                    } else {
                        var s = this.findClosestDomain(a.topLevelDomain, n);
                        if (a.domain && s && s != a.topLevelDomain) {
                            var o = a.domain;
                            return r = o.substring(0, o.lastIndexOf(a.topLevelDomain)) + s, {
                                address: a.address,
                                domain: r,
                                full: a.address + "@" + r
                            }
                        }
                    }
                    return !1
                },
                findClosestDomain: function(e, t, n) {
                    var i, a = 99,
                        r = null;
                    if (!e || !t) return !1;
                    n || (n = this.sift3Distance);
                    for (var s = 0; s < t.length; s++) {
                        if (e === t[s]) return e;
                        i = n(e, t[s]), i < a && (a = i, r = t[s])
                    }
                    return a <= this.threshold && null !== r && r
                },
                sift3Distance: function(e, t) {
                    if (null == e || 0 === e.length) return null == t || 0 === t.length ? 0 : t.length;
                    if (null == t || 0 === t.length) return e.length;
                    for (var n = 0, i = 0, a = 0, r = 0, s = 5; n + i < e.length && n + a < t.length;) {
                        if (e.charAt(n + i) == t.charAt(n + a)) r++;
                        else {
                            i = 0, a = 0;
                            for (var o = 0; o < s; o++) {
                                if (n + o < e.length && e.charAt(n + o) == t.charAt(n)) {
                                    i = o;
                                    break
                                }
                                if (n + o < t.length && e.charAt(n) == t.charAt(n + o)) {
                                    a = o;
                                    break
                                }
                            }
                        }
                        n++
                    }
                    return (e.length + t.length) / 2 - r
                },
                splitEmail: function(e) {
                    var t = e.split("@");
                    if (t.length < 2) return !1;
                    for (var n = 0; n < t.length; n++)
                        if ("" === t[n]) return !1;
                    var i = t.pop(),
                        a = i.split("."),
                        r = "";
                    if (0 == a.length) return !1;
                    if (1 == a.length) r = a[0];
                    else {
                        for (var n = 1; n < a.length; n++) r += a[n] + ".";
                        a.length >= 2 && (r = r.substring(0, r.length - 1))
                    }
                    return {
                        topLevelDomain: r,
                        domain: i,
                        address: t.join("@")
                    }
                }
            }
        };
        "undefined" != typeof module && module.exports && (module.exports = e.mailcheck), "undefined" != typeof window && window.jQuery && ! function(t) {
            t.fn.mailcheck = function(t) {
                var n = this;
                if (t.suggested) {
                    var i = t.suggested;
                    t.suggested = function(e) {
                        i(n, e)
                    }
                }
                if (t.empty) {
                    var a = t.empty;
                    t.empty = function() {
                        a.call(null, n)
                    }
                }
                t.email = this.val(), e.mailcheck.run(t)
            }
        }(jQuery)
    }(),
    function(e) {
        e.fn.setAltText = function(t) {
            var n = e(this);
            return window.navigator.userAgent.indexOf("MSIE ") > -1 ? n : n.each(function(n, i) {
                i = e(i);
                var a = i.attr("placeholder") || "",
                    r = void 0 != a ? a : t && t.text && "" != t.text ? t.text : "Enter text",
                    s = t && t.blurcolor ? t.blurcolor : "#7F7F7F",
                    o = t && t.focuscolor ? t.focuscolor : i.css("color");
                i.bind({
                    blur: function() {
                        i.val() == r || "" == i.val() ? i.val(r).css("color", s) : i.css("color", o)
                    },
                    focus: function() {
                        i.val() == r && i.val("").css("color", o)
                    }
                }), i.is(":focus") || i.val(r).css("color", s)
            })
        }
    }(jQuery),
    function(e) {
        e.fn.doEnter = function(t) {
            return e(this).unbind("keypress"), e(this).bind("keypress", function(e) {
                var n = e.keyCode || e.which;
                13 == n && t && t.callback && (t.argument ? t.callback(t.argument) : t.callback())
            })
        }
    }(jQuery);
var xhrQueue = [];
if (function() {
        function e(e) {
            function t(t, n, i, a, r, s) {
                for (; r >= 0 && s > r; r += e) {
                    var o = a ? a[r] : r;
                    i = n(i, t[o], o, t)
                }
                return i
            }
            return function(n, i, a, r) {
                i = S(i, r, 4);
                var s = !B(n) && y.keys(n),
                    o = (s || n).length,
                    l = e > 0 ? 0 : o - 1;
                return arguments.length < 3 && (a = n[s ? s[l] : l], l += e), t(n, i, a, s, l, o)
            }
        }

        function t(e) {
            return function(t, n, i) {
                n = w(n, i);
                for (var a = _(t), r = e > 0 ? 0 : a - 1; r >= 0 && a > r; r += e)
                    if (n(t[r], r, t)) return r;
                return -1
            }
        }

        function n(e, t, n) {
            return function(i, a, r) {
                var s = 0,
                    o = _(i);
                if ("number" == typeof r) e > 0 ? s = r >= 0 ? r : Math.max(r + o, s) : o = r >= 0 ? Math.min(r + 1, o) : r + o + 1;
                else if (n && r && o) return r = n(i, a), i[r] === a ? r : -1;
                if (a !== a) return r = t(d.call(i, s, o), y.isNaN), r >= 0 ? r + s : -1;
                for (r = e > 0 ? s : o - 1; r >= 0 && o > r; r += e)
                    if (i[r] === a) return r;
                return -1
            }
        }

        function i(e, t) {
            var n = I.length,
                i = e.constructor,
                a = y.isFunction(i) && i.prototype || o,
                r = "constructor";
            for (y.has(e, r) && !y.contains(t, r) && t.push(r); n--;) r = I[n], r in e && e[r] !== a[r] && !y.contains(t, r) && t.push(r)
        }
        var a = this,
            r = a._,
            s = Array.prototype,
            o = Object.prototype,
            l = Function.prototype,
            c = s.push,
            d = s.slice,
            u = o.toString,
            p = o.hasOwnProperty,
            f = Array.isArray,
            h = Object.keys,
            g = l.bind,
            v = Object.create,
            m = function() {},
            y = function(e) {
                return e instanceof y ? e : this instanceof y ? void(this._wrapped = e) : new y(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y), exports._ = y) : a._ = y, y.VERSION = "1.8.3";
        var S = function(e, t, n) {
                if (void 0 === t) return e;
                switch (null == n ? 3 : n) {
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function(n, i) {
                            return e.call(t, n, i)
                        };
                    case 3:
                        return function(n, i, a) {
                            return e.call(t, n, i, a)
                        };
                    case 4:
                        return function(n, i, a, r) {
                            return e.call(t, n, i, a, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            },
            w = function(e, t, n) {
                return null == e ? y.identity : y.isFunction(e) ? S(e, t, n) : y.isObject(e) ? y.matcher(e) : y.property(e)
            };
        y.iteratee = function(e, t) {
            return w(e, t, 1 / 0)
        };
        var b = function(e, t) {
                return function(n) {
                    var i = arguments.length;
                    if (2 > i || null == n) return n;
                    for (var a = 1; i > a; a++)
                        for (var r = arguments[a], s = e(r), o = s.length, l = 0; o > l; l++) {
                            var c = s[l];
                            t && void 0 !== n[c] || (n[c] = r[c])
                        }
                    return n
                }
            },
            M = function(e) {
                if (!y.isObject(e)) return {};
                if (v) return v(e);
                m.prototype = e;
                var t = new m;
                return m.prototype = null, t
            },
            C = function(e) {
                return function(t) {
                    return null == t ? void 0 : t[e]
                }
            },
            k = Math.pow(2, 53) - 1,
            _ = C("length"),
            B = function(e) {
                var t = _(e);
                return "number" == typeof t && t >= 0 && k >= t
            };
        y.each = y.forEach = function(e, t, n) {
            t = S(t, n);
            var i, a;
            if (B(e))
                for (i = 0, a = e.length; a > i; i++) t(e[i], i, e);
            else {
                var r = y.keys(e);
                for (i = 0, a = r.length; a > i; i++) t(e[r[i]], r[i], e)
            }
            return e
        }, y.map = y.collect = function(e, t, n) {
            t = w(t, n);
            for (var i = !B(e) && y.keys(e), a = (i || e).length, r = Array(a), s = 0; a > s; s++) {
                var o = i ? i[s] : s;
                r[s] = t(e[o], o, e)
            }
            return r
        }, y.reduce = y.foldl = y.inject = e(1), y.reduceRight = y.foldr = e(-1), y.find = y.detect = function(e, t, n) {
            var i;
            return i = B(e) ? y.findIndex(e, t, n) : y.findKey(e, t, n), void 0 !== i && i !== -1 ? e[i] : void 0
        }, y.filter = y.select = function(e, t, n) {
            var i = [];
            return t = w(t, n), y.each(e, function(e, n, a) {
                t(e, n, a) && i.push(e)
            }), i
        }, y.reject = function(e, t, n) {
            return y.filter(e, y.negate(w(t)), n)
        }, y.every = y.all = function(e, t, n) {
            t = w(t, n);
            for (var i = !B(e) && y.keys(e), a = (i || e).length, r = 0; a > r; r++) {
                var s = i ? i[r] : r;
                if (!t(e[s], s, e)) return !1
            }
            return !0
        }, y.some = y.any = function(e, t, n) {
            t = w(t, n);
            for (var i = !B(e) && y.keys(e), a = (i || e).length, r = 0; a > r; r++) {
                var s = i ? i[r] : r;
                if (t(e[s], s, e)) return !0
            }
            return !1
        }, y.contains = y.includes = y.include = function(e, t, n, i) {
            return B(e) || (e = y.values(e)), ("number" != typeof n || i) && (n = 0), y.indexOf(e, t, n) >= 0
        }, y.invoke = function(e, t) {
            var n = d.call(arguments, 2),
                i = y.isFunction(t);
            return y.map(e, function(e) {
                var a = i ? t : e[t];
                return null == a ? a : a.apply(e, n)
            })
        }, y.pluck = function(e, t) {
            return y.map(e, y.property(t))
        }, y.where = function(e, t) {
            return y.filter(e, y.matcher(t))
        }, y.findWhere = function(e, t) {
            return y.find(e, y.matcher(t))
        }, y.max = function(e, t, n) {
            var i, a, r = -1 / 0,
                s = -1 / 0;
            if (null == t && null != e) {
                e = B(e) ? e : y.values(e);
                for (var o = 0, l = e.length; l > o; o++) i = e[o], i > r && (r = i)
            } else t = w(t, n), y.each(e, function(e, n, i) {
                a = t(e, n, i), (a > s || a === -1 / 0 && r === -1 / 0) && (r = e, s = a)
            });
            return r
        }, y.min = function(e, t, n) {
            var i, a, r = 1 / 0,
                s = 1 / 0;
            if (null == t && null != e) {
                e = B(e) ? e : y.values(e);
                for (var o = 0, l = e.length; l > o; o++) i = e[o], r > i && (r = i)
            } else t = w(t, n), y.each(e, function(e, n, i) {
                a = t(e, n, i), (s > a || 1 / 0 === a && 1 / 0 === r) && (r = e, s = a)
            });
            return r
        }, y.shuffle = function(e) {
            for (var t, n = B(e) ? e : y.values(e), i = n.length, a = Array(i), r = 0; i > r; r++) t = y.random(0, r), t !== r && (a[r] = a[t]), a[t] = n[r];
            return a
        }, y.sample = function(e, t, n) {
            return null == t || n ? (B(e) || (e = y.values(e)), e[y.random(e.length - 1)]) : y.shuffle(e).slice(0, Math.max(0, t))
        }, y.sortBy = function(e, t, n) {
            return t = w(t, n), y.pluck(y.map(e, function(e, n, i) {
                return {
                    value: e,
                    index: n,
                    criteria: t(e, n, i)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                    i = t.criteria;
                if (n !== i) {
                    if (n > i || void 0 === n) return 1;
                    if (i > n || void 0 === i) return -1
                }
                return e.index - t.index
            }), "value")
        };
        var x = function(e) {
            return function(t, n, i) {
                var a = {};
                return n = w(n, i), y.each(t, function(i, r) {
                    var s = n(i, r, t);
                    e(a, i, s)
                }), a
            }
        };
        y.groupBy = x(function(e, t, n) {
            y.has(e, n) ? e[n].push(t) : e[n] = [t]
        }), y.indexBy = x(function(e, t, n) {
            e[n] = t
        }), y.countBy = x(function(e, t, n) {
            y.has(e, n) ? e[n]++ : e[n] = 1
        }), y.toArray = function(e) {
            return e ? y.isArray(e) ? d.call(e) : B(e) ? y.map(e, y.identity) : y.values(e) : []
        }, y.size = function(e) {
            return null == e ? 0 : B(e) ? e.length : y.keys(e).length
        }, y.partition = function(e, t, n) {
            t = w(t, n);
            var i = [],
                a = [];
            return y.each(e, function(e, n, r) {
                (t(e, n, r) ? i : a).push(e)
            }), [i, a]
        }, y.first = y.head = y.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : y.initial(e, e.length - t)
        }, y.initial = function(e, t, n) {
            return d.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
        }, y.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : y.rest(e, Math.max(0, e.length - t))
        }, y.rest = y.tail = y.drop = function(e, t, n) {
            return d.call(e, null == t || n ? 1 : t)
        }, y.compact = function(e) {
            return y.filter(e, y.identity)
        };
        var E = function(e, t, n, i) {
            for (var a = [], r = 0, s = i || 0, o = _(e); o > s; s++) {
                var l = e[s];
                if (B(l) && (y.isArray(l) || y.isArguments(l))) {
                    t || (l = E(l, t, n));
                    var c = 0,
                        d = l.length;
                    for (a.length += d; d > c;) a[r++] = l[c++]
                } else n || (a[r++] = l)
            }
            return a
        };
        y.flatten = function(e, t) {
            return E(e, t, !1)
        }, y.without = function(e) {
            return y.difference(e, d.call(arguments, 1))
        }, y.uniq = y.unique = function(e, t, n, i) {
            y.isBoolean(t) || (i = n, n = t, t = !1), null != n && (n = w(n, i));
            for (var a = [], r = [], s = 0, o = _(e); o > s; s++) {
                var l = e[s],
                    c = n ? n(l, s, e) : l;
                t ? (s && r === c || a.push(l), r = c) : n ? y.contains(r, c) || (r.push(c), a.push(l)) : y.contains(a, l) || a.push(l)
            }
            return a
        }, y.union = function() {
            return y.uniq(E(arguments, !0, !0))
        }, y.intersection = function(e) {
            for (var t = [], n = arguments.length, i = 0, a = _(e); a > i; i++) {
                var r = e[i];
                if (!y.contains(t, r)) {
                    for (var s = 1; n > s && y.contains(arguments[s], r); s++);
                    s === n && t.push(r)
                }
            }
            return t
        }, y.difference = function(e) {
            var t = E(arguments, !0, !0, 1);
            return y.filter(e, function(e) {
                return !y.contains(t, e)
            })
        }, y.zip = function() {
            return y.unzip(arguments)
        }, y.unzip = function(e) {
            for (var t = e && y.max(e, _).length || 0, n = Array(t), i = 0; t > i; i++) n[i] = y.pluck(e, i);
            return n
        }, y.object = function(e, t) {
            for (var n = {}, i = 0, a = _(e); a > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
            return n
        }, y.findIndex = t(1), y.findLastIndex = t(-1), y.sortedIndex = function(e, t, n, i) {
            n = w(n, i, 1);
            for (var a = n(t), r = 0, s = _(e); s > r;) {
                var o = Math.floor((r + s) / 2);
                n(e[o]) < a ? r = o + 1 : s = o
            }
            return r
        }, y.indexOf = n(1, y.findIndex, y.sortedIndex), y.lastIndexOf = n(-1, y.findLastIndex), y.range = function(e, t, n) {
            null == t && (t = e || 0, e = 0), n = n || 1;
            for (var i = Math.max(Math.ceil((t - e) / n), 0), a = Array(i), r = 0; i > r; r++, e += n) a[r] = e;
            return a
        };
        var T = function(e, t, n, i, a) {
            if (!(i instanceof t)) return e.apply(n, a);
            var r = M(e.prototype),
                s = e.apply(r, a);
            return y.isObject(s) ? s : r
        };
        y.bind = function(e, t) {
            if (g && e.bind === g) return g.apply(e, d.call(arguments, 1));
            if (!y.isFunction(e)) throw new TypeError("Bind must be called on a function");
            var n = d.call(arguments, 2),
                i = function() {
                    return T(e, i, t, this, n.concat(d.call(arguments)))
                };
            return i
        }, y.partial = function(e) {
            var t = d.call(arguments, 1),
                n = function() {
                    for (var i = 0, a = t.length, r = Array(a), s = 0; a > s; s++) r[s] = t[s] === y ? arguments[i++] : t[s];
                    for (; i < arguments.length;) r.push(arguments[i++]);
                    return T(e, n, this, this, r)
                };
            return n
        }, y.bindAll = function(e) {
            var t, n, i = arguments.length;
            if (1 >= i) throw new Error("bindAll must be passed function names");
            for (t = 1; i > t; t++) n = arguments[t], e[n] = y.bind(e[n], e);
            return e
        }, y.memoize = function(e, t) {
            var n = function(i) {
                var a = n.cache,
                    r = "" + (t ? t.apply(this, arguments) : i);
                return y.has(a, r) || (a[r] = e.apply(this, arguments)), a[r]
            };
            return n.cache = {}, n
        }, y.delay = function(e, t) {
            var n = d.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, y.defer = y.partial(y.delay, y, 1), y.throttle = function(e, t, n) {
            var i, a, r, s = null,
                o = 0;
            n || (n = {});
            var l = function() {
                o = n.leading === !1 ? 0 : y.now(), s = null, r = e.apply(i, a), s || (i = a = null)
            };
            return function() {
                var c = y.now();
                o || n.leading !== !1 || (o = c);
                var d = t - (c - o);
                return i = this, a = arguments, 0 >= d || d > t ? (s && (clearTimeout(s), s = null), o = c, r = e.apply(i, a), s || (i = a = null)) : s || n.trailing === !1 || (s = setTimeout(l, d)), r
            }
        }, y.debounce = function(e, t, n) {
            var i, a, r, s, o, l = function() {
                var c = y.now() - s;
                t > c && c >= 0 ? i = setTimeout(l, t - c) : (i = null, n || (o = e.apply(r, a), i || (r = a = null)))
            };
            return function() {
                r = this, a = arguments, s = y.now();
                var c = n && !i;
                return i || (i = setTimeout(l, t)), c && (o = e.apply(r, a), r = a = null), o
            }
        }, y.wrap = function(e, t) {
            return y.partial(t, e)
        }, y.negate = function(e) {
            return function() {
                return !e.apply(this, arguments)
            }
        }, y.compose = function() {
            var e = arguments,
                t = e.length - 1;
            return function() {
                for (var n = t, i = e[t].apply(this, arguments); n--;) i = e[n].call(this, i);
                return i
            }
        }, y.after = function(e, t) {
            return function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, y.before = function(e, t) {
            var n;
            return function() {
                return --e > 0 && (n = t.apply(this, arguments)), 1 >= e && (t = null), n
            }
        }, y.once = y.partial(y.before, 2);
        var $ = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        y.keys = function(e) {
            if (!y.isObject(e)) return [];
            if (h) return h(e);
            var t = [];
            for (var n in e) y.has(e, n) && t.push(n);
            return $ && i(e, t), t
        }, y.allKeys = function(e) {
            if (!y.isObject(e)) return [];
            var t = [];
            for (var n in e) t.push(n);
            return $ && i(e, t), t
        }, y.values = function(e) {
            for (var t = y.keys(e), n = t.length, i = Array(n), a = 0; n > a; a++) i[a] = e[t[a]];
            return i
        }, y.mapObject = function(e, t, n) {
            t = w(t, n);
            for (var i, a = y.keys(e), r = a.length, s = {}, o = 0; r > o; o++) i = a[o], s[i] = t(e[i], i, e);
            return s
        }, y.pairs = function(e) {
            for (var t = y.keys(e), n = t.length, i = Array(n), a = 0; n > a; a++) i[a] = [t[a], e[t[a]]];
            return i
        }, y.invert = function(e) {
            for (var t = {}, n = y.keys(e), i = 0, a = n.length; a > i; i++) t[e[n[i]]] = n[i];
            return t
        }, y.functions = y.methods = function(e) {
            var t = [];
            for (var n in e) y.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, y.extend = b(y.allKeys), y.extendOwn = y.assign = b(y.keys), y.findKey = function(e, t, n) {
            t = w(t, n);
            for (var i, a = y.keys(e), r = 0, s = a.length; s > r; r++)
                if (i = a[r], t(e[i], i, e)) return i
        }, y.pick = function(e, t, n) {
            var i, a, r = {},
                s = e;
            if (null == s) return r;
            y.isFunction(t) ? (a = y.allKeys(s), i = S(t, n)) : (a = E(arguments, !1, !1, 1), i = function(e, t, n) {
                return t in n
            }, s = Object(s));
            for (var o = 0, l = a.length; l > o; o++) {
                var c = a[o],
                    d = s[c];
                i(d, c, s) && (r[c] = d)
            }
            return r
        }, y.omit = function(e, t, n) {
            if (y.isFunction(t)) t = y.negate(t);
            else {
                var i = y.map(E(arguments, !1, !1, 1), String);
                t = function(e, t) {
                    return !y.contains(i, t)
                }
            }
            return y.pick(e, t, n)
        }, y.defaults = b(y.allKeys, !0), y.create = function(e, t) {
            var n = M(e);
            return t && y.extendOwn(n, t), n
        }, y.clone = function(e) {
            return y.isObject(e) ? y.isArray(e) ? e.slice() : y.extend({}, e) : e
        }, y.tap = function(e, t) {
            return t(e), e
        }, y.isMatch = function(e, t) {
            var n = y.keys(t),
                i = n.length;
            if (null == e) return !i;
            for (var a = Object(e), r = 0; i > r; r++) {
                var s = n[r];
                if (t[s] !== a[s] || !(s in a)) return !1
            }
            return !0
        };
        var A = function(e, t, n, i) {
            if (e === t) return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof y && (e = e._wrapped), t instanceof y && (t = t._wrapped);
            var a = u.call(e);
            if (a !== u.call(t)) return !1;
            switch (a) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + e == "" + t;
                case "[object Number]":
                    return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e === +t
            }
            var r = "[object Array]" === a;
            if (!r) {
                if ("object" != typeof e || "object" != typeof t) return !1;
                var s = e.constructor,
                    o = t.constructor;
                if (s !== o && !(y.isFunction(s) && s instanceof s && y.isFunction(o) && o instanceof o) && "constructor" in e && "constructor" in t) return !1
            }
            n = n || [], i = i || [];
            for (var l = n.length; l--;)
                if (n[l] === e) return i[l] === t;
            if (n.push(e), i.push(t), r) {
                if (l = e.length, l !== t.length) return !1;
                for (; l--;)
                    if (!A(e[l], t[l], n, i)) return !1
            } else {
                var c, d = y.keys(e);
                if (l = d.length, y.keys(t).length !== l) return !1;
                for (; l--;)
                    if (c = d[l], !y.has(t, c) || !A(e[c], t[c], n, i)) return !1
            }
            return n.pop(), i.pop(), !0
        };
        y.isEqual = function(e, t) {
            return A(e, t)
        }, y.isEmpty = function(e) {
            return null == e || (B(e) && (y.isArray(e) || y.isString(e) || y.isArguments(e)) ? 0 === e.length : 0 === y.keys(e).length)
        }, y.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }, y.isArray = f || function(e) {
            return "[object Array]" === u.call(e)
        }, y.isObject = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
        }, y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
            y["is" + e] = function(t) {
                return u.call(t) === "[object " + e + "]"
            }
        }), y.isArguments(arguments) || (y.isArguments = function(e) {
            return y.has(e, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function(e) {
            return "function" == typeof e || !1
        }), y.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, y.isNaN = function(e) {
            return y.isNumber(e) && e !== +e
        }, y.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" === u.call(e)
        }, y.isNull = function(e) {
            return null === e
        }, y.isUndefined = function(e) {
            return void 0 === e
        }, y.has = function(e, t) {
            return null != e && p.call(e, t)
        }, y.noConflict = function() {
            return a._ = r, this
        }, y.identity = function(e) {
            return e
        }, y.constant = function(e) {
            return function() {
                return e
            }
        }, y.noop = function() {}, y.property = C, y.propertyOf = function(e) {
            return null == e ? function() {} : function(t) {
                return e[t]
            }
        }, y.matcher = y.matches = function(e) {
            return e = y.extendOwn({}, e),
                function(t) {
                    return y.isMatch(t, e)
                }
        }, y.times = function(e, t, n) {
            var i = Array(Math.max(0, e));
            t = S(t, n, 1);
            for (var a = 0; e > a; a++) i[a] = t(a);
            return i
        }, y.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        }, y.now = Date.now || function() {
            return (new Date).getTime()
        };
        var R = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            D = y.invert(R),
            P = function(e) {
                var t = function(t) {
                        return e[t]
                    },
                    n = "(?:" + y.keys(e).join("|") + ")",
                    i = RegExp(n),
                    a = RegExp(n, "g");
                return function(e) {
                    return e = null == e ? "" : "" + e, i.test(e) ? e.replace(a, t) : e
                }
            };
        y.escape = P(R), y.unescape = P(D), y.result = function(e, t, n) {
            var i = null == e ? void 0 : e[t];
            return void 0 === i && (i = n), y.isFunction(i) ? i.call(e) : i
        };
        var L = 0;
        y.uniqueId = function(e) {
            var t = ++L + "";
            return e ? e + t : t
        }, y.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var N = /(.)^/,
            O = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            F = /\\|'|\r|\n|\u2028|\u2029/g,
            U = function(e) {
                return "\\" + O[e]
            };
        y.template = function(e, t, n) {
            !t && n && (t = n), t = y.defaults({}, t, y.templateSettings);
            var i = RegExp([(t.escape || N).source, (t.interpolate || N).source, (t.evaluate || N).source].join("|") + "|$", "g"),
                a = 0,
                r = "__p+='";
            e.replace(i, function(t, n, i, s, o) {
                return r += e.slice(a, o).replace(F, U), a = o + t.length, n ? r += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? r += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : s && (r += "';\n" + s + "\n__p+='"), t
            }), r += "';\n", t.variable || (r = "with(obj||{}){\n" + r + "}\n"), r = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + r + "return __p;\n";
            try {
                var s = new Function(t.variable || "obj", "_", r)
            } catch (o) {
                throw o.source = r, o
            }
            var l = function(e) {
                    return s.call(this, e, y)
                },
                c = t.variable || "obj";
            return l.source = "function(" + c + "){\n" + r + "}", l
        }, y.chain = function(e) {
            var t = y(e);
            return t._chain = !0, t
        };
        var j = function(e, t) {
            return e._chain ? y(t).chain() : t
        };
        y.mixin = function(e) {
            y.each(y.functions(e), function(t) {
                var n = y[t] = e[t];
                y.prototype[t] = function() {
                    var e = [this._wrapped];
                    return c.apply(e, arguments), j(this, n.apply(y, e))
                }
            })
        }, y.mixin(y), y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = s[e];
            y.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], j(this, n)
            }
        }), y.each(["concat", "join", "slice"], function(e) {
            var t = s[e];
            y.prototype[e] = function() {
                return j(this, t.apply(this._wrapped, arguments))
            }
        }), y.prototype.value = function() {
            return this._wrapped
        }, y.prototype.valueOf = y.prototype.toJSON = y.prototype.value, y.prototype.toString = function() {
            return "" + this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return y
        })
    }.call(this), function(e, t) {
        "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(e) {
            return t(e)
        }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(this, function(e) {
        var t = function() {
                "use strict";
                return {
                    isMsie: function() {
                        return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
                    },
                    isBlankString: function(e) {
                        return !e || /^\s*$/.test(e)
                    },
                    escapeRegExChars: function(e) {
                        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                    },
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isNumber: function(e) {
                        return "number" == typeof e
                    },
                    isArray: e.isArray,
                    isFunction: e.isFunction,
                    isObject: e.isPlainObject,
                    isUndefined: function(e) {
                        return "undefined" == typeof e
                    },
                    isElement: function(e) {
                        return !(!e || 1 !== e.nodeType)
                    },
                    isJQuery: function(t) {
                        return t instanceof e
                    },
                    toStr: function(e) {
                        return t.isUndefined(e) || null === e ? "" : e + ""
                    },
                    bind: e.proxy,
                    each: function(t, n) {
                        function i(e, t) {
                            return n(t, e)
                        }
                        e.each(t, i)
                    },
                    map: e.map,
                    filter: e.grep,
                    every: function(t, n) {
                        var i = !0;
                        return t ? (e.each(t, function(e, a) {
                            if (!(i = n.call(null, a, e, t))) return !1
                        }), !!i) : i
                    },
                    some: function(t, n) {
                        var i = !1;
                        return t ? (e.each(t, function(e, a) {
                            if (i = n.call(null, a, e, t)) return !1
                        }), !!i) : i
                    },
                    mixin: e.extend,
                    identity: function(e) {
                        return e
                    },
                    clone: function(t) {
                        return e.extend(!0, {}, t)
                    },
                    getIdGenerator: function() {
                        var e = 0;
                        return function() {
                            return e++
                        }
                    },
                    templatify: function(t) {
                        function n() {
                            return String(t)
                        }
                        return e.isFunction(t) ? t : n
                    },
                    defer: function(e) {
                        setTimeout(e, 0)
                    },
                    debounce: function(e, t, n) {
                        var i, a;
                        return function() {
                            var r, s, o = this,
                                l = arguments;
                            return r = function() {
                                i = null, n || (a = e.apply(o, l))
                            }, s = n && !i, clearTimeout(i), i = setTimeout(r, t), s && (a = e.apply(o, l)), a
                        }
                    },
                    throttle: function(e, t) {
                        var n, i, a, r, s, o;
                        return s = 0, o = function() {
                                s = new Date, a = null, r = e.apply(n, i)
                            },
                            function() {
                                var l = new Date,
                                    c = t - (l - s);
                                return n = this, i = arguments, c <= 0 ? (clearTimeout(a), a = null, s = l, r = e.apply(n, i)) : a || (a = setTimeout(o, c)), r
                            }
                    },
                    stringify: function(e) {
                        return t.isString(e) ? e : JSON.stringify(e)
                    },
                    noop: function() {}
                }
            }(),
            n = function() {
                "use strict";

                function e(e) {
                    var s, o;
                    return o = t.mixin({}, r, e), s = {
                        css: a(),
                        classes: o,
                        html: n(o),
                        selectors: i(o)
                    }, {
                        css: s.css,
                        html: s.html,
                        classes: s.classes,
                        selectors: s.selectors,
                        mixin: function(e) {
                            t.mixin(e, s)
                        }
                    }
                }

                function n(e) {
                    return {
                        wrapper: '<span class="' + e.wrapper + '"></span>',
                        menu: '<div class="' + e.menu + '"></div>'
                    }
                }

                function i(e) {
                    var n = {};
                    return t.each(e, function(e, t) {
                        n[t] = "." + e
                    }), n
                }

                function a() {
                    var e = {
                        wrapper: {
                            position: "relative",
                            display: "inline-block"
                        },
                        hint: {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            borderColor: "transparent",
                            boxShadow: "none",
                            opacity: "1"
                        },
                        input: {
                            position: "relative",
                            verticalAlign: "top",
                            backgroundColor: "transparent"
                        },
                        inputWithNoHint: {
                            position: "relative",
                            verticalAlign: "top"
                        },
                        menu: {
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            zIndex: "100",
                            display: "none"
                        },
                        ltr: {
                            left: "0",
                            right: "auto"
                        },
                        rtl: {
                            left: "auto",
                            right: " 0"
                        }
                    };
                    return t.isMsie() && t.mixin(e.input, {
                        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                    }), e
                }
                var r = {
                    wrapper: "twitter-typeahead",
                    input: "tt-input",
                    hint: "tt-hint",
                    menu: "tt-menu",
                    dataset: "tt-dataset",
                    suggestion: "tt-suggestion",
                    selectable: "tt-selectable",
                    empty: "tt-empty",
                    open: "tt-open",
                    cursor: "tt-cursor",
                    highlight: "tt-highlight",
                    category: "tt-category"
                };
                return e
            }(),
            i = function() {
                "use strict";

                function n(t) {
                    t && t.el || e.error("EventBus initialized without el"), this.$el = e(t.el)
                }
                var i, a;
                return i = "typeahead:", a = {
                    render: "rendered",
                    cursorchange: "cursorchanged",
                    select: "selected",
                    autocomplete: "autocompleted"
                }, t.mixin(n.prototype, {
                    _trigger: function(t, n) {
                        var a;
                        return a = e.Event(i + t), (n = n || []).unshift(a), this.$el.trigger.apply(this.$el, n), a
                    },
                    before: function(e) {
                        var t, n;
                        return t = [].slice.call(arguments, 1), n = this._trigger("before" + e, t), n.isDefaultPrevented()
                    },
                    trigger: function(e) {
                        var t;
                        this._trigger(e, [].slice.call(arguments, 1)), (t = a[e]) && this._trigger(t, [].slice.call(arguments, 1))
                    }
                }), n
            }(),
            a = function() {
                "use strict";

                function e(e, t, n, i) {
                    var a;
                    if (!n) return this;
                    for (t = t.split(l), n = i ? o(n, i) : n, this._callbacks = this._callbacks || {}; a = t.shift();) this._callbacks[a] = this._callbacks[a] || {
                        sync: [],
                        async: []
                    }, this._callbacks[a][e].push(n);
                    return this
                }

                function t(t, n, i) {
                    return e.call(this, "async", t, n, i)
                }

                function n(t, n, i) {
                    return e.call(this, "sync", t, n, i)
                }

                function i(e) {
                    var t;
                    if (!this._callbacks) return this;
                    for (e = e.split(l); t = e.shift();) delete this._callbacks[t];
                    return this
                }

                function a(e) {
                    var t, n, i, a, s;
                    if (!this._callbacks) return this;
                    for (e = e.split(l), i = [].slice.call(arguments, 1);
                        (t = e.shift()) && (n = this._callbacks[t]);) a = r(n.sync, this, [t].concat(i)), s = r(n.async, this, [t].concat(i)), a() && c(s);
                    return this
                }

                function r(e, t, n) {
                    function i() {
                        for (var i, a = 0, r = e.length; !i && a < r; a += 1) i = e[a].apply(t, n) === !1;
                        return !i
                    }
                    return i
                }

                function s() {
                    var e;
                    return e = window.setImmediate ? function(e) {
                        setImmediate(function() {
                            e()
                        })
                    } : function(e) {
                        setTimeout(function() {
                            e()
                        }, 0)
                    }
                }

                function o(e, t) {
                    return e.bind ? e.bind(t) : function() {
                        e.apply(t, [].slice.call(arguments, 0))
                    }
                }
                var l = /\s+/,
                    c = s();
                return {
                    onSync: n,
                    onAsync: t,
                    off: i,
                    trigger: a
                }
            }(),
            r = function(e) {
                "use strict";

                function n(e, n, i) {
                    for (var a, r = [], s = 0, o = e.length; s < o; s++) r.push(t.escapeRegExChars(e[s]));
                    return a = i ? "\\b(" + r.join("|") + ")\\b" : "(" + r.join("|") + ")", n ? new RegExp(a) : new RegExp(a, "i")
                }
                var i = {
                    node: null,
                    pattern: null,
                    tagName: "strong",
                    className: null,
                    wordsOnly: !1,
                    caseSensitive: !1
                };
                return function(a) {
                    function r(t) {
                        var n, i, r;
                        return (n = o.exec(t.data)) && (r = e.createElement(a.tagName), a.className && (r.className = a.className), i = t.splitText(n.index), i.splitText(n[0].length), r.appendChild(i.cloneNode(!0)), t.parentNode.replaceChild(r, i)), !!n
                    }

                    function s(e, t) {
                        for (var n, i = 3, a = 0; a < e.childNodes.length; a++) n = e.childNodes[a], n.nodeType === i ? a += t(n) ? 1 : 0 : s(n, t)
                    }
                    var o;
                    a = t.mixin({}, i, a), a.node && a.pattern && (a.pattern = t.isArray(a.pattern) ? a.pattern : [a.pattern], o = n(a.pattern, a.caseSensitive, a.wordsOnly), s(a.node, r))
                }
            }(window.document),
            s = function() {
                "use strict";

                function n(n, a) {
                    n = n || {}, n.input || e.error("input is missing"), a.mixin(this), this.$hint = e(n.hint), this.$input = e(n.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = i(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = t.noop)
                }

                function i(t) {
                    return e('<pre aria-hidden="true"></pre>').css({
                        position: "absolute",
                        visibility: "hidden",
                        whiteSpace: "pre",
                        fontFamily: t.css("font-family"),
                        fontSize: t.css("font-size"),
                        fontStyle: t.css("font-style"),
                        fontVariant: t.css("font-variant"),
                        fontWeight: t.css("font-weight"),
                        wordSpacing: t.css("word-spacing"),
                        letterSpacing: t.css("letter-spacing"),
                        textIndent: t.css("text-indent"),
                        textRendering: t.css("text-rendering"),
                        textTransform: t.css("text-transform")
                    }).insertAfter(t)
                }

                function r(e, t) {
                    return n.normalizeQuery(e) === n.normalizeQuery(t)
                }

                function s(e) {
                    return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
                }
                var o;
                return o = {
                    9: "tab",
                    27: "esc",
                    37: "left",
                    39: "right",
                    13: "enter",
                    38: "up",
                    40: "down"
                }, n.normalizeQuery = function(e) {
                    return t.toStr(e).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
                }, t.mixin(n.prototype, a, {
                    _onBlur: function() {
                        this.resetInputValue(), this.trigger("blurred")
                    },
                    _onFocus: function() {
                        this.queryWhenFocused = this.query, this.trigger("focused")
                    },
                    _onKeydown: function(e) {
                        var t = o[e.which || e.keyCode];
                        this._managePreventDefault(t, e), t && this._shouldTrigger(t, e) && this.trigger(t + "Keyed", e)
                    },
                    _onInput: function() {
                        this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
                    },
                    _managePreventDefault: function(e, t) {
                        var n;
                        switch (e) {
                            case "up":
                            case "down":
                                n = !s(t);
                                break;
                            default:
                                n = !1
                        }
                        n && t.preventDefault()
                    },
                    _shouldTrigger: function(e, t) {
                        var n;
                        switch (e) {
                            case "tab":
                                n = !s(t);
                                break;
                            default:
                                n = !0
                        }
                        return n
                    },
                    _checkLanguageDirection: function() {
                        var e = (this.$input.css("direction") || "ltr").toLowerCase();
                        this.dir !== e && (this.dir = e, this.$hint.attr("dir", e), this.trigger("langDirChanged", e))
                    },
                    _setQuery: function(e, t) {
                        var n, i;
                        n = r(e, this.query), i = !!n && this.query.length !== e.length, this.query = e, t || n ? !t && i && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                    },
                    bind: function() {
                        var e, n, i, a, r = this;
                        return e = t.bind(this._onBlur, this), n = t.bind(this._onFocus, this), i = t.bind(this._onKeydown, this), a = t.bind(this._onInput, this), this.$input.on("blur.tt", e).on("focus.tt", n).on("keydown.tt", i), !t.isMsie() || t.isMsie() > 9 ? this.$input.on("input.tt", a) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(e) {
                            o[e.which || e.keyCode] || t.defer(t.bind(r._onInput, r, e))
                        }), this
                    },
                    focus: function() {
                        this.$input.focus()
                    },
                    blur: function() {
                        this.$input.blur()
                    },
                    getLangDir: function() {
                        return this.dir
                    },
                    getQuery: function() {
                        return this.query || ""
                    },
                    setQuery: function(e, t) {
                        this.setInputValue(e), this._setQuery(e, t)
                    },
                    hasQueryChangedSinceLastFocus: function() {
                        return this.query !== this.queryWhenFocused
                    },
                    getInputValue: function() {
                        return this.$input.val()
                    },
                    setInputValue: function(e) {
                        this.$input.val(e), this.clearHintIfInvalid(), this._checkLanguageDirection()
                    },
                    resetInputValue: function() {
                        this.setInputValue(this.query)
                    },
                    getHint: function() {
                        return this.$hint.val()
                    },
                    setHint: function(e) {
                        this.$hint.val(e)
                    },
                    clearHint: function() {
                        this.setHint("")
                    },
                    clearHintIfInvalid: function() {
                        var e, t, n, i;
                        e = this.getInputValue(), t = this.getHint(), n = e !== t && 0 === t.indexOf(e), i = "" !== e && n && !this.hasOverflow(), !i && this.clearHint()
                    },
                    hasFocus: function() {
                        return this.$input.is(":focus")
                    },
                    hasOverflow: function() {
                        var e = this.$input.width() - 2;
                        return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= e
                    },
                    isCursorAtEnd: function() {
                        var e, n, i;
                        return e = this.$input.val().length, n = this.$input[0].selectionStart, t.isNumber(n) ? n === e : !document.selection || (i = document.selection.createRange(), i.moveStart("character", -e), e === i.text.length)
                    },
                    destroy: function() {
                        this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = e("<div>")
                    }
                }), n
            }(),
            o = function() {
                "use strict";

                function n(n, a) {
                    n = n || {}, n.templates = n.templates || {}, n.templates.notFound = n.templates.notFound || n.templates.empty, n.source || e.error("missing source"), n.node || e.error("missing node"), n.name && !o(n.name) && e.error("invalid dataset name: " + n.name), a.mixin(this), this.highlight = !!n.highlight, this.name = n.name || c(), this.limit = n.limit || 5, this.displayFn = i(n.display || n.displayKey), this.displayCategory = n.displayCategory || !1, this.templates = s(n.templates, this.displayFn), this.source = n.source.__ttAdapter ? n.source.__ttAdapter() : n.source, this.async = t.isUndefined(n.async) ? this.source.length > 2 : !!n.async, this._resetLastSuggestion(), this.$el = e(n.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
                }

                function i(e) {
                    function n(t) {
                        return t[e]
                    }
                    return e = e || t.stringify, t.isFunction(e) ? e : n
                }

                function s(n, i) {
                    function a(t) {
                        return e("<div>").text(i(t))
                    }

                    function r(t) {
                        return e("<div>").text(t)
                    }
                    return {
                        notFound: n.notFound && t.templatify(n.notFound),
                        pending: n.pending && t.templatify(n.pending),
                        header: n.header && t.templatify(n.header),
                        footer: n.footer && t.templatify(n.footer),
                        suggestion: n.suggestion || a,
                        category: {
                            header: n.category && n.category.header || r
                        }
                    }
                }

                function o(e) {
                    return /^[_a-zA-Z0-9-]+$/.test(e)
                }
                var l, c;
                return l = {
                    val: "tt-selectable-display",
                    obj: "tt-selectable-object"
                }, c = t.getIdGenerator(), n.extractData = function(t) {
                    var n = e(t);
                    return n.data(l.obj) ? {
                        val: n.data(l.val) || "",
                        obj: n.data(l.obj) || null
                    } : null
                }, t.mixin(n.prototype, a, {
                    _overwrite: function(e, t) {
                        t = t || [], t.length ? this._renderSuggestions(e, t) : this.async && this.templates.pending ? this._renderPending(e) : !this.async && this.templates.notFound ? this._renderNotFound(e) : this._empty(), this.trigger("rendered", this.name, t, !1)
                    },
                    _append: function(e, t) {
                        t = t || [], t.length && this.$lastSuggestion.length ? this._appendSuggestions(e, t) : t.length ? this._renderSuggestions(e, t) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(e), this.trigger("rendered", this.name, t, !0)
                    },
                    _renderSuggestions: function(e, t) {
                        var n;
                        n = this.displayCategory ? this._getCategorizedSuggestionsFragment(e, t) : this._getSuggestionsFragment(e, t), this.$lastSuggestion = n.children().last(), this.$el.html(n).prepend(this._getHeader(e, t)).append(this._getFooter(e, t))
                    },
                    _appendSuggestions: function(e, t) {
                        var n, i;
                        n = this._getSuggestionsFragment(e, t), i = n.children().last(), this.$lastSuggestion.after(n), this.$lastSuggestion = i
                    },
                    _renderPending: function(e) {
                        var t = this.templates.pending;
                        this._resetLastSuggestion(), t && this.$el.html(t({
                            query: e,
                            dataset: this.name
                        }))
                    },
                    _renderNotFound: function(e) {
                        var t = this.templates.notFound;
                        this._resetLastSuggestion(), t && this.$el.html(t({
                            query: e,
                            dataset: this.name
                        }))
                    },
                    _empty: function() {
                        this.$el.empty(), this._resetLastSuggestion()
                    },
                    _getSuggestionsFragment: function(n, i) {
                        var a, s = this;
                        return a = document.createDocumentFragment(), t.each(i, function(t) {
                            var i, r;
                            r = s._injectQuery(n, t), i = e(s.templates.suggestion(r)).data(l.obj, t).data(l.val, s.displayFn(t)).addClass(s.classes.suggestion + " " + s.classes.selectable), a.appendChild(i[0])
                        }), this.highlight && r({
                            className: this.classes.highlight,
                            node: a,
                            pattern: n
                        }), e(a)
                    },
                    _getCategorizedSuggestionsFragment: function(n, i) {
                        var a, s = this,
                            o = {},
                            c = [];
                        a = document.createDocumentFragment(), t.each(i, function(e, t) {
                            var n;
                            n = "function" == typeof s.displayCategory ? s.displayCategory(e) : e[s.displayCategory], "undefined" == typeof o[n] && (o[n] = [], c.push(n)), o[n].push(e)
                        });
                        for (var d = c.length, u = 0; u < d; u++) {
                            var p, f = c[u],
                                h = document.createDocumentFragment(),
                                g = o[f];
                            p = e(s.templates.category.header(f)).data(l.obj, f).data(l.val, f).addClass(s.classes.category), t.each(g, function(t) {
                                var i, a;
                                a = s._injectQuery(n, t), i = e(s.templates.suggestion(a)).data(l.obj, t).data(l.val, s.displayFn(t)).addClass(s.classes.suggestion + " " + s.classes.selectable), h.appendChild(i[0])
                            }), this.highlight && r({
                                className: this.classes.highlight,
                                node: h,
                                pattern: n
                            }), a.appendChild(p[0]), a.appendChild(h)
                        }
                        return e(a)
                    },
                    _getFooter: function(e, t) {
                        return this.templates.footer ? this.templates.footer({
                            query: e,
                            suggestions: t,
                            dataset: this.name
                        }) : null
                    },
                    _getHeader: function(e, t) {
                        return this.templates.header ? this.templates.header({
                            query: e,
                            suggestions: t,
                            dataset: this.name
                        }) : null
                    },
                    _resetLastSuggestion: function() {
                        this.$lastSuggestion = e()
                    },
                    _injectQuery: function(e, n) {
                        return t.isObject(n) ? t.mixin({
                            _query: e
                        }, n) : n
                    },
                    update: function(t) {
                        function n(e) {
                            s || (s = !0, e = (e || []).slice(0, a.limit), o = e.length, a._overwrite(t, e), o < a.limit && a.async && a.trigger("asyncRequested", t))
                        }

                        function i(n) {
                            n = n || [], !r && o < a.limit && (a.cancel = e.noop, a._append(t, n.slice(0, a.limit - o)), o += n.length, a.async && a.trigger("asyncReceived", t))
                        }
                        var a = this,
                            r = !1,
                            s = !1,
                            o = 0;
                        this.cancel(), this.cancel = function() {
                            r = !0, a.cancel = e.noop, a.async && a.trigger("asyncCanceled", t)
                        }, this.source(t, n, i), !s && n([])
                    },
                    cancel: e.noop,
                    clear: function() {
                        this._empty(), this.cancel(), this.trigger("cleared")
                    },
                    isEmpty: function() {
                        return this.$el.is(":empty")
                    },
                    destroy: function() {
                        this.$el = e("<div>")
                    }
                }), n
            }(),
            l = function() {
                "use strict";

                function n(n, i) {
                    function a(t) {
                        var n = r.$node.find(t.node).first();
                        return t.node = n.length ? n : e("<div>").appendTo(r.$node), new o(t, i)
                    }
                    var r = this;
                    n = n || {}, n.node || e.error("node is required"), i.mixin(this), this.$node = e(n.node), this.query = null, this.datasets = t.map(n.datasets, a)
                }
                return t.mixin(n.prototype, a, {
                    _onSelectableClick: function(t) {
                        this.trigger("selectableClicked", e(t.currentTarget))
                    },
                    _onRendered: function(e, t, n, i) {
                        this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", t, n, i)
                    },
                    _onCleared: function() {
                        this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
                    },
                    _propagate: function() {
                        this.trigger.apply(this, arguments)
                    },
                    _allDatasetsEmpty: function() {
                        function e(e) {
                            return e.isEmpty()
                        }
                        return t.every(this.datasets, e)
                    },
                    _getSelectables: function() {
                        return this.$node.find(this.selectors.selectable)
                    },
                    _removeCursor: function() {
                        var e = this.getActiveSelectable();
                        e && e.removeClass(this.classes.cursor)
                    },
                    _ensureVisible: function(e) {
                        var t, n, i, a;
                        t = e.position().top, n = t + e.outerHeight(!0), i = this.$node.scrollTop(), a = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), t < 0 ? this.$node.scrollTop(i + t) : a < n && this.$node.scrollTop(i + (n - a))
                    },
                    bind: function() {
                        var e, n = this;
                        return e = t.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, e), t.each(this.datasets, function(e) {
                            e.onSync("asyncRequested", n._propagate, n).onSync("asyncCanceled", n._propagate, n).onSync("asyncReceived", n._propagate, n).onSync("rendered", n._onRendered, n).onSync("cleared", n._onCleared, n)
                        }), this
                    },
                    isOpen: function() {
                        return this.$node.hasClass(this.classes.open)
                    },
                    open: function() {
                        this.$node.addClass(this.classes.open)
                    },
                    close: function() {
                        this.$node.removeClass(this.classes.open), this._removeCursor()
                    },
                    setLanguageDirection: function(e) {
                        this.$node.attr("dir", e)
                    },
                    selectableRelativeToCursor: function(e) {
                        var t, n, i, a;
                        return n = this.getActiveSelectable(), t = this._getSelectables(), i = n ? t.index(n) : -1, a = i + e, a = (a + 1) % (t.length + 1) - 1, a = a < -1 ? t.length - 1 : a, a === -1 ? null : t.eq(a)
                    },
                    setCursor: function(e) {
                        this._removeCursor(), (e = e && e.first()) && (e.addClass(this.classes.cursor), this._ensureVisible(e))
                    },
                    getSelectableData: function(e) {
                        return e && e.length ? o.extractData(e) : null
                    },
                    getActiveSelectable: function() {
                        var e = this._getSelectables().filter(this.selectors.cursor).first();
                        return e.length ? e : null
                    },
                    getTopSelectable: function() {
                        var e = this._getSelectables().first();
                        return e.length ? e : null
                    },
                    update: function(e) {
                        function n(t) {
                            t.update(e)
                        }
                        var i = e !== this.query;
                        return i && (this.query = e, t.each(this.datasets, n)), i
                    },
                    empty: function() {
                        function e(e) {
                            e.clear()
                        }
                        t.each(this.datasets, e), this.query = null, this.$node.addClass(this.classes.empty)
                    },
                    destroy: function() {
                        function n(e) {
                            e.destroy()
                        }
                        this.$node.off(".tt"), this.$node = e("<div>"), t.each(this.datasets, n)
                    }
                }), n
            }(),
            c = function() {
                "use strict";

                function e() {
                    l.apply(this, [].slice.call(arguments, 0))
                }
                var n = l.prototype;
                return t.mixin(e.prototype, l.prototype, {
                    open: function() {
                        return !this._allDatasetsEmpty() && this._show(), n.open.apply(this, [].slice.call(arguments, 0))
                    },
                    close: function() {
                        return this._hide(), n.close.apply(this, [].slice.call(arguments, 0))
                    },
                    _onRendered: function() {
                        return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), n._onRendered.apply(this, [].slice.call(arguments, 0))
                    },
                    _onCleared: function() {
                        return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), n._onCleared.apply(this, [].slice.call(arguments, 0))
                    },
                    setLanguageDirection: function(e) {
                        return this.$node.css("ltr" === e ? this.css.ltr : this.css.rtl), n.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                    },
                    _hide: function() {
                        this.$node.hide()
                    },
                    _show: function() {
                        this.$node.css("display", "block")
                    }
                }), e
            }(),
            d = function() {
                "use strict";

                function n(n, a) {
                    var r, s, o, l, c, d, u, p, f, h, g;
                    n = n || {}, n.input || e.error("missing input"), n.menu || e.error("missing menu"), n.eventBus || e.error("missing event bus"), a.mixin(this), this.eventBus = n.eventBus, this.minLength = t.isNumber(n.minLength) ? n.minLength : 1, this.input = n.input, this.menu = n.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), r = i(this, "activate", "open", "_onFocused"), s = i(this, "deactivate", "_onBlurred"), o = i(this, "isActive", "isOpen", "_onEnterKeyed"), l = i(this, "isActive", "isOpen", "_onTabKeyed"), c = i(this, "isActive", "_onEscKeyed"), d = i(this, "isActive", "open", "_onUpKeyed"), u = i(this, "isActive", "open", "_onDownKeyed"), p = i(this, "isActive", "isOpen", "_onLeftKeyed"), f = i(this, "isActive", "isOpen", "_onRightKeyed"), h = i(this, "_openIfActive", "_onQueryChanged"), g = i(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", r, this).onSync("blurred", s, this).onSync("enterKeyed", o, this).onSync("tabKeyed", l, this).onSync("escKeyed", c, this).onSync("upKeyed", d, this).onSync("downKeyed", u, this).onSync("leftKeyed", p, this).onSync("rightKeyed", f, this).onSync("queryChanged", h, this).onSync("whitespaceChanged", g, this).onSync("langDirChanged", this._onLangDirChanged, this)
                }

                function i(e) {
                    var n = [].slice.call(arguments, 1);
                    return function() {
                        var i = [].slice.call(arguments);
                        t.each(n, function(t) {
                            return e[t].apply(e, i)
                        })
                    }
                }
                return t.mixin(n.prototype, {
                    _hacks: function() {
                        var n, i;
                        n = this.input.$input || e("<div>"), i = this.menu.$node || e("<div>"), n.on("blur.tt", function(e) {
                            var a, r, s;
                            a = document.activeElement, r = i.is(a), s = i.has(a).length > 0, t.isMsie() && (r || s) && (e.preventDefault(), e.stopImmediatePropagation(), t.defer(function() {
                                n.focus()
                            }))
                        }), i.on("mousedown.tt", function(e) {
                            e.preventDefault()
                        })
                    },
                    _onSelectableClicked: function(e, t) {
                        this.select(t)
                    },
                    _onDatasetCleared: function() {
                        this._updateHint()
                    },
                    _onDatasetRendered: function(e, t, n, i) {
                        this._updateHint(), this.eventBus.trigger("render", n, i, t)
                    },
                    _onAsyncRequested: function(e, t, n) {
                        this.eventBus.trigger("asyncrequest", n, t)
                    },
                    _onAsyncCanceled: function(e, t, n) {
                        this.eventBus.trigger("asynccancel", n, t)
                    },
                    _onAsyncReceived: function(e, t, n) {
                        this.eventBus.trigger("asyncreceive", n, t)
                    },
                    _onFocused: function() {
                        this._minLengthMet() && this.menu.update(this.input.getQuery())
                    },
                    _onBlurred: function() {
                        this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                    },
                    _onEnterKeyed: function(e, t) {
                        var n;
                        (n = this.menu.getActiveSelectable()) && this.select(n) && t.preventDefault()
                    },
                    _onTabKeyed: function(e, t) {
                        var n;
                        (n = this.menu.getActiveSelectable()) ? this.select(n) && t.preventDefault(): (n = this.menu.getTopSelectable()) && this.autocomplete(n) && t.preventDefault()
                    },
                    _onEscKeyed: function() {
                        this.close()
                    },
                    _onUpKeyed: function() {
                        this.moveCursor(-1)
                    },
                    _onDownKeyed: function() {
                        this.moveCursor(1)
                    },
                    _onLeftKeyed: function() {
                        "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                    },
                    _onRightKeyed: function() {
                        "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                    },
                    _onQueryChanged: function(e, t) {
                        this._minLengthMet(t) ? this.menu.update(t) : this.menu.empty()
                    },
                    _onWhitespaceChanged: function() {
                        this._updateHint()
                    },
                    _onLangDirChanged: function(e, t) {
                        this.dir !== t && (this.dir = t, this.menu.setLanguageDirection(t))
                    },
                    _openIfActive: function() {
                        this.isActive() && this.open()
                    },
                    _minLengthMet: function(e) {
                        return e = t.isString(e) ? e : this.input.getQuery() || "", e.length >= this.minLength
                    },
                    _updateHint: function() {
                        var e, n, i, a, r, o, l;
                        e = this.menu.getTopSelectable(), n = this.menu.getSelectableData(e), i = this.input.getInputValue(), !n || t.isBlankString(i) || this.input.hasOverflow() ? this.input.clearHint() : (a = s.normalizeQuery(i), r = t.escapeRegExChars(a), o = new RegExp("^(?:" + r + ")(.+$)", "i"), l = o.exec(n.val), l && this.input.setHint(i + l[1]))
                    },
                    isEnabled: function() {
                        return this.enabled
                    },
                    enable: function() {
                        this.enabled = !0
                    },
                    disable: function() {
                        this.enabled = !1
                    },
                    isActive: function() {
                        return this.active
                    },
                    activate: function() {
                        return !!this.isActive() || !(!this.isEnabled() || this.eventBus.before("active")) && (this.active = !0, this.eventBus.trigger("active"), !0)
                    },
                    deactivate: function() {
                        return !this.isActive() || !this.eventBus.before("idle") && (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0)
                    },
                    isOpen: function() {
                        return this.menu.isOpen()
                    },
                    open: function() {
                        return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                    },
                    close: function() {
                        return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                    },
                    setVal: function(e) {
                        this.input.setQuery(t.toStr(e))
                    },
                    getVal: function() {
                        return this.input.getQuery()
                    },
                    select: function(e) {
                        var t = this.menu.getSelectableData(e);
                        return !(!t || this.eventBus.before("select", t.obj)) && (this.input.setQuery(t.val, !0), this.eventBus.trigger("select", t.obj), this.close(), !0)
                    },
                    autocomplete: function(e) {
                        var t, n, i;
                        return t = this.input.getQuery(), n = this.menu.getSelectableData(e), i = n && t !== n.val, !(!i || this.eventBus.before("autocomplete", n.obj)) && (this.input.setQuery(n.val), this.eventBus.trigger("autocomplete", n.obj), !0)
                    },
                    moveCursor: function(e) {
                        var t, n, i, a, r;
                        return t = this.input.getQuery(), n = this.menu.selectableRelativeToCursor(e), i = this.menu.getSelectableData(n), a = i ? i.obj : null, r = this._minLengthMet() && this.menu.update(t), !r && !this.eventBus.before("cursorchange", a) && (this.menu.setCursor(n), i ? this.input.setInputValue(i.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", a), !0)
                    },
                    destroy: function() {
                        this.input.destroy(), this.menu.destroy()
                    }
                }), n
            }();
        ! function() {
            "use strict";

            function a(t, n) {
                t.each(function() {
                    var t, i = e(this);
                    (t = i.data(g.typeahead)) && n(t, i)
                })
            }

            function r(e, t) {
                return e.clone().addClass(t.classes.hint).removeData().css(t.css.hint).css(u(e)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                    autocomplete: "off",
                    spellcheck: "false",
                    tabindex: -1
                })
            }

            function o(e, t) {
                e.data(g.attrs, {
                    dir: e.attr("dir"),
                    autocomplete: e.attr("autocomplete"),
                    spellcheck: e.attr("spellcheck"),
                    style: e.attr("style")
                }), e.addClass(t.classes.input).attr({
                    autocomplete: "off",
                    spellcheck: !1
                });
                try {
                    !e.attr("dir") && e.attr("dir", "auto")
                } catch (n) {}
                return e
            }

            function u(e) {
                return {
                    backgroundAttachment: e.css("background-attachment"),
                    backgroundClip: e.css("background-clip"),
                    backgroundColor: e.css("background-color"),
                    backgroundImage: e.css("background-image"),
                    backgroundOrigin: e.css("background-origin"),
                    backgroundPosition: e.css("background-position"),
                    backgroundRepeat: e.css("background-repeat"),
                    backgroundSize: e.css("background-size")
                }
            }

            function p(e) {
                var n, i;
                n = e.data(g.www), i = e.parent().filter(n.selectors.wrapper), t.each(e.data(g.attrs), function(n, i) {
                    t.isUndefined(n) ? e.removeAttr(i) : e.attr(i, n)
                }), e.removeData(g.typeahead).removeData(g.www).removeData(g.attr).removeClass(n.classes.input), i.length && (e.detach().insertAfter(i), i.remove())
            }

            function f(n) {
                var i, a;
                return i = t.isJQuery(n) || t.isElement(n), a = i ? e(n).first() : [], a.length ? a : null
            }
            var h, g, v;
            h = e.fn.typeahead, g = {
                www: "tt-www",
                attrs: "tt-attrs",
                typeahead: "tt-typeahead"
            }, v = {
                initialize: function(a, u) {
                    function p() {
                        var n, p, v, m, y, S, w, b, M, C, k;
                        t.each(u, function(e) {
                            e.highlight = !!a.highlight
                        }), n = e(this), p = e(h.html.wrapper), v = f(a.hint), m = f(a.menu), y = a.hint !== !1 && !v, S = a.menu !== !1 && !m, y && (v = r(n, h)), S && (m = e(h.html.menu).css(h.css.menu)), v && v.val(""), n = o(n, h), (y || S) && (p.css(h.css.wrapper), n.css(y ? h.css.input : h.css.inputWithNoHint), n.wrap(p).parent().prepend(y ? v : null).append(S ? m : null)), k = S ? c : l, w = new i({
                            el: n
                        }), b = new s({
                            hint: v,
                            input: n
                        }, h), M = new k({
                            node: m,
                            datasets: u
                        }, h), C = new d({
                            input: b,
                            menu: M,
                            eventBus: w,
                            minLength: a.minLength
                        }, h), n.data(g.www, h), n.data(g.typeahead, C)
                    }
                    var h;
                    return u = t.isArray(u) ? u : [].slice.call(arguments, 1), a = a || {}, h = n(a.classNames), this.each(p)
                },
                isEnabled: function() {
                    var e;
                    return a(this.first(), function(t) {
                        e = t.isEnabled()
                    }), e
                },
                enable: function() {
                    return a(this, function(e) {
                        e.enable()
                    }), this
                },
                disable: function() {
                    return a(this, function(e) {
                        e.disable()
                    }), this
                },
                isActive: function() {
                    var e;
                    return a(this.first(), function(t) {
                        e = t.isActive()
                    }), e
                },
                activate: function() {
                    return a(this, function(e) {
                        e.activate()
                    }), this
                },
                deactivate: function() {
                    return a(this, function(e) {
                        e.deactivate()
                    }), this
                },
                isOpen: function() {
                    var e;
                    return a(this.first(), function(t) {
                        e = t.isOpen()
                    }), e
                },
                open: function() {
                    return a(this, function(e) {
                        e.open()
                    }), this
                },
                close: function() {
                    return a(this, function(e) {
                        e.close()
                    }), this
                },
                select: function(t) {
                    var n = !1,
                        i = e(t);
                    return a(this.first(), function(e) {
                        n = e.select(i)
                    }), n
                },
                autocomplete: function(t) {
                    var n = !1,
                        i = e(t);
                    return a(this.first(), function(e) {
                        n = e.autocomplete(i)
                    }), n
                },
                moveCursor: function(e) {
                    var t = !1;
                    return a(this.first(), function(n) {
                        t = n.moveCursor(e)
                    }), t
                },
                val: function(e) {
                    var t;
                    return arguments.length ? (a(this, function(t) {
                        t.setVal(e)
                    }), this) : (a(this.first(), function(e) {
                        t = e.getVal()
                    }), t)
                },
                destroy: function() {
                    return a(this, function(e, t) {
                        p(t), e.destroy()
                    }), this
                }
            }, e.fn.typeahead = function(e) {
                return v[e] ? v[e].apply(this, [].slice.call(arguments, 1)) : v.initialize.apply(this, arguments)
            }, e.fn.typeahead.noConflict = function() {
                return e.fn.typeahead = h, this
            }
        }()
    }), function(e) {
        var t = 13;
        e.fn.typeaheadWrapper = function(n) {
            var i = e(this),
                a = e.extend(!0, {
                    config: {
                        hint: !0,
                        highlight: !0,
                        minLength: 2
                    },
                    dataSet: {
                        name: "result",
                        source: function() {
                            return []
                        },
                        templates: {
                            notFound: '<div class="tt-no-results">No matching results</div>',
                            pending: '<div class="tt-searching">Searching...</div>'
                        }
                    },
                    onResultSelection: function(e, t) {}
                }, n),
                r = function(n) {
                    var r = e(this),
                        s = r.typeahead("val");
                    s.length < a.config.minLength || n.keyCode !== t || i.parent().find(".tt-cursor").trigger("click")
                },
                s = function() {
                    i.parent().find(".tt-suggestion").first().addClass("tt-cursor")
                };
            return i.typeahead(a.config, a.dataSet), i.bind("keyup", r), i.bind("typeahead:render", s), i.bind("typeahead:open", s), _.isFunction(a.onResultSelection) && i.bind("typeahead:select", a.onResultSelection), i
        }
    }(jQuery), function(e) {
        "use strict";

        function t(e) {
            _.isArray(e) || (e = [e]), V.resolveWith({
                type: Y
            }, e)
        }

        function n(e) {
            _.isArray(e) || (e = [e]), V.rejectWith({
                type: Y
            }, e)
        }

        function i(e, t) {
            return a(e.recommendedData), _.isEmpty(e.moviesData) && _.isEmpty(e.cinemas) ? void(_.isEmpty(V) || n({
                error: "no-data"
            })) : (y = e.moviesData && e.moviesData.BookMyShow || {}, w = y.arrEvents, M = y.arrLanguages, _.isEmpty(e.cinemas) || _.isEmpty(e.cinemas.BookMyShow) || (S = e.cinemas.BookMyShow, b = S.aiVN || {}), d.events = d.getEvents(), d.languages = d.getLanguages(), r(e.preferredLanguages), d.dimensions = d.getDimensions(), d.langSequence = d.getLangSequence(), d.cinemas = d.getCinemas(), d.subRegions = d.getSubRegions(), void(z !== !0 && (h.quickBook(), g.dispatchRecommendWizEvent())))
        }

        function a(e) {
            _.isUndefined(e) || _.isNull(e) || _.isEmpty(e.data) || _.isEmpty(e.data.QUICKBOOK) || (B = e.data.QUICKBOOK.MT, d.recommendEvents = d.getRecommendedEvents(), _.isEmpty(BMS.Misc) || _.isEmpty(BMS.Misc.Showtimes) || !_.isFunction(BMS.Misc.Showtimes.renderRecommendations) || BMS.Misc.Showtimes.renderRecommendations(e))
        }

        function r(e) {
            _.isUndefined(e) || _.isNull(e) || _.isEmpty(e.data) || _.isEmpty(e.data.LANGTRANS) || (x = e.data.LANGTRANS.MT.Languages, d.preferredLanguages = d.getPreferredLanguages()), d.getPersistentFilters()
        }

        function s(e) {
            if (!_.isEmpty(y)) return d.getPersistentFilters(), h.quickBook(), void g.dispatchRecommendWizEvent();
            if (_.isEmpty(W) || 1 == z) {
                var t = "/serv/getData",
                    a = {
                        url: t,
                        data: {
                            cmd: "QUICKBOOK",
                            type: "MT"
                        }
                    };
                BMS.Storage.isset({
                    name: "ld"
                }) === !0 && C === !0 && (a.data.getSeenData = 1), k && (a.data.getRecommendedData = 1), W = c.makeAjaxCall(a), W.done(function(t) {
                    i(t, e)
                }), W.fail(function() {
                    _.isEmpty(V) || n({
                        error: "ajax"
                    })
                })
            }
        }
        var o, l, c = {},
            d = {},
            u = {},
            p = {},
            f = {
                container: {},
                filters: {},
                grid: {},
                tabs: {},
                cinemas: {
                    grid: {}
                }
            },
            h = {},
            g = {},
            v = !0,
            m = !1,
            y = null,
            S = null,
            w = null,
            b = null,
            M = null,
            C = !0,
            k = !0,
            B = null,
            x = null,
            E = !0,
            T = ["2D", "3D"],
            $ = "IMAX",
            I = 4,
            A = null,
            R = null,
            D = 2,
            P = 3,
            L = 6,
            N = "quickbook-movies",
            O = BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "text"
            })),
            F = BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "Code"
            })),
            U = BMS.Storage.get({
                name: "Rgn",
                key: "subregionDetails"
            }),
            j = "" != U ? BMS.Misc.fnUrlName(JSON.parse(U).SubRegionName.toLowerCase()) : "",
            G = "" != U ? JSON.parse(U).SubRegionCode.toLowerCase() : "",
            q = {},
            H = {
                matchesFilter: 100,
                recommendedEvent: 90,
                newEvent: 80,
                seenEvent: -20,
                ratedEvent: -30,
                preferredCinema: 90
            },
            V = null,
            z = !1,
            W = null,
            Q = !1,
            Y = "movies",
            K = !0,
            X = new Date;
        l = o = X.getDay(), l += o >= 5 ? 1 : 8;
        var J = new Date(X);
        J.setDate(X.getDate() - l), J.setHours(0, 0, 0, 0), c = {
            sanitize: {
                date: function(e) {
                    var t = e.split("-");
                    return new Date(t[0], t[1] - 1, t[2])
                },
                time: function(e) {
                    var t = e.getHours(),
                        n = e.getMinutes(),
                        i = !1;
                    return t > 12 && (t -= 12, i = !0), n < 10 && (n = "0" + n), t + ":" + n + " pm"
                },
                "boolean": function(e) {
                    return "string" == typeof e ? "Y" == e ? e = !0 : "N" == e ? e = !1 : e : ("object" != typeof e && "array" != typeof e || _.each(e, function(t, n) {
                        e[n] = c.sanitize["boolean"](t)
                    }), e)
                }
            },
            render: function(t, n, i) {
                var a = e("#" + t).html();
                if (!e.isEmptyObject(a)) {
                    t = a.split("\n").join("");
                    var r, s, o, l, c, d, u = /([$\^\\\/()|?+*\[\]{}.\-])/g;
                    return i = i || {}, d = "{{}}", l = d.length, c = Math.ceil(l / 2), s = d.substr(0, c).replace(u, "\\$1"), o = d.substr(c, l).replace(u, "\\$1") || s, r = new RegExp(s + "[^" + s + o + "]+" + o, "g"), t.replace(r, function(e) {
                        var t, i = e.slice(c, -c),
                            a = i.split("."),
                            r = 0,
                            s = a.length;
                        if (i in n) t = n[i];
                        else
                            for (t = n; r < s; r++) {
                                if (!(a[r] in t)) return e;
                                t = t[a[r]]
                            }
                        return t
                    })
                }
            },
            eventMatchesFilter: function(e) {
                var t = !0;
                return q.hasOwnProperty("dimension") && (t = q.dimension.indexOf(e.dimension) !== -1), q.hasOwnProperty("language") && (t = q.language.indexOf(e.lang) !== -1), t && q.hasOwnProperty("isAtmosEnabled") && (t = e.isAtmosEnabled === !0), t
            },
            cinemaMatchesFilter: function(e) {
                var t = !0;
                return q.hasOwnProperty("subRegion") && (t = q.subRegion.indexOf(e.subRegionCode) !== -1), t
            },
            isNewEvent: function(e) {
                var t = new Date(e);
                return t.setHours(0, 0, 0, 0), t >= J
            },
            formattedDate: function(e, t) {
                e = e instanceof Date ? e : new Date(e), t = t || "-";
                var n = e.getMonth() + 1;
                return n = n < 10 ? "0" + n : n, e.getFullYear() + t + n + t + e.getDate()
            },
            sortDimensions: function(e) {
                var t = /^\d+/,
                    n = [],
                    i = [],
                    a = {};
                e.forEach(function(e, r) {
                    var s = e.match(t);
                    null !== s ? void 0 === a[s] ? (a[s] = [e], n.push(s)) : a[s].push(e) : i.push(e)
                });
                var r = n.sort(function(e, t) {
                        return e - t
                    }),
                    s = [];
                r.forEach(function(e) {
                    var t = a[e];
                    1 === t.length ? s.push(t[0]) : (t.sort(), s = s.concat(t))
                });
                var o = i.sort();
                return s.concat(o)
            },
            makeAjaxCall: function(t) {
                return e.ajax({
                    url: t.url,
                    data: t.data,
                    dataType: t.responseType || "JSON",
                    method: t.method || "GET",
                    cache: !1
                })
            }
        }, d.getCinemas = function() {
            var e = {},
                t = BMS.Misc.QuickbookModal.getPreferredCinemas();
            return _.isEmpty(b) || b.forEach(function(n) {
                var i = n.VenueCode,
                    a = n.VenueName,
                    r = "/buytickets/" + BMS.Misc.fnUrlName(a.toLowerCase()) + "-" + ("" != j ? j : O.toLowerCase()) + "/cinema-" + ("" != G ? G : F.toLowerCase()) + "-" + i + "-MT";
                e[i] = {
                    venueCode: i,
                    companyCode: n.CompanyCode,
                    name: a,
                    isAtmosEnabled: n.IsATMOSEnabled,
                    url: r,
                    isPreferred: !_.isUndefined(t[i]),
                    latitude: n.VenueLatitude,
                    longitude: n.VenueLongitude,
                    subRegionCode: n.VenueSubRegionCode,
                    subRegionName: n.VenueSubRegionName,
                    CinemaUnpaidFlag: n.CinemaUnpaidFlag
                }
            }), e
        }, d.getSubRegions = function() {
            var e = {};
            return _.each(d.cinemas, function(t) {
                _.isEmpty(t.subRegionName) || _.isEmpty(t.subRegionCode) || (e[t.subRegionCode] = t.subRegionName)
            }), _.map(e, function(e, t) {
                return {
                    code: t,
                    name: e
                }
            })
        }, d.eventTitleDim = {}, d.getEvents = function() {
            var e = {};
            if (_.isEmpty(w)) return e;
            var t = BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "text"
            }));
            return t = t.toLowerCase(), w.forEach(function(n, i) {
                var a = n.EventTitle,
                    r = n.ChildEvents,
                    s = n.eventGroup;
                _.isUndefined(r) || r.forEach(function(r, o) {
                    var l = r.EventCode,
                        u = r.EventURL || "#",
                        p = "/buytickets/" + u + "-" + ("" != j ? j : t) + "/movie-" + ("" != G ? G : F.toLowerCase()) + "-" + l + "-MT",
                        f = c.sanitize["boolean"](r.isDefault),
                        h = r.EventDimension.trim().toUpperCase(),
                        g = c.sanitize.date(r.EventDate),
                        v = !_.isEmpty(d.recommendEvents) && d.recommendEvents.hasOwnProperty(l);
                    e[l] = {
                        id: l,
                        lang: r.EventLanguage,
                        group: s,
                        censor: r.EventCensor,
                        genre: r.JsonGenre,
                        url: p,
                        syno: r.EventSyno,
                        title: a,
                        eventName: r.EventName,
                        trailerUrl: r.TrailerURL,
                        eventDate: g,
                        isAtmosEnabled: c.sanitize["boolean"](r.EventIsAtmosEnabled),
                        duration: r.Duration,
                        dimension: h,
                        isDefault: f,
                        isNew: r.isNewEvent && "Y" == r.isNewEvent,
                        sequence: i,
                        isSeen: n.isSeen,
                        isRated: n.isRated,
                        isRecommended: v,
                        avgRating: n.avgRating,
                        totalVotes: n.totalVotes
                    }, f && (d.eventTitleDim[a] = {
                        dim: h,
                        eventId: l
                    })
                })
            }), e
        }, d.getRecommendedEvents = function() {
            var e = {};
            return B.forEach(function(t) {
                var n = t.EventCode;
                e[n] = {
                    id: n,
                    venueCode: t.VenueCode,
                    dates: t.Dates
                }
            }), e
        }, d.getLanguages = function() {
            var e = [];
            return _.each(M, function(t) {
                var n = {};
                n.code = t.EventLangCode, n.name = t.EventLangName, e.push(n)
            }), e
        }, d.getPreferredLanguages = function() {
            var e = [];
            return _.each(x, function(t, n) {
                var i = {};
                i.language = n, e.push(i)
            }), e
        }, d.getDimensions = function() {
            var e = {};
            return _.each(d.events, function(t) {
                _.isEmpty(t.dimension) || (e[t.dimension] = !0)
            }), _.map(e, function(e, t) {
                return t
            })
        }, d.getLangSequence = function() {
            var e = [];
            return _.isEmpty(x) || _.each(x, function(t, n) {
                _.findWhere(d.languages, {
                    name: n
                }) && e.push(n)
            }), _.each(d.languages, function(t) {
                e.push(t.name)
            }), e = _.uniq(e)
        }, d.languagesEvents = null, d.getLanguagesEvents = function() {
            var e = {},
                t = d.events;
            d.langSequence;
            return _.each(t, function(t, n) {
                var i = null;
                i = !!c.eventMatchesFilter(t);
                var a = t.lang;
                (_.isUndefined(e[a]) || _.isUndefined(e[a].events)) && (e[a] = {
                    events: {}
                });
                var r = e[t.lang].events,
                    s = t.title;
                if (_.isUndefined(r[s]) && (r[s] = {
                        firstChildEventId: t.id
                    }, t.isFirstChild = !0), i === !0) {
                    var o = r[s].firstChildEventId,
                        l = d.events[o];
                    l.matchesFilter = !0, d.events[o] = l
                } else t.isFirstChild && (t.matchesFilter = i);
                if (!_.isEmpty(t.dimension)) {
                    _.isEmpty(r[s].dimensions) && (r[s].dimensions = []);
                    var u = {
                        dim: t.dimension,
                        eventId: t.id
                    };
                    r[s].dimensions.push(u)
                }
            }), e
        }, d.calculateEventScore = function(e) {
            var t = 0;
            return e.matchesFilter === !0 && (t += H.matchesFilter), e.isSeen === !0 && (t += H.seenEvent), e.isRecommended === !0 && (t += H.recommendedEvent), t
        }, d.calculateCinemaScore = function(e) {
            var t = 0;
            return e.matchesFilter === !0 && (t += H.matchesFilter), e.isPreferred === !0 && (t += H.preferredCinema), t
        }, d.getScoredLanguagesEvents = function() {
            var t = e.extend(!0, {}, d.getLanguagesEvents()),
                n = {};
            return _.each(t, function(e, t) {
                var i = e.events,
                    a = [],
                    r = [];
                _.each(i, function(e, t) {
                    var n = e.firstChildEventId,
                        i = {
                            title: t,
                            dimensions: e.dimensions,
                            firstChildEventId: n
                        },
                        r = d.events[n];
                    i.score = d.calculateEventScore(r), a.push(i)
                }), r = _(a).chain().sortBy(function(e) {
                    return e.title
                }).sortBy(function(e) {
                    return -e.score
                }).value(), n[t] = {}, n[t].events = r
            }), n
        }, d.getPersistentFilters = function() {
            if (BMS.Storage.isset({
                    name: "quickbook"
                })) {
                var e = BMS.Storage.get({
                    name: "quickbook",
                    key: "moviefilters"
                });
                if (e) {
                    if (q = JSON.parse(e), !_.isEmpty(d.preferredLanguages)) {
                        _.each(d.preferredLanguages, function(e, t) {
                            q.language.push(e.language)
                        }), q.language = _.uniq(q.language)
                    }
                    var t = [];
                    _.each(q.language, function(e, n) {
                        _.findWhere(d.languages, {
                            name: e
                        }) && t.push(e)
                    }), q = {}, _.isEmpty(t) || (q.language = t)
                }
            }
        }, d.getFilteredLanguageSequence = function() {
            if (q.hasOwnProperty("language")) {
                var e = [];
                return _.each(d.langSequence, function(t) {
                    q.language.indexOf(t) > -1 && e.push(t)
                }), _.each(d.languages, function(t) {
                    e.push(t.name)
                }), e = _.uniq(e)
            }
            return d.langSequence
        }, u.rows = function() {
            var t = [];
            d.languagesEvents = d.getScoredLanguagesEvents();
            for (var n = d.languagesEvents, i = d.getFilteredLanguageSequence(), a = 0; a < i.length; a++) {
                var r = i[a],
                    s = n[r];
                if (!_.isEmpty(s) && !_.isEmpty(s.events)) {
                    var o = !0;
                    if (_.each(s.events, function(t) {
                            !_.isUndefined(t) && e.isEmptyObject(t.firstChildEventId) && (o = !1)
                        }), o) {
                        var l = s.events;
                        t.push({
                            text: r,
                            type: "header"
                        });
                        var c = l.length;
                        _.each(l, function(n, i) {
                            var a = n.title;
                            if (!_.isEmpty(n.firstChildEventId)) {
                                var r = {
                                    firstChildEventId: n.firstChildEventId,
                                    type: "evt",
                                    url: d.events[n.firstChildEventId].url
                                };
                                i == c - 1 && (r.isLastRowForHeader = !0);
                                var s = !1;
                                if (!_.isUndefined(n.dimensions) && !_.isEmpty(n.dimensions)) {
                                    s = !0, r.hasDimensions = !0;
                                    var o = null;
                                    n.dimensions.forEach(function(t) {
                                        var n = d.eventTitleDim[a];
                                        if (!e.isEmptyObject(n) && t.dim === n.dim) return void(o = t.eventId)
                                    }), _.isEmpty(o) || (r.url = d.events[o].url), r.dimensions = n.dimensions
                                }
                                t.push(r)
                            }
                        })
                    }
                }
            }
            return t
        }, u.cinemaRows = function() {
            var e = [],
                t = _(d.cinemas).chain().each(function(e) {
                    e.matchesFilter = c.cinemaMatchesFilter(e), e.score = d.calculateCinemaScore(e)
                }).sortBy(function(e) {
                    return e.name
                }).sortBy(function(e) {
                    return -e.score
                }).value();
            return _.each(t, function(t) {
                e.push({
                    type: "venue",
                    venueCode: t.venueCode
                })
            }), e
        }, u.gridBasedOnAverage = function(e) {
            for (var t = {}, n = 1, i = 0, a = 0; i < A;) _.isUndefined(t[n]) && (t[n] = {
                rows: []
            }), t[n].rows.push(e[i]), i++, a++, a === R && (n++, a = 0);
            return t
        }, u.minDataGrid = function(e) {
            K = !1;
            for (var t = {}, n = 0, i = 0, a = 0; i < A;) "header" === e[i].type && (n++, a = 0), _.isUndefined(t[n]) && (t[n] = {
                rows: []
            }), t[n].rows.push(e[i]), i++, a++;
            return t
        }, u.grid = function() {
            var t = u.rows();
            A = t.length, R = Math.ceil(A / I);
            var n;
            n = A <= 10 ? e.extend(!0, {}, u.minDataGrid(t)) : e.extend(!0, {}, u.gridBasedOnAverage(t));
            var i = {},
                a = 2 * D,
                r = null,
                s = 0,
                o = 0;
            return _.each(n, function(e, t) {
                t = parseInt(t);
                var l = e.rows;
                _.isEmpty(i[t]) && (i[t] = {
                    rows: []
                });
                var c = i[t].rows;
                l.forEach(function(e, d) {
                    var u = !1;
                    if (r = o < P && R > a ? a : D, "header" == e.type) {
                        if (d >= l.length - r && t < I && o > 0 && d > 0) {
                            var p = t + 1;
                            _.isEmpty(i[p]) && (i[p] = {
                                rows: []
                            }), _.isEmpty(n[p]) && (n[p] = {
                                rows: []
                            });
                            var f = l.splice(d, l.length);
                            s += f.length, u = !0, n[p].rows = f.concat(n[p].rows)
                        }
                        o++
                    }
                    if (!u && 0 == d && "evt" == e.type && e.isLastRowForHeader) {
                        var p = t - 1;
                        i[p].rows.push(e), u = !0
                    }
                    u || c.push(e)
                })
            }), i
        }, u.cinemasGrid = function() {
            for (var e = {}, t = 1, n = u.cinemaRows(), i = Math.ceil(n.length / I), a = 0; a < n.length;) _.isEmpty(e[t]) && (e[t] = {
                rows: []
            }), e[t].rows.push(n[a]), a++, a >= i * t && t++;
            return e
        }, u.setPreferredLanguageFilters = function() {
            if (!_.isEmpty(d.preferredLanguages)) {
                var e = [];
                _.each(d.preferredLanguages, function(t, n) {
                    _.findWhere(d.languages, {
                        name: t.language
                    }) && e.push(t.language)
                }), (!_.isEmpty(e) || e.length >= 1) && (q.language = e)
            }
        }, p.grid = u.grid, p.cinemasGrid = u.cinemasGrid, h.filters = {}, h.filters.clearFilters = function() {
            q = {}
        }, h.filters.dimensions = function(e, t) {
            if (e || (e = _.clone(d.dimensions)), !(_.isEmpty(e) || e.length <= 1)) {
                e = e.filter(function(e) {
                    return T.indexOf(e.toUpperCase()) !== -1 || e.toUpperCase().indexOf($) !== -1 && E === !0
                }), e = c.sortDimensions(e);
                var n = '<div class="__label">Filter</div>';
                _.each(e, function(e) {
                    n += c.render("temp-filter", {
                        text: e,
                        filterValue: e,
                        filterKey: "dimension",
                        hiddenFilters: ""
                    })
                }), t && (n += c.render("temp-filter", {
                    text: "DOLBY ATMOS",
                    filterValue: !0,
                    filterKey: "isAtmosEnabled"
                })), h.filters.appendFilterSet(n, "movie-listing-filter", g.click.applyDimensionFilter)
            }
        }, h.filters.languages = function(e) {
            if (e || (e = _.clone(d.languages)), !(_.isEmpty(e) || e.length <= 1)) {
                for (var t = 0; t < d.langSequence.length; t++) e[t] = d.langSequence[t];
                var n = '<div class="__label">Filter</div>';
                if (e.length <= L) _.each(e, function(e) {
                    var t = "",
                        i = !1;
                    q.hasOwnProperty("language") && q.language.indexOf(e) !== -1 && (i = !0, t = "_active"), n += c.render("temp-filter", {
                        text: e,
                        filterValue: e,
                        filterKey: "language",
                        cssClass: t,
                        active: i,
                        hiddenFilters: ""
                    })
                });
                else {
                    for (var i = e.length - L, t = 0; t < L; t++) {
                        var a = "",
                            r = !1;
                        q.hasOwnProperty("language") && q.language.indexOf(e[t]) !== -1 && (r = !0, a = "_active"), n += c.render("temp-filter", {
                            text: e[t],
                            filterValue: e[t],
                            filterKey: "language",
                            cssClass: a,
                            active: r,
                            hiddenFilters: ""
                        })
                    }
                    for (var s = "", t = L; t < e.length; t++) s += c.render("temp-hidden-filter", {
                        text: e[t],
                        filterValue: e[t],
                        filterKey: "language",
                        cssClass: a,
                        active: r
                    });
                    s = c.render("temp-hidden-filter-set", {
                        filters: s
                    }), n += c.render("temp-filter", {
                        text: "+ " + i + " More",
                        filterValue: "languages-dropdown",
                        filterKey: "language",
                        cssClass: " dropdown ",
                        active: r,
                        hiddenFilters: s
                    })
                }
                h.filters.appendFilterSet(n, "movie-listing-filter", g.click.applyLanguageFilter)
            }
        }, h.filters.subRegions = function(e) {
            if (e || (e = _.clone(d.subRegions)), !(_.isEmpty(e) || e.length <= 1)) {
                var t = '<div class="__label">Filter</div>';
                _.each(e, function(e) {
                    t += c.render("temp-filter", {
                        text: e.name,
                        filterValue: e.code,
                        filterKey: "subRegion",
                        hiddenFilters: ""
                    })
                }), h.filters.appendFilterSet(t, "cinema-listing-filter", g.click.applySubRegionsFilter)
            }
        }, h.filters.appendFilterSet = function(t, n, i) {
            var a = c.render("temp-filter-set", {
                    filters: t,
                    cssClasses: n
                }),
                r = e(a);
            r.find(".__filter").click(i), r.find('input[type="checkbox"]').click(i), r.find(".dropdown").mouseenter(g.mouseenter.filtermenu), r.find(".__filter-menu").mouseleave(g.mouseleave.filtermenu), r.find(".__filter-menu").find("input").each(function() {
                var t = e(this),
                    n = t.data("filterKey"),
                    i = t.data("filterValue");
                q.hasOwnProperty("language") && q[n].indexOf(i) > -1 ? (t.prop("checked", !0), t.data("active", !0)) : (t.removeAttr("checked"), t.data("active", !1))
            }), f.filters.append(r)
        }, h.getEventTitleForEvt = function(e, t) {
            var n = d.events[e],
                i = n.title.trim();
            return _.isEmpty(t) || (i += " - " + t + " "), n.isDefault === !1 && (i += " - " + n.lang), _.isEmpty(n.censor) || (i += " (" + n.censor + ")"), i
        }, h.evt = function(e) {
            var t = d.events[e.firstChildEventId],
                n = t.isNew === !0 && t.isRecommended !== !0 && t.isSeen !== !0 ? "new-event" : "",
                i = "",
                a = "",
                r = "",
                s = "",
                o = "",
                l = "";
            t.matchesFilter === !1 ? i += " filter-false" : _.isEmpty(q) || (i += " matches-filter");
            var u, p = e.dimensions;
            if (!_.isUndefined(p) && 1 == p.length) {
                var f = p[0].dim;
                "2D" !== f && (u = f)
            }
            var g = h.getEventTitleForEvt(t.id, u),
                v = "";
            t.isSeen === !0 ? (i += " _seen", a = c.render("temp-seen-evt-svg")) : !_.isUndefined(p) && p.length > 1 && (v = h.dimensions(e.dimensions));
            var m = "";
            t.isSeen === !0 && t.isRated === !1;
            var y = "";
            return t.isRecommended === !0 && (i += " _recommended", y = c.render("temp-recommended-evt-svg")), _.isUndefined(t.avgRating) || (i += " _rating", o = t.avgRating, s = t.totalVotes, r = c.render("temp-rating-evt-svg", {
                cssRating: l,
                votes: s,
                rating: o
            })), c.render("temp-event", {
                seenContent: a,
                text: g,
                eventURL: e.url,
                cssClass: n,
                containerCssClass: i,
                dimensions: v,
                ratingHTML: m,
                eventId: t.id,
                recommendedContent: y,
                ratingContent: r
            })
        }, h.label = function(e) {
            var t = "";
            return q.hasOwnProperty("language") && q.language.indexOf(e.text) == -1 && (t = "filter-false"), c.render("temp-label", {
                text: e.text.toUpperCase(),
                cssClass: t
            })
        }, h.dimensions = function(e) {
            var t = "",
                n = e[0];
            d.events[n.eventId].title;
            if (1 == e.length) return "";
            var i = _.map(e, function(e) {
                    return e.dim
                }),
                a = c.sortDimensions(i),
                r = _.uniq(a);
            if (r.length <= 1) return "";
            var s = [];
            return e.forEach(function(e) {
                s[a.indexOf(e.dim)] = e
            }), _.each(s, function(e) {
                var n = d.events[e.eventId];
                t += c.render("temp-dimension", {
                    text: e.dim,
                    eventURL: n.url,
                    eventId: n.id
                })
            }), _.isEmpty(t) || (t = '<div class="dimension-container">' + t + "</div>"), t
        }, h.grid = function() {
            var t = [];
            _.each(p.grid(), function(n, i) {
                var a = "";
                if (n.rows.forEach(function(e) {
                        if (!_.isUndefined(e)) {
                            var t = null;
                            switch (e.type) {
                                case "header":
                                    t = "label";
                                    break;
                                case "evt":
                                    t = "evt";
                                    break;
                                case "dimension":
                                    t = "dimension"
                            }
                            var n = h[t](e);
                            _.isEmpty(n) || (a += '<li class="' + t + '-container">' + n + "</li>")
                        }
                    }), !_.isEmpty(a)) {
                    var r = c.render("temp-grid-col", {
                            listHtml: a,
                            viewMore: ""
                        }),
                        s = e(r);
                    t.push({
                        domObj: s
                    })
                }
            });
            var n = "";
            0 === t.length ? n = _.isEmpty(q) ? c.render("temp-no-results") : c.render("temp-no-results-with-filters") : t.forEach(function(e) {
                n += e.domObj.wrap("<div/>").parent().html()
            }), f.grid.html(n), f.grid.find(".__event").on("click", g.click.handleEventClick), f.grid.find(".__dimension").on("click", g.click.handleDimensionClick), f.grid.find(".__rating-container").on("mouseenter", g.mouseenter.heart), f.grid.find(".__rating-container").on("mouseleave", g.mouseleave.heart)
        }, h.applyFilter = function(e, t, n) {
            if (t === !0) switch (e.filterKey) {
                    case "dimension":
                    case "language":
                        if (!_.isEmpty(q[e.filterKey])) {
                            var i = q[e.filterKey].indexOf(e.filterValue);
                            q[e.filterKey].splice(i, 1)
                        }
                        0 == q[e.filterKey].length && delete q[e.filterKey];
                        break;
                    default:
                        delete q[e.filterKey]
                } else if (!_.isEmpty(e)) switch (e.filterKey) {
                    case "dimension":
                        _.isEmpty(q[e.filterKey]) && (q[e.filterKey] = []);
                        var a = q[e.filterKey];
                        a.push(e.filterValue), q[e.filterKey] = _.uniq(a);
                        break;
                    case "language":
                        _.isEmpty(q[e.filterKey]) && (q[e.filterKey] = []);
                        var r = q[e.filterKey];
                        r.push(e.filterValue), q[e.filterKey] = _.uniq(r);
                        break;
                    default:
                        q[e.filterKey] = e.filterValue
                }
                h.grid(), BMS.Misc.QuickbookModal.postRender(f.container);
            var s = _.values(q).join(",");
            BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", {
                "Filter Used": s,
                "Event Type": "MT",
                Appcode: window.global.strAppCode
            }), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "filters",
                category: "Quickbook",
                action: "Movies-Filter",
                label: s
            })
        }, h.cinemas = {}, h.cinemas.venue = function(e) {
            var t = d.cinemas[e.venueCode],
                n = "",
                i = "",
                a = "";
            return t.matchesFilter === !1 ? (n += " filter-false", i += " filter-false") : _.isEmpty(q) || (i += " matches-filter"), t.isPreferred && t.matchesFilter === !0 && (n += "preferred-venue"), "Z" === t.CinemaUnpaidFlag && (a = c.render("temp-unpaid")), c.render("temp-venue", {
                text: t.name,
                venueUrl: t.url,
                cssClass: n,
                containerCssClass: i,
                venueCode: t.venueCode,
                unpaidContent: a
            })
        }, h.cinemas.grid = function() {
            var t, n = "";
            _.each(p.cinemasGrid(), function(i, a) {
                var r = "";
                i.rows.forEach(function(e, t) {
                    if (!_.isUndefined(e)) {
                        var n = null;
                        switch (e.type) {
                            case "venue":
                                n = "venue"
                        }
                        var i = h.cinemas[n](e),
                            a = [n + "-container"];
                        _.isEmpty(i) || (r += '<li class="' + a.join(" ") + '">' + i + "</li>")
                    }
                }), _.isEmpty(r) || (n += c.render("temp-grid-col", {
                    listHtml: r,
                    viewMore: ""
                }), t = e(n))
            }), _.isEmpty(t) ? f.cinemas.grid.html(c.render("temp-no-results")) : (f.cinemas.grid.html(t), f.cinemas.grid.find(".__venue").on("click", g.click.handleVenueClick))
        }, h.cinemas.applyFilter = function(e, t, n) {
            if (t === !0) switch (e.filterKey) {
                    case "subRegion":
                        if (!_.isEmpty(q[e.filterKey])) {
                            var i = q[e.filterKey].indexOf(e.filterValue);
                            q[e.filterKey].splice(i, 1)
                        }
                        0 == q[e.filterKey].length && delete q[e.filterKey];
                        break;
                    default:
                        delete q[e.filterKey]
                } else if (!_.isEmpty(e)) switch (e.filterKey) {
                    case "subRegion":
                        _.isEmpty(q[e.filterKey]) && (q[e.filterKey] = []);
                        var a = q[e.filterKey];
                        a.push(e.filterValue), q[e.filterKey] = _.uniq(a);
                        break;
                    default:
                        q[e.filterKey] = e.filterValue
                }
                h.cinemas.grid(), BMS.Misc.QuickbookModal.postRender(f.container)
        }, h.renderMoviesFilters = function() {
            q.hasOwnProperty("language") || !BMS.Storage.isset({
                name: "ld"
            }) && !BMS.Storage.isset({
                name: "le"
            }) || u.setPreferredLanguageFilters(), h.filters.languages(null)
        }, h.renderCinemasFilters = function() {
            h.filters.subRegions()
        }, h.renderTabs = function() {
            var t = c.render("temp-qb-listing-tabs", {
                primaryButtonText: "Movies",
                secondaryButtonText: "Cinemas"
            });
            f.tabs.html(t).removeClass("none"), f.tabs.find("button").click(function() {
                var t = e(this);
                t.hasClass("_active") || (t.addClass("_active"), t.hasClass("primary-tab") ? h.showPrimaryTabContent() : h.showSecondaryTabContent(), t.siblings().removeClass("_active"))
            })
        }, h.toggleMovieListing = function(e) {
            e === !0 ? (f.grid.removeClass("none"), f.filters.find(".movie-listing-filter").removeClass("none")) : (f.grid.addClass("none"), f.filters.find(".movie-listing-filter").addClass("none"))
        }, h.toggleCinemaListing = function(e) {
            e === !0 ? (f.cinemas.grid.removeClass("none"), f.filters.find(".cinema-listing-filter").removeClass("none"), BMS.Misc.QuickbookModal.hidePreferredCinemasContainer()) : (f.cinemas.grid.addClass("none"), f.filters.find(".cinema-listing-filter").addClass("none"), BMS.Misc.QuickbookModal.showPreferredCinemasContainer())
        }, h.showPrimaryTabContent = function() {
            m = !0, h.toggleMovieListing(!0), h.toggleCinemaListing()
        }, h.showSecondaryTabContent = function() {
            m = !1, h.toggleMovieListing(), h.toggleCinemaListing(!0)
        }, h.renderTabsContent = function() {
            h.renderTabs(), h.renderMoviesListing(), h.renderCinemasListing(), h.showPrimaryTabContent(), f.container.addClass("_has-tabs"), f.filters.removeClass("none")
        }, h.renderMoviesListing = function() {
            f.clearContainers(), h.renderMoviesFilters(), h.grid(), f.grid.find(".evt-dim-container").removeClass("matches-filter")
        }, h.renderCinemasListing = function() {
            f.clearCinemaContainers(), h.renderCinemasFilters(), h.cinemas.grid()
        }, h.quickBook = function() {
            v === !0 ? h.renderTabsContent() : (h.renderMoviesListing(), h.toggleMovieListing(!0), f.filters.removeClass("none")), t(f.container)
        }, h.quickBookPostRender = function() {
            if (v !== !0 || m === !0) {
                var t = [],
                    n = [],
                    i = {
                        index: 0,
                        width: 0
                    },
                    a = 0;
                f.grid.find("ul").each(function(r, s) {
                    var o = e(s);
                    n.push(o);
                    var l = o.width();
                    t.push(parseInt(l)), a += parseInt(l), l > i.width && (i.index = r, i.width = l)
                });
                var r = parseInt(f.container.width()),
                    s = n.length;
                s <= I / 2 && (s *= 3);
                var o = (r - a) / (2 * s);
                if (n.forEach(function(e, n) {
                        t[n] + 2 * o + 1
                    }), a > r) {
                    var l = (n[i.index], (a - r) / 2),
                        c = o - l;
                    i.width + 2 * c + 1
                }
                var d = f.filters.find(".__filter-menu"),
                    u = f.filters.find(".__filter-menu").parent(); - (d.width() - u.width()) / 2
            }
        }, f.prepareContainer = function() {
            f.container = e(c.render("temp-quickbook-container", {
                quickbookType: N,
                containerClass: ""
            })), f.tabs = f.container.find(".qb-tabs"), f.filters = f.container.find(".filters"), f.grid = f.container.find(".grid"), f.cinemas.grid = f.container.find(".venue-grid")
        }, f.clearContainers = function() {
            f.filters.addClass("none").find(".movie-listing-filter").remove(), f.grid.empty().addClass("none")
        }, f.clearCinemaContainers = function() {
            f.filters.addClass("none").find(".cinema-listing-filter").remove(), f.cinemas.grid.empty().addClass("none")
        }, g.click = {}, g.mouseenter = {}, g.mouseleave = {}, g.click.applyDimensionFilter = function(t) {
            var n = e(this),
                i = n.data("filter-key"),
                a = n.data("filter-value"),
                r = n.data("active") === !0,
                s = {};
            if ("All" != a ? (s.filterKey = i, s.filterValue = a) : h.filters.clearFilters(), h.applyFilter(s, r, t), "dimension" === i)
                if ("All" == a) n.parent().siblings().find("._active").removeClass("_active").data("active", !1);
                else {
                    var o = n.parent().siblings().find("[data-filter-value=All]");
                    o.data("active") && (o.data("active", !1), o.removeClass("_active"))
                }
            return n.data("active", !r), r ? n.removeClass("_active") : n.addClass("_active"), !1
        }, g.click.applyLanguageFilter = function(t) {
            var n = e(this),
                i = n.data("filter-key"),
                a = n.data("filter-value");
            if ("languages-dropdown" == a) {
                var r = f.filters.find(".__filter-menu").parent();
                return r.hasClass("_active") ? r.removeClass("_active") : r.addClass("_active"), !1
            }
            var s = n.data("active") === !0,
                o = {};
            if ("All" != a ? (o.filterKey = i, o.filterValue = a) : h.filters.clearFilters(), h.applyFilter(o, s, t), q.hasOwnProperty("language") ? BMS.Storage.set({
                    name: "quickbook",
                    key: "moviefilters",
                    value: JSON.stringify(q)
                }) : BMS.Storage.del({
                    name: "quickbook",
                    key: "moviefilters",
                    value: JSON.stringify(q)
                }), "language" === i)
                if ("All" == a) n.parent().siblings().find("._active").removeClass("_active").data("active", !1);
                else {
                    var l = n.parent().siblings().find("[data-filter-value=All]");
                    l.data("active") && (l.data("active", !1), l.removeClass("_active"))
                }
            n.data("active", !s), s ? n.removeClass("_active") : n.addClass("_active")
        }, g.click.applySubRegionsFilter = function(t) {
            var n = e(this),
                i = n.data("filter-key"),
                a = n.data("filter-value"),
                r = n.data("active") === !0,
                s = {};
            if ("All" != a ? (s.filterKey = i, s.filterValue = a) : h.filters.clearFilters(), h.cinemas.applyFilter(s, r, t), "All" == a) n.parent().siblings().find("._active").removeClass("_active").data("active", !1);
            else {
                var o = n.parent().siblings().find("[data-filter-value=All]");
                o.data("active") && (o.data("active", !1), o.removeClass("_active"))
            }
            return n.data("active", !r), r ? n.removeClass("_active") : n.addClass("_active"), !1
        }, g.click.handleEventClick = function() {
            var t = e(this).data("id"),
                n = d.events[t];
            BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", {
                ProductID: t,
                "Event Name": n.eventName,
                "Event Type": "MT",
                Appcode: window.global.strAppCode
            });
            var i;
            i = n.isNew ? "New-Movie-Click" : "Movies-Click", BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "event_click",
                category: "Quickbook",
                action: i,
                label: n.eventName
            })
        }, g.click.handleVenueClick = function() {}, g.click.handleDimensionClick = function() {
            var t = e(this).data("id"),
                n = d.events[t],
                i = {
                    ProductID: t,
                    "Event Name": n.eventName,
                    "Experience Clicked": n.dimension,
                    "Event Type": "MT",
                    Appcode: window.global.strAppCode
                };
            BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", i)
        }, g.mouseenter.heart = function(t) {
            e(this).find(".__event-votes").show()
        }, g.mouseleave.heart = function() {
            e(this).find(".__event-votes").hide()
        }, g.mouseenter.filtermenu = function() {
            e(this).parent().addClass("_active")
        }, g.mouseleave.filtermenu = function() {
            e(this).parent().removeClass("_active")
        }, g.dispatchRecommendWizEvent = function() {
            if (Q !== !0) {
                Q = !0;
                var e = _.isEmpty(B) ? "No" : "Yes",
                    t = {
                        "Recommendation Shown": e,
                        Appcode: window.global.strAppCode
                    };
                BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", t)
            }
        };
        var Z = function() {
                return f.prepareContainer(), f.clearContainers(), z = !1, V = null, V = new e.Deferred, _.delay(s, 1), V.promise()
            },
            ee = function() {
                h.filters.clearFilters(), y = null, z = !0, Q = !1, s()
            },
            te = function() {
                z = !0, s(!0)
            };
        BMS.Misc.Quickbook = BMS.Misc.Quickbook || {}, BMS.Misc.Quickbook.movies = {
            getFragment: Z,
            resetData: ee,
            prefetchAPIData: te,
            postRender: h.quickBookPostRender
        }
    }(jQuery), function(e) {
        "use strict";

        function t(e) {
            _.isArray(e) || (e = [e]), P.resolveWith({
                type: o
            }, e)
        }

        function n(e) {
            _.isArray(e) || (e = [e]), P.rejectWith({
                type: o
            }, e)
        }

        function i(e, t) {
            s[o] = e, a(t)
        }

        function a(e) {
            var t = s[o];
            return _.isEmpty(t) || _.isEmpty(t.data) ? void(_.isEmpty(P) || n({
                error: "no-data"
            })) : (!_.isEmpty(t.featured) && b ? (M = t.featured[0], k = !0) : (M = null, f.featuredEvents = {}), B = t.data.BookMyShow, x = B.arrEvent, E = B.arrLanguages, T = B.arrJsonGenres, f.labels = f.getLabels(), f.events = f.getEvents(), f.genres = f.getGenres(), f.featuredEvents = f.getFeaturedEvents(), f.languages = f.getLanguages(), void(e !== !0 && y.quickBook()))
        }

        function r(t) {
            if (!_.isEmpty(s[o]) && !_.isEmpty(s[o].data)) return void a();
            var r = "/serv/getData",
                c = {
                    timestamp: e.now(),
                    cmd: "QUICKBOOK",
                    type: l[o]
                },
                d = "json",
                u = e.get(r, c, function(e) {
                    i(e, t)
                }, d);
            u.fail(function() {
                _.isEmpty(P) || n({
                    error: "ajax"
                })
            })
        }
        var s = {},
            o = null,
            l = {
                events: "CT",
                sports: "SP",
                plays: "PL"
            },
            c = {
                events: "ET",
                plays: "PL",
                sports: "ST"
            },
            d = {
                events: {
                    event_click: "Events-Click"
                },
                plays: {
                    event_click: "Plays-Click"
                },
                sports: {
                    event_click: "Sports-Click"
                }
            },
            u = {
                events: "events",
                sports: "sports",
                plays: "plays"
            },
            p = {},
            f = {},
            h = {},
            g = {},
            v = {
                filters: {},
                container: {},
                grid: {}
            },
            m = {},
            y = {},
            S = {},
            w = {
                matchesFilter: 100
            },
            b = !0,
            M = null,
            C = "Featured Events",
            k = !1,
            B = null,
            x = null,
            E = null,
            T = null,
            $ = 4,
            I = 6,
            A = e(window).height();
        A > 500 && A < 700 ? I = 8 : A > 700 && A < 1050 ? I = 18 : A > 1050 && (I = 25);
        var R = !1,
            D = {
                today: "Today",
                tomorrow: "Tomorrow",
                thisWeekend: "This Weekend",
                nextWeekend: "Next Weekend"
            },
            P = null,
            L = [l.sports],
            N = {};
        N[l.events] = ["genres"], N[l.plays] = ["language"];
        var O = BMS.Misc.fnUrlName(BMS.Storage.get({
            name: "Rgn",
            key: "text"
        }));
        p = {
            getLabelByDate: function(e) {
                var t = f.labels,
                    n = "";
                return p.date.isToday(e) && t.indexOf(D.today) !== -1 ? n = D.today : p.date.isTomorrow(e) && t.indexOf(D.tomorrow) !== -1 ? n = D.tomorrow : p.date.isThisWeekend(e) && t.indexOf(D.thisWeekend) !== -1 ? n = D.thisWeekend : p.date.isNextWeekend(e) && t.indexOf(D.nextWeekend) !== -1 && (n = D.nextWeekend), n
            },
            date: {
                isToday: function(e) {
                    var t = p.formattedDate(e);
                    return t === U
                },
                isTomorrow: function(e) {
                    var t = p.formattedDate(e);
                    return t === G
                },
                isThisWeekend: function(e) {
                    var t = p.formattedDate(e);
                    return t == H || t == z
                },
                isNextWeekend: function(e) {
                    var t = p.formattedDate(e);
                    return t == Q || t == K
                }
            },
            formattedDate: function(e, t) {
                e = e instanceof Date ? e : new Date(e), t = t || "-";
                var n = e.getMonth() + 1;
                return n = n < 10 ? "0" + n : n, e.getFullYear() + t + n + t + e.getDate()
            },
            daysInMonth: function(e, t) {
                return new Date(year, e, 0).getDate()
            },
            weekendDates: function() {},
            sanitize: {
                date: function(e) {
                    return new Date(e.substr(0, 4), Number(e.substr(4, 2)) - 1, e.substr(6, 2), e.substr(8, 2), e.substr(10, 2))
                },
                time: function(e) {
                    var t = e.getHours(),
                        n = e.getMinutes(),
                        i = !1;
                    return t > 12 && (t -= 12, i = !0), n < 10 && (n = "0" + n), t + ":" + n + " pm"
                },
                "boolean": function(e) {
                    return "string" == typeof e ? "Y" == e ? e = !0 : "N" == e ? e = !1 : e : ("object" != typeof e && "array" != typeof e || _.each(e, function(t, n) {
                        e[n] = p.sanitize["boolean"](t)
                    }), e)
                }
            },
            render: function(t, n, i) {
                var a = e("#" + t).html();
                if (!e.isEmptyObject(a)) {
                    t = a.split("\n").join("");
                    var r, s, o, l, c, d, u = /([$\^\\\/()|?+*\[\]{}.\-])/g;
                    return i = i || {}, d = "{{}}", l = d.length, c = Math.ceil(l / 2), s = d.substr(0, c).replace(u, "\\$1"), o = d.substr(c, l).replace(u, "\\$1") || s, r = new RegExp(s + "[^" + s + o + "]+" + o, "g"), t.replace(r, function(e) {
                        var t, i = e.slice(c, -c),
                            a = i.split("."),
                            r = 0,
                            s = a.length;
                        if (i in n) t = n[i];
                        else
                            for (t = n; r < s; r++) {
                                if (!(a[r] in t)) return e;
                                t = t[a[r]]
                            }
                        return t
                    })
                }
            },
            eventMatchesFilter: function(e) {
                var t = _.isEmpty(S);
                f.labels;
                return _.each(S, function(n, i) {
                    switch (i) {
                        case "parent-genre":
                            (e.genre.hasOwnProperty(n) || e.genre.hasOwnProperty(_.escape(n))) && (t = !0);
                            break;
                        case "sub-genre":
                            var a = S["parent-genre"],
                                r = [],
                                s = S[i],
                                o = [];
                            s.forEach(function(e, t) {
                                o.push(e);
                                var n = _.escape(e);
                                e !== n && o.push(n)
                            }), _.isEmpty(e.genre) || (r = e.genre[a]);
                            var l = _.intersection(r, o);
                            t = l.length > 0;
                            break;
                        default:
                            t = n.indexOf(e[i]) !== -1
                    }
                }), t
            },
            sortLanguagesForFilters: function(e) {
                var t = _.clone(e);
                return t.sort()
            }
        };
        var F = new Date,
            U = p.formattedDate(F),
            j = new Date(F);
        j.setDate(j.getDate() + 1);
        var G = p.formattedDate(j),
            q = new Date(F);
        q.setDate(q.getDate() + (6 - F.getDay()));
        var H = p.formattedDate(q),
            V = new Date(q);
        V.setDate(V.getDate() + 1);
        var z = p.formattedDate(V),
            W = new Date(V);
        W.setDate(W.getDate() + 6);
        var Q = p.formattedDate(W),
            Y = new Date(W);
        Y.setDate(Y.getDate() + 1);
        var K = p.formattedDate(Y);
        f.getFeaturedEvents = function() {
            var e = {};
            return _.isEmpty(M) ? e : (M.forEach(function(t, n) {
                e[t.EventCode] = {
                    eventId: t.ID,
                    id: t.EventCode,
                    title: t.EventName,
                    details: t.EventDetails,
                    arrDates: t.EventDates,
                    fromDate: t.DateFrom,
                    toDate: t.DateTo,
                    url: t.RedirectURL,
                    location: t.EventLocation,
                    regionCode: t.RegCode,
                    isFeatured: !0,
                    sequence: n
                }
            }), e)
        }, f.getEvents = function() {
            var e = {};
            return x.forEach(function(t, n) {
                var i = t.EventTitle,
                    a = t.EventCode,
                    r = BMS.Misc.fnUrlName(i).toLowerCase(),
                    s = "";
                u[o] !== u.sports || _.isEmpty(O) || _.isUndefined(O) || (s = "/" + O.toLowerCase()), s += "/" + u[o] + "/" + ("" == r ? "-" : r) + "/" + a;
                var l = {},
                    c = t.jsonGenre;
                _.isEmpty(c) || (_.isObject(c) ? l = c : _.isString(c) && (l = JSON.parse(c)));
                var d = [],
                    f = [],
                    h = {},
                    g = t.arrDates;
                g.forEach(function(e) {
                    var t = e.ShowDateCode,
                        n = p.sanitize.date(t),
                        i = p.getLabelByDate(n);
                    d.push(n), _.isEmpty(i) || (h[i] = !0)
                }), f = _.keys(h), e[a] = {
                    id: a,
                    type: t.EventType,
                    title: i,
                    language: t.Language,
                    arrDates: t.arrDates,
                    eventDates: d,
                    ratings: t.Ratings,
                    url: s,
                    viewLabels: f,
                    genre: l,
                    sequence: n
                }
            }), e
        }, f.getLanguages = function() {
            if (l[o] !== l.plays) return [];
            var e = {};
            return _.each(f.events, function(t) {
                var n = _.intersection(t.viewLabels, f.labels);
                0 !== n.length && (e[t.language] = !0)
            }), _.keys(e)
        }, f.getLabels = function() {
            var e = [D.today],
                t = F.getDay(),
                n = 5 === t;
            if (n) e.push(D.thisWeekend, D.nextWeekend);
            else {
                var i = 0 === t || 6 === t;
                i ? e.push(D.tomorrow, D.nextWeekend) : e.push(D.tomorrow, D.thisWeekend)
            }
            return k && e.push(C), e
        }, f.labelsEvents = function() {
            var e = {};
            f.labels.forEach(function(t) {
                e[t] = {
                    events: []
                }
            });
            var t = f.events;
            if (_.each(t, function(t, n) {
                    t.matchesFilter = p.eventMatchesFilter(t), t.viewLabels.forEach(function(n) {
                        if (!_.isUndefined(e[n])) {
                            var i = e[n].events;
                            i.push(t.id)
                        }
                    })
                }), k) {
                var n = [];
                _.each(f.featuredEvents, function(e) {
                    n.push(e.id)
                }), e[C] = {
                    events: n
                }
            }
            return e
        }, f.calculateEventScore = function(e) {
            var t = 0;
            e.matchesFilter !== !0 && e.isFeatured !== !0 || (t += w.matchesFilter);
            var n = e.viewLabels;
            return !_.isUndefined(n) && n.length > 1 && (t -= n.length), t
        }, f.getScoredLabelsEvents = function() {
            var t = e.extend(!0, {}, f.labelsEvents()),
                n = {};
            return _.each(t, function(e, t) {
                var i = e.events,
                    a = [],
                    r = [];
                _.each(i, function(e, n) {
                    var i;
                    i = k && t === C ? f.featuredEvents[e] : f.events[e];
                    var r = {
                        id: e
                    };
                    r.score = f.calculateEventScore(i), a.push(r)
                }), r = _(a).chain().sortBy(function(e) {
                    return t === C ? f.featuredEvents[e.id].title : f.events[e.id].title
                }).sortBy(function(e) {
                    return -e.score
                }).value(), n[t] = {}, n[t].events = r
            }), n
        }, f.getGenres = function() {
            var e = {};
            _.each(f.events, function(t) {
                var n = _.intersection(t.viewLabels, f.labels);
                if (0 !== n.length) {
                    var i = t.genre;
                    _.each(i, function(t, n) {
                        _.isEmpty(e[n]) && (e[n] = []), t = t.concat(e[n]), t = _.uniq(t), t = _.map(t, function(e) {
                            return e.replace(/&amp;/g, "&")
                        }), _.isEmpty(t) || (e[n] = t)
                    })
                }
            });
            var t = [];
            return _.each(T, function(n) {
                var i = n.Code,
                    a = n.childGenres;
                _.each(e, function(e, r) {
                    if (i === r) {
                        var s = [];
                        _.each(a, function(t) {
                            _.contains(e, t.Code) && s.push(t)
                        }), n.childGenres = s, t.push(n)
                    }
                })
            }), e = t
        }, h.rows = function() {
            for (var e = [], t = f.getScoredLabelsEvents(), n = 0; n < f.labels.length; n++) {
                var i = f.labels[n],
                    a = t[i];
                if (!(_.isUndefined(a) || _.isUndefined(a.events) || _.isEmpty(a.events))) {
                    e.push({
                        text: i,
                        type: "header"
                    });
                    var r = a.events;
                    _.each(r, function(t) {
                        e.push({
                            type: "event",
                            id: t.id,
                            isFeatured: i === C && k
                        })
                    })
                }
            }
            return e
        }, h.grid = function() {
            for (var e = {}, t = 1, n = h.rows(), i = 0; i < n.length;) _.isEmpty(e[t]) && (e[t] = {
                rows: []
            }), e[t].rows.push(n[i]), i++, _.isUndefined(n[i]) || "header" != n[i].type || t++;
            return e
        }, h.sportRows = function() {
            var e = [];
            return _.each(f.events, function(t) {
                e.push({
                    type: "event",
                    id: t.id,
                    isFeatured: !1
                })
            }), e
        }, h.sportsGrid = function() {
            for (var e = {}, t = 1, n = h.sportRows(), i = Math.ceil(n.length / $), a = 0; a < n.length;) _.isEmpty(e[t]) && (e[t] = {
                rows: []
            }), e[t].rows.push(n[a]), a++, a >= i * t && t++;
            return e
        }, g.grid = function() {
            return l[o] === l.sports ? h.sportsGrid() : h.grid()
        }, y.filters = {}, y.filters.clearFilters = function() {
            _.isEmpty("sub-genre") || y.filters.hideSubgenres(), S = {}
        }, y.filters.genres = function(e) {
            if (e || (e = _.clone(f.genres)), !_.isEmpty(e)) {
                var t = e;
                t = _.sortBy(t, function(e) {
                    return e.Code
                });
                var n = "";
                t.forEach(function(e) {
                    n += y.filters.getFilterItemHtml("parent-genre", e.Code, e.Name)
                }), v.genreFilters = y.filters.appendFilterSet(n)
            }
        }, y.filters.getFilterItemHtml = function(e, t, n) {
            return p.render("temp-filter", {
                text: n,
                filterValue: t,
                filterKey: e,
                hiddenFilters: ""
            })
        }, y.filters.subGenres = function(e) {
            var t = _.filter(f.genres, function(t) {
                return t.Code == e
            })[0].childGenres;
            if (_.isEmpty(t) || (t = _.clone(t)), _.isEmpty(t) || t.length <= 1) return void y.filters.hideSubgenres();
            t = _.sortBy(t, function(e) {
                return e.Code
            });
            var n = "";
            _.each(t, function(e) {
                n += y.filters.getFilterItemHtml("sub-genre", e.Code, e.Name)
            }), y.filters.hideSubgenres(), v.subGenreFilters = y.filters.appendFilterSet(n, "child-filters")
        }, y.filters.hideSubgenres = function() {
            _.isEmpty(v.subGenreFilters) || v.subGenreFilters.empty().addClass("none")
        }, y.filters.appendFilterSet = function(t, n) {
            var i = p.render("temp-filter-set", {
                    filters: t,
                    cssClasses: n || ""
                }),
                a = e(i);
            return a.find(".__filter").click(m.click.applyFilters), v.filters.append(a), R || (v.filters.removeClass("none"), R = !0), a
        }, y.filters.languages = function(e) {
            if (e || (e = _.clone(f.languages)), !(_.isEmpty(e) || e.length <= 1)) {
                e = _.filter(e, function(e) {
                    return e.indexOf("/") < 0
                }), e = p.sortLanguagesForFilters(e);
                var t = e.indexOf("Others");
                if (t === -1 && (t = e.indexOf("others")), t !== -1) {
                    var n = e.splice(t, 1);
                    e.push(n)
                }
                var i = '<div class="__label">Language</div>';
                _.each(e, function(e) {
                    i += p.render("temp-filter", {
                        text: e,
                        filterValue: e,
                        filterKey: "language",
                        hiddenFilters: ""
                    })
                }), v.languageFilters = y.filters.appendFilterSet(i)
            }
        }, y.evt = function(e) {
            var t;
            t = e.isFeatured ? f.featuredEvents[e.id] : f.events[e.id];
            var n = {},
                i = "",
                a = "",
                r = "";
            return t.matchesFilter === !1 ? i += " filter-false" : e.isFeatured === !0 ? i += " featured-event" : _.isEmpty(S) || (r += " matches-filter"), n.html = p.render("temp-event", {
                seenContent: "",
                text: t.title,
                eventURL: t.url,
                cssClass: a,
                containerCssClass: r,
                dimensions: "",
                ratingHTML: "",
                eventId: e.id,
                recommendedContent: "",
                ratingContent: ""
            }), n.cssClass = i, n
        }, y.label = function(e) {
            return p.render("temp-label", {
                text: e.text.toUpperCase()
            })
        }, y.grid = function() {
            var t, i = "";
            _.each(g.grid(), function(n, a) {
                var r = "",
                    s = !1;
                if (n.rows.forEach(function(e, t) {
                        if (!_.isUndefined(e)) {
                            var n = null;
                            switch (e.type) {
                                case "header":
                                    n = "label";
                                    break;
                                case "event":
                                    n = "evt"
                            }
                            var i = y[n](e),
                                a = [n + "-container"];
                            _.isEmpty(i) || (t > I && (s = !0, a.push("_hidden")), _.isObject(i) ? (a.push(i.cssClass), r += '<li class="' + a.join(" ") + '">' + i.html + "</li>") : r += '<li class="' + a.join(" ") + '">' + i + "</li>")
                        }
                    }), !_.isEmpty(r)) {
                    var o = "";
                    s === !0 && (o += p.render("temp-view-more")), i += p.render("temp-grid-col", {
                        listHtml: r,
                        viewMore: o
                    }), t = e(i), t.find(".__view-more").click(m.click.handleViewMoreLink)
                }
            }), _.isEmpty(t) ? n({
                error: "no-data"
            }) : (v.grid.html(t).removeClass("none"), v.grid.find(".__event").on("click", m.click.handleEventClick))
        }, y.applyFilter = function(e, t, n) {
            if (t === !0) switch (e.filterKey) {
                    case "parent-genre":
                        _.isEmpty(S[e.filterKey]) || delete S[e.filterKey], _.isEmpty(S["sub-genre"]) || delete S["sub-genre"], y.filters.hideSubgenres();
                        break;
                    case "sub-genre":
                        var i = S[e.filterKey].indexOf(e.filterValue);
                        S[e.filterKey].splice(i, 1), 0 === S[e.filterKey].length && delete S[e.filterKey];
                        break;
                    default:
                        var i = S[e.filterKey].indexOf(e.filterValue);
                        S[e.filterKey].splice(i, 1), 0 === S[e.filterKey].length && delete S[e.filterKey]
                } else if (!_.isEmpty(e)) switch (e.filterKey) {
                    case "parent-genre":
                        S[e.filterKey] = e.filterValue, _.isEmpty(S["sub-genre"]) || delete S["sub-genre"], y.filters.subGenres(S["parent-genre"]);
                        break;
                    case "sub-genre":
                        _.isEmpty(S[e.filterKey]) && (S[e.filterKey] = []);
                        var a = S[e.filterKey];
                        a.push(e.filterValue), S[e.filterKey] = _.uniq(a);
                        break;
                    default:
                        _.isEmpty(S[e.filterKey]) && (S[e.filterKey] = []);
                        var r = S[e.filterKey];
                        r.push(e.filterValue), S[e.filterKey] = _.uniq(r)
                }
                y.grid();
            var s = _.values(S).join(",");
            BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", {
                "Filter Used": s,
                "Event Type": c[o],
                Appcode: window.global.strAppCode
            }), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "filters",
                category: "Quickbook",
                action: "Movies-Filter",
                label: s
            })
        }, y.generateFilters = function() {
            L.indexOf(l[o]) === -1 && (N[l[o]].indexOf("genres") !== -1 && y.filters.genres(), N[l[o]].indexOf("language") !== -1 && y.filters.languages())
        }, y.quickBook = function() {
            var e = s[o];
            return _.isEmpty(e) || _.isEmpty(e.data) ? void n({
                error: "no-data"
            }) : (y.generateFilters(), y.grid(), void t(v.container))
        }, v.prepareContainer = function() {
            var t = e(p.render("temp-quickbook-container", {
                quickbookType: "quickbook-" + o,
                containerClass: "other-events"
            }));
            v.container = t, v.filters = v.container.find(".filters"), v.grid = v.container.find(".grid")
        }, v.clearContainers = function() {
            R = !1, v.filters.empty().addClass("none"), v.grid.empty().addClass("none"), v.prepareContainer()
        }, m.click = {}, m.click.applyFilters = function(t) {
            var n = e(this),
                i = n.data("filter-key"),
                a = n.data("filter-value"),
                r = {},
                s = n.data("active") === !0;
            if ("All" !== a ? (r.filterKey = i, r.filterValue = a) : (delete S[i], i == ["parent-genre"] && (delete S["sub-genre"], y.filters.hideSubgenres())), y.applyFilter(r, s, t), "parent-genre" === i || "sub-genre" === i && "All" === a) n.parent().siblings().find("._active").removeClass("_active").data("active", !1);
            else if ("sub-genre" == i) {
                var o = n.parent().siblings().find("[data-filter-value=All]");
                o.data("active") && (o.data("active", !1), o.removeClass("_active"))
            }
            return n.data("active", !s), s ? n.removeClass("_active") : n.addClass("_active"), !1
        }, m.click.handleEventClick = function() {
            var t = e(this).data("id"),
                n = f.events[t];
            BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", {
                ProductID: t,
                "Event Name": n.title,
                "Event Type": c[o],
                Appcode: window.global.strAppCode
            }), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "event_click",
                category: "Quickbook",
                action: d[o].event_click,
                label: n.title
            })
        }, m.click.handleViewMoreLink = function() {
            var t = e(this);
            return t.addClass("none").prev().find("._hidden").removeClass("_hidden"), !1
        };
        var X = function(t) {
                return P = new e.Deferred, o = t, v.prepareContainer(), v.clearContainers(), y.filters.clearFilters(), _.delay(r, 1), P.promise()
            },
            J = function() {
                s = {}, y.filters.clearFilters(), v.prepareContainer(), v.clearContainers()
            },
            Z = function(e) {
                o = e, r(!0)
            };
        BMS.Misc.Quickbook = BMS.Misc.Quickbook || {}, BMS.Misc.Quickbook.events = {
            getFragment: X,
            resetData: J,
            prefetchAPIData: Z
        }
    }(jQuery), function() {
        function e() {
            var e = r.modal.find(".modal-header").outerHeight(),
                t = $(window).height();
            r.modal.find(".qb-overflow-wrapper").css({
                height: t - e + "px"
            })
        }
        var t, n = {},
            i = !1,
            a = {},
            r = {},
            s = "",
            o = !1,
            l = ["favourites", "mostRecentlyBooked", "mostRecentlySurfed", "popular"],
            c = {
                favourites: "favourites"
            },
            d = 3,
            u = [],
            p = BMS.Storage.get({
                name: "Rgn",
                key: "subregionDetails"
            }),
            f = "" != p ? BMS.Misc.fnUrlName(JSON.parse(p).SubRegionName.toLowerCase()) : "",
            h = "" != p ? JSON.parse(p).SubRegionCode.toLowerCase() : "",
            g = {
                movies: "movies",
                events: "events",
                sports: "sports",
                plays: "plays"
            };
        n.initializeDOM = function() {
            r = {
                mainBodyWrapper: $("body > .main-body-wrapper"),
                showCaseCarousel: $("#showcase-primary .showcase-carousel")
            }, r.quickbookWrapper = $("#quickbook-wrapper"), r.modalOverlay = r.quickbookWrapper.find(".qb-modal-overlay"), r.modal = $(".modal", r.quickbookWrapper), r.searchBoxContainer = $(".qb-search-box-container"), r.searchDropdown = r.searchBoxContainer.find("#btn-dd-search"), r.region = r.searchBoxContainer.find(".qb-region"), r.preferredCinemas = $(".preferred-cinemas-container", r.quickbookWrapper), r.quickbookOverFlowWrapper = r.modal.find(".modal-body .qb-overflow-wrapper"), r.quickbookBody = r.quickbookWrapper.find(".quickbook-body"), r.topTrending = r.modal.find(".modal-body #qb-top-trending"), r.qbSearchListIcon = r.searchBoxContainer.find("#search-list-icon")
        }, a.render = function(e, t, n) {
            var i = $("#" + e).html();
            if (!$.isEmptyObject(i)) {
                e = i.split("\n").join("");
                var a, r, s, o, l, c, d = /([$\^\\\/()|?+*\[\]{}.\-])/g;
                return n = n || {}, c = "{{}}", o = c.length, l = Math.ceil(o / 2), r = c.substr(0, l).replace(d, "\\$1"), s = c.substr(l, o).replace(d, "\\$1") || r, a = new RegExp(r + "[^" + r + s + "]+" + s, "g"), e.replace(a, function(e) {
                    var n, i = e.slice(l, -l),
                        a = i.split("."),
                        r = 0,
                        s = a.length;
                    if (i in t) n = t[i];
                    else
                        for (n = t; r < s; r++) {
                            if (!(a[r] in n)) return e;
                            n = n[a[r]]
                        }
                    return n
                })
            }
        }, n.isOpen = function() {
            return i
        }, n.updateIsOpen = function(e) {
            i = e
        }, n.show = function(t) {
            s = t;
            var i = n.isOpen();
            r.qbSearchListIcon.hide(), i ? (n.clearQuickbookBody(), s !== g.movies ? (n.hideTopTrendingMovies(), n.hidePreferredCinemas(!0)) : n.showPreferredCinemas(!0), n.showLoaderTemplate(), n.unbindResizeHandler()) : (handlePopups.freezeDocument(), n.doShowAnimation(), n.showSearchbox(), s === g.movies ? n.showPreferredCinemas(!0) : n.hidePreferredCinemas(!0)), e(), i || n.showLoaderTemplate(), n.showQuickbook(s), i || n.updateIsOpen(!0)
        }, n.doShowAnimation = function() {
            r.modal.removeClass("none"), r.modalOverlay.removeClass("none"), r.quickbookWrapper.hasClass("_fixed") && (o = !0, r.quickbookWrapper.removeClass("_fixed")), r.quickbookWrapper.addClass("_active")
        }, n.hide = function() {
            handlePopups.releaseDocument(), n.clearQuickbookBody(), n.unbindResizeHandler(), r.qbSearchListIcon.show(), s === g.movies && n.hideTopTrendingMovies(), n.hideSearchbox(), n.showPreferredCinemasContainer(), n.hidePreferredCinemas(), n.updateIsOpen(!1), n.doHideAnimation()
        }, n.doHideAnimation = function() {
            r.mainBodyWrapper.removeClass("_blur"), o === !0 && (o = !1, r.quickbookWrapper.addClass("_fixed")), r.quickbookWrapper.removeClass("_active"), setTimeout(function() {}, 10), r.modalOverlay.addClass("none")
        }, n.getCurrentQuickbookObject = function() {
            var e = null;
            return _.isEmpty(s) && (s = r.searchDropdown.data("type")), e = s !== g.movies ? BMS.Misc.Quickbook.events : BMS.Misc.Quickbook[s]
        }, n.showQuickbook = function() {
            var e = n.getCurrentQuickbookObject(),
                t = e.getFragment(s);
            t.done(function(e) {
                this.type === s && n.renderQuickbookContent(e, s)
            }), t.fail(function(e) {
                this.type === s && n.showNoResultsTemplate(e)
            })
        }, n.renderQuickbookContent = function(e) {
            s === g.movies && r.quickbookBody.css("visibility", "hidden"), r.quickbookBody.html(e), n.postRender(), r.quickbookBody.css("visibility", "visible"), s === g.movies && n.showTopTrendingMovies(), n.bindResizeHandler()
        }, n.bindResizeHandler = function() {
            t = _.debounce(function() {
                n.postRender(), e()
            }, 400), $(window).bind("resize", t)
        }, n.unbindResizeHandler = function() {
            $(window).unbind("resize", t)
        }, n.postRender = function() {
            var e = n.getCurrentQuickbookObject();
            _.isUndefined(e) || _.isUndefined(e.postRender) || e.postRender.call(this)
        }, n.clearQuickbookBody = function() {
            r.quickbookBody.html("")
        }, n.showNoResultsTemplate = function() {
            r.quickbookBody.html(a.render("temp-no-results"))
        }, n.showLoaderTemplate = function() {
            r.quickbookBody.html(a.render("temp-qb-loader"))
        }, n.showRegion = function() {
            _.isEmpty(r.region.find(".region-name").html()) || r.region.removeClass("none")
        }, n.hideRegion = function() {
            r.region.addClass("none")
        }, n.showPreferredCinemas = function(e) {
            r.preferredCinemas.html().trim().length > 0 && r.preferredCinemas.removeClass("none"), e === !0 && r.preferredCinemas.addClass("qb-active")
        }, n.hidePreferredCinemas = function(e) {
            r.preferredCinemas.removeClass("qb-active"), 1 == e && r.preferredCinemas.addClass("none")
        }, n.showSearchbox = function() {
            r.searchBoxContainer.addClass("_fixed"), r.searchBoxContainer.addClass("_shift")
        }, n.hideSearchbox = function() {
            r.searchBoxContainer.removeClass("_shift"), setTimeout(function() {
                r.searchBoxContainer.removeClass("_fixed")
            }, 200)
        }, n.showTopTrendingMovies = function() {}, n.hideTopTrendingMovies = function() {}, n.resetQuickbookListingData = function() {
            BMS.Misc.Quickbook[g.movies].resetData(), BMS.Misc.Quickbook[g.events].resetData(), n.getPreferredCinemasData()
        }, n.prefetchAPIData = function() {
            var e = n.getCurrentQuickbookObject();
            e.prefetchAPIData(s)
        }, n.getPreferredCinemasData = function() {
            var e = $.ajax({
                url: "/serv/getData",
                data: {
                    cmd: "GETPREFERREDCINEMAS"
                },
                dataType: "json",
                cache: !1
            });
            e.done(function(e) {
                n.processPreferredCinemas(e)
            })
        }, n.processPreferredCinemas = function(e) {
            if (!_.isEmpty(e)) {
                try {
                    BMS.Storage.set({
                        name: "userCine",
                        key: "pop",
                        value: _.keys(e.popular).join(";"),
                        storage: "C",
                        sess: !1
                    })
                } catch (t) {}
                var i, a, r = 0,
                    s = {};
                for (i = 0; i < l.length; i++) {
                    if (r >= d) break;
                    var o = l[i],
                        p = e[o];
                    _.each(p, function(e, t) {
                        return r !== d && (o === c.favourites && (a = "Favourite Cinemas"), void(s.hasOwnProperty(t) || (s[t] = e, r++)))
                    })
                }
                _.isEmpty(a) && (a = "Preferred Cinemas");
                var f = _.map(s, function(e) {
                    return e
                });
                f = _.compact(f), f.length < 1 || (u = f, n.renderPreferredCinemas({
                    label: a,
                    data: f
                }))
            }
        }, n.renderPreferredCinemas = function(e) {
            var t = "",
                i = [];
            e.data.forEach(function(e) {
                var t = "/buytickets/" + BMS.Misc.fnUrlName(e.venueName.toLowerCase()) + "-" + ("" != f ? f : BMS.Misc.fnUrlName(e.regionName.toLowerCase())) + "/cinema-" + ("" != h ? h : e.regionCode.toLowerCase()) + "-" + e.venueCode + "-MT";
                i.push(a.render("temp-preferred-cinema-item", {
                    url: t,
                    name: e.venueName
                }))
            });
            var t = a.render("temp-preferred-cinemas", {
                label: e.label.trim(),
                data: i.join(", ")
            });
            r.preferredCinemas.html(t), s === g.movies && n.showPreferredCinemas(), r.preferredCinemas.find("a").on("click.preferred", function(e) {
                e.stopPropagation();
                var t, n;
                r.preferredCinemas.hasClass("qb-active") ? (t = "QuickBook", n = "under_search") : (t = "Home", n = "banner"), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                    event: "click_preferred_home_13",
                    domain: "bms_web",
                    pagetype: t,
                    discovery: "Product Discovery",
                    action: "Preferred Click",
                    pagesection: n,
                    venue_name: $(this).text()
                })
            })
        }, n.getPreferredCinemasObject = function() {
            var e = {};
            return u.forEach(function(t) {
                e[t.venueCode] = t
            }), e
        }, n.showPreferredCinemasContainer = function() {
            r.preferredCinemas.removeClass("none")
        }, n.hidePreferredCinemasContainer = function() {
            r.preferredCinemas.addClass("none")
        }, n.initialize = function() {
            n.initializeDOM(), r.quickbookWrapper.length > 0 && (n.prefetchAPIData(), n.getPreferredCinemasData(), global.blnIsTouchScreen !== !0 && (BMS.SignIn.fnRegister("quickbook-preferred-cinemas", n.getPreferredCinemasData), BMS.SignIn.fnRegister("quickbook-listing", n.resetQuickbookListingData), global.RgnCallBack.push(n.resetQuickbookListingData)))
        }, BMS.Misc.QuickbookModal = {
            initialize: n.initialize,
            show: n.show,
            hide: n.hide,
            postRender: n.postRender,
            getPreferredCinemas: n.getPreferredCinemasObject,
            showPreferredCinemasContainer: n.showPreferredCinemasContainer,
            hidePreferredCinemasContainer: n.hidePreferredCinemasContainer,
            isOpen: n.isOpen
        }
    }(), function() {
        function e() {
            var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase(),
                t = "videos" == e,
                n = $(".tt-menu .tt-dataset"),
                i = $("#search-list-icon");
            t || global.blnIsTouchScreen && "videos" == pageName ? (n.addClass("tt-dataset-videos"), global.blnIsTouchScreen && n.addClass("_touch"), ne(e)) : (n.removeClass("tt-dataset-videos"), ie(!0)), "videos" != pageName || global.blnIsTouchScreen || t && i.hide()
        }

        function t() {
            V.searchBoxContainer = $(".qb-search-box-container"), V.searchBox = V.searchBoxContainer.find(".search-box"), V.dropdownButton = V.searchBoxContainer.find("#btn-dd-search"), V.dropdownMenu = V.searchBoxContainer.find(".search-dropdown-menu"), V.searchDropdown = V.searchBoxContainer.find(".search-dropdown"), H = V.searchBox.typeaheadWrapper(X.options)
        }

        function n() {
            $(".venue-info-btn").on("click", function() {
                i()
            })
        }

        function i() {
            var e = $("#address-info-pop-up #venue-location-map-popover"),
                t = parseFloat(e.attr("lat")),
                n = parseFloat(e.attr("lon")),
                i = new google.maps.LatLng(t, n),
                a = new google.maps.Map(e[0], {
                    zoom: 14,
                    center: i
                });
            new google.maps.Marker({
                position: i,
                map: a
            });
            a.setCenter(location)
        }

        function a(e) {
            if (27 != e.keyCode && 27 != e.which || U || !ee().length) {
                if (U = !1, global.blnIsTouchScreen && !ee())
                    if (13 === e.keyCode || 13 == e.which) {
                        var t = $(e.target).parent().find(".tt-cursor");
                        t.length > 0 && t.trigger("tap")
                    } else c()
            } else U = !0, e.stopPropagation();
            if ("videos" == pageName) {
                var n = $("#btn-dd-search .selected-type").text().trim().toLowerCase(),
                    i = "videos" == n,
                    a = $(".tt-menu .tt-dataset"),
                    r = $("#search-list-icon");
                i || global.blnIsTouchScreen && "videos" == pageName ? (a.addClass("tt-dataset-videos"), global.blnIsTouchScreen && a.addClass("_touch"), i && r.hide()) : a.removeClass("tt-dataset-videos")
            }
        }

        function r(e) {
            27 != e.keyCode && 27 != e.which || ie(!1)
        }

        function s(t) {
            var n = $(this),
                i = n.data("type"),
                a = n.data("value");
            V.searchDropdown.removeClass("_hovered"), J();
            var r = 0;
            1 === n.data("isall") && (r = 1), V.dropdownButton.data({
                type: i,
                value: a,
                isall: r
            }).find(".icon-type").html(n.find(".icon-type").html()).next().text(n.text()), V.dropdownMenu.children().removeClass("none"), n.parent().addClass("none"), e(), fnHandleQuickbookRecommendation(a);
            var s = {
                "Category Selected": V.dropdownButton.text().trim(),
                Appcode: window.global.strAppCode
            };
            return BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", s), !1
        }

        function o() {
            var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
            $("#quickbook-wrapper .qb-modal-overlay").hasClass("none") && ("videos" != e ? ie(!0) : ne(e), V.searchDropdown.removeClass("_hovered"))
        }

        function l() {
            var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
            $("#quickbook-wrapper .qb-modal-overlay").hasClass("none") && $("#quickbook-wrapper").length > 0 && ("videos" != e ? ie(!0) : ne(e)), c()
        }

        function c() {
            if (global.blnIsTouchScreen && !ee() && "videos" != pageName)
                if (_.isEmpty(ae.trendingSearchData)) {
                    var e = $("#qb-search-box-container .tt-menu"),
                        t = e.find(".tt-dataset");
                    t.html('<div class="tt-searching">Searching...</div>'), e.show(), BMS.Misc.fnAjax({
                        dataType: "json",
                        type: "GET",
                        url: global.getDataUrl + "?cmd=GETTRENDINGSEARCH",
                        success: M,
                        error: function(e) {
                            t.html('<div class="tt-no-results">No matching results</div>'), void 0
                        }
                    })
                } else $("#qb-search-box-container").length > 0 && $("#qb-search-box-container .trending-search-suggestion").length > 0 ? $("#qb-search-box-container .tt-menu").show() : k()
        }

        function d() {
            "home" == pageName && BMS.Misc.fnAjax({
                dataType: "json",
                type: "GET",
                url: global.getDataUrl + "?cmd=GETTRENDINGSEARCH",
                success: u,
                error: function(e) {
                    void 0
                }
            })
        }

        function u(e) {
            ae.trendingSearchData = e, p()
        }

        function p() {
            for (var e = ae.trendingSearchData.TRNDZ, t = e.length, n = 0; n < t; n++) {
                var i = e[n];
                ae.hitsData[i.TYPE] = i.VALUE.hits
            }
            f(), h()
        }

        function f() {
            var e, t, n, i = [],
                a = [],
                r = 0,
                s = 0,
                o = 0,
                l = 0,
                c = 0;
            if (_.isEmpty(ae.hitsData.CT) || (e = ae.hitsData.CT.length), _.isEmpty(ae.hitsData.PL) || (t = ae.hitsData.PL.length), _.isEmpty(ae.hitsData.SP) || (n = ae.hitsData.SP.length), _.isEmpty(ae.hitsData.CT) || _.isEmpty(ae.hitsData.PL) || _.isEmpty(ae.hitsData.SP) ? _.isEmpty(ae.hitsData.CT) || _.isEmpty(ae.hitsData.PL) || !_.isEmpty(ae.hitsData.SP) ? !_.isEmpty(ae.hitsData.CT) || _.isEmpty(ae.hitsData.PL) || _.isEmpty(ae.hitsData.SP) ? _.isEmpty(ae.hitsData.CT) || !_.isEmpty(ae.hitsData.PL) || _.isEmpty(ae.hitsData.SP) ? !_.isEmpty(ae.hitsData.CT) && _.isEmpty(ae.hitsData.PL) && _.isEmpty(ae.hitsData.SP) ? e >= 6 ? s = 6 : 5 == e ? s = 5 : 4 == e ? s = 4 : 3 == e ? s = 3 : 2 == e ? s = 2 : 1 == e && (s = 1) : _.isEmpty(ae.hitsData.CT) && !_.isEmpty(ae.hitsData.PL) && _.isEmpty(ae.hitsData.SP) ? t >= 6 ? o = 6 : 5 == t ? o = 5 : 4 == t ? o = 4 : 3 == t ? o = 3 : 2 == t ? o = 2 : 1 == t && (o = 1) : _.isEmpty(ae.hitsData.CT) && _.isEmpty(ae.hitsData.PL) && !_.isEmpty(ae.hitsData.SP) && (n >= 6 ? l = 6 : 5 == n ? l = 5 : 4 == n ? l = 4 : 3 == n ? l = 3 : 2 == n ? l = 2 : 1 == n && (l = 1)) : (e >= 3 ? s = 3 : 2 == e ? s = 2 : 1 == e && (s = 1), n >= 3 ? l = 3 : n >= 2 ? l = 2 : 1 == n && (l = 1)) : (t >= 3 ? o = 3 : 2 == t ? o = 2 : 1 == t && (o = 1), n >= 3 ? l = 3 : n >= 2 ? l = 2 : 1 == n && (l = 1)) : (e >= 3 ? s = 3 : 2 == e ? s = 2 : 1 == e && (s = 1), t >= 3 ? o = 3 : t >= 2 ? o = 2 : 1 == t && (o = 1)) : (e >= 2 ? s = 2 : 1 == e && (s = 1), t >= 2 ? o = 2 : 1 == t && (o = 1), n >= 2 ? l = 2 : 1 == n && (l = 1)), c = s + o + l, r = 9 - c, ae.hitsData.MT.length > r)
                for (var d = 0; d < r; d++) a.push(ae.hitsData.MT[d]);
            else
                for (var d = 0; d < ae.hitsData.MT.length; d++) a.push(ae.hitsData.MT[d]);
            for (var u = 0; u < c; u++) u < s ? i.push(ae.hitsData.CT[u]) : u < s + o ? i.push(ae.hitsData.PL[u]) : u < c && i.push(ae.hitsData.SP[u]);
            ae.hitsData.FINAL = a.concat(i)
        }

        function h() {
            var e = ae.hitsData.FINAL,
                t = (e.length, $(".ts-desktop-main .trending-search-result-block #trending-search-result-container"));
            if ("undefined" != typeof e && 0 != e.size) {
                var n = "",
                    i = 0;
                e.forEach(function(e, t) {
                    var i = b(e),
                        a = e.TITLE.trim(),
                        r = e.TYPE,
                        s = ae.getCategoryDetails(r),
                        o = s.category;
                    switch (o) {
                        case "Movie":
                            o = "Movies";
                            break;
                        case "Play":
                            o = "Plays";
                            break;
                        case "Sport":
                            o = "Sports";
                            break;
                        case "Event":
                            o = "Events"
                    }
                    var l = '<div class="trending-search-card">    \t\t\t\t\t\t<div class="event-name-container">    \t\t\t\t\t\t\t<div class="event-name"><a href="' + i + '" class="event-url" data-search-index="' + t + '" url="' + i + '" data-search-type="ALL">' + a + '</a>        \t\t\t\t\t\t</div>    \t\t\t\t\t\t\t<div class="event-type">' + o + "</div>    \t\t\t\t\t\t</div>    \t\t\t\t\t</div>";
                    n += l
                }), $.when(t.html(n)).then(function() {
                    Array.prototype.forEach.call(t.find(".trending-search-card"), function(e, t) {
                        i += parseInt($(e).css("width"))
                    }), i += 2, t.css("width", i)
                }), y(), g()
            }
        }

        function g() {
            var e = $(".ts-desktop-main .trending-search-result-container .trending-search-card .event-url");
            e.on("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var t = $(e.currentTarget),
                    n = t.data("search-type"),
                    i = ae.hitsData[n],
                    a = t.data("search-index"),
                    r = i[a],
                    s = $.extend(!0, {}, r),
                    o = "",
                    l = r.TITLE,
                    c = (r.ID, r.ST, JSON.parse(BMS.Storage.get({
                        name: "buytickets",
                        storage: "L",
                        key: "filters"
                    }) || "{}").subRegions || []),
                    o = t.attr("url");
                try {
                    s.INPUT = "", s.REGION = BMS.Storage.get({
                        name: "Rgn",
                        storage: "C",
                        key: "Code"
                    }), s.SUBREGION = c.join(", "), s.POSN = a + 1, s.SRC = "WEB"
                } catch (d) {}
                BMS.Misc.fnAjax({
                    url: global.getDataUrl + "?cmd=PUSHTRENDINGSEARCH",
                    type: "POST",
                    data: JSON.stringify(s),
                    contentType: "application/json"
                }), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                    event: "trendingsearch_home_14",
                    slot_no: a,
                    eventname: l
                }), BMS.Misc.fnBusy(!0), window.location.assign(o)
            })
        }

        function v() {
            var e, t, n = "",
                i = $(".ts-desktop-main .trending-search-text"),
                a = $(".ts-desktop-main .trending-search-result-block"),
                r = BMS.Storage.get({
                    name: "Rgn",
                    key: "text"
                });
            n = _.isEmpty(r) ? "" : "in " + r + " ", i.find(".trending-in-region-text").html(n), e = parseInt(i.css("width")) + parseInt(i.css("padding-left")) + parseInt(i.css("padding-right")), i.attr("width", e), t = Math.floor(parseInt($(".ts-desktop-main .ts-desktop-wrapper").css("width"))) - (Math.floor(e) + 2), i.css("width", e + "px"), a.css("width", t + "px"), m()
        }

        function m() {
            $(window).resize(function() {
                var e, t, n = $(".ts-desktop-main .trending-search-text"),
                    i = $(".ts-desktop-main .trending-search-result-block");
                e = n.attr("width"), t = Math.floor(parseInt($(".ts-desktop-main .ts-desktop-wrapper").css("width"))) - (Math.floor(e) + 2), n.css("width", e + "px"), i.css("width", t + "px")
            })
        }

        function y() {
            w(), S()
        }

        function S() {
            var e = $(".ts-desktop-main .trending-search-result-block #trending-search-result-container"),
                t = ($(".ts-desktop-main .trending-search-result-block .trending-search-result-wrapper"), e.find(".trending-search-card").length),
                n = parseInt(e.css("width")) / t,
                i = $(".ts-desktop-main .trending-search-result-block .left-arrow-container");
            $(".ts-desktop-main .trending-search-result-block .right-arrow-container");
            i.on("click", function() {
                var t = parseInt(e.css("left")) ? parseInt(e.css("left")) : 0;
                t < 0 && ($(this).off("click"), e.animate({
                    left: "+=" + n
                }, {
                    duration: 350,
                    easing: "linear",
                    complete: function() {
                        var t = parseInt(e.css("left"));
                        S(), t >= 0 && i.addClass("hidden")
                    }
                }))
            })
        }

        function w() {
            var e = $(".ts-desktop-main .trending-search-result-block #trending-search-result-container"),
                t = $(".ts-desktop-main .trending-search-result-block .trending-search-result-wrapper"),
                n = (Math.abs(parseInt(e.css("left"))) ? Math.abs(parseInt(e.css("left"))) : 0, e.find(".trending-search-card").length),
                i = parseInt(e.css("width")) / n,
                a = $(".ts-desktop-main .trending-search-result-block .left-arrow-container"),
                r = $(".ts-desktop-main .trending-search-result-block .right-arrow-container");
            r.on("click", function() {
                var n = Math.abs(parseInt(e.css("left"))) ? Math.abs(parseInt(e.css("left"))) : 0,
                    r = {
                        left: n,
                        width: Math.abs(parseInt(e.css("width")))
                    },
                    s = {
                        width: Math.abs(parseInt(t.css("width")))
                    };
                r.left + s.width < r.width && ($(this).off("click"), e.animate({
                    left: "-=" + i
                }, {
                    duration: 350,
                    easing: "linear",
                    complete: function() {
                        a.removeClass("hidden"), w()
                    }
                }))
            })
        }

        function b(e) {
            var t = e.TYPE,
                n = e.ST,
                i = e.ID,
                a = e.TITLE,
                r = BMS.Misc.fnUrlName(a),
                s = "";
            switch (r = r ? r : "-", t) {
                case "MT":
                    _.isEmpty(n) || "CS" !== n ? s = "/buytickets/" + r + "-" + A.toLowerCase() + "/movie-" + R.toLowerCase() + "-" + i + "-MT" : (_.isEmpty(A) || _.isUndefined(A) || (s = "/" + A.toLowerCase()), s += "/movies/" + r + "/" + i);
                    break;
                case "CT":
                    s = "/events/" + r + "/" + i;
                    break;
                case "PL":
                    s = "/plays/" + r + "/" + i;
                    break;
                case "SP":
                    _.isEmpty(A) || _.isUndefined(A) || (s = "/" + A.toLowerCase()), s += "/sports/" + r + "/" + i
            }
            return s
        }

        function M(e) {
            e && (ae.trendingSearchData = e, C())
        }

        function C() {
            for (var e = ae.trendingSearchData.TRNDZ, t = e.length, n = 0; n < t; n++) {
                var i = e[n];
                ae.hitsData[i.TYPE] = i.VALUE.hits
            }
            f(), k()
        }

        function k() {
            for (var e = ae.TYPES.FINAL, t = ae.hitsData[e], n = t.length, i = $("#qb-search-box-container .tt-menu"), a = i.find(".tt-dataset"), r = BMS.Storage.get({
                    name: "Rgn",
                    key: "text"
                }), s = '<div class="tt-category">Popular Searches in ' + r + "</div>", o = 0; o < n; o++) {
                var l = ae.getCategoryDetails(t[o].TYPE);
                s += '<div data-search-type="' + e + '" \t\t\t\t\t\t\tdata-search-index="' + o + '" \t\t\t\t\t\t\tclass = "tt-suggestion tt-selectable trending-search-suggestion' + (0 === o ? " tt-cursor" : "") + '" >\t\t\t\t\t\t\t<span class="icon-type">\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t            \t\t<use xlink:href="/icons/common-icons.svg#' + l.icon + '"></use>\t\t\t            \t\t</svg>\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t<div class="trending-data">\t\t\t\t\t\t\t\t<div class="__title">' + t[o].TITLE + '</div>\t\t\t\t\t\t\t\t<div class="__category">' + l.category + "</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>"
            }
            a.html(s), $("#qb-search-box-container .trending-search-suggestion").off(".trending").on("tap.trending", B), i.show()
        }

        function B(e) {
            var t = $(e.currentTarget),
                n = t.data("search-type"),
                i = ae.hitsData[n],
                a = t.data("search-index"),
                r = i[a],
                s = $.extend(!0, {}, r),
                o = "",
                l = r.TITLE.toLowerCase(),
                c = r.ID,
                d = r.ST,
                u = JSON.parse(BMS.Storage.get({
                    name: "buytickets",
                    storage: "L",
                    key: "filters"
                }) || "{}").subRegions || [],
                p = r.TYPE.toUpperCase(),
                f = BMS.Misc.fnUrlName(l);
            f = f ? f : "-";
            try {
                s.INPUT = "", s.REGION = BMS.Storage.get({
                    name: "Rgn",
                    storage: "C",
                    key: "Code"
                }), s.SUBREGION = u.join(", "), s.POSN = a + 1, s.SRC = "M5"
            } catch (h) {}
            switch (BMS.Misc.fnAjax({
                url: global.getDataUrl + "?cmd=PUSHTRENDINGSEARCH",
                type: "POST",
                data: JSON.stringify(s),
                contentType: "application/json"
            }), p) {
                case "MT":
                    _.isEmpty(d) || "CS" !== d ? o = "/buytickets/" + f + "-" + ("" != P ? P : A.toLowerCase()) + "/movie-" + ("" != L ? L : R.toLowerCase()) + "-" + c + "-MT" : (_.isEmpty(A) || _.isUndefined(A) || (o = "/" + A.toLowerCase()), o += "/movies/" + f + "/" + c);
                    break;
                case "CT":
                    o = "/events/" + f + "/" + c;
                    break;
                case "PL":
                    o = "/plays/" + f + "/" + c;
                    break;
                case "SP":
                    _.isEmpty(A) || _.isUndefined(A) || (o = "/" + A.toLowerCase()), o += "/sports/" + f + "/" + c
            }
            void 0, BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                event: "trending_quickbook_5",
                domain: "bms_mobileweb",
                pagetype: "QuickBook",
                product_type: p,
                product_name: r.TITLE
            }), BMS.Misc.fnBusy(!0), window.location.assign(o)
        }

        function x() {
            var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
            "videos" != e ? ie(!0) : ne(e)
        }
        if ("videos" == pageName) var E = 12;
        else var E = 8;
        showQuickBookRecomm = !1;
        var T = "",
            I = "",
            A = BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "text"
            })),
            R = BMS.Misc.fnUrlName(BMS.Storage.get({
                name: "Rgn",
                key: "Code"
            })),
            D = BMS.Storage.get({
                name: "Rgn",
                key: "subregionDetails"
            }),
            P = "" != D ? BMS.Misc.fnUrlName(JSON.parse(D).SubRegionName.toLowerCase()) : "",
            L = "" != D ? JSON.parse(D).SubRegionCode.toLowerCase() : "",
            N = {
                MT: "MT",
                CT: "ET",
                PL: "PL",
                SP: "ST",
                videos: "videos"
            },
            O = {
                All: "All-Search",
                MT: "Movies-Search",
                CT: "Events-Search",
                PL: "Plays-Search",
                SP: "Sports-Search",
                videos: "Videos-Search"
            },
            F = null,
            U = !1,
            j = BMS.Storage.get({
                name: "userCine"
            }),
            G = {
                url: "/quickbook-search.bms",
                type: "GET",
                headers: {
                    "x-requested-from": "WEB"
                },
                data: {
                    d: {
                        mrs: BMS.Misc.fnGVal({
                            key: "mrs",
                            data: j
                        }).replace(/;/g, "|"),
                        mrb: BMS.Misc.fnGVal({
                            key: "mrb",
                            data: j
                        }).replace(/;/g, "|")
                    },
                    _: $.now()
                },
                dataType: "json"
            },
            q = [],
            H = {},
            V = {},
            z = {
                NCPA: "/ncpa",
                PTHV: "/venue/prithvi-theatre/PTHV"
            },
            W = [];
        if ($.each(z, function(e, t) {
                W.push(e.toLowerCase())
            }), window.gaSendShowDates = function(e, t, n) {
                var i = new Date;
                i = i.toString(), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                    event: "quickbook_bookticketfor",
                    section_click: e,
                    daypart_click: t,
                    click_datetime: i,
                    eventID: n
                })
            }, BMS.Storage.isset({
                name: "geoLocation"
            })) {
            var Q = BMS.Storage.get({
                name: "geoLocation",
                storage: "C"
            });
            Q = $.parseJSON(Q), T = parseFloat(Q.lat).toFixed(3), I = parseFloat(Q.lng).toFixed(3)
        }
        var Y = null,
            K = [],
            X = {
                options: {
                    config: {
                        minLength: 1
                    },
                    dataSet: {
                        name: "quickbook",
                        source: function(e, t, n) {
                            F && F.abort(), Y = e;
                            var i = V.dropdownButton.data("value"),
                                a = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
                            E = "videos" == a ? 12 : 8;
                            var r = {
                                    q: e,
                                    sz: E,
                                    st: "ON",
                                    em: BMS.Storage.get({
                                        name: "le",
                                        storage: "C"
                                    }),
                                    lt: T,
                                    lg: I
                                },
                                s = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
                            1 !== V.dropdownButton.data("isall") && "all" !== s ? r.sc = i : delete G.data.sc, "videos" == V.dropdownButton.data("type") || global.blnIsTouchScreen && "videos" == pageName ? (r.sc = "", r.c = "video") : "video" == G.data.c && delete G.data.c, q.indexOf(i) === -1 && (r.r = R), G.data = $.extend(G.data, r, !0), F = $.ajax(G).done(function(e) {
                                var t = X.getProcessedSearchResults(e);
                                n(t)
                            })
                        },
                        limit: E,
                        display: function(e) {
                            return e.title
                        },
                        templates: {
                            suggestion: function(e) {
                                var t;
                                if (t = "releaseDate" in e && null != e.releaseDate ? e.title + '<span class="__release-date">(' + e.releaseDate + ")</span>" : e.title, "Video" == e.group ? t += '<div class = "__cast">' + e.category + "</div>" : "desc" in e && null != e.desc && e.desc.length > 0 && (t += '<div class = "__cast">' + e.desc.splice(0, 3).join(", ") + "</div>"), null != e.showDates && e.showDates.length > 0) {
                                    t += ' <div class ="__booktext">Book tickets for ';
                                    for (var n = 0; n < e.showDates.length; n++) {
                                        t += '<span class="__showdate">';
                                        var i = "";
                                        i += '" onclick="gaSendShowDates(', i += "'" + (void 0 != e.showDates[n].flag ? "daypart" : "dayofweek") + "',", i += "'" + e.showDates[n].text + "',", i += "'" + e.companyCode + "'", i += ')">', 0 == n ? (t += '<a href="/buytickets/' + BMS.Misc.fnUrlName(e.title) + "-" + ("" != P ? P : A.toLowerCase()) + "/movie-" + ("" != L ? L : R.toLowerCase()) + "-" + e.companyCode + "-MT/" + e.showDates[n].value, t += void 0 != e.showDates[n].flag ? "?q=" + e.showDates[n].flag : "?q=DEL", t += i, t += e.showDates[n].text + "</a>  ") : (t += ' | <a href="/buytickets/' + BMS.Misc.fnUrlName(e.title) + "-" + ("" != P ? P : A.toLowerCase()) + "/movie-" + ("" != L ? L : R.toLowerCase()) + "-" + e.companyCode + "-MT/" + e.showDates[n].value + "/?q=DEL", t += i, t += e.showDates[n].text + "</a>  "), t += "</span>"
                                    }
                                    t += "</div>"
                                }
                                if ("Video" == e.group && "all" !== $("#btn-dd-search > .selected-type").text().trim().toLowerCase() && !global.blnIsTouchScreen) {
                                    var a = e.category;
                                    switch (a) {
                                        case "MyBollywood":
                                            categoryUrl = "bollywood";
                                            break;
                                        case "MyStyle":
                                            categoryUrl = "fashion-lifestyle";
                                            break;
                                        case "MyTV":
                                            categoryUrl = "tv-news";
                                            break;
                                        default:
                                            categoryUrl = "movie-trailers"
                                    }
                                    var r = global.blnIsTouchScreen ? 60 : 30,
                                        s = e.title.length > r ? e.title.substring(0, r) + "..." : e.title,
                                        o = global.blnIsTouchScreen ? "video-card _touch" : "video-card";
                                    t = '<div class="' + o + '" title="' + e.title + '">\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="top-block">\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="img-container">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="' + e.imgURL + '" alt="' + e.title + '" />\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="overlay-container">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="play">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="__play-button"></div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="overlay"></div>\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="details">' + s + "</div>\t\t\t\t\t\t\t\t\t\t\t\t</div>"
                                }
                                return $("<div>").html(t)
                            },
                            category: {
                                header: function(e) {
                                    return $("<div>").text(e).addClass("tt-category")
                                }
                            }
                        },
                        displayCategory: function(e) {
                            var t = "",
                                n = null != e.group ? e.group.toLowerCase() : "",
                                i = null != e.type ? e.type.toUpperCase() : "",
                                a = null != e.category ? e.category.toLowerCase() : "";
                            switch (n) {
                                case "event":
                                    switch (i) {
                                        case "MT":
                                            t = "Movies";
                                            break;
                                        case "CT":
                                            t = "Events";
                                            break;
                                        case "PL":
                                            t = "Plays";
                                            break;
                                        case "SP":
                                            t = "Sports"
                                    }
                                    break;
                                case "venue":
                                    switch (i) {
                                        case "MT":
                                            t = "Cinemas";
                                            break;
                                        case "PL":
                                            t = "Theaters";
                                            break;
                                        default:
                                            t = "Venues"
                                    }
                                    break;
                                case "offer":
                                    t = "Offers";
                                    break;
                                case "artist":
                                    t = "Artists";
                                    break;
                                case "person":
                                    t = "Persons";
                                    break;
                                case "experience":
                                    t = "Experiences";
                                    break;
                                case "video":
                                    if ("all" === $("#btn-dd-search > .selected-type").text().trim().toLowerCase() || global.blnIsTouchScreen) t = "Videos";
                                    else switch (a) {
                                        case "mybollywood":
                                            t = "MyBollywood";
                                            break;
                                        case "mytv":
                                            t = "MyTV";
                                            break;
                                        case "mystyle":
                                            t = "MyStyle";
                                            break;
                                        default:
                                            t = "Trailers"
                                    }
                            }
                            return t
                        }
                    },
                    onResultSelection: function(e, t) {
                        X.processSelectedResult(t)
                    }
                },
                getProcessedSearchResults: function(e) {
                    K = e.hits || [];
                    var t = [],
                        n = ["BFMU", "BFRM"],
                        i = 0,
                        a = $("#btn-dd-search .selected-type").text().trim().toLowerCase();
                    if ("videos" == a && "object" == typeof e && !_.isEmpty(e)) {
                        for (var r = [], s = [], o = [], l = e.hits, c = 0; c < l.length; c++) "MyTV" == l[c].TYPE ? o.push(l[c]) : "MyBollywood" == l[c].TYPE ? r.push(e.hits[c]) : s.push(l[c]);
                        e.hits = r.concat(s, o)
                    }
                    return _.each(e.hits, function(e) {
                        if (void 0 === e.Group) {
                            if ("venue" === e.GRP.toLowerCase())
                                if ($.inArray(e.ID, n) != -1 && ++i, 1 == i) e.ID = "BFRM", hitType = "|CT|PT|";
                                else if (i > 1 && i <= n.length) return void++i
                        } else if ("venue" === e.Group.toLowerCase())
                            if ($.inArray(e.Code, n) != -1 && ++i, 1 == i) e.Code = "BFRM", hitType = "|CT|PT|";
                            else if (i > 1 && i <= n.length) return void++i;
                        t.push(e)
                    }), _.map(t, function(e) {
                        var t;
                        if (void 0 === e.Type)
                            if (e.TYPE.indexOf("|") !== -1) {
                                var n = e.TYPE.split("|");
                                t = n[1]
                            } else t = e.TYPE;
                        else if (e.Type.indexOf("|") !== -1) {
                            var n = e.Type.split("|");
                            t = n[1]
                        } else t = e.Type;
                        if (void 0 === e.GRP) var i = {
                            group: e.Group,
                            type: t,
                            title: e.Title,
                            groupCode: e.Code,
                            companyCode: e.CompanyCode,
                            status: e.Status,
                            releaseDate: e.ReleaseDate,
                            desc: e["Desc.title"]
                        };
                        else if ("Video" === e.GRP) var i = {
                            group: e.GRP,
                            category: e.TYPE,
                            title: e.TITLE,
                            videoId: e.ID,
                            desc: e.DESC,
                            videoURL: e.VURL,
                            imgURL: e.IURL
                        };
                        else var i = {
                            group: e.GRP,
                            type: t,
                            title: e.TITLE,
                            groupCode: e.CODE,
                            companyCode: e.ID,
                            status: e.ST,
                            releaseDate: e.RDATE,
                            desc: e.DESC,
                            experienceName: e.UNAME,
                            venuesCC: e.CC,
                            showDates: e.SHOWDATE
                        };
                        var a = null,
                            r = null;
                        return _.isUndefined(e.inner_hits) || $.isEmptyObject(e.inner_hits) || (a = e.inner_hits.map(function(e, t) {
                            return 0 === t ? r = e.Code : "Y" === e.IsDefault && (r = e.Code), {
                                isDefault: e.IsDefault,
                                dimension: e.Format,
                                language: e.Language,
                                code: e.code
                            }
                        }), i.defaultEventCode = r), _.isNull(r) && (r = void 0 === e.CODE ? e.Code : e.CODE), i.innerHits = a, i
                    })
                },
                processSelectedResult: function(e, t) {
                    for (var n = {}, i = 0, a = null, r = 0; r < K.length; r++)
                        if ("Video" == e.group) {
                            if (K[r].GRP == e.group && K[r].TYPE == e.category && K[r].ID == e.videoId) {
                                n = K[r], i = r + 1;
                                break
                            }
                        } else if (K[r].GRP == e.group && K[r].CODE == e.groupCode && K[r].ID == e.companyCode) {
                        n = K[r], i = r + 1;
                        break
                    }
                    a = global.blnIsTouchScreen ? "M5" : "WEB";
                    try {
                        n.INPUT = Y, n.REGION = BMS.Storage.get({
                            name: "Rgn",
                            storage: "C",
                            key: "Code"
                        });
                        var s = JSON.parse(BMS.Storage.get({
                            name: "buytickets",
                            storage: "L",
                            key: "filters"
                        }) || "{}").subRegions || [];
                        n.SUBREGION = s.join(", "), n.POSN = i, n.SRC = a
                    } catch (o) {}
                    if (BMS.Misc.fnAjax({
                            url: global.getDataUrl + "?cmd=PUSHTRENDINGSEARCH",
                            type: "POST",
                            data: JSON.stringify(n),
                            contentType: "application/json"
                        }), "video" == e.group.toLowerCase()) var l = "MyBollywood" == e.category ? "bollywood" : "MyTV" == e.category ? "tv-news" : "fashion-lifestyle",
                        c = e.title.toLowerCase(),
                        d = BMS.Misc.fnUrlName(e.title).toLowerCase(),
                        u = e.videoId,
                        p = "videos",
                        f = e.group.toLowerCase();
                    else {
                        var h = "",
                            c = e.title.toLowerCase(),
                            u = void 0 === e.companyCode ? e.defaultEventCode : e.companyCode,
                            g = e.groupCode,
                            f = e.group.toLowerCase(),
                            p = e.type.toUpperCase(),
                            v = BMS.Misc.fnUrlName(c);
                        v = "" == v ? "-" : v
                    }
                    if ("event" === f) switch (p) {
                        case "MT":
                            _.isEmpty(e.status) || "CS" !== e.status && "OF" !== e.status ? h = "/buytickets/" + v + "-" + ("" != P ? P : A.toLowerCase()) + "/movie-" + ("" != L ? L : R.toLowerCase()) + "-" + u + "-MT" : (_.isEmpty(A) || _.isUndefined(A) || (h = "/" + A.toLowerCase()), h += "/movies/" + v + "/" + u, void 0);
                            break;
                        case "CT":
                            h = "/events/" + v + "/" + u;
                            break;
                        case "PL":
                            h = "/plays/" + v + "/" + u;
                            break;
                        case "SP":
                            _.isEmpty(A) || _.isUndefined(A) || (h = "/" + A.toLowerCase()), h += "/sports/" + v + "/" + u
                    } else if ("venue" === f) switch (p) {
                        case "MT":
                            h = void 0 === e.venuesCC ? "/buytickets/" + v + "-" + ("" != P ? P : A.toLowerCase()) + "/cinema-" + ("" != L ? L : R.toLowerCase()) + "-" + g + "-MT" : "/buytickets/" + v + "-" + ("" != P ? P : A.toLowerCase()) + "/cinema-" + ("" != L ? L : R.toLowerCase()) + "-" + u + "-MT";
                            break;
                        default:
                            if (void 0 === e.venuesCC) {
                                var m = $.inArray(e.companyCode.toLowerCase(), W) != -1;
                                h = m ? z[e.companyCode.toUpperCase()] : e.companyCode.toLowerCase() != e.companyCode.toLowerCase() ? "/venue/" + v + "/" + e.companyCode + "-" + e.groupCode : "/venue/" + v + "/" + e.companyCode
                            } else {
                                var m = $.inArray(e.venuesCC.toLowerCase(), W) != -1;
                                h = m ? z[e.venuesCC.toUpperCase()] : u.toLowerCase() != e.venuesCC.toLowerCase() ? "/venue/" + v + "/" + e.venuesCC + "-" + u : "/venue/" + v + "/" + u
                            }
                    } else "person" === f ? h = "/person/" + v + "/" + u : "offer" === f ? h = "/offers/" + v + "/" + (void 0 === g ? u : g) : "experience" === f ? h = "/experiences/bms-picks/" + e.experienceName + "/" + u : "video" === f && (h = "/videos/" + l + "/" + d + "/" + u);
                    BMS.Misc.fnBusy(!0), "venue" === f && (u = e.groupCode), BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "QuickBook", {
                        "Is Search": "Yes",
                        "Search Term": Y,
                        ProductID: u,
                        "Event Name": c,
                        "Event Type": N[p],
                        Appcode: window.global.strAppCode
                    });
                    var y = V.dropdownButton.data(),
                        S = null;
                    S = _.isEmpty(y) ? p : 1 === y.isall && "videos" != y.value ? "All" : y.value, BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                        event: "search",
                        category: "Quickbook",
                        action: O[S],
                        label: Y
                    }), window.location.assign(h)
                }
            },
            J = function() {
                Z("")
            },
            Z = function(e) {
                H.typeahead("val", e)
            },
            ee = function() {
                return H.typeahead("val")
            },
            te = function(e) {
                _.isUndefined(e) && (e = V.dropdownButton.data("type"));
                var t, n = V.dropdownButton.data("isall");
                t = 1 === n ? V.searchBoxContainer.find('li [data-type="' + e + '"][data-isall=1]').data("search-placeholder") : V.searchBoxContainer.find('li [data-type="' + e + '"][data-isall=0]').data("search-placeholder"), V.searchBox.attr("placeholder", t), BMS.Misc.QuickbookModal.show(e), V.searchBox.focus(), $(document).bind("keyup", r)
            },
            ne = function(e) {
                if (_.isUndefined(e) && (e = V.dropdownButton.data("type"), V.dropdownMenu.find("[data-type=" + e + "][data-isall=0]").parent().removeClass("none")), !$("#quickbook-wrapper .qb-modal-overlay").hasClass("none")) {
                    BMS.Misc.QuickbookModal.hide();
                    var t = V.dropdownMenu.find("[data-isall=1]"),
                        n = t.data("type"),
                        i = t.data("value"),
                        a = t.data("placeholder"),
                        s = (t.data("search-placeholder"), t.text());
                    V.searchBox.attr("placeholder", a), t.parent().addClass("none"), V.dropdownButton.data({
                        type: n,
                        value: i,
                        isall: 1
                    }).find(".icon-type").html(t.find(".icon-type").html()).next().text(s), J(), V.searchBox.blur(), $(document).unbind("keyup", r)
                }
            },
            ie = function(e) {
                e === !0 ? (BMS.Misc.QuickbookModal.isOpen() || BMS.Misc.Router.triggerRoute("quickbook", !1), te()) : (BMS.Misc.Router.triggerRoute("", !1), ne())
            },
            ae = {
                trendingSearchData: {},
                TYPES: {
                    MOVIES: "MT",
                    EVENTS: "CT",
                    ALL: "ALL",
                    FINAL: "FINAL"
                },
                hitsData: {},
                getCategoryDetails: function(e) {
                    var t = "",
                        n = "";
                    switch (e) {
                        case "MT":
                        default:
                            t = "Movie", n = "icon-movie";
                            break;
                        case "CT":
                            t = "Event", n = "icon-event";
                            break;
                        case "PL":
                            t = "Play", n = "icon-plays";
                            break;
                        case "SP":
                            t = "Sport", n = "icon-sports"
                    }
                    return {
                        category: t,
                        icon: n
                    }
                }
            };
        $(function() {
            if (t(), BMS.Misc.QuickbookModal.initialize(), n(), H.on("keyup", a), V.dropdownMenu.find(".__item").click(s), V.dropdownButton.on("click", o), V.searchBox.on("focus", l), $("#search-list-icon", V.searchBoxContainer).on("click", x), V.searchBoxContainer.on("click", "#qb-region-link", function() {
                    return BMS.Region.fnSwStates(""), !1
                }), V.searchDropdown.on("mouseover", function() {
                    V.searchDropdown.addClass("_hovered")
                }), V.searchDropdown.on("mouseleave", function() {
                    V.searchDropdown.removeClass("_hovered")
                }), $(".qb-modal-overlay #btn-close, .qb-modal-overlay #btn-back").click(function() {
                    if (ie(!1), "videos" == pageName) {
                        var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase(),
                            t = "videos" == e,
                            n = $(".tt-menu .tt-dataset"),
                            i = $("#search-list-icon");
                        t || global.blnIsTouchScreen && "videos" == pageName ? (n.addClass("tt-dataset-videos"), global.blnIsTouchScreen && n.addClass("_touch"), t && i.hide()) : n.removeClass("tt-dataset-videos")
                    }
                }), "videos" == pageName) {
                var e = $("#btn-dd-search .selected-type").text().trim().toLowerCase(),
                    i = "videos" == e,
                    r = $(".tt-menu .tt-dataset"),
                    c = $("#search-list-icon");
                i || global.blnIsTouchScreen && "videos" == pageName ? (r.addClass("tt-dataset-videos"), global.blnIsTouchScreen && r.addClass("_touch"), i && c.hide()) : r.removeClass("tt-dataset-videos")
            }
            fnShowQuickBookRecommendation(), global.blnIsTouchScreen || (v(), d())
        }), fnInitializeQuickbookRecommendation = function() {
            if (!global.blnIsTouchScreen) {
                var e = $(".quickbook-recommendation-header");
                e.length > 0 && e.off(".recomm").on("click.recomm", function(e) {
                    $(".quickbook-recommendation-body, .quickbook-recommendation-header .qb-symbol").toggle()
                })
            }
        }, fnShowQuickBookRecommendation = function() {
            "home" === pageName && (fnInitializeQuickbookRecommendation(), fnHandleQuickbookRecommendation(N.MT), fnBindQBRecommAnalytics())
        }, fnHandleQuickbookRecommendation = function(e) {
            $(".quickbook-recommendation-container").length > 0 && (e === N.MT ? $(".quickbook-recommendation-container").show() : $(".quickbook-recommendation-container").hide())
        }, fnBindQBRecommAnalytics = function() {
            showQuickBookRecomm && $(".quickbook-recommendation-container .quickbook-recommendation-body .__movie-name,\t        \t\t.quickbook-recommendation-container .quickbook-recommendation-body .__location").off(".qbrecommanalytics").on("click.qbrecommanalytics", fnPushQBRecommMovieCinemaNameClick)
        }, fnPushQBRecommMovieCinemaNameClick = function(e) {
            if (e) {
                var t = $(e.currentTarget),
                    n = $(e.currentTarget).parents(".detail"),
                    i = n.data("movie-name"),
                    a = n.data("venue-name"),
                    r = n.data("position"),
                    s = {
                        event: t.hasClass("__movie-name") ? "click_moviename_quickbook_1" : "click_cinemaname_quickbook_2",
                        eventname: i ? i : null,
                        venue_name: a ? a : null,
                        rposition: r ? r : null
                    };
                BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, s)
            }
        }, fnPushQBShowtimeClick = function(e, t, n, i, a) {
            var r = $(".quickbook-recommendation-container").find(".detail[data-position='" + e + "']"),
                s = r.data("movie-name"),
                o = r.data("venue-name"),
                l = {
                    event: "click_showtime_quickbook_3",
                    eventname: s ? s : null,
                    showtime1: a && i ? a + "-" + i : "showmore",
                    venue_name: o ? o : null,
                    date1: n ? n + "-" + t : null,
                    rposition: e ? e : null
                };
            BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, l)
        }, fnPushQBViewAnalytics = function() {
            if (showQuickBookRecomm)
                for (var e = $(".quickbook-recommendation-container .detail"), t = e.length, n = 0; n < t; n++) {
                    for (var i = $(e[n]), a = {
                            event: "view_recommend_quickbook_4",
                            eventname: i.data("movie-name"),
                            venue_name: i.data("venue-name")
                        }, r = i.find(".__day"), s = r.length, o = i.find(".__details"), l = o.length, c = 0; c < s; c++) a["date" + (c + 1)] = $(r[c]).text();
                    for (var c = 0; c < l; c++) {
                        for (var d = $(o[c]).find(".timestamp"), u = "", p = d.length, f = 0; f < p; f++) u += 0 !== f ? "|" : "", u += d[f].innerHTML;
                        a["showtime" + (c + 1)] = u
                    }
                    BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, a)
                }
        };
        var re = function() {
            ie(!0)
        };
        BMS.Misc.Router.registerRoute("quickbook", "quickbookSearchBox", te, ne), BMS.Misc.Quickbook = BMS.Misc.Quickbook || {}, BMS.Misc.Quickbook.searchBox = {
            getVal: ee,
            setVal: Z,
            triggerQuickbook: re
        }
    }(), ! function(e) {
        var t = e(window);
        e.fn.visible = function(e, n, i) {
            if (!(this.length < 1)) {
                var a = this.length > 1 ? this.eq(0) : this,
                    r = a.get(0),
                    s = t.width(),
                    o = t.height(),
                    i = i ? i : "both",
                    l = n !== !0 || r.offsetWidth * r.offsetHeight;
                if ("function" == typeof r.getBoundingClientRect) {
                    var c = r.getBoundingClientRect(),
                        d = c.top >= 0 && c.top < o,
                        u = c.bottom > 0 && c.bottom <= o,
                        p = c.left >= 0 && c.left < s,
                        f = c.right > 0 && c.right <= s,
                        h = e ? d || u : d && u,
                        g = e ? p || f : p && f;
                    if ("both" === i) return l && h && g;
                    if ("vertical" === i) return l && h;
                    if ("horizontal" === i) return l && g
                } else {
                    var v = t.scrollTop(),
                        m = v + o,
                        y = t.scrollLeft(),
                        S = y + s,
                        w = a.offset(),
                        b = w.top,
                        M = b + a.height(),
                        C = w.left,
                        k = C + a.width(),
                        _ = e === !0 ? M : b,
                        B = e === !0 ? b : M,
                        x = e === !0 ? k : C,
                        E = e === !0 ? C : k;
                    if ("both" === i) return !!l && m >= B && _ >= v && S >= E && x >= y;
                    if ("vertical" === i) return !!l && m >= B && _ >= v;
                    if ("horizontal" === i) return !!l && S >= E && x >= y
                }
            }
        }
    }(jQuery), function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        "use strict";
        var t = window.Slick || {};
        t = function() {
            function t(t, i) {
                var a, r = this;
                r.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><svg version="1.1" style="stroke-width: 10px; stroke: #FFF; fill: #FFF;" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-prev-arrow"></use></svg></button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><svg version="1.1" style="stroke-width: 5px; stroke: #FFF; fill: #FFF;" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-next-arrow"></use></svg></button>',
                    autoplay: !0,
                    autoplaySpeed: 3e3,
                    centerMode: !0,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, t) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (t + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    offset: -75,
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, r.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: 500,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.hidden = "hidden", r.paused = !1, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, r.visibleDiv = !1, a = e(t).data("slick") || {}, r.options = e.extend({}, r.defaults, a, i), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, "undefined" != typeof document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.instanceUid = n++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0), r.checkResponsive(!0), e(window).scroll(function() {
                    r.lazyLoad.call(r, !0)
                }), e(window).resize(function() {
                    r.lazyLoad.call(r)
                })
            }
            var n = 0;
            return t
        }(), t.prototype.checkResponsive = function(t, n) {
            var i, a, r, s = this,
                o = !1,
                l = s.$slider.width(),
                c = window.innerWidth || e(window).width();
            if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
                a = null;
                for (i in s.breakpoints) s.breakpoints.hasOwnProperty(i) && (s.originalSettings.mobileFirst === !1 ? r < s.breakpoints[i] && (a = s.breakpoints[i]) : r > s.breakpoints[i] && (a = s.breakpoints[i]));
                null !== a ? null !== s.activeBreakpoint ? (a !== s.activeBreakpoint || n) && (s.activeBreakpoint = a, "unslick" === s.breakpointSettings[a] ? s.unslick(a) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[a]), t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t)), o = a) : (s.activeBreakpoint = a, "unslick" === s.breakpointSettings[a] ? s.unslick(a) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[a]), t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t)), o = a) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t), o = a), t || o === !1 || s.$slider.trigger("breakpoint", [s, o])
            }
        }, t.prototype.registerBreakpoints = function() {
            var t, n, i, a = this,
                r = a.options.responsive || null;
            if ("array" === e.type(r) && r.length) {
                a.respondTo = a.options.respondTo || "window";
                for (t in r)
                    if (i = a.breakpoints.length - 1, n = r[t].breakpoint, r.hasOwnProperty(t)) {
                        for (; i >= 0;) a.breakpoints[i] && a.breakpoints[i] === n && a.breakpoints.splice(i, 1), i--;
                        a.breakpoints.push(n), a.breakpointSettings[n] = r[t].settings
                    }
                a.breakpoints.sort(function(e, t) {
                    return a.options.mobileFirst ? e - t : t - e
                })
            }
        }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
            var a = this;
            if ("boolean" == typeof n) i = n, n = null;
            else if (n < 0 || n >= a.slideCount) return !1;
            a.unload(), "number" == typeof n ? 0 === n && 0 === a.$slides.length ? e(t).appendTo(a.$slideTrack) : i ? e(t).insertBefore(a.$slides.eq(n)) : e(t).insertAfter(a.$slides.eq(n)) : i === !0 ? e(t).prependTo(a.$slideTrack) : e(t).appendTo(a.$slideTrack), a.$slides = a.$slideTrack.children(this.options.slide), a.$slideTrack.children(this.options.slide).detach(), a.$slideTrack.append(a.$slides), a.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t)
            }), a.$slidesCache = a.$slides, a.reinit()
        }, t.prototype.animateSlide = function(t, n) {
            var i = {},
                a = this;
            a.options.rtl === !0 && a.options.vertical === !1 && (t = -t), a.transformsEnabled === !1 ? a.options.vertical === !1 ? a.$slideTrack.animate({
                left: t
            }, a.options.speed, a.options.easing, n) : a.$slideTrack.animate({
                top: t
            }, a.options.speed, a.options.easing, n) : a.cssTransitions === !1 ? (a.options.rtl === !0 && (a.currentLeft = -a.currentLeft), e({
                animStart: a.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: a.options.speed,
                easing: a.options.easing,
                step: function(e) {
                    e = Math.ceil(e), a.options.vertical === !1 ? (i[a.animType] = "translate(" + e + "px, 0px)", a.$slideTrack.css(i)) : (i[a.animType] = "translate(0px," + e + "px)", a.$slideTrack.css(i))
                },
                complete: function() {
                    n && n.call()
                }
            })) : (a.applyTransition(), t = Math.ceil(t), a.options.vertical === !1 ? i[a.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[a.animType] = "translate3d(0px," + t + "px, 0px)", a.$slideTrack.css(i), n && setTimeout(function() {
                a.disableTransition(), n.call()
            }, a.options.speed))
        }, t.prototype.asNavFor = function(t) {
            var n = this,
                i = n.options.asNavFor;
            i && null !== i && (i = e(i).not(n.$slider)), null !== i && "object" == typeof i && i.each(function() {
                var n = e(this).slick("getSlick");
                n.unslicked || n.slideHandler(t, !0)
            })
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                n = {};
            t.options.fade === !1 ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this;
            e.options.infinite === !1 ? 1 === e.direction ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide - 1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
        }, t.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, t.prototype.buildDots = function() {
            var t, n, i = this;
            if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
                for (n = '<ul class="' + i.options.dotsClass + '">', t = 0; t <= i.getDotCount(); t += 1) n += "<li>" + i.options.customPaging.call(this, i, t) + "</li>";
                n += "</ul>", i.$dots = e(n).appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
            }), t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode !== !0 && t.options.swipeToSlide !== !0 || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
        }, t.prototype.buildRows = function() {
            var e, t, n, i, a, r, s, o = this;
            if (i = document.createDocumentFragment(), r = o.$slider.children(), o.options.rows > 1) {
                for (s = o.options.slidesPerRow * o.options.rows, a = Math.ceil(r.length / s), e = 0; e < a; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < o.options.rows; t++) {
                        var c = document.createElement("div");
                        for (n = 0; n < o.options.slidesPerRow; n++) {
                            var d = e * s + (t * o.options.slidesPerRow + n);
                            r.get(d) && c.appendChild(r.get(d))
                        }
                        l.appendChild(c)
                    }
                    i.appendChild(l)
                }
                o.$slider.html(i), o.$slider.children().children().children().css({
                    width: 100 / o.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, t.prototype.changeSlide = function(t, n) {
            var i, a, r, s = this,
                o = e(t.target);
            switch (o.is("a") && t.preventDefault(), o.is("li") || (o = o.closest("li")), r = s.slideCount % s.options.slidesToScroll !== 0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
                case "previous":
                    a = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - a, !1, n);
                    break;
                case "next":
                    a = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + a, !1, n);
                    break;
                case "index":
                    var l = 0 === t.data.index ? 0 : t.data.index || o.index() * s.options.slidesToScroll;
                    s.slideHandler(s.checkNavigable(l), !1, n), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, n, i = this;
            if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
            else
                for (var a in t) {
                    if (e < t[a]) {
                        e = n;
                        break
                    }
                    n = t[a]
                }
            return e
        }, t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.cleanUpRows = function() {
            var e, t = this;
            t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.html(e))
        }, t.prototype.clickHandler = function(e) {
            var t = this;
            t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, t.prototype.destroy = function(t) {
            var n = this;
            n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.options.arrows === !0 && (n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove())), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                e(this).attr("style", e(this).data("originalStyling"))
            }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                n = {};
            n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.fadeSlide = function(e, t) {
            var n = this;
            n.cssTransitions === !1 ? (n.$slides.eq(e).css({
                zIndex: n.options.zIndex
            }), n.$slides.eq(e).animate({
                opacity: 1
            }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
                opacity: 1,
                zIndex: n.options.zIndex
            }), t && setTimeout(function() {
                n.disableTransition(e), t.call()
            }, n.options.speed))
        }, t.prototype.fadeSlideOut = function(e) {
            var t = this;
            t.cssTransitions === !1 ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            var e = this;
            return e.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                n = 0,
                i = 0;
            if (e.options.infinite === !0)
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (e.options.centerMode === !0) i = e.slideCount;
            else
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return i - 1
        }, t.prototype.getLeft = function(e) {
            var t, n, i, a = this,
                r = 0;
            return a.slideOffset = 0, n = a.$slides.first().outerHeight(!0), a.options.infinite === !0 ? (a.slideCount > a.options.slidesToShow && (a.slideOffset = a.slideWidth * a.options.slidesToShow * -1, r = n * a.options.slidesToShow * -1), a.slideCount % a.options.slidesToScroll !== 0 && e + a.options.slidesToScroll > a.slideCount && a.slideCount > a.options.slidesToShow && (e > a.slideCount ? (a.slideOffset = (a.options.slidesToShow - (e - a.slideCount)) * a.slideWidth * -1, r = (a.options.slidesToShow - (e - a.slideCount)) * n * -1) : (a.slideOffset = a.slideCount % a.options.slidesToScroll * a.slideWidth * -1, r = a.slideCount % a.options.slidesToScroll * n * -1))) : e + a.options.slidesToShow > a.slideCount && (a.slideOffset = (e + a.options.slidesToShow - a.slideCount) * a.slideWidth, r = (e + a.options.slidesToShow - a.slideCount) * n), a.slideCount <= a.options.slidesToShow && (a.slideOffset = 0, r = 0), a.options.centerMode === !0 && a.options.infinite === !0 ? a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2) - a.slideWidth : a.options.centerMode === !0 && (a.slideOffset = 0, a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2)), t = a.options.vertical === !1 ? e * a.slideWidth * -1 + a.slideOffset : e * n * -1 + r, a.options.variableWidth === !0 && (i = a.slideCount <= a.options.slidesToShow || a.options.infinite === !1 ? a.$slideTrack.children(".slick-slide").eq(e) : a.$slideTrack.children(".slick-slide").eq(e + a.options.slidesToShow), t = i[0] ? i[0].offsetLeft * -1 : 0, a.options.centerMode === !0 && (i = a.options.infinite === !1 ? a.$slideTrack.children(".slick-slide").eq(e) : a.$slideTrack.children(".slick-slide").eq(e + a.options.slidesToShow + 1), t = i[0] ? i[0].offsetLeft * -1 : 0, t += (a.$list.width() - i.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            var t = this;
            return t.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e, t = this,
                n = 0,
                i = 0,
                a = [];
            for (t.options.infinite === !1 ? e = t.slideCount : (n = t.options.slidesToScroll * -1, i = t.options.slidesToScroll * -1, e = 2 * t.slideCount); n < e;) a.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return a
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var e, t = this;
            return e = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, t.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            var n = this;
            n.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function(t) {
            var n = this;
            e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots()), n.lazyLoad(), t && n.$slider.trigger("init", [n]), n.options.accessibility === !0
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide)
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, t.prototype.lazyLoad = function(t) {
            function n(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        n = e(this).attr("data-lazy"),
                        i = document.createElement("img"),
                        a = e(this).attr("data-error");
                    i.onload = function() {
                        t.attr("src", n).removeAttr("data-lazy").removeAttr("slick-loading"), t.parents(".is-loading").removeClass("is-loading")
                    }, i.onerror = function() {
                        "" != a && t.animate({
                            opacity: 0
                        }, 100, function() {
                            void 0, t.attr("src", a).removeAttr("data-lazy").removeAttr("data-error").animate({
                                opacity: 1
                            }, 200, function() {
                                t.removeAttr("data-lazy").removeClass("slick-loading")
                            }), a = ""
                        })
                    }, i.src = n
                })
            }
            var i, a, r, s, o = this;
            if (t) {
                if (this.visibleDiv) return;
                if (1 != o.isVisible.call(o, o.$slides.eq(0))) return
            }(this.visibleDiv || 1 == o.isVisible.call(o, o.$slides.eq(0))) && (o.options.centerMode === !0 ? o.options.infinite === !0 ? (r = o.currentSlide + (o.options.slidesToShow / 2 + 1), s = r + o.options.slidesToShow + 2) : (r = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), s = 2 + (o.options.slidesToShow / 2 + 1) + o.currentSlide) : (r = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, s = r + o.options.slidesToShow, o.options.fade === !0 && (r > 0 && r--, s <= o.slideCount && s++)), i = o.$slider.find(".slick-slide").slice(r, s), n(i), o.slideCount <= o.options.slidesToShow ? (a = o.$slider.find(".slick-slide"), n(a)) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? (a = o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow), n(a)) : 0 === o.currentSlide && (a = o.$slider.find(".slick-cloned").slice(o.options.slidesToShow * -1), n(a)))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.orientationChange = function() {
            var e = this;
            e.setPosition()
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.paused = !1, e.autoPlay()
        }, t.prototype.postSlide = function(e) {
            var t = this;
            t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay(), t.options.accessibility === !0
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, t.prototype.progressiveLazyLoad = function() {
            var t, n, i = this;
            t = e("img[data-lazy]", i.$slider).length, t > 0 && (n = e("img[data-lazy]", i.$slider).first(), n.attr("src", n.attr("data-lazy")).removeClass("slick-loading").load(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad(), i.options.adaptiveHeight === !0 && i.setPosition()
            }).error(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad()
            }))
        }, t.prototype.refresh = function(t) {
            var n = this,
                i = n.currentSlide;
            n.destroy(!0), e.extend(n, n.initials, {
                currentSlide: i
            }), n.init(), t || n.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, t.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(0), t.setPosition(), t.$slider.trigger("reInit", [t]), t.options.autoplay === !0 && t.focusHandler()
        }, t.prototype.resize = function() {
            var t = this;
            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
            var i = this;
            return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount - 1) : e = t === !0 ? --e : e, !(i.slideCount < 1 || e < 0 || e > i.slideCount - 1) && (i.unload(), n === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, n, i = this,
                a = {};
            i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", a[i.positionProp] = e, i.transformsEnabled === !1 ? i.$slideTrack.css(a) : (a = {}, i.cssTransitions === !1 ? (a[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(a)) : (a[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(a)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
                padding: "0 " + e.options.centerPadding + " 0"
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, t.prototype.setFade = function() {
            var t, n = this;
            n.$slides.each(function(i, a) {
                t = n.slideWidth * i * -1, n.options.rtl === !0 ? e(a).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : e(a).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: n.options.zIndex - 1,
                opacity: 1
            })
        }, t.prototype.setOption = t.prototype.slickSetOption = function(t, n, i) {
            var a, r, s = this;
            if ("responsive" === t && "array" === e.type(n))
                for (r in n)
                    if ("array" !== e.type(s.options.responsive)) s.options.responsive = [n[r]];
                    else {
                        for (a = s.options.responsive.length - 1; a >= 0;) s.options.responsive[a].breakpoint === n[r].breakpoint && s.options.responsive.splice(a, 1), a--;
                        s.options.responsive.push(n[r])
                    } else s.options[t] = n;
            i === !0 && (s.unload(), s.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = null !== e.animType && e.animType !== !1
        }, t.prototype.setSlideClasses = function(e) {
            var t, n, i, a, r = this;
            n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), r.options.centerMode === !0 ? (t = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (a = r.slideCount % r.options.slidesToShow, i = r.options.infinite === !0 ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - a), i + a).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, n, i, a = this;
            if (a.options.fade === !0 && (a.options.centerMode = !1), a.options.infinite === !0 && a.options.fade === !1 && (n = null, a.slideCount > a.options.slidesToShow)) {
                for (i = a.options.centerMode === !0 ? a.options.slidesToShow + 1 : a.options.slidesToShow, t = a.slideCount; t > a.slideCount - i; t -= 1) n = t - 1, e(a.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - a.slideCount).prependTo(a.$slideTrack).addClass("slick-cloned");
                for (t = 0; t < i; t += 1) n = t, e(a.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + a.slideCount).appendTo(a.$slideTrack).addClass("slick-cloned");
                a.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }, t.prototype.setPaused = function(e) {
            var t = this;
            t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (t.paused = e, e ? t.autoPlayClear() : t.autoPlay())
        }, t.prototype.selectHandler = function(t) {
            var n = this,
                i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                a = parseInt(i.attr("data-slick-index"));
            return a || (a = 0), n.slideCount <= n.options.slidesToShow ? (n.setSlideClasses(a), void n.asNavFor(a)) : void n.slideHandler(a)
        }, t.prototype.slideHandler = function(e, t, n) {
            var i, a, r, s, o = null,
                l = this;
            if (t = t || !1, (l.animating !== !0 || l.options.waitForAnimate !== !0) && !(l.options.fade === !0 && l.currentSlide === e || l.slideCount <= l.options.slidesToShow)) return t === !1 && l.asNavFor(e), i = e, o = l.getLeft(i), s = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
                l.postSlide(i)
            }) : l.postSlide(i))) : l.options.infinite === !1 && l.options.centerMode === !0 && (e < 0 || e > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
                l.postSlide(i)
            }) : l.postSlide(i))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), a = i < 0 ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, a]), r = l.currentSlide, l.currentSlide = a, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? void(n !== !0 ? (l.fadeSlideOut(r), l.fadeSlide(a, function() {
                l.postSlide(a)
            })) : l.postSlide(a)) : void(n !== !0 ? l.animateSlide(o, function() {
                l.postSlide(a)
            }) : l.postSlide(a)))
        }, t.prototype.startLoad = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, t.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, t.prototype.updateArrows = function() {
            var e, t = this;
            e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, t.prototype.visibility = function() {
            var e = this;
            document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : e.options.autoplay === !0 && (e.paused = !1, e.autoPlay())
        }, t.prototype.focusHandler = function() {
            var t = this;
            t.$slider.on("focus.slick blur.slick", "*", function(n) {
                n.stopImmediatePropagation();
                var i = e(this);
                setTimeout(function() {
                    t.isPlay && (i.is(":focus") ? (t.autoPlayClear(), t.paused = !0) : (t.paused = !1, t.autoPlay()))
                }, 0)
            })
        }, t.prototype.offsetTop = function(e) {
            for (var t; void 0 === e.offsetTop;) e = e.parentNode;
            for (t = e.offsetTop; e == e.offsetParent;) t += e.offsetTop;
            return t
        }, t.prototype.isVisible = function(t) {
            var n, i, a, r = window.pageYOffset;
            return n = this.options.offset, a = r + e(window).height() - n, i = t[0] ? t.offset().top || 0 : 0, t.find(".experience-card")[0], this.visibleDiv = function() {
                return i <= a
            }(), i <= a
        }, t.prototype.addEvent = function(e, t, n) {
            return null != e.addEventListener ? e.addEventListener(t, n, !1) : null != e.attachEvent ? e.attachEvent("on" + t, n) : e[t] = n
        }, e.fn.slick = function() {
            var e, n = this,
                i = arguments[0],
                a = Array.prototype.slice.call(arguments, 1),
                r = n.length,
                s = 0;
            for (s; s < r; s++)
                if ("object" == typeof i || "undefined" == typeof i ? n[s].slick = new t(n[s], i) : e = n[s].slick[i].apply(n[s].slick, a), "undefined" != typeof e) return e;
            return n
        }
    }), function(e) {
        e.fn.showcaseTrailer = function(t) {
            function n(t) {
                switch (t) {
                    case "show":
                        d || i();
                        break;
                    case "hide":
                        d && (a(), e(document).unbind("keyup", p)), "synopsis" == pageName && BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                            event: "YoutubeVideoClosed",
                            videopath: "Videoclosed",
                            videolabel: "undefined" != typeof eventTitle ? eventTitle : ""
                        })
                }
            }

            function i() {
                s.find(".__play").transition({
                    scale: 1.5,
                    opacity: 0
                }, 300), e("#quickbook-wrapper").transition({
                    opacity: 0
                }, 300), e(".secondary", "#navbar").transition({
                    opacity: 0
                }, 300), e(".mv-synopsis-wrapper").transition({
                    opacity: 0
                }, 300), setTimeout(function() {
                    u = e('<div id="youtube-container" class="wow fadeIn"><iframe width="100%" height="100%" src="" id="youtube-iframe" frameborder="0" allowfullscreen autoplay="true"></iframe></div></div>'), u.find("iframe").attr({
                        src: "https://www.youtube.com/embed/" + l + "?autoplay=1"
                    }), "undefined" != typeof pageName && "synopsis" == pageName && (BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Viewed trailer", analyticsObj), "synopsis" == pageName && BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                        event: "YoutubeVideoAppended",
                        videopath: "Videoopened",
                        videolabel: "undefined" != typeof eventTitle ? eventTitle : ""
                    })), "undefined" != typeof pageName && "synopsis" == pageName && s.clone().appendTo(c.find(".body")), c.show(), e("body").append(c), e("#st-btn-close").one("click", function() {
                        n("hide")
                    }), setTimeout(function() {
                        c.addClass("_dance")
                    }, 100), setTimeout(function() {
                        c.find(".body").append(u)
                    }, 500), d = !0
                }, 200)
            }

            function a() {
                u.html(""), c.removeClass("_dance"), setTimeout(function() {
                    c.hide(), setTimeout(function() {
                        e("#quickbook-wrapper").transition({
                            opacity: 1
                        }), e(".secondary", "#navbar").transition({
                            opacity: 1
                        }), e(".mv-synopsis-wrapper").transition({
                            opacity: 1
                        }), s.find(".__play").transition({
                            scale: 1,
                            opacity: .75
                        }), s.find(".__play")[0].style = "", c.find(".body").html(""), c.detach()
                    }, 50)
                }, 500), d = !1
            }
            var r = {
                autoplay: !0
            };
            if (e.extend(t, r), "undefined" != typeof pageName && "synopsis" == pageName) var s = e(".synopsis-banner");
            else var s = e(".banner-container, .overlay-card");
            var o, l = e(this).attr("data-trailer-code"),
                c = e('<div id="showcase-trailer-wrapper">').append('<div class="header">\t\t\t\t\t\t\t\t\t\t<button id="st-btn-close">\t\t\t\t\t\t\t\t\t\t\t<span class="icon-cancel">\t\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/common-icons.svg#icon-cancel"></use>\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t</button>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="body">\t\t\t\t\t\t\t\t\t</div>'),
                d = !1,
                u = "";
            "#trailer" == window.location.hash && ("undefined" != typeof pageName && "home" == pageName && (l = e(".__play-video", "#showcase-primary .overlay-card").data("trailer-code"), setTimeout(function() {
                e(".__dismiss", "#showcase-primary .showcase-overlay").trigger("click")
            }, 300)), l && n("show"));
            var p = function(e) {
                27 == e.keyCode && n("hide"), e.stopPropagation()
            };
            s.find(".__play").click(function() {
                if ("undefined" != typeof pageName && "synopsis" == pageName ? l = s.data("trailer-code") : (l = e(this).data("trailer-code"), o = e(this).parents(".banner-container")), "undefined" != typeof fnPushDLShowcase) try {
                    "" != e(this).attr("data-dl-data") && fnPushDLShowcase(JSON.parse(e(this).attr("data-dl-data")))
                } catch (t) {}
                n("show"), e(document).bind("keyup", p)
            })
        }, e(document).ready(function() {
            if ("undefined" != typeof pageName) switch (pageName) {
                case "synopsis":
                    e(".synopsis-banner").showcaseTrailer();
                    break;
                default:
                    e(".banner-container").showcaseTrailer()
            }
        })
    }(jQuery), function(e) {
        var t = {
            regionSearch: {
                regionName: [],
                regionCode: [],
                stringMatcher: function(n) {
                    return function(n, i) {
                        t.regionSearch.regionName = [], t.regionSearch.regionCode = [], substrRegex = new RegExp(n, "i");
                        var a = new RegExp("\\b" + n.toUpperCase() + "\\w*\\b", "gi"),
                            r = ["Mumbai", "Mumbai : Western", "Mumbai : South Central", "Navi Mumbai", "Kalyan", "Ulhasnagar", "National Capital Region (NCR)"],
                            s = [];
                        e.each(regionlst, function(t, i) {
                            e.each(i, function(t, i) {
                                a = new RegExp("\\b" + n.toUpperCase() + "\\w*\\b", "gi"), a.test(i.alias.toUpperCase()) && e.inArray(i.alias, r) == -1 && s.push(new Array(i.code, i.name))
                            })
                        });
                        for (var o = 0; o < regionalias.length; o++) {
                            for (var l = !1, c = 0; c < regionalias[o].Alias.length; c++)
                                if (a.test(regionalias[o].Alias[c].toUpperCase())) {
                                    l = !0;
                                    break
                                }
                            l && s.push(new Array(regionalias[o].code, regionalias[o].name))
                        }(a.test("BOMBAY") || a.test("MUMBAI") || a.test("MUMBAI WESTERN") || a.test("Mumbai South Central") || a.test("NAVI MUMBAI") || a.test("KALYAN") || a.test("ULHASNAGAR")) && s.push(new Array("MUMBAI", "Mumbai")), (a.test("NATIONAL CAPITAL REGION") || a.test("NCR")) && s.push(new Array("NCR", "National Capital Region (NCR)")), a.test("BANGALORE") && s.push(new Array("BANG", "Bengaluru"));
                        for (var d = 0; d < s.length; d++) t.regionSearch.regionName.indexOf(s[d][1]) == -1 && (t.regionSearch.regionName.push(s[d][1]), t.regionSearch.regionCode.push(s[d][0]));
                        i(t.regionSearch.regionName)
                    }
                },
                onSelection: function(n, i) {
                    var a = ["Mumbai", "Mumbai : Western", "Mumbai : South Central", "Navi Mumbai", "Kalyan", "Ulhasnagar"],
                        r = ["Bangalore", "Bengaluru"],
                        s = BMS.Storage.get({
                            name: "lang",
                            storage: "C"
                        });
                    if ("" == s || "eng" == s) {
                        var o = i.trim(),
                            l = t.regionSearch.regionName.indexOf(o);
                        BMS.Region.fnSTopReg(t.regionSearch.regionCode[l], t.regionSearch.regionName[l])
                    } else {
                        var c = "",
                            d = "";
                        e.each(regionlst, function(t, n) {
                            if (e.each(n, function(e, t) {
                                    if (t.name == i) return c = t.alias, d = t.code, !1
                                }), c.length > 0) return !1
                        });
                        var o = c.trim();
                        a.indexOf(i) >= 0 ? (d = "MUMBAI", o = "Mumbai") : r.indexOf(i) >= 0 && (d = "BANG", o = "Bengaluru"), BMS.Region.fnSTopReg(d, o)
                    }
                }
            }
        };
        e(document).ready(function() {
            e(".form-input.__input._default").typeaheadWrapper({
                dataSet: {
                    source: t.regionSearch.stringMatcher(),
                    limit: 8
                },
                onResultSelection: t.regionSearch.onSelection
            }), e("#inp_RegionSearch.form-input._dos").typeaheadWrapper({
                dataSet: {
                    source: t.regionSearch.stringMatcher(),
                    limit: 8
                },
                onResultSelection: t.regionSearch.onSelection
            })
        })
    }(jQuery), function(e) {
        "namespace sumo";
        e.fn.SumoSelect = function(t) {
            var n = e.extend({
                    placeholder: "Select Here",
                    csvDispCount: 3,
                    captionFormat: "{0} Selected",
                    floatWidth: 400,
                    forceCustomRendering: !0,
                    nativeOnDevice: ["Android", "BlackBerry", "iPhone", "iPad", "iPod", "Opera Mini", "IEMobile", "Silk"],
                    outputAsCSV: !1,
                    csvSepChar: ",",
                    okCancelInMulti: !1,
                    triggerChangeCombined: !0,
                    selectAll: !1,
                    selectAlltext: "Select All"
                }, t),
                a = this.each(function() {
                    var t = this;
                    !this.sumo && e(this).is("select") && (this.sumo = {
                        E: e(t),
                        is_multi: e(t).attr("multiple"),
                        select: "",
                        caption: "",
                        placeholder: "",
                        optDiv: "",
                        CaptionCont: "",
                        is_floating: !1,
                        is_opened: !1,
                        mob: !1,
                        Pstate: [],
                        createElems: function() {
                            var t = this,
                                i = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-arrow-down-new"></use></svg>';
                            return t.E.wrap('<div class="SumoSelect" tabindex="0">'), t.select = t.E.parent(), t.caption = e("<span></span>"), t.CaptionCont = e('<p class="CaptionCont"><label><i class="downChevron">' + i + "</i></label></p>").addClass("SlectBox").attr("style", t.E.attr("style")).prepend(t.caption), t.select.append(t.CaptionCont), t.E.attr("disabled") && t.select.addClass("disabled").removeAttr("tabindex"), n.outputAsCSV && t.is_multi && t.E.attr("name") && (t.select.append(e('<input class="HEMANT123" type="hidden" />').attr("name", t.E.attr("name")).val(t.getSelStr())), t.E.removeAttr("name")), t.isMobile() && !n.forceCustomRendering ? void t.setNativeMobile() : (t.E.hide(), t.optDiv = e('<div class="optWrapper">'), t.floatingList(), ul = e('<ul class="options">'), t.optDiv.append(ul), n.selectAll && t.selAll(), e(t.E.children("option")).each(function(n, i) {
                                i = e(i), t.createLi(i)
                            }), t.is_multi && t.multiSelelect(), t.select.append(t.optDiv), t.basicEvents(), void t.selAllState())
                        },
                        createLi: function(t, n) {
                            var i = this;
                            return t.attr("value") || t.attr("value", t.val()), li = e('<li data-val="' + t.val() + '"><label>' + t.text() + "</label></li>"), i.is_multi && li.prepend("<span><i></i></span>"), t[0].disabled && (li = li.addClass("disabled")), i.onOptClick(li), t[0].selected && li.addClass("selected"), t.attr("class") && li.addClass(t.attr("class")), ul = i.optDiv.children("ul.options"), "undefined" == typeof n ? ul.append(li) : ul.children("li").eq(n).before(li), li
                        },
                        getSelStr: function() {
                            return sopt = [], this.E.children("option:selected").each(function() {
                                sopt.push(e(this).val())
                            }), sopt.join(n.csvSepChar)
                        },
                        multiSelelect: function() {
                            var t = this;
                            t.optDiv.addClass("multiple"), t.okbtn = e('<p class="btnOk">OK</p>').click(function() {
                                n.triggerChangeCombined && (changed = !1, t.E.children("option:selected").length != t.Pstate.length ? changed = !0 : t.E.children("option:selected").each(function() {
                                    t.Pstate.indexOf(e(this).val()) < 0 && (changed = !0)
                                }), changed && (t.E.trigger("change").trigger("click"), t.setText())), t.hideOpts()
                            }), t.cancelBtn = e('<p class="btnCancel">Cancel</p>').click(function() {
                                t._cnbtn(), t.hideOpts()
                            }), t.optDiv.append(e('<div class="MultiControls">').append(t.okbtn).append(t.cancelBtn))
                        },
                        _cnbtn: function() {
                            var e = this;
                            for (e.E.children("option:selected").each(function() {
                                    this.selected = !1
                                }), e.optDiv.find("li.selected").removeClass("selected"), i = 0; i < e.Pstate.length; i++) e.E.children('option[value="' + e.Pstate[i] + '"]')[0].selected = !0, e.optDiv.find('li[data-val="' + e.Pstate[i] + '"]').addClass("selected");
                            e.selAllState()
                        },
                        selAll: function() {
                            var t = this;
                            t.is_multi && (t.chkAll = e("<i>"), t.selAll = e('<p class="select-all"><label>' + n.selectAlltext + "</label></p>").prepend(e("<span></span>").append(t.chkAll)), t.chkAll.on("click", function() {
                                t.selAll.toggleClass("selected"), t.optDiv.find("ul.options li").each(function(n, i) {
                                    i = e(i), t.selAll.hasClass("selected") ? i.hasClass("selected") || i.trigger("click") : i.hasClass("selected") && i.trigger("click")
                                })
                            }), t.optDiv.prepend(t.selAll))
                        },
                        selAllState: function() {
                            var t = this;
                            if (n.selectAll) {
                                var i = 0,
                                    a = 0;
                                t.optDiv.find("ul.options li").each(function(t, n) {
                                    e(n).hasClass("selected") && i++, e(n).hasClass("disabled") || a++
                                }), i == a ? t.selAll.removeClass("partial").addClass("selected") : 0 == i ? t.selAll.removeClass("selected partial") : t.selAll.addClass("partial")
                            }
                        },
                        showOpts: function() {
                            var t = this;
                            t.E.attr("disabled") || (t.is_opened = !0, t.optDiv.addClass("open"), t.optDiv.closest(".SumoSelect").find(".CaptionCont").find("span").addClass("_active"), t.optDiv.closest(".SumoSelect").find(".CaptionCont").find(".downChevron").addClass("rotate"), e(document).on("click.sumo", function(e) {
                                if (!t.select.is(e.target) && 0 === t.select.has(e.target).length) {
                                    if (!t.is_opened) return;
                                    t.hideOpts(), t.is_multi && n.okCancelInMulti && t._cnbtn()
                                }
                            }), t.is_floating && (H = t.optDiv.children("ul").outerHeight() + 2, t.is_multi && (H += parseInt(t.optDiv.css("padding-bottom"))), t.optDiv.css("height", H)), t.is_multi && (t.is_floating || n.okCancelInMulti) && (t.Pstate = [], t.E.children("option:selected").each(function() {
                                t.Pstate.push(e(this).val())
                            })))
                        },
                        hideOpts: function() {
                            var t = this;
                            t.is_opened = !1, t.optDiv.removeClass("open").find("ul li.sel").removeClass("sel"), t.optDiv.closest(".SumoSelect").find(".CaptionCont").find("span").removeClass("_active"), t.optDiv.closest(".SumoSelect").find(".CaptionCont").find(".downChevron").removeClass("rotate"), e(document).off("click.sumo")
                        },
                        setOnOpen: function() {
                            var e = this,
                                t = e.optDiv.find("ul li").eq(e.E[0].selectedIndex);
                            t.addClass("sel"), e.showOpts()
                        },
                        nav: function(e) {
                            var t, n = this,
                                i = n.optDiv.find("ul li.sel");
                            if (n.is_opened && i.length) {
                                if (t = e ? i.prevAll("li:not(.disabled)") : i.nextAll("li:not(.disabled)"), !t.length) return;
                                i.removeClass("sel"), i = t.first().addClass("sel");
                                var a = n.optDiv.find("ul"),
                                    r = a.scrollTop(),
                                    s = i.position().top + r;
                                s >= r + a.height() - i.outerHeight() && a.scrollTop(s - a.height() + i.outerHeight()), s < r && a.scrollTop(s)
                            } else n.setOnOpen()
                        },
                        basicEvents: function() {
                            var t = this;
                            t.CaptionCont.click(function(e) {
                                t.E.trigger("click"), t.is_opened ? t.hideOpts() : t.showOpts(), e.stopPropagation()
                            }), t.select.on("keydown", function(e) {
                                switch (e.which) {
                                    case 38:
                                        t.nav(!0);
                                        break;
                                    case 40:
                                        t.nav(!1);
                                        break;
                                    case 32:
                                    case 13:
                                        t.is_opened ? t.optDiv.find("ul li.sel").trigger("click") : t.setOnOpen();
                                        break;
                                    case 9:
                                    case 27:
                                        return t.is_multi && n.okCancelInMulti && t._cnbtn(), void t.hideOpts();
                                    default:
                                        return
                                }
                                e.preventDefault()
                            }), e(window).on("resize.sumo", function() {
                                t.floatingList()
                            })
                        },
                        onOptClick: function(t) {
                            var i = this;
                            t.click(function() {
                                var t = e(this);
                                t.hasClass("disabled") || (txt = "", i.is_multi ? (t.toggleClass("selected"), i.E.children('option[value="' + t.data("val") + '"]')[0].selected = t.hasClass("selected"), i.selAllState()) : (t.parent().find("li.selected").removeClass("selected"), t.toggleClass("selected"), i.E.val(t.attr("data-val"))), i.is_multi && n.triggerChangeCombined && (i.is_floating || n.okCancelInMulti) || (i.setText(), i.E.trigger("change").trigger("click")), i.is_multi || i.hideOpts())
                            })
                        },
                        setText: function() {
                            var t = this;
                            if (t.placeholder = "", t.is_multi) {
                                for (sels = t.E.children(":selected").not(":disabled"), i = 0; i < sels.length; i++) {
                                    if (i >= n.csvDispCount && n.csvDispCount) {
                                        t.placeholder = n.captionFormat.replace("{0}", sels.length);
                                        break
                                    }
                                    t.placeholder += e(sels[i]).text() + ", "
                                }
                                t.placeholder = t.placeholder.replace(/,([^,]*)$/, "$1")
                            } else t.placeholder = t.E.children(":selected").not(":disabled").text();
                            return is_placeholder = !1, t.placeholder || (is_placeholder = !0, t.placeholder = t.E.attr("placeholder"), t.placeholder || (t.placeholder = t.E.children("option:disabled:selected").text())), t.placeholder = t.placeholder ? t.placeholder : n.placeholder, t.caption.text(t.placeholder), csvField = t.select.find("input.HEMANT123"), csvField.length && csvField.val(t.getSelStr()), is_placeholder ? t.caption.addClass("placeholder") : t.caption.removeClass("placeholder"), t.placeholder
                        },
                        isMobile: function() {
                            for (var e = navigator.userAgent || navigator.vendor || window.opera, t = 0; t < n.nativeOnDevice.length; t++)
                                if (e.toString().toLowerCase().indexOf(n.nativeOnDevice[t].toLowerCase()) > 0) return n.nativeOnDevice[t];
                            return !1
                        },
                        setNativeMobile: function() {
                            var e = this;
                            e.E.addClass("SelectClass"), e.mob = !0, e.E.change(function() {
                                e.setText()
                            })
                        },
                        floatingList: function() {
                            var t = this;
                            t.is_floating = e(window).width() <= n.floatWidth, t.optDiv.toggleClass("isFloating", t.is_floating), t.is_floating || t.optDiv.css("height", ""), t.optDiv.toggleClass("okCancelInMulti", n.okCancelInMulti && !t.is_floating)
                        },
                        vRange: function(e) {
                            var t = this;
                            if (opts = t.E.children("option"), opts.length <= e || e < 0) throw "index out of bounds";
                            return t
                        },
                        toggSel: function(e, t) {
                            var n = this.vRange(t);
                            n.E.children("option")[t].disabled || (n.E.children("option")[t].selected = e, n.mob || n.optDiv.find("ul.options li").eq(t).toggleClass("selected", e), n.setText())
                        },
                        toggDis: function(e, t) {
                            var n = this.vRange(t);
                            n.E.children("option")[t].disabled = e, e && (n.E.children("option")[t].selected = !1), n.mob || n.optDiv.find("ul.options li").eq(t).toggleClass("disabled", e).removeClass("selected"), n.setText()
                        },
                        toggSumo: function(e) {
                            var t = this;
                            return t.enabled = e, t.select.toggleClass("disabled", e), e ? (t.E.attr("disabled", "disabled"), t.select.removeAttr("tabindex")) : (t.E.removeAttr("disabled"), t.select.attr("tabindex", "0")), t
                        },
                        toggSelAll: function(t) {
                            var i = this;
                            i.E.find("option").each(function(n, a) {
                                i.E.find("option")[e(this).index()].disabled || (i.E.find("option")[e(this).index()].selected = t, i.mob || i.optDiv.find("ul.options li").eq(e(this).index()).toggleClass("selected", t), i.setText())
                            }), !i.mob && n.selectAll && i.selAll.removeClass("partial").toggleClass("selected", t)
                        },
                        reload: function() {
                            var t = this.unload();
                            return e(t).SumoSelect(n)
                        },
                        unload: function() {
                            var e = this;
                            return e.select.before(e.E), e.E.show(), n.outputAsCSV && e.is_multi && e.select.find("input.HEMANT123").length && e.E.attr("name", e.select.find("input.HEMANT123").attr("name")), e.select.remove(), delete t.sumo, t
                        },
                        add: function(n, i, a) {
                            if ("undefined" == typeof n) throw "No value to add";
                            var r = this;
                            if (opts = r.E.children("option"), "number" == typeof i && (a = i, i = n), "undefined" == typeof i && (i = n), opt = e("<option></option>").val(n).html(i), opts.length < a) throw "index out of bounds";
                            return "undefined" == typeof a || opts.length == a ? (r.E.append(opt), r.mob || r.createLi(opt)) : (opts.eq(a).before(opt), r.mob || r.createLi(opt, a)), t
                        },
                        remove: function(e) {
                            var t = this.vRange(e);
                            t.E.children("option").eq(e).remove(), t.mob || t.optDiv.find("ul.options li").eq(e).remove(), t.setText()
                        },
                        selectItem: function(e) {
                            this.toggSel(!0, e)
                        },
                        unSelectItem: function(e) {
                            this.toggSel(!1, e)
                        },
                        selectAll: function() {
                            this.toggSelAll(!0)
                        },
                        unSelectAll: function() {
                            this.toggSelAll(!1)
                        },
                        disableItem: function(e) {
                            this.toggDis(!0, e)
                        },
                        enableItem: function(e) {
                            this.toggDis(!1, e)
                        },
                        enabled: !0,
                        enable: function() {
                            return this.toggSumo(!1)
                        },
                        disable: function() {
                            return this.toggSumo(!0)
                        },
                        init: function() {
                            var e = this;
                            return e.createElems(), e.setText(), e
                        }
                    }, t.sumo.init())
                });
            return 1 == a.length ? a[0] : a
        }
    }(jQuery), window.navigator.userAgent.indexOf("MSIE") > 0) var use = "svg";
else var use = "use";
$(document).ready(function() {
        function e(e, t) {
            for (var n = 0; n < e.length; n++)
                for (var i = 0, a = $(e[n]).find(".__genre").length > 0 ? $(e[n]).find(".__genre") : $(e[n]).find(".__tag"), r = 0; r < a.length; r++) {
                    var s = $(a[r]).text().length;
                    if (i = s + i, i > t) {
                        var o = $(a[r]).text(),
                            l = o.slice(0, 3) + "...";
                        $(a[r]).text(l)
                    }
                }
        }

        function t(e, t) {
            for (var n = 0; n < e.length; n++) {
                var i = 0;
                genreItems = $(e[n]).find(".__genre").length > 0 ? $(e[n]).find(".__genre") : $(e[n]).find(".__tag");
                for (var a = 0; a < genreItems.length; a++)
                    if (i = $(genreItems[a]).text().length, i > t) {
                        var r = $(genreItems[a]).text(),
                            s = r.slice(0, 8) + "...";
                        $(genreItems[a]).text(s)
                    }
            }
        }

        function n(e, t, n) {
            if (e.length > 0)
                for (var i = 0; i < e.length; i++) {
                    var a = $(e[i]).text().length;
                    if (a >= n) {
                        var r = $(e[i]).text();
                        r = r.substr(0, n), r = r.replace(/[.]*(\s?\w*)$/, " ..."), $(e[i]).text(r), $(e[i]).text(r).addClass("resizedFont")
                    } else a < n && a > t && $(e[i]).addClass("resizedFont")
                }
        }
        global.blnIsTouchScreen ? ratingFuncMobile() : ratingFuncDesktop(), $(".js-rating").click(function() {
            $(this).parents(".show-more-info").addClass("showRating")
        }), $(".poster-container").on("mouseleave", function(e) {
            e.preventDefault(), e.stopPropagation(), $(this).find(".show-more-info").removeClass("showRating")
        }), $(".ns-card-multiple .book-button").click(function() {
            var e = $(this);
            e.children(".__container").removeClass("opaqueOnHover"), e.parents(".card-container").addClass("showExperience"), e.children().html("Pick A Format"), e.addClass("button-false")
        }), $(".hideExperienceOnClick").click(function() {
            var e = $(this),
                t = e.parents(".card-container");
            t.removeClass("showExperience"), t.find(".book-button").children(".__container").addClass("opaqueOnHover").html("BOOK NOW"), t.find(".book-button").removeClass("button-false")
        }), global.blnIsTouchScreen && ($(".movie-card .more-info-button, .poster-container").on("tap", function(e) {
            e.stopPropagation(), $(this).parents(".movie-card").addClass("infoContainerIsActive")
        }), $(".movie-card .show-more-info-overlay").on("tap", function(e) {
            e.stopPropagation(), $(this).parents(".movie-card").removeClass("infoContainerIsActive"), $(this).parents(".movie-card").find(".show-more-info-container .show-more-info").removeClass("showRating")
        }));
        var i = $(".movie-card").find(".genre-list"),
            a = $(".ev-card").find(".tags");
        e(i, 24), t(a, 20), $(".__day").click(function(e) {
            e.preventDefault();
            var t = $(this),
                n = t.parents(".showtimes").find(".__details"),
                i = t.index();
            t.hasClass("_active") ? t.siblings().addClass("_inactive").removeClass("_active") : (t.addClass("_active").removeClass("_inactive"), t.siblings().addClass("_inactive").removeClass("_active"), 0 == i ? ($(n[0]).addClass("_active").removeClass("_inactive"), $(n[1]).addClass("_inactive").removeClass("_active")) : 1 == i && ($(n[1]).addClass("_active").removeClass("_inactive"), $(n[0]).addClass("_inactive").removeClass("_active")))
        });
        var r = $(".ev-card").find(".__name a");
        $(".ev-card").find(".__location");
        venueListName = $(".ve-card").find(".__name a"), venueListLocation = $(".ve-card").find(".__location"), movieListName = $(".movie-card").find(".__name a"), mamiEventTitle = $(".mami-event-card").find(".title"), n(r, 30, 60), n(r, 30, 60), n(venueListName, 30, 60), n(venueListLocation, 40, 80), n(movieListName, 30, 37), n(mamiEventTitle, 40, 50)
    }),
    function(e) {
        "use strict";
        e.fn.socialSharer = function(t) {
            var n = {
                    render: function(t, n, i) {
                        var a;
                        if (a = i && i.isTemplate ? t : g[t], !e.isEmptyObject(a)) {
                            var r, s, o, l, c, d, u = a.split("\n").join(""),
                                p = /([$\^\\\/()|?+*\[\]{}.\-])/g;
                            return i = i || {}, d = "{{}}", l = d.length, c = Math.ceil(l / 2), s = d.substr(0, c).replace(p, "\\$1"), o = d.substr(c, l).replace(p, "\\$1") || s, r = new RegExp(s + "[^" + s + o + "]+" + o, "g"), u.replace(r, function(e) {
                                var t, i = e.slice(c, -c),
                                    a = i.split("."),
                                    r = 0,
                                    s = a.length;
                                if (i in n) t = n[i];
                                else
                                    for (t = n; r < s; r++) {
                                        if (!(a[r] in t)) return e;
                                        t = t[a[r]]
                                    }
                                return t
                            })
                        }
                    },
                    serialize: function(e, t) {
                        var n = [];
                        for (var i in e)
                            if (e.hasOwnProperty(i)) {
                                var a = t ? t + "[" + i + "]" : i,
                                    r = e[i];
                                n.push("object" == typeof r ? serialize(r, a) : encodeURIComponent(a) + "=" + encodeURIComponent(r))
                            }
                        return n.join("&")
                    },
                    generateUrl: function(e, t) {
                        return e.replace(/{{url}}/g, encodeURIComponent(t.url)).replace(/{{title}}/g, encodeURIComponent(t.title)).replace(/{{description}}/g, encodeURIComponent(t.description)).replace(/{{media}}/g, encodeURIComponent(t.media)).replace(/{{fbAppId}}/g, encodeURIComponent(t.fbAppId)).replace(/{{via}}/g, encodeURIComponent(t.via))
                    }
                },
                i = {
                    pinterest: {
                        url: "http://pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{description}}",
                        linkTitle: "Pinterest"
                    },
                    facebook: {
                        url: "https://www.facebook.com/sharer/sharer.php?s=100&p[title]={{title}}&p[summary]={{description}}&p[url]={{url}}&p[images][0]={{media}}",
                        linkTitle: "Facebook"
                    },
                    twitter: {
                        url: "https://twitter.com/share?url={{url}}&via={{via}}&text={{title}}",
                        linkTitle: "Twitter"
                    },
                    googleplus: {
                        url: "https://plus.google.com/share?url={{url}}",
                        linkTitle: "Google +"
                    },
                    linkedin: {
                        url: "https://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{description}}+&source={{via}}",
                        linkTitle: "Linked In"
                    },
                    facebookFeed: {
                        url: "https://www.facebook.com/dialog/feed?app_id={{fbAppId}}&link={{url}}&caption={{title}}&description={{description}}&picture={{media}}",
                        linkTitle: "Facebook"
                    },
                    facebookShare: {
                        url: "https://www.facebook.com/dialog/share?app_id={{fbAppId}}&display=popup&href={{url}}&quote={{description}}",
                        linkTitle: "Facebook"
                    },
                    whatsapp: {
                        url: 'whatsapp://send?text={{url}}"',
                        linkTitle: "Whatsapp"
                    }
                },
                a = {
                    facebook: "facebook",
                    twitter: "twitter",
                    googleplus: "googleplus",
                    linkedin: "linkedin",
                    pinterest: "pinterest",
                    facebookFeed: "facebookFeed",
                    facebookShare: "facebookShare",
                    whatsapp: "whatsapp"
                },
                r = e(document).find("title").text();
            t = t || {};
            var s, o, l, c, d, u = {
                og: {
                    title: e('meta[property="og:title"]'),
                    url: e('meta[property="og:url"]'),
                    description: e('meta[property="og:description"]'),
                    media: e('meta[property="og:image"]'),
                    siteName: e('meta[property="og:site_name"]')
                }
            };
            u.og.title.length && (s = u.og.title.attr("content")), u.og.url.length && (o = u.og.url.attr("content")), u.og.description.length && (l = u.og.description.attr("content")), u.og.media.length && (c = u.og.media.attr("content")), u.og.siteName.length && (d = u.og.siteName.attr("content"));
            var p, f = e.extend({
                url: o || location.href,
                description: l || r,
                media: c || "",
                title: s,
                via: d || "BookMyShow",
                showCount: !1,
                showLinkTitle: !0,
                callback: function() {}
            }, t.config);
            p = t.buttons && t.buttons.length ? t.buttons : [a.pinterest, a.facebook, a.twitter, a.googleplus, a.linkedin];
            var h = {},
                g = {};
            g[a.pinterest] = '<svg class="social-sharer-svg svg-pinterest" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-pinterest"><use xlink:href="/icons/common-icons.svg#icon-pinterest-icon"></use></svg>', g[a.facebook] = '<svg class="social-sharer-svg svg-facebook" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-facebook"><use xlink:href="/icons/common-icons.svg#icon-facebook-modal"></use></svg>', g[a.twitter] = '<svg class="social-sharer-svg svg-twitter" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-facebook"><use xlink:href="/icons/common-icons.svg#icon-twitter-icon"></use></svg>', g[a.googleplus] = '<svg class="social-sharer-svg svg-google-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-facebook"><use xlink:href="/icons/common-icons.svg#icon-googleplus-modal"></use></svg>', g[a.linkedin] = '<svg class="social-sharer-svg svg-google-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-facebook"><use xlink:href="/icons/common-icons.svg#icon-linkedin"></use></svg>', g[a.whatsapp] = '<svg class="social-sharer-svg svg-whatsapp" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" enable-background="new 0 0 100 100" xml:space="preserve" class="svg-facebook"><use xlink:href="/icons/common-icons.svg#icon-whatsapp"></use></svg>', g[a.facebookFeed] = g[a.facebook], g[a.facebookShare] = g[a.facebook];
            var v = e("<a>").attr("data-type", "{{type}}").attr("data-url", "{{url}}").attr("href", "#").attr("title", "{{title}}").addClass("share-item {{type}}");
            g.shareLink = v.wrap("<div>").parent().html();
            var m = e(this),
                y = function() {
                    var a = e("<div>").addClass("social-share-container");
                    p.forEach(function(r) {
                        var s = n.generateUrl(i[r].url, f),
                            o = {
                                type: r,
                                url: s
                            };
                        o.title = f.showLinkTitle === !0 ? i[r].linkTitle : "";
                        var l, c = n.render("shareLink", o),
                            d = e(c);
                        l = t.renderer && t.renderer[r] && "function" == typeof t.renderer[r].label ? t.renderer[r].label.call(this) : g[o.type];
                        var u = e("<span>").addClass("__label").html(l);
                        d.append(u), f.showCount && h[r] && h[r] > 0 && (d.attr("data-tooltip", +h[r] + " Shares"), global.blnIsTouchScreen), a.append(d)
                    });
                    var r = function(t) {
                        return BMS.Misc.fnPopup({
                            url: e(this).data("url")
                        }), !1
                    };
                    e("a", a).click(r), m.html(a)
                };
            if (f.showCount === !0) {
                var S = function(e) {
                        h[a.facebook] = e.FBcnt, h[a.twitter] = e.TWtcnt, h[a.googleplus] = e.gpcnt, h[a.linkedin] = e.Lincnt, y(), f.callback()
                    },
                    w = function() {
                        f.showCount = !1, y()
                    };
                e.ajax({
                    url: "/serv/getData",
                    dataType: "json",
                    type: "GET",
                    data: {
                        saurl: f.url,
                        cmd: "SHARE"
                    },
                    success: S,
                    error: w
                })
            } else y();
            return m
        }
    }(jQuery),
    function(e) {
        e.extend(e, {
            placeholder: {
                browser_supported: function() {
                    return void 0 !== this._supported ? this._supported : this._supported = !!("placeholder" in e('<input type="text">')[0])
                },
                shim: function(t) {
                    var n = {
                        color: "#888",
                        cls: "placeholder",
                        selector: "input[placeholder], textarea[placeholder]"
                    };
                    return e.extend(n, t), !this.browser_supported() && e(n.selector)._placeholder_shim(n)
                }
            }
        }), e.extend(e.fn, {
            _placeholder_shim: function(t) {
                function n(t) {
                    var n = e(t).offsetParent().offset(),
                        i = e(t).offset();
                    return {
                        top: i.top - n.top,
                        left: i.left - n.left,
                        width: e(t).width()
                    }
                }

                function i(t) {
                    var a = t.data("target");
                    "undefined" != typeof a && (t.css(n(a)), e(window).one("resize", function() {
                        i(t)
                    }))
                }
                return this.each(function() {
                    var a = e(this);
                    if (a.is(":visible")) {
                        if (a.data("placeholder")) {
                            var r = a.data("placeholder");
                            return r.css(n(a)), !0
                        }
                        var s = {};
                        a.is("textarea") || "auto" == a.css("height") || (s = {
                            lineHeight: a.css("height"),
                            whiteSpace: "nowrap"
                        });
                        var o = "border-box" === a.css("box-sizing"),
                            l = a.is("textarea"),
                            c = e("<label />").text(a.attr("placeholder")).addClass(t.cls).css(e.extend({
                                position: "absolute",
                                display: "inline",
                                "float": "none",
                                overflow: "hidden",
                                textAlign: "left",
                                color: t.color,
                                cursor: "text",
                                paddingTop: !l && o ? "0" : a.css("padding-top"),
                                paddingRight: a.css("padding-right"),
                                paddingBottom: !l && o ? "0" : a.css("padding-bottom"),
                                paddingLeft: a.css("padding-left"),
                                fontSize: a.css("font-size"),
                                fontFamily: a.css("font-family"),
                                fontStyle: a.css("font-style"),
                                fontWeight: a.css("font-weight"),
                                textTransform: a.css("text-transform"),
                                backgroundColor: "transparent",
                                zIndex: 99
                            }, s)).css(n(this)).attr("for", this.id).data("target", a).click(function() {
                                e(this).data("target").is(":disabled") || e(this).data("target").focus()
                            }).insertBefore(this);
                        a.data("placeholder", c).on("keydown", function() {
                            c.hide()
                        }).on("blur change", function() {
                            c[a.val().length ? "hide" : "show"]()
                        }).triggerHandler("blur"), e(window).one("resize", function() {
                            i(c)
                        })
                    }
                })
            }
        })
    }(jQuery), jQuery(document).add(window).bind("ready load", function() {
        jQuery.placeholder && jQuery.placeholder.shim()
    }), ! function(e) {
        function t() {
            var e = o();
            e !== l && (l = e, u.trigger("orientationchange"))
        }

        function n(t, n, i, a) {
            var r = i.type;
            i.type = n, e.event.dispatch.call(t, i, a), i.type = r
        }
        e.attrFn = e.attrFn || {};
        var i = navigator.userAgent.toLowerCase(),
            a = i.indexOf("chrome") > -1 && (i.indexOf("windows") > -1 || i.indexOf("macintosh") > -1 || i.indexOf("linux") > -1) && i.indexOf("mobile") < 0 && i.indexOf("android") < 0,
            r = {
                tap_pixel_range: 5,
                swipe_h_threshold: 50,
                swipe_v_threshold: 50,
                taphold_threshold: 750,
                doubletap_int: 500,
                touch_capable: "ontouchstart" in window && !a,
                orientation_support: "orientation" in window && "onorientationchange" in window,
                startevent: "ontouchstart" in window && !a ? "touchstart" : "mousedown",
                endevent: "ontouchstart" in window && !a ? "touchend" : "mouseup",
                moveevent: "ontouchstart" in window && !a ? "touchmove" : "mousemove",
                tapevent: "ontouchstart" in window && !a ? "tap" : "click",
                scrollevent: "ontouchstart" in window && !a ? "touchmove" : "scroll",
                hold_timer: null,
                tap_timer: null
            };
        e.isTouchCapable = function() {
            return r.touch_capable
        }, e.getStartEvent = function() {
            return r.startevent
        }, e.getEndEvent = function() {
            return r.endevent
        }, e.getMoveEvent = function() {
            return r.moveevent
        }, e.getTapEvent = function() {
            return r.tapevent
        }, e.getScrollEvent = function() {
            return r.scrollevent
        }, e.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.on(n, e) : this.trigger(n)
            }, e.attrFn[n] = !0
        }), e.event.special.tapstart = {
            setup: function() {
                var t = this,
                    i = e(t);
                i.on(r.startevent, function(e) {
                    if (i.data("callee", arguments.callee), e.which && 1 !== e.which) return !1;
                    var a = e.originalEvent,
                        s = {
                            position: {
                                x: r.touch_capable ? a.touches[0].screenX : e.screenX,
                                y: r.touch_capable ? a.touches[0].screenY : e.screenY
                            },
                            offset: {
                                x: r.touch_capable ? a.touches[0].pageX - a.touches[0].target.offsetLeft : e.offsetX,
                                y: r.touch_capable ? a.touches[0].pageY - a.touches[0].target.offsetTop : e.offsetY
                            },
                            time: Date.now(),
                            target: e.target
                        };
                    return n(t, "tapstart", e, s), !0
                })
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee)
            }
        }, e.event.special.tapmove = {
            setup: function() {
                var t = this,
                    i = e(t);
                i.on(r.moveevent, function(e) {
                    i.data("callee", arguments.callee);
                    var a = e.originalEvent,
                        s = {
                            position: {
                                x: r.touch_capable ? a.touches[0].screenX : e.screenX,
                                y: r.touch_capable ? a.touches[0].screenY : e.screenY
                            },
                            offset: {
                                x: r.touch_capable ? a.touches[0].pageX - a.touches[0].target.offsetLeft : e.offsetX,
                                y: r.touch_capable ? a.touches[0].pageY - a.touches[0].target.offsetTop : e.offsetY
                            },
                            time: Date.now(),
                            target: e.target
                        };
                    return n(t, "tapmove", e, s), !0
                })
            },
            remove: function() {
                e(this).off(r.moveevent, e(this).data.callee)
            }
        }, e.event.special.tapend = {
            setup: function() {
                var t = this,
                    i = e(t);
                i.on(r.endevent, function(e) {
                    i.data("callee", arguments.callee);
                    var a = e.originalEvent,
                        s = {
                            position: {
                                x: r.touch_capable ? a.changedTouches[0].screenX : e.screenX,
                                y: r.touch_capable ? a.changedTouches[0].screenY : e.screenY
                            },
                            offset: {
                                x: r.touch_capable ? a.changedTouches[0].pageX - a.changedTouches[0].target.offsetLeft : e.offsetX,
                                y: r.touch_capable ? a.changedTouches[0].pageY - a.changedTouches[0].target.offsetTop : e.offsetY
                            },
                            time: Date.now(),
                            target: e.target
                        };
                    return n(t, "tapend", e, s), !0
                })
            },
            remove: function() {
                e(this).off(r.endevent, e(this).data.callee)
            }
        }, e.event.special.taphold = {
            setup: function() {
                var t, i = this,
                    a = e(i),
                    s = {
                        x: 0,
                        y: 0
                    },
                    o = 0,
                    l = 0;
                a.on(r.startevent, function(e) {
                    if (e.which && 1 !== e.which) return !1;
                    a.data("tapheld", !1), t = e.target;
                    var c = e.originalEvent,
                        d = Date.now(),
                        u = {
                            x: r.touch_capable ? c.touches[0].screenX : e.screenX,
                            y: r.touch_capable ? c.touches[0].screenY : e.screenY
                        },
                        p = {
                            x: r.touch_capable ? c.touches[0].pageX - c.touches[0].target.offsetLeft : e.offsetX,
                            y: r.touch_capable ? c.touches[0].pageY - c.touches[0].target.offsetTop : e.offsetY
                        };
                    return s.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, s.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, o = s.x, l = s.y, r.hold_timer = window.setTimeout(function() {
                        var f = s.x - o,
                            h = s.y - l;
                        if (e.target == t && (s.x == o && s.y == l || f >= -r.tap_pixel_range && f <= r.tap_pixel_range && h >= -r.tap_pixel_range && h <= r.tap_pixel_range)) {
                            a.data("tapheld", !0);
                            var g = Date.now(),
                                v = {
                                    x: r.touch_capable ? c.touches[0].screenX : e.screenX,
                                    y: r.touch_capable ? c.touches[0].screenY : e.screenY
                                },
                                m = {
                                    x: r.touch_capable ? c.touches[0].pageX - c.touches[0].target.offsetLeft : e.offsetX,
                                    y: r.touch_capable ? c.touches[0].pageY - c.touches[0].target.offsetTop : e.offsetY
                                };
                            duration = g - d;
                            var y = {
                                startTime: d,
                                endTime: g,
                                startPosition: u,
                                startOffset: p,
                                endPosition: v,
                                endOffset: m,
                                duration: duration,
                                target: e.target
                            };
                            a.data("callee1", arguments.callee), n(i, "taphold", e, y)
                        }
                    }, r.taphold_threshold), !0
                }).on(r.endevent, function() {
                    a.data("callee2", arguments.callee), a.data("tapheld", !1), window.clearTimeout(r.hold_timer)
                }).on(r.moveevent, function(e) {
                    a.data("callee3", arguments.callee), o = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, l = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY
                })
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee1).off(r.endevent, e(this).data.callee2).off(r.moveevent, e(this).data.callee3)
            }
        }, e.event.special.doubletap = {
            setup: function() {
                var t, i, a, s, o, l = this,
                    c = e(l),
                    d = !1;
                c.on(r.startevent, function(e) {
                    return (!e.which || 1 === e.which) && (c.data("doubletapped", !1), t = e.target, c.data("callee1", arguments.callee), s = e.originalEvent, a = {
                        position: {
                            x: r.touch_capable ? s.touches[0].screenX : e.screenX,
                            y: r.touch_capable ? s.touches[0].screenY : e.screenY
                        },
                        offset: {
                            x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX,
                            y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY
                        },
                        time: Date.now(),
                        target: e.target
                    }, !0)
                }).on(r.endevent, function(e) {
                    var s = Date.now(),
                        u = c.data("lastTouch") || s + 1,
                        p = s - u;
                    if (window.clearTimeout(i), c.data("callee2", arguments.callee), p < r.doubletap_int && e.target == t && p > 100) {
                        c.data("doubletapped", !0), window.clearTimeout(r.tap_timer);
                        var f = {
                                position: {
                                    x: r.touch_capable ? e.originalEvent.changedTouches[0].screenX : e.screenX,
                                    y: r.touch_capable ? e.originalEvent.changedTouches[0].screenY : e.screenY
                                },
                                offset: {
                                    x: r.touch_capable ? e.originalEvent.changedTouches[0].pageX - e.originalEvent.changedTouches[0].target.offsetLeft : e.offsetX,
                                    y: r.touch_capable ? e.originalEvent.changedTouches[0].pageY - e.originalEvent.changedTouches[0].target.offsetTop : e.offsetY
                                },
                                time: Date.now(),
                                target: e.target
                            },
                            h = {
                                firstTap: a,
                                secondTap: f,
                                interval: f.time - a.time
                            };
                        d || n(l, "doubletap", e, h), d = !0, o = window.setTimeout(function() {
                            d = !1
                        }, r.doubletap_int)
                    } else c.data("lastTouch", s), i = window.setTimeout(function() {
                        window.clearTimeout(i)
                    }, r.doubletap_int, [e]);
                    c.data("lastTouch", s)
                })
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee1).off(r.endevent, e(this).data.callee2)
            }
        }, e.event.special.singletap = {
            setup: function() {
                var t = this,
                    i = e(t),
                    a = null,
                    s = null,
                    o = {
                        x: 0,
                        y: 0
                    };
                i.on(r.startevent, function(e) {
                    return (!e.which || 1 === e.which) && (s = Date.now(), a = e.target, i.data("callee1", arguments.callee), o.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, o.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, !0)
                }).on(r.endevent, function(e) {
                    i.data("callee2", arguments.callee), e.target == a && (end_pos_x = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX, end_pos_y = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY, r.tap_timer = window.setTimeout(function() {
                        if (!i.data("doubletapped") && !i.data("tapheld") && o.x == end_pos_x && o.y == end_pos_y) {
                            var a = e.originalEvent,
                                l = {
                                    position: {
                                        x: r.touch_capable ? a.changedTouches[0].screenX : e.screenX,
                                        y: r.touch_capable ? a.changedTouches[0].screenY : e.screenY
                                    },
                                    offset: {
                                        x: r.touch_capable ? a.changedTouches[0].pageX - a.changedTouches[0].target.offsetLeft : e.offsetX,
                                        y: r.touch_capable ? a.changedTouches[0].pageY - a.changedTouches[0].target.offsetTop : e.offsetY
                                    },
                                    time: Date.now(),
                                    target: e.target
                                };
                            l.time - s < r.taphold_threshold && n(t, "singletap", e, l)
                        }
                    }, r.doubletap_int))
                })
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee1).off(r.endevent, e(this).data.callee2)
            }
        }, e.event.special.tap = {
            setup: function() {
                var t, i, a = this,
                    s = e(a),
                    o = !1,
                    l = null,
                    c = {
                        x: 0,
                        y: 0
                    };
                s.on(r.startevent, function(e) {
                    return s.data("callee1", arguments.callee), (!e.which || 1 === e.which) && (o = !0, c.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, c.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, t = Date.now(), l = e.target, i = e.originalEvent.targetTouches ? e.originalEvent.targetTouches : [e], !0)
                }).on(r.endevent, function(e) {
                    s.data("callee2", arguments.callee);
                    var d, u = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                        p = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY,
                        f = c.x - u,
                        h = c.y - p;
                    if (l == e.target && o && Date.now() - t < r.taphold_threshold && (c.x == u && c.y == p || f >= -r.tap_pixel_range && f <= r.tap_pixel_range && h >= -r.tap_pixel_range && h <= r.tap_pixel_range)) {
                        for (var g = e.originalEvent, v = [], m = 0; m < i.length; m++) {
                            var y = {
                                position: {
                                    x: r.touch_capable ? g.changedTouches[m].screenX : e.screenX,
                                    y: r.touch_capable ? g.changedTouches[m].screenY : e.screenY
                                },
                                offset: {
                                    x: r.touch_capable ? g.changedTouches[m].pageX - g.changedTouches[m].target.offsetLeft : e.offsetX,
                                    y: r.touch_capable ? g.changedTouches[m].pageY - g.changedTouches[m].target.offsetTop : e.offsetY
                                },
                                time: Date.now(),
                                target: e.target
                            };
                            v.push(y)
                        }
                        switch (i.length) {
                            case 1:
                                d = "tap";
                                break;
                            case 2:
                                d = "tap2";
                                break;
                            case 3:
                                d = "tap3";
                                break;
                            case 4:
                                d = "tap4"
                        }
                        n(a, d, e, v)
                    }
                })
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee1).off(r.endevent, e(this).data.callee2)
            }
        }, e.event.special.swipe = {
            setup: function() {
                function t(t) {
                    o = e(t.currentTarget), o.data("callee1", arguments.callee), d.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, d.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY, u.x = d.x, u.y = d.y, l = !0;
                    var n = t.originalEvent;
                    a = {
                        position: {
                            x: r.touch_capable ? n.touches[0].screenX : t.screenX,
                            y: r.touch_capable ? n.touches[0].screenY : t.screenY
                        },
                        offset: {
                            x: r.touch_capable ? n.touches[0].pageX - n.touches[0].target.offsetLeft : t.offsetX,
                            y: r.touch_capable ? n.touches[0].pageY - n.touches[0].target.offsetTop : t.offsetY
                        },
                        time: Date.now(),
                        target: t.target
                    }
                }

                function n(t) {
                    o = e(t.currentTarget), o.data("callee2", arguments.callee), u.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, u.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY;
                    var n, i = o.parent().data("xthreshold") ? o.parent().data("xthreshold") : o.data("xthreshold"),
                        s = o.parent().data("ythreshold") ? o.parent().data("ythreshold") : o.data("ythreshold"),
                        p = "undefined" != typeof i && i !== !1 && parseInt(i) ? parseInt(i) : r.swipe_h_threshold,
                        f = "undefined" != typeof s && s !== !1 && parseInt(s) ? parseInt(s) : r.swipe_v_threshold;
                    if (d.y > u.y && d.y - u.y > f && (n = "swipeup"), d.x < u.x && u.x - d.x > p && (n = "swiperight"), d.y < u.y && u.y - d.y > f && (n = "swipedown"), d.x > u.x && d.x - u.x > p && (n = "swipeleft"), void 0 != n && l) {
                        d.x = 0, d.y = 0, u.x = 0, u.y = 0, l = !1;
                        var h = t.originalEvent;
                        endEvnt = {
                            position: {
                                x: r.touch_capable ? h.touches[0].screenX : t.screenX,
                                y: r.touch_capable ? h.touches[0].screenY : t.screenY
                            },
                            offset: {
                                x: r.touch_capable ? h.touches[0].pageX - h.touches[0].target.offsetLeft : t.offsetX,
                                y: r.touch_capable ? h.touches[0].pageY - h.touches[0].target.offsetTop : t.offsetY
                            },
                            time: Date.now(),
                            target: t.target
                        };
                        var g = Math.abs(a.position.x - endEvnt.position.x),
                            v = Math.abs(a.position.y - endEvnt.position.y),
                            m = {
                                startEvnt: a,
                                endEvnt: endEvnt,
                                direction: n.replace("swipe", ""),
                                xAmount: g,
                                yAmount: v,
                                duration: endEvnt.time - a.time
                            };
                        c = !0, o.trigger("swipe", m).trigger(n, m)
                    }
                }

                function i(t) {
                    o = e(t.currentTarget);
                    var n = "";
                    if (o.data("callee3", arguments.callee), c) {
                        var i = o.data("xthreshold"),
                            s = o.data("ythreshold"),
                            d = "undefined" != typeof i && i !== !1 && parseInt(i) ? parseInt(i) : r.swipe_h_threshold,
                            u = "undefined" != typeof s && s !== !1 && parseInt(s) ? parseInt(s) : r.swipe_v_threshold,
                            p = t.originalEvent;
                        endEvnt = {
                            position: {
                                x: r.touch_capable ? p.changedTouches[0].screenX : t.screenX,
                                y: r.touch_capable ? p.changedTouches[0].screenY : t.screenY
                            },
                            offset: {
                                x: r.touch_capable ? p.changedTouches[0].pageX - p.changedTouches[0].target.offsetLeft : t.offsetX,
                                y: r.touch_capable ? p.changedTouches[0].pageY - p.changedTouches[0].target.offsetTop : t.offsetY
                            },
                            time: Date.now(),
                            target: t.target
                        }, a.position.y > endEvnt.position.y && a.position.y - endEvnt.position.y > u && (n = "swipeup"), a.position.x < endEvnt.position.x && endEvnt.position.x - a.position.x > d && (n = "swiperight"), a.position.y < endEvnt.position.y && endEvnt.position.y - a.position.y > u && (n = "swipedown"), a.position.x > endEvnt.position.x && a.position.x - endEvnt.position.x > d && (n = "swipeleft");
                        var f = Math.abs(a.position.x - endEvnt.position.x),
                            h = Math.abs(a.position.y - endEvnt.position.y),
                            g = {
                                startEvnt: a,
                                endEvnt: endEvnt,
                                direction: n.replace("swipe", ""),
                                xAmount: f,
                                yAmount: h,
                                duration: endEvnt.time - a.time
                            };
                        o.trigger("swipeend", g)
                    }
                    l = !1, c = !1
                }
                var a, s = this,
                    o = e(s),
                    l = !1,
                    c = !1,
                    d = {
                        x: 0,
                        y: 0
                    },
                    u = {
                        x: 0,
                        y: 0
                    };
                o.on(r.startevent, t), o.on(r.moveevent, n), o.on(r.endevent, i)
            },
            remove: function() {
                e(this).off(r.startevent, e(this).data.callee1).off(r.moveevent, e(this).data.callee2).off(r.endevent, e(this).data.callee3)
            }
        }, e.event.special.scrollstart = {
            setup: function() {
                function t(e, t) {
                    i = t, n(s, i ? "scrollstart" : "scrollend", e)
                }
                var i, a, s = this,
                    o = e(s);
                o.on(r.scrollevent, function(e) {
                    o.data("callee", arguments.callee), i || t(e, !0), clearTimeout(a), a = setTimeout(function() {
                        t(e, !1)
                    }, 50)
                })
            },
            remove: function() {
                e(this).off(r.scrollevent, e(this).data.callee)
            }
        };
        var s, o, l, c, d, u = e(window),
            p = {
                0: !0,
                180: !0
            };
        if (r.orientation_support) {
            var f = window.innerWidth || u.width(),
                h = window.innerHeight || u.height(),
                g = 50;
            c = f > h && f - h > g, d = p[window.orientation], (c && d || !c && !d) && (p = {
                "-90": !0,
                90: !0
            })
        }
        e.event.special.orientationchange = s = {
            setup: function() {
                return !r.orientation_support && (l = o(), u.on("throttledresize", t), !0)
            },
            teardown: function() {
                return !r.orientation_support && (u.off("throttledresize", t), !0)
            },
            add: function(e) {
                var t = e.handler;
                e.handler = function(e) {
                    return e.orientation = o(), t.apply(this, arguments)
                }
            }
        }, e.event.special.orientationchange.orientation = o = function() {
            var e = !0,
                t = document.documentElement;
            return e = r.orientation_support ? p[window.orientation] : t && t.clientWidth / t.clientHeight < 1.1, e ? "portrait" : "landscape"
        }, e.event.special.throttledresize = {
            setup: function() {
                e(this).on("resize", w)
            },
            teardown: function() {
                e(this).off("resize", w)
            }
        };
        var v, m, y, S = 250,
            w = function() {
                m = Date.now(), y = m - b, y >= S ? (b = m, e(this).trigger("throttledresize")) : (v && window.clearTimeout(v), v = window.setTimeout(t, S - y))
            },
            b = 0;
        e.each({
            scrollend: "scrollstart",
            swipeup: "swipe",
            swiperight: "swipe",
            swipedown: "swipe",
            swipeleft: "swipe",
            swipeend: "swipe",
            tap2: "tap"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).on(n, e.noop)
                }
            }
        })
    }(jQuery),
    function(e) {
        window.mt = {}, mt.templates = {}, mt.templates.card = '<aside class="mt-card-wrapper wow fadeIn fixed-card" data-wow-offset="-50" data-index="{{index}}">\t\t<div class="trailer-card">\t\t\t<div class="card-container">\t\t\t\t<div class="poster-container">\t\t\t\t\t<img class="__poster" src="{{ieposterURL}}" data-src="{{posterURL}}" data-error="{{fallbackURL}}">\t\t\t\t\t<div class="__overlay"></div>\t\t\t\t\t<div class="show-more-info">\t\t\t\t\t\t<div class="trailer-player">\t\t\t\t\t\t\t<span class="trailer-icon __icon" data-url="" data-eventcode="{{eventCode}}">\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-play"></use>\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t<span class="now-playing">\t\t\t\t\t\t\t\t<span class="__text">NOW PLAYING</span>\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="release-info {{datePillContainerClass}}">\t\t\t\t\t   <div class="date">\t\t\t\t\t   \t\t<div class="day">{{date}}</div>\t\t\t\t\t   \t\t<div class="month">{{month}}</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="stats-wrapper">\t\t\t\t\t\t<div class="stats">\t\t\t\t\t\t\t<div class="popularity">\t\t\t\t\t\t\t\t<div class="__likes {{noLikes}}">\t\t\t\t\t\t\t\t\t<div class="__thumbs">\t\t\t\t\t\t\t\t\t\t<svg class="thumb-like" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-like"></use>\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="__percentage">{{wtsPerc}} %</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="__votes">\t\t\t\t\t\t\t\t\t<div class="__count">{{totalVotes}}</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="detail">\t\t\t\t\t\t<div class="__title">\t\t\t\t\t\t\t<a class="__movie-link" href="{{url}}" target="_blank" title="{{title}}">{{title}}</a>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>\t\t</div>\t</aside>', mt.templates.nscard = '<aside class="mt-card-wrapper wow fadeIn fixed-card" data-wow-offset="-50" data-index="{{index}}">\t\t<div class=" trailer-card now-showing ">\t\t\t<div class="card-container">\t\t\t\t<div class="poster-container">\t\t\t\t\t<img class="__poster" src="{{ieposterURL}}" data-src="{{posterURL}}" data-error="{{fallbackURL}}">\t\t\t\t\t<div class="__overlay"></div>\t\t\t\t\t<div class="show-more-info">\t\t\t\t\t\t<div class="trailer-player">\t\t\t\t\t\t\t<span class="trailer-icon __icon" data-url="" data-eventcode="{{eventCode}}">\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-play"></use>\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t<span class="now-playing">\t\t\t\t\t\t\t\t<span class="__text">NOW PLAYING</span>\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="stats-wrapper">\t\t\t\t\t\t<div class="stats">\t\t\t\t\t\t\t<div class="popularity">\t\t\t\t\t\t\t\t<div class="__likes {{noLikes}}">\t\t\t\t\t\t\t\t\t<div class="__thumbs">\t\t\t\t\t\t\t\t\t\t<svg version="1.1" style="fill: #D6181F;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-heart"></use>\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="__percentage">{{wtsPerc}} %</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="__votes">\t\t\t\t\t\t\t\t\t<div class="__count">{{totalVotes}}</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="detail">\t\t\t\t\t\t<div class="__title">\t\t\t\t\t\t\t<a class="__movie-link" href="{{url}}" target="_blank" title="{{title}}">{{title}}</a>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="book-button">\t\t\t\t\t{{book_now_button}}\t\t\t    </div>\t\t\t</div>\t\t</div>\t</aside>', mt.templates.trailerScreen = '<div class="mt-single-trailer">\t\t\t\t\t<div class="__bg"></div>\t\t\t\t\t<div class="mt-single-video" id="player">\t\t\t\t\t\t<!--<iframe width="100%" height="100%" src="" id="youtube-iframe" frameborder="0" allowfullscreen autoplay="true"></iframe>-->\t\t\t\t\t</div>\t\t\t\t\t<div class="mt-single-synopsis">\t\t\t\t\t\t<div class="mt-synopsis-wrapper">\t\t\t\t\t\t\t<div class="mt-synopsis-content">\t\t\t\t\t\t\t\t<div class="movie-info">\t\t\t\t\t\t\t\t\t<div class="movie-name">\t\t\t\t\t\t\t\t\t\t<div id="eventTitle" class="__name" itemprop="name" title="The Grey">The Grey</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="language-container">\t\t\t\t\t\t\t\t\t\t<span class="__language-tag">ENGLISH</span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="genre-container">\t\t\t\t\t\t\t\t\t\t<!--<span class="__genre-tag">DRAMA</span>\t\t\t\t\t\t\t\t\t\t<span class="__genre-tag">THRILLER</span>-->\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="mt-stats">\t\t\t\t\t\t\t\t\t<div class="thumbs-ups">\t\t\t\t\t\t\t\t\t\t<span class="__icon">\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-like"></use>\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t<span class="__text-container">\t\t\t\t\t\t\t\t\t\t\t<span class="__percentage">&nbsp;</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__votes">&nbsp;</span>\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="release-date-container">\t\t\t\t\t\t\t\t\t\t<div class="calendar-detail">\t\t\t\t\t\t\t\t\t\t\t<span class="__icon">\t\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-date"></use>\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__date">\t\t\t\t\t\t\t\t\t\t\t\t<span class="day-and-month">1 Sep</span>\t\t\t\t\t\t\t\t\t\t\t\t<span class="year">2015</span>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="summary-reviews">\t\t\t\t\t\t\t\t\t<div id="mt-summary" class="tab-content">\t\t\t\t\t\t\t\t\t\t<div class="synopsis">\t\t\t\t\t\t\t\t\t\t\t<blockquote>\t\t\t\t\t\t\t\t\t\t\t\tAfter their plane crashes in Alaska, six oil workers are led by a skilled huntsman to survival, but a pack of merciless wolves haunts their every step.\t\t\t\t\t\t\t\t\t\t\t</blockquote>\t\t\t\t\t\t\t\t\t\t\t<a href="#"><span class="__read-more">Read more</span></a>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="wts-wrapper">\t\t\t\t\t\t\t\t\t<div class="wts-true" id="wts-true" event-code="" event-type="MT" event-wts="1">\t\t\t\t\t\t\t\t\t\t<div class="wts-container">\t\t\t\t\t\t\t\t\t\t\t<span class="__icon">\t\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-like"></use>\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text">WILL WATCH</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text count"></span>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="wts-undefined" id="wts-undefined" event-code="" event-type="MT" event-wts="-2">\t\t\t\t\t\t\t\t\t\t<div class="wts-container">\t\t\t\t\t\t\t\t\t\t\t<span class="__icon">\t\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t                            <use xlink:href="/icons/movies-icons.svg#icon-question"></use>\t\t\t\t\t\t                        </svg>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text">MAYBE</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text un-count"></span>\t\t\t\t\t\t\t\t\t\t</div>                    \t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="wts-false" id="wts-false" event-code="" event-type="MT" event-wts="-1">\t\t\t\t\t\t\t\t\t\t<div class="wts-container">\t\t\t\t\t\t\t\t\t\t\t<span class="__icon">\t\t\t\t\t\t\t\t\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\t\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href="/icons/movies-icons.svg#icon-dislike"></use>\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text">WON\'T WATCH</span>\t\t\t\t\t\t\t\t\t\t\t<span class="__text count"></span>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="btn-wrapper">\t\t\t\t\t\t\t\t\t<a id="trailerbuyBtn" class="btn _cuatro" href="">Book Now</a>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="error-text">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>'
    }(jQuery),
    function(e) {
        function t(e) {
            return (e + "").replace(/^([a-z])|\s+([a-z])/g, function(e) {
                return e.toUpperCase()
            })
        }
        BMS.Misc.Trailers = {};
        var n = window.mt.API,
            i = window.mt.NSAPI,
            a = {},
            r = {
                events: {},
                analyticsObj: {}
            },
            s = {},
            o = {},
            l = {
                pill: {},
                modal: {},
                popular: {},
                fresh: {},
                genres: {},
                nowShowing: {},
                languages: {},
                trailerScreen: {},
                tabs: {}
            },
            c = {
                popular: {},
                fresh: {},
                nowShowing: {},
                trailerScreen: {},
                languages: {}
            },
            d = {
                modal: {
                    show: {},
                    hide: {}
                },
                toggle: {
                    tabs: {},
                    langs: {}
                },
                launchTrailer: {},
                stop: {},
                load: {}
            },
            u = BMS.Storage.get({
                name: "Rgn",
                key: "subregionDetails"
            }),
            p = ("" != u ? BMS.Misc.fnUrlName(JSON.parse(u).SubRegionName.toLowerCase()) : "", "" != u ? JSON.parse(u).SubRegionCode.toLowerCase() : "");
        a = {
            sanitize: {
                date: function(e) {
                    return new Date(e.substr(0, 4) + " " + e.substr(4, 2) + " " + e.substr(6, 2) + " " + e.substr(8, 2) + ":" + e.substr(10, 2))
                },
                time: function(e) {
                    var t = e.getHours(),
                        n = e.getMinutes(),
                        i = !1;
                    return t > 12 ? (t -= 12, i = !0) : 12 == t ? i = !0 : 0 == t && (t = 12), n < 10 && (n = "0" + n), i = i ? "pm" : "am", t + ":" + n + " " + i
                },
                "boolean": function(e) {
                    return "string" == typeof e ? "Y" == e ? e = !0 : "N" == e ? e = !1 : e : ("object" != typeof e && "array" != typeof e || _.each(e, function(t, n) {
                        e[n] = a.sanitize["boolean"](t)
                    }), e)
                }
            },
            venueName: function(e) {
                return e.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/\s/g, "-").toLowerCase() + "/cinema"
            },
            render: function(e, t, n) {
                e = e.split("\n").join("");
                var i, a, r, s, o, l, c = /([$\^\\\/()|?+*\[\]{}.\-])/g;
                return n = n || {}, l = "{{}}", s = l.length, o = Math.ceil(s / 2), a = l.substr(0, o).replace(c, "\\$1"), r = l.substr(o, s).replace(c, "\\$1") || a, i = new RegExp(a + "[^" + a + r + "]+" + r, "g"), e.replace(i, function(e) {
                    var n, i = e.slice(o, -o),
                        a = i.split("."),
                        r = 0,
                        s = a.length;
                    if (i in t) n = t[i];
                    else
                        for (n = t; r < s; r++) {
                            if (!(a[r] in n)) return e;
                            n = n[a[r]]
                        }
                    return n
                })
            },
            difference: function(e) {
                for (var t = [], n = e.length - 1, i = 0; i < e.length - 1; i++)
                    if (i != n) return parseInt(e[i]) > parseInt(e[i + 1]) ? t.push(parseInt(e[i]) - parseInt(e[i + 1])) : t.push(parseInt(e[i + 1]) - parseInt(e[i]))
            },
            getLatLongDistance: function(e, t) {
                var n = e.lat,
                    i = t.lat,
                    a = e.lng,
                    r = t.lng,
                    s = function(e) {
                        return e * (Math.PI / 180)
                    },
                    o = 6371,
                    l = s(i - n),
                    c = s(r - a),
                    d = Math.sin(l / 2) * Math.sin(l / 2) + Math.cos(s(n)) * Math.cos(s(i)) * Math.sin(c / 2) * Math.sin(c / 2),
                    u = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d)),
                    p = o * u;
                return p.toFixed(2)
            },
            between: function(e, t) {
                var n = Math.min.apply(Math, [e, t]),
                    i = Math.max.apply(Math, [e, t]);
                return this > n && this < i
            },
            getCatAvailability: function(e) {
                e = parseInt(e), e < 0 && (e = 0);
                for (var t = 0; t < availSeatRange.length; t++) {
                    var n = function() {
                        var n = availSeatRange[t].range.split("-");
                        return e >= parseInt(n[0]) && e <= parseInt(n[1])
                    }();
                    if (n) return availSeatRange[t]
                }
            },
            fnExtractVideoCode: function(e) {
                var t = "",
                    n = [],
                    t = /[\\?&]v=([^&#]*)/;
                return n = _.compact(e.split(t))[1]
            },
            calculateNumberOfCardsInRow: function(e, t) {
                var n = Math.round(t.width() / e.width());
                return void 0, n
            }
        }, e.extend(BMS.Misc.Trailers, {
            helpers: a,
            models: r,
            presenters: o,
            views: s,
            render: c,
            events: d,
            dom: l
        }), r.languages = {}, r.genres = {}, r.events.popular = function() {
            var e = {};
            return _.each(n, function(t, n) {
                e[t.EventCode] = {
                    id: t.EventCode,
                    title: t.EventName,
                    language: [t.EventLanguage, "All Languages"],
                    url: "/movies/" + t.EventURL + "/" + t.EventCode,
                    trailerURL: t.TrailerURL,
                    trailerUploadDate: t.trailerUploadDate,
                    posterURL: function() {
                        return global.strContentUrl + "/events/moviecard/" + t.EventCode + ".jpg"
                    }(),
                    fallbackURL: "",
                    synopsis: t.EventSyno,
                    wtsCount: t.wtsCount,
                    dwtsCount: t.dwtsCount,
                    wtsPerc: t.wtsPerc,
                    visible: !0,
                    enabled: !0,
                    active: !1,
                    buyBtn: !1,
                    buyURL: ""
                }, r.languages[t.EventLanguage] = !0
            }), e
        }, r.events.fresh = function() {
            var e = {};
            return _.each(n, function(t, n) {
                e[t.EventCode] = {
                    id: t.EventCode,
                    title: t.EventTitle,
                    language: [t.EventLanguage, "All Languages"],
                    url: "/movies/" + t.EventURL + "/" + t.EventCode,
                    trailerURL: t.TrailerURL,
                    trailerUploadDate: t.trailerUploadDate,
                    posterURL: function() {
                        return global.strContentUrl + "/events/moviecard/" + t.EventCode + ".jpg"
                    }(),
                    fallbackURL: "",
                    synopsis: t.EventSyno,
                    wtsCount: t.wtsCount,
                    dwtsCount: t.dwtsCount,
                    wtsPerc: t.wtsPerc,
                    visible: !0,
                    enabled: !0,
                    active: !1,
                    buyBtn: !1,
                    buyURL: ""
                }, r.languages[t.EventLanguage] = !0
            }), e
        }, r.events.nowShowing = function() {
            var e = {};
            _.each(i, function(t, n) {
                e[t.EventCode] = {
                    id: t.EventCode,
                    title: t.EventTitle,
                    language: [t.EventLanguage, "All Languages"],
                    url: "/movies/" + t.EventURL + "/" + t.EventCode,
                    trailerURL: t.TrailerURL,
                    trailerUploadDate: t.trailerUploadDate,
                    posterURL: function() {
                        return global.strContentUrl + "/events/moviecard/" + t.EventCode + ".jpg"
                    }(),
                    fallbackURL: "",
                    synopsis: t.EventSyno,
                    wtsCount: t.wtsCount,
                    dwtsCount: t.dwtsCount,
                    wtsPerc: t.wtsPerc,
                    visible: !0,
                    enabled: !0,
                    active: !1,
                    buyBtn: !0,
                    buyURL: "/buytickets/" + t.EventCode
                }, r.languages[t.EventLanguage] = !0
            })
        }, r.active = {
            language: [],
            genre: [],
            pills: [],
            tab: "comingSoon",
            comingsoon: "fresh",
            isPlaying: !1,
            nextSibling: null
        }, o.languages = function() {
            var e = _.uniq(_.union(BMS.Misc.Trailers.models.nsLanguageSequence, BMS.Misc.Trailers.models.cslanguageSequence));
            return e
        }, o.genre = function() {
            var e = _.map(r.genres, function(e, t) {
                return t
            });
            return e = _.sortBy(e, function(e, t) {
                return e
            }), e = _.uniq(e)
        }, o.popular = function() {
            return void 0, _.sortBy(r.events.cs, function(e) {
                return -e.wtsCount
            })
        }, o.nowShowing = function() {
            return void 0, r.events.ns
        }, o.fresh = function() {
            return void 0, _.sortBy(r.events.cs, function(e) {
                return -e.trailerUploadDate
            })
        }, o.toggleLanguage = function(e) {
            var t = [];
            return "comingSoon" == r.active.tab ? _.each(s[r.active.comingsoon], function(e) {
                e.visible = !1
            }) : _.each(s[r.active.tab], function(e) {
                e.visible = !1
            }), void 0, _.each(e, function(e, n) {
                void 0, void 0, _.each(r.active.language, function(n) {
                    e.languageFilter.indexOf(n) > -1 && (void 0, e.visible = !0, t.push(e))
                })
            }), t
        }, o.showtrailerScreen = function() {
            var t = e(this);
            void 0;
            var n = parseInt(e(window).width() / t.width()),
                i = t.siblings(":visible").addBack().index(t) + 1,
                a = global.strContentUrl + "/events/showcasesynopsis/" + t.find(".trailer-icon").attr("data-eventcode") + ".jpg";
            for (l.trailerScreen.find(".__bg").css({
                    "background-image": "url(" + a + ")"
                }), i % n == 0 && i--; i % n != 0;) i--;
            i < 0 && (i = 0);
            var s = t.siblings(":visible").addBack().eq(i);
            s.before(l.trailerScreen);
            var o = e(window).height() - (t.find(".trailer-card").height() + e(".modal-header", "#mt-wrapper").height() + 80);
            o < 400 && (o = 420), l.trailerScreen.height(o), s.parents(".fixed-wrapper").scrollTop(s.parents(".fixed-wrapper").scrollTop() + l.trailerScreen.offset().top - (e(".modal-header", "#mt-wrapper").height() + 20)), r.active.isPlaying = !0
        }, o.toggleGenre = function(e) {
            var t = [];
            return "comingSoon" == r.active.tab ? _.each(s[r.active.comingsoon], function(e) {
                e.visible = !1
            }) : _.each(s[r.active.tab], function(e) {
                e.visible = !1
            }), _.each(e, function(e, n) {
                _.each(r.active.genre, function(n) {
                    e.genreFilter.indexOf(n) > -1 && (e.visible = !0, t.push(e))
                })
            }), t
        }, o.toggleFilters = function() {
            var e = [];
            e = "comingSoon" == r.active.tab ? s[r.active.comingsoon] : s[r.active.tab], 0 != r.active.language.length && (e = o.toggleLanguage(e)), 0 != r.active.genre.length && (e = o.toggleGenre(e)), 0 == r.active.genre.length && 0 == r.active.language.length && _.each(e, function(e) {
                e.visible = !0
            }), r.active.card_models = e, "comingSoon" == r.active.tab ? c[r.active.comingsoon](e) : c[r.active.tab](e), wow.scrollHandler()
        }, o.clearFilters = function() {
            e.each(l.languages.language, function(e, t) {
                t.find("input").is(":checked") && t.find("input").prop("checked", !1)
            }), e.each(l.genres.genre, function(e, t) {
                t.find("input").is(":checked") && t.find("input").prop("checked", !1)
            }), r.active.genre = [], r.active.language = []
        }, o.trailerIconClick = function(t) {
            var n = e(this).parents(".mt-card-wrapper");
            c.trailerIconClick.call(n[0], t)
        }, o.renderPills = function() {
            c.renderPills()
        }, o.setUserInterest = function(e, t, n, i) {
            try {
                BMS.Storage.isset({
                    name: "ld"
                }) ? o.sendUserVote(e, t, n, i) : (BMS.SignIn.fnSignIn(!0), void 0 == global.SignInCallBack && (global.SignInCallBack = []), global.SignInCallBack.push(function() {
                    o.sendUserVote(e, t, n, i)
                }))
            } catch (i) {
                void 0
            }
        }, o.sendUserVote = function(t, n, i, a) {
            var s = "/serv/getData.bms";
            BMS.Misc.fnAjax({
                url: s,
                dataType: "json",
                data: {
                    cmd: "SETINTEREST",
                    eid: t,
                    intId: n,
                    etype: i
                },
                success: function(t) {
                    if (o.updateUserInterest(t, a), t.data) BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Want to see", {
                        ProductID: r.analyticsObj.ProductID,
                        "Event Type": r.analyticsObj["Event Type"],
                        "Event Name": r.analyticsObj["Event Name"],
                        Language: r.analyticsObj.Language,
                        Genre: r.analyticsObj.Genre,
                        Choice: 1 == r.analyticsObj.Choice ? "Yes" : "No",
                        Appcode: global.strAppCode
                    });
                    else {
                        var n = t.error.text;
                        e(".error-text").text(n).addClass("_occur");
                        window.setTimeout(function() {
                            e(".error-text").text(n).removeClass("_occur")
                        }, 3e3)
                    }
                },
                error: function(e, t, n) {
                    void 0
                }
            })
        }, o.updateUserInterest = function(t, n) {
            if ("" != t.data) {
                var i = t.data.EventInterest.wtsCount,
                    a = t.data.EventInterest.dwtsCount,
                    r = t.data.EventInterest.totCount,
                    s = t.data.EventInterest.maybeCount,
                    o = "#" + n.currentTarget.id + " .wts-container";
                e(o).addClass("_active"), e("#wts-true .__text.count").text("(" + i + ")"), e("#wts-false  .__text.count").text("(" + a + ")"), e("#wts-undefined .__text.un-count").text("(" + s + ")"), e(".like-rating .__votes").text(r + " votes")
            } else {
                var l = t.error.text;
                e(".error-text").text(l).addClass("_occur");
                window.setTimeout(function() {
                    e(".error-text").text(l).removeClass("_occur")
                }, 3e3)
            }
        }, o.togglePills = function(t) {
            var n = e(t.currentTarget),
                i = n.attr("data-value");
            e('input[value="' + i + '"]').prop("checked", !1), r.active.language = _.without(r.active.language, i), r.active.genre = _.without(r.active.genre, i), r.active.pills = _.without(r.active.pills, i), o.toggleFilters(), n.remove()
        }, o.clearPills = function() {
            l.pill.container && (l.pill.container.html(""), r.active.pills = [])
        }, o.resetView = function() {
            e(".trailer-card").removeClass("_active"), l.trailerScreen.find(".error-text").removeClass("_occur"), l.trailerScreen.find(".wts-container").removeClass("_active"), l.trailerScreen.detach()
        }, o.clearContainers = function() {
            l.popular.container && l.popular.container.html(""), l.fresh.container && l.fresh.container.html(""), l.nowShowing.container && l.nowShowing.container.html(""), l.popular = {}, l.fresh = {}, l.nowShowing = {}
        }, o.setSelectText = function() {
            l.tabs[r.active.tab].addClass("_active"), l.tabs[r.active.tab].siblings().removeClass("_active"), "popular" == r.active.comingsoon && e(".__right-pf-filters .__text").html("Popular"), "fresh" == r.active.comingsoon && e(".__right-pf-filters .__text").html("Fresh")
        }, o.initializePlayer = function() {
            window.YT && (l.player = new YT.Player("player", {
                height: "100%",
                width: "100%",
                events: {
                    onReady: d.onPlayerReady,
                    onStateChange: d.onPlayerStateChange
                }
            }))
        }, o.resetTrailerScreen = function() {
            r.active.isPlaying && (l.trailerScreen.detach(), e(".trailer-card", "#mt-wrapper").removeClass("_active"), r.active.isPlaying = !1)
        }, c.popular = function(t) {
            t || (t = s.popular = o.popular()), l.tabs.popular.siblings().removeClass("_active"), l.tabs.popular.addClass("_active"), l.popular.container ? (l.popular.container.show(), l.popular.container.siblings().hide(), e.each(l.popular.cards, function(e, t) {
                t.addClass("none")
            }), _.each(t, function(t, n) {
                t.visible && e.each(l.popular.cards, function(n, i) {
                    e(i).find(".trailer-icon.__icon").attr("data-eventcode") == t.id && i.removeClass("none")
                })
            })) : (l.popular.container = e('<div class="popular-wrapper">'), l.popular.container.show(), l.popular.cards = [], _.each(t, function(t, n) {
                var i = [];
                if (1 == t.isTentative) {
                    var r = t.releaseDate.split(", ");
                    i = r[0].split(" "), i[0] = i[1], i[1] = r[1]
                } else {
                    var r = t.releaseDate.split(", ");
                    i = r[0].split(" ")
                }
                l.popular.cards.push(e(a.render(mt.templates.card, {
                    title: t.title,
                    url: t.url,
                    eventCode: t.id,
                    date: i[0],
                    month: i[1],
                    posterURL: 1 == global.blnIsIE ? "" : t.posterURL,
                    ieposterURL: 1 == global.blnIsIE ? t.posterURL : "",
                    fallbackURL: t.fallbackURL,
                    index: t.card_index,
                    wts: t.wtsCount + " | " + t.dwtsCount + " | " + t.wtsPerc,
                    totalVotes: t.wtsCount + t.dwtsCount ? t.wtsCount + t.dwtsCount + " votes" : " ",
                    noLikes: t.wtsPerc ? " " : "no-likes",
                    wtsPerc: t.wtsPerc ? t.wtsPerc : " "
                })))
            }), l.popular.container.append(l.popular.cards), e(".mt-overflow-wrapper").on("click", ".show-more-info", d.click.trailerIconClick), wow.scrollHandler(), e(".mt-overflow-wrapper", "#mt-wrapper").append(l.popular.container), l.popular.container.siblings().hide())
        }, c.comingSoon = function() {
            c[r.active.comingsoon]()
        }, c.nowShowing = function(t) {
            t || (t = s.nowShowing = o.nowShowing()), l.nowShowing.container ? (l.nowShowing.container.show(), l.nowShowing.container.siblings().hide(), e.each(l.nowShowing.cards, function(e, t) {
                t.addClass("none")
            }), _.each(t, function(t, n) {
                t.visible && e.each(l.nowShowing.cards, function(n, i) {
                    e(i).find(".trailer-icon.__icon").attr("data-eventcode") == t.id && i.removeClass("none")
                })
            })) : (l.nowShowing.container = e('<div class="nowshowing-wrapper">'), l.nowShowing.container.show(), l.nowShowing.cards = [], _.each(t, function(t, n) {
                if (0 != t.avgRating) var i = t.avgRating,
                    r = t.totalCount,
                    s = "nscard";
                else var i = t.wtsPerc,
                    r = t.wtsCount + t.dwtsCount,
                    s = "nscard";
                var o = BMS.Storage.get({
                        name: "Rgn",
                        key: "text",
                        storage: "C"
                    }),
                    c = BMS.Storage.get({
                        name: "Rgn",
                        key: "Code",
                        storage: "C"
                    });
                o = BMS.Misc.fnUrlName(o);
                var d = "/buytickets/" + BMS.Misc.fnUrlName(t.title.toLowerCase()) + "-" + o.toLowerCase() + "/movie-" + ("" != p ? p.toLowerCase() : c.toLowerCase()) + "-" + t.id + "-MT";
                l.nowShowing.cards.push(e(a.render(mt.templates[s], {
                    title: t.title,
                    url: t.url,
                    eventCode: t.id,
                    posterURL: 1 == global.blnIsIE ? "" : t.posterURL,
                    ieposterURL: 1 == global.blnIsIE ? t.posterURL : "",
                    fallbackURL: t.fallbackURL,
                    index: t.card_index,
                    wts: t.wtsCount + " | " + t.dwtsCount + " | " + t.wtsPerc,
                    totalVotes: r ? r + " votes" : " ",
                    noLikes: 0 != i ? " " : "no-likes",
                    wtsPerc: i ? i : " ",
                    book_now_button: '<a href="' + d + '" ><div class="__container">BOOK NOW</div></a>',
                    datePillContainerClass: "_none"
                })))
            }), l.nowShowing.container.append(l.nowShowing.cards), e(".mt-overflow-wrapper").on("click", ".show-more-info", d.click.trailerIconClick), wow.scrollHandler(), e(".mt-overflow-wrapper", "#mt-wrapper").append(l.nowShowing.container), l.nowShowing.container.siblings().hide())
        }, c.fresh = function(t) {
            t || (t = s.fresh = o.fresh()), l.tabs.fresh.siblings().removeClass("_active"), l.tabs.fresh.addClass("_active"), l.fresh.container ? (l.fresh.container.show(), l.fresh.container.siblings().hide(), e.each(l.fresh.cards, function(e, t) {
                t.addClass("none")
            }), _.each(t, function(t, n) {
                t.visible && e.each(l.fresh.cards, function(n, i) {
                    e(i).find(".trailer-icon.__icon").attr("data-eventcode") == t.id && i.removeClass("none")
                })
            })) : (l.fresh.container = e('<div class="fresh-wrapper">'), l.fresh.cards = [], l.fresh.container.show(), _.each(t, function(t, n) {
                var i = [];
                if (1 == t.isTentative) {
                    var r = t.releaseDate.split(", ");
                    i = r[0].split(" "), i[0] = i[1], i[1] = r[1]
                } else {
                    var r = t.releaseDate.split(", ");
                    i = r[0].split(" ")
                }
                l.fresh.cards.push(e(a.render(mt.templates.card, {
                    title: t.title,
                    url: t.url,
                    eventCode: t.id,
                    date: i[0],
                    month: i[1],
                    posterURL: t.posterURL,
                    fallbackURL: t.fallbackURL,
                    index: n + 1,
                    wts: t.wtsCount + " | " + t.dwtsCount + " | " + t.wtsPerc,
                    totalVotes: t.wtsCount + t.dwtsCount ? t.wtsCount + t.dwtsCount + " votes" : " ",
                    noLikes: t.wtsPerc ? " " : "no-likes",
                    wtsPerc: t.wtsPerc ? t.wtsPerc : " "
                })))
            }), l.fresh.container.append(l.fresh.cards), e(".mt-overflow-wrapper").on("click", ".show-more-info", d.click.trailerIconClick), wow.scrollHandler(), e(".mt-overflow-wrapper", "#mt-wrapper").append(l.fresh.container), l.fresh.container.siblings().hide())
        }, c.languages = function() {
            s.languages || (s.languages = o.languages()), l.languages.select ? l.languages.select.val(r.active.language) : (l.languages.select = e('<ul class="mt-languages">'), l.languages.language = [], _.each(s.languages, function(t) {
                l.languages.language.push(e('<li class="list"><input type="checkbox" id="' + t + '" value="' + t + '"><label for="' + t + '"><span class="__tick"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-tick"></use></svg></span>' + t + "</label></li>"))
            }), l.languages.select.append(l.languages.language), e(".__right-lang-filters").append(e('<div class="language-wrapper">').html(l.languages.select)), l.languages.select.find(".list input").on("click", d.click.toggleFilters))
        }, c.genre = function() {
            s.genre || (s.genres = o.genre()), l.genres.select || (l.genres.select = e('<ul class="mt-genres">'), l.genres.genre = [], _.each(s.genres, function(t) {
                l.genres.genre.push(e('<li class="list"><input type="checkbox" id="' + t + '" value="' + t + '"><label for="' + t + '"><span class="__tick"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-tick"></use></svg></span>' + t + "</label></li>"))
            }), l.genres.select.append(l.genres.genre), e(".__right-gen-filters").append(e('<div class="genre-wrapper">').html(l.genres.select)), l.genres.select.find(".list input").on("click", d.click.toggleFilters))
        }, c.renderPills = function() {
            l.pill.container ? (l.pill.pills = [], l.pill.pills.push('<span class="__applied-text">Applied Filters: </span>'), _.each(r.active.pills, function(t) {
                l.pill.pills.push(e('<span class="__selc-pills" data-value="' + t + '">' + t + '<span class="__rm-filter"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-cancel"></use></svg></span></span>'))
            }), l.pill.container.html(l.pill.pills)) : (l.pill.container = e('<div class="mt-pills">'), l.pill.pills = [], l.pill.pills.push('<span class="__applied-text">Applied Filters: </span>'), _.each(r.active.pills, function(t) {
                l.pill.pills.push(e('<span class="__selc-pills" data-value="' + t + '">' + t + '<span class="__rm-filter"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-cancel"></use></svg></span></span>'))
            }), l.pill.container.html(l.pill.pills), e("#mt-wrapper .modal-header").append(e('<div class="__selected-filters">').html(l.pill.container))), e(".__selc-pills").on("click", d.click.togglePills)
        }, c.trailerIconClick = function(t) {
            if (o.resetView(), e(this).find(".trailer-card").addClass("_active"), "nowShowing" == r.active.tab) var n = r.events.ns[e(this).find(".trailer-icon").attr("data-eventcode")];
            else var n = r.events.cs[e(this).find(".trailer-icon").attr("data-eventcode")];
            var i = a.fnExtractVideoCode(n.trailerURL);
            l.trailerScreen.find("#youtube-iframe").attr("src", "https://www.youtube.com/embed/" + i + "?autoplay=1"), l.trailerScreen.find("#eventTitle").attr("title", n.title).html(n.title), l.trailerScreen.find(".synopsis blockquote").html(n.synopsis), l.trailerScreen.find(".language-container .__language-tag").html(n.language[0]);
            var s = BMS.Misc.fnGVal({
                    key: "text",
                    data: BMS.Storage.get({
                        name: "Rgn"
                    })
                }).toLowerCase(),
                c = BMS.Misc.fnGVal({
                    key: "Code",
                    data: BMS.Storage.get({
                        name: "Rgn"
                    })
                }).toLowerCase();
            s = BMS.Misc.fnUrlName(s);
            var d = "" != s ? "/" + s + n.url : "/" + n.url;
            l.trailerScreen.find(".synopsis .__read-more").parent().attr("href", d), "1" == n.isTentative ? l.trailerScreen.find(".release-date-container .__date .day-and-month").html(n.releaseDate.split(",")[0].split(" ")[1]) : l.trailerScreen.find(".release-date-container .__date .day-and-month").html(n.releaseDate.split(",")[0]);
            var u = "/buytickets/" + BMS.Misc.fnUrlName(n.title.toLowerCase()) + "-" + s.toLowerCase() + "/movie-" + ("" != p ? p.toLowerCase() : c.toLowerCase()) + "-" + n.id + "-MT";
            "nowShowing" == r.active.tab ? (l.trailerScreen.find(".wts-wrapper").hide(), l.trailerScreen.find(".btn-wrapper").children("a").show().attr("href", u)) : (l.trailerScreen.find(".wts-wrapper").show(), l.trailerScreen.find(".btn-wrapper").children("a").hide().attr("href", "")), null != n.wtsCount && l.trailerScreen.find("#wts-true .__text.count").html("(" + n.wtsCount + ")"), null != n.dwtsCount && l.trailerScreen.find("#wts-false .__text.count").html("(" + n.dwtsCount + ")"), null != n.maybeCount && l.trailerScreen.find("#wts-undefined .__text.un-count").html("(" + n.maybeCount + ")");
            for (var f = n.genre.split("|"), h = "", g = 0, v = f.length; g < v; g++) h += '<span class="__genre-tag">' + f[g].toUpperCase() + "</span>";
            l.trailerScreen.find(".thumbs-ups .__icon").hide(), 0 != n.avgRating ? (l.trailerScreen.find(".thumbs-ups .__percentage").html(n.avgRating + "%"), l.trailerScreen.find(".__votes").html(n.totalCount + " votes"), l.trailerScreen.find(".thumbs-ups .__icon").show()) : 0 != n.wtsPerc && (l.trailerScreen.find(".thumbs-ups .__percentage").html(n.wtsPerc + "%"), l.trailerScreen.find(".__votes").html(n.csCount + " votes"), l.trailerScreen.find(".thumbs-ups .__icon").show()), l.trailerScreen.find(".genre-container").html(h), l.trailerScreen.find("#wts-true").attr("event-code", n.id), l.trailerScreen.find("#wts-false").attr("event-code", n.id), l.trailerScreen.find("#wts-undefined").attr("event-code", n.id), l.trailerScreen.find(".release-date-container .__date .year").html(n.releaseDate.split(",")[1]), o.showtrailerScreen.call(this), o.initializePlayer(), o.playVideo = function(e) {
                e.target.loadVideoById(i, 0, "default")
            }, r.analyticsObj.ProductID = n.id, r.analyticsObj["Event Type"] = "MT", r.analyticsObj["Event Name"] = n.title, r.analyticsObj.Language = n.language[0], r.analyticsObj.Genre = n.genre.split("|").join(","), r.analyticsObj.Appcode = global.strAppCode, void 0, BMS.Misc.fnPushEventDataToAnalytics(["WR", "KM"], "Viewed trailer", {
                ProductID: n.id,
                "Event Type": "MT",
                "Event Name": n.title,
                Language: n.dataLanguage,
                Genre: n.genre.split("|").join(","),
                "Percentage watched": "",
                "Cast and Crew": "",
                "Event Group": n.eventGroup,
                Page: "Movie Trailers Popup - " + ("undefined" != typeof pageName ? pageName : ""),
                Appcode: global.strAppCode
            })
        }, c.selectBoxText = function() {
            0 != r.active.language.length ? e(".__right-lang-filters .__text").html(r.active.language.join(",")) : e(".__right-lang-filters .__text").html("All Languages"), 0 != r.active.genre.length ? e(".__right-gen-filters .__text").html(r.active.genre.join(",")) : e(".__right-gen-filters .__text").html("All Genres")
        }, c.resetCards = function() {
            l.popular.container && l.popular.container.html(""), l.fresh.container && l.fresh.container.html("")
        }, d.click = {}, d.keypress = {}, d.click.toggleLanguage = function() {
            var t = e(this).val();
            o.toggleLanguage(t)
        }, d.click.toggleGenre = function() {
            e(this).val()
        }, d.click.toggleFilters = function(n) {
            var i = e(n.currentTarget).parent().parent(),
                a = e(n.currentTarget);
            o.resetTrailerScreen(), "mt-languages" == i.attr("class") ? a.is(":checked") ? (r.active.language.push(a.val()), r.active.pills.push(a.val())) : (r.active.language = _.without(r.active.language, a.val()), r.active.pills = _.without(r.active.pills, a.val())) : "mt-genres" == i.attr("class") && (a.is(":checked") ? (r.active.genre.push(a.val()), r.active.pills.push(a.val())) : (r.active.genre = _.without(r.active.genre, a.val()), r.active.pills = _.without(r.active.pills, a.val()))), c.selectBoxText(), c.renderPills(), o.toggleFilters(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                event: "Trailer Popup",
                page: "Trailers Page",
                section: t(e(".mt-filters").find("span._active").html()),
                "Sort by": e(".__right-pf-filters .__text").html(),
                Language: BMS.Misc.Trailers.models.active.language.join(","),
                Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                Appcode: global.strAppCode
            })
        }, d.click.togglePills = function(e) {
            o.resetTrailerScreen(), o.togglePills(e), c.selectBoxText()
        }, d.click.popularTab = function(n) {
            r.active.tab = "popular", r.active.comingsoon = r.active.tab, o.resetTrailerScreen(), o.setSelectText(), e(".__selected-filters,.__right-lang-filters,.__right-gen-filters,.__right-pf-filters").show(), c.popular(), o.toggleFilters(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                event: "Trailer Popup",
                page: "Trailers Page",
                section: t(e(".mt-filters").find("span._active").html()),
                "Sort by": e(".__right-pf-filters .__text").html(),
                Language: BMS.Misc.Trailers.models.active.language.join(","),
                Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                Appcode: global.strAppCode
            })
        }, d.click.comingSoonTab = function(n) {
            r.active.tab = r.active.comingsoon, l.tabs.comingSoon.siblings().removeClass("_active"), l.tabs.comingSoon.addClass("_active"), o.setSelectText(), o.resetTrailerScreen(), e(".__selected-filters,.__right-lang-filters,.__right-gen-filters,.__right-pf-filters").show(), o.toggleFilters(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                event: "Trailer Popup",
                page: "Trailers Page",
                section: t(e(".mt-filters").find("span._active").html()),
                "Sort by": e(".__right-pf-filters .__text").html(),
                Language: BMS.Misc.Trailers.models.active.language.join(","),
                Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                Appcode: global.strAppCode
            })
        }, d.click.freshTab = function(n) {
            r.active.tab = "fresh", r.active.comingsoon = r.active.tab, o.setSelectText(), o.resetTrailerScreen(), e(".__right-pf-filters .__text").html("Fresh"), c.fresh(), e(".__selected-filters,.__right-lang-filters,.__right-gen-filters,.__right-pf-filters").show(), o.toggleFilters(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                event: "Trailer Popup",
                page: "Trailers Page",
                section: t(e(".mt-filters").find("span._active").html()),
                "Sort by": e(".__right-pf-filters .__text").html(),
                Language: BMS.Misc.Trailers.models.active.language.join(","),
                Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                Appcode: global.strAppCode
            })
        }, d.click.nowShowingTab = function(n) {
            r.active.tab = "nowShowing", l.tabs.nowShowing.siblings().removeClass("_active"), l.tabs.nowShowing.addClass("_active"), o.resetTrailerScreen(), e(".__right-pf-filters").hide(), c.nowShowing(), o.toggleFilters(), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                event: "Trailer Popup",
                page: "Trailers Page",
                section: t(e(".mt-filters").find("span._active").html()),
                "Sort by": "",
                Language: BMS.Misc.Trailers.models.active.language.join(","),
                Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                Appcode: global.strAppCode
            })
        }, d.click.trailerIconClick = function(t) {
            r.active.nextSibling = e(t.currentTarget).parents(".mt-card-wrapper").next(), o.trailerIconClick.call(this, t)
        }, d.click.wtsClick = function(t) {
            var n = e("#wts-true").attr("event-code"),
                i = parseInt(e("#wts-true").attr("event-wts")),
                a = e("#wts-true").attr("event-type");
            r.analyticsObj.Choice = 1, o.setUserInterest(n, i, a, t)
        }, d.click.dwtsClick = function(t) {
            var n = e("#wts-false").attr("event-code"),
                i = parseInt(e("#wts-false").attr("event-wts")),
                a = e("#wts-false").attr("event-type");
            r.analyticsObj.Choice = -1, o.setUserInterest(n, i, a, t)
        }, d.click.maybeClick = function(t) {
            var n = e("#wts-undefined").attr("event-code"),
                i = parseInt(e("#wts-undefined").attr("event-wts")),
                a = e("#wts-undefined").attr("event-type");
            o.setUserInterest(n, i, a, t)
        }, d.onPlayerReady = function(e) {
            o.playVideo(e)
        }, d.onPlayerStateChange = function(e) {
            switch (e.data) {
                case YT.PlayerState.UNSTARTED:
                    break;
                case YT.PlayerState.ENDED:
                    r.active.nextSibling.find(".show-more-info").trigger("click");
                    break;
                case YT.PlayerState.PLAYING:
                    break;
                case YT.PlayerState.PAUSED:
                    break;
                case YT.PlayerState.BUFFERING:
                    break;
                case YT.PlayerState.CUED:
            }
        }, d.load = function(t) {
            this.modal.show();
            var n = !1;
            BMS.Misc.fnAjax({
                dataType: "script",
                type: "GET",
                url: "/serv/getData",
                data: {
                    cmd: "GETTRAILERS",
                    mtype: "cs"
                },
                dataType: "json",
                success: function(t) {
                    r.events.cs = function() {
                        var e = {},
                            n = 0;
                        return t[0] && (r.cslanguageSequence = t[0]), _.each(t[1], function(t, i) {
                            void 0;
                            var a = _.compact(t.EventGenre.split("|"));
                            e[t.EventCode] = {
                                id: t.EventCode,
                                title: t.EventTitle,
                                language: [t.EventLanguage, "All Languages"],
                                dataLanguage: t.EventLanguage,
                                eventGroup: t.EventGroup,
                                languageFilter: t.EventLanguage + "|All Languages",
                                url: "/movies/" + t.EventURL + "/" + t.EventCode,
                                trailerURL: t.TrailerURL,
                                posterURL: function() {
                                    return global.strContentUrl + "/events/moviecard/" + t.EventCode + ".jpg"
                                }(),
                                fallbackURL: global.strContentUrl + "/events/moviecard/noimage.jpg",
                                genre: t.EventGenre,
                                genreFilter: t.EventGenre + "|All Genres",
                                releaseDate: t.ShowDate,
                                eventIsDefault: t.EventIsDefault,
                                isTentative: t.TentativeReleaseDate,
                                trailerUploadDate: t.trailerUploadDate,
                                synopsis: t.EventSyno,
                                wtsCount: t.wtsCount,
                                dwtsCount: t.dwtsCount,
                                maybeCount: t.maybeCount,
                                avgRating: t.avgRating,
                                totalVotes: t.totalVotes,
                                wtsPerc: t.wtsPerc,
                                csCount: t.csCount,
                                card_index: n,
                                visible: !0,
                                enabled: !0,
                                active: !1
                            }, n += 1, r.languages[t.EventLanguage] = !0, _.each(a, function(e, t) {
                                r.genres[e.trim()] = !0
                            })
                        }), e
                    }(), window.mt.API = r.events.cs, r.active.comingsoon = "fresh", r.active.tab = "comingSoon", e(".__selected-filters,.__right-lang-filters,.__right-gen-filters,.__right-pf-filters").show(), o.setSelectText(), c.fresh(), c.genre(), n ? (d.handleGetTrailersSuccess(), n = !1) : n = !0
                },
                error: function(e) {
                    void 0
                }
            }), BMS.Misc.fnAjax({
                dataType: "script",
                type: "GET",
                url: "/serv/getData",
                data: {
                    cmd: "GETTRAILERS",
                    mtype: "ns"
                },
                dataType: "json",
                success: function(e) {
                    r.events.ns = function() {
                        var t = {},
                            n = 0;
                        return e[0] && (r.nsLanguageSequence = e[0]), _.each(e[1], function(e, i) {
                            void 0;
                            var a = _.compact(e.EventGenre.split("|"));
                            t[e.EventCode] = {
                                id: e.EventCode,
                                title: e.EventTitle,
                                language: [e.EventLanguage, "All Languages"],
                                dataLanguage: e.EventLanguage,
                                eventGroup: e.EventGroup,
                                languageFilter: e.EventLanguage + "|All Languages",
                                url: "/movies/" + e.EventURL + "/" + e.EventCode,
                                trailerURL: e.TrailerURL,
                                posterURL: function() {
                                    return global.strContentUrl + "/events/moviecard/" + e.EventCode + ".jpg"
                                }(),
                                fallbackURL: global.strContentUrl + "/events/moviecard/noimage.jpg",
                                genre: e.EventGenre,
                                genreFilter: e.EventGenre + "|All Genres",
                                releaseDate: e.ShowDate,
                                eventIsDefault: e.EventIsDefault,
                                isTentative: e.TentativeReleaseDate,
                                trailerUploadDate: e.trailerUploadDate,
                                synopsis: e.EventSyno,
                                wtsCount: e.wtsCount,
                                dwtsCount: e.dwtsCount,
                                maybeCount: e.maybeCount,
                                wtsPerc: e.wtsPerc,
                                totalCount: e.totalVotes,
                                userCount: e.userCount,
                                criticCount: e.criticCount,
                                avgRating: e.avgRating,
                                csCount: e.csCount,
                                card_index: n,
                                visible: !0,
                                enabled: !0,
                                active: !1,
                                buyURL: "hello"
                            }, n += 1, r.languages[e.EventLanguage] = !0, _.each(a, function(e, t) {
                                r.genres[e.trim()] = !0
                            })
                        }), t
                    }(), window.mt.NSAPI = r.events.ns, n ? (d.handleGetTrailersSuccess(), n = !1) : n = !0
                },
                error: function(e) {
                    void 0
                }
            })
        }, d.handleGetTrailersSuccess = function() {
            c.languages(), c.genre()
        }, d.modal.show = function() {
            void 0, l.modal.wrapper.removeClass("none"), l.modal.overlay.removeClass("none").addClass("puff"), handlePopups.freezeDocument(), e(".mt-modal-overlay").scroll(function() {
                wow.scrollHandler()
            })
        }, d.modal.hide = function() {
            l.modal.overlay.removeClass("puff"), setTimeout(function() {
                l.modal.overlay.addClass("puff-reverse")
            }, 10), setTimeout(function() {
                l.modal.overlay.addClass("none").removeClass("puff-reverse")
            }, 300), handlePopups.releaseDocument(), e(".mt-modal-overlay").unbind("scroll", function() {
                wow.scrollHandler()
            })
        }, e(document).ready(function() {
            function n() {
                void 0, d.load(), l.tabs[r.active.tab].addClass("_active")
            }

            function i() {
                void 0, d.modal.hide(), o.clearFilters(), o.clearPills(), c.selectBoxText(), e(".trailer-card", "#mt-wrapper").removeClass("_active")
            }
            void 0, l.modal.wrapper = e("#mt-wrapper"), l.modal.overlay = e(".mt-modal-overlay", "#mt-wrapper"), l.trailerScreen = e(mt.templates.trailerScreen), l.trailerScreen.videoContainer = e(".mt-single-video #youtube-iframe"), l.trailerScreen.find("#wts-true").on("click", d.click.wtsClick), l.trailerScreen.find("#wts-false").on("click", d.click.dwtsClick), l.trailerScreen.find("#wts-undefined").on("click", d.click.maybeClick), l.tabs.fresh = e(".__right-pf-filters .__fresh"), l.tabs.popular = e(".__right-pf-filters .__popular"), l.tabs.comingSoon = e(".mt-filters .__comingsoon"), l.tabs.nowShowing = e(".mt-filters .__nowshowing"), l.tabs.fresh.on("click", d.click.freshTab), l.tabs.popular.on("click", d.click.popularTab), l.tabs.nowShowing.on("click", d.click.nowShowingTab), l.tabs.comingSoon.on("click", d.click.comingSoonTab), e(".mt-trigger").click(function() {
                d.load(), BMS.Misc.Router.triggerRoute("trailers ", !1), BMS.Misc.fnPushEventDataToAnalytics(["WR", "GA"], "", {}, {
                    event: "Trailer Popup",
                    page: t("undefined" != typeof pageName ? pageName : "") + " Page",
                    section: "Coming Soon",
                    "Sort by": e(".__right-pf-filters .__text").html(),
                    Language: BMS.Misc.Trailers.models.active.language.join(","),
                    Genre: BMS.Misc.Trailers.models.active.genre.join(","),
                    Appcode: global.strAppCode
                })
            }), global.SignOutCallBack.push(function() {
                void 0, l.trailerScreen.find(".wts-container").hasClass("_active") && l.trailerScreen.find(".wts-container").removeClass("_active")
            }), BMS.Misc.Router.registerRoute("trailers", "trailersPopup", n, i), e("#mt-btn-close").click(function() {
                r.active.isPlaying ? (l.trailerScreen.detach(), r.active.isPlaying = !1, e(".trailer-card", "#mt-wrapper").removeClass("_active")) : (d.modal.hide(), o.clearFilters(), o.clearPills(), o.clearContainers(), BMS.Misc.Router.triggerRoute("", !1), l.tabs[r.active.tab].removeClass("_active"), c.selectBoxText(), e(".trailer-card", "#mt-wrapper").removeClass("_active"), BMS.Misc.fnPushEventDataToAnalytics(["GA"], "", {}, {
                    event: "Clicked Close on Movie Trailers Link",
                    page: "undefined" != typeof pageName ? pageName : "",
                    section: "header"
                }))
            })
        })
    }(jQuery),
    function(e) {
        e.fn.sticky = function(t) {
            function n() {
                return window.pageYOffset || document.documentElement.scrollTop
            }
            var i = this,
                a = e.extend({
                    addelement: "_active",
                    addfrom: 40,
                    removefrom: 40
                }, t);
            e(window).scroll(function() {
                var e = n();
                e >= a.addfrom ? i.addClass(a.addelement) : e <= a.removefrom && i.removeClass(a.addelement)
            })
        }
    }(jQuery);