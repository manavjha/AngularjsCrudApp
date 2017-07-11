function accountActivationController(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    e.verified = !1, e.urlParam = u, e.verifyAccount = function() {
        doPost(o, g.serverUrl + "commonservice/activateUserAccount", {
            user_id: e.urlParam.id,
            verification_number: e.urlParam.key
        }, "", function(t) {
            1 == t.status && (e.verified = !0)
        })
    }, e.verifyAccount()
}

function bookOrderController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p, f, y, h, v, k) {
    e.popularPackageList = !1, e.loginModal = !1, e.forgotPwdModal = !1, e.signupModal = !1, e.changePwdModal = !1, e.mobileModal = !1, e.firstPageList = [], e.orderList = !1, e.userId = null, e.selection = [], e.addToCartModal = !1, e.btnshow = !1, e.rel = !1, e.addNewAddress = !1, e.newlocation = !1, e.hideSuggestedLocation = !1, e.relative = !1, e.guestUser = !1, e.alertDiv = !1, e.samepkg = !1, e.addhide = !1, e.loggedin = !1, e.searchFlag = !1, e.addfield = !0, e.loc_id = "", e.customSearchVal = "", e.suggestPackageList = [], e.localityList = [], e.customerDetails = [], e.filters = {}, e.filters.suggested_test = [], e.searchValue = [], t.selectData = [], t.total = 0, e.cityList = [], e.temp = [], e.member = [], e.noTimeSlot = !1, e.amount = 0, e.subtotal = 0, e.displayData = {}, e.habitListCheckbox = {}, e.displayList = !1, t.count = 0, e.flag = !1, e.flagSelf = !1, e.notificationPeak = !1, e.collectiontimeflag = !1, e.notification = !1, e.customerIndex = void 0, e.loading = !0, e.previewDiv = 99, e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.viewPkgbox = !1, e.includeList = [], e.pkglimit = 2, e.healthian_package = [], e.customincludeList = [], e.customincludeList1 = [], e.accordionList = [], e.tempUser = [], e.previewList = [], e.RelationShip = [], e.RelationShipwithoutSelf = [], e.pkgNew = [], e.addNewPatient = !1, e.addNewPatientSocial = !1, e.patientAddErrorDiv = !1, e.errorMsg = "", localStorage.removeItem("booking_id");
    var S = JSON.parse(localStorage.getItem("cityID"));
    if (null === S && localStorage.setItem("cityID", JSON.stringify([{
            city_id: "23",
            city_name: "Gurgaon"
        }])), e.$on("data_shared", function() {
            e.customerDetails = s.getData(), 0 !== e.customerDetails[0].pkg.healthian_price && (e.orderList = !0, t.count++, "true" != localStorage.getItem("isLogin") && (e.tempUser = JSON.parse(localStorage.getItem("tempUser"))), e.getcustomerForm.sampledate = e.customerDetails[0].date, e.getcustomerForm.location = e.customerDetails[0].location, e.getcustomerForm.sampletime = e.customerDetails[0].time_slot, e.totalAmount()), e.collectiontimeflag = !0
        }), null !== localStorage.getItem("time_slot") && "" !== localStorage.getItem("time_slot")) {
        var b = {
            slot_id: JSON.parse(localStorage.getItem("time_slot")).slot_id
        };
        a.getSlotEmptyById(b, function(e) {
            localStorage.removeItem("time_slot")
        })
    }
    e.packageTestList = [], e.showPkgtests = function(t) {
        e.packageTestList = [], doPost(r, y.serverUrl + "commonservice/getTestDetailByGroupId", {
            group_id: t.testId
        }, "", function(a) {
            e.packageTestList = a.data, e.display_name = t.display_name, e.test_include = 0, e.packageTestList.forEach(function(t, a) {
                t.tests.forEach(function(t, a) {
                    "profile" == t.ptype ? e.test_include += t.tests.length : "parameter" == t.ptype && (e.test_include += 1)
                })
            })
        }), e.viewPkgbox = !e.viewPkgbox
    }, e.findCityDetail = function(t) {
        e.cityObj = [], e.cityObj.push(t), localStorage.setItem("cityID", JSON.stringify(e.cityObj))
    }, "true" == localStorage.getItem("isLogin") && (e.loggedin = !0), e.frontPageSearchInt = function() {
        e.tags = o.getSearchPackages(), e.tags.forEach(function(t, a) {
            e.habitListCheckbox[t.id] = !0, e.searchValue.push({
                text: t.text,
                id: t.id
            })
        }), e.createSearchRequest()
    }, t.addTags = function(t) {
        var a = {
            text: t.text,
            id: t.id
        };
        e.findIndex("searchValue", t.text, "text", function(t) {
            t == -1 && e.searchValue.push(a)
        })
    }, e.createSearchRequest = function() {
        0 != e.tags.length && (e.searchFlag = !0);
        var t = e.tags || [],
            a = {
                filters: {
                    suggested_test: [],
                    cities: {
                        city_id: JSON.parse(localStorage.getItem("cityID"))[0].city_id
                    }
                },
                searchValue: t
            };
        doPost(r, y.serverUrl + "search", a, "", function(t) {
            if (e.radiology = t.data.radiology || [], e.pathology = t.data.pathology || [], 0 === e.pathology) e.firstPageList = [], e.accordionList = [], e.includeList = [], e.customincludeList = [], e.customincludeList1 = [], e.healthian_package = [];
            else {
                if (e.includeList = [], e.customincludeList = [], e.customincludeList1 = [], e.loading = !1, e.firstPageList = e.pathology, void 0 !== e.firstPageList.healthian_package && e.firstPageList.healthian_package.length > 0 && (e.firstPageList.custom_package = e.firstPageList.healthian_package[0], e.customincludeList = e.firstPageList.custom_package.include_tests, e.customincludeList1 = e.firstPageList.custom_package.also_include_tests), void 0 !== e.firstPageList.non_healthian_package && e.firstPageList.non_healthian_package.length > 0 && e.firstPageList.non_healthian_package.forEach(function(t, a) {
                        e.accordionList[a] = t, e.accordionList[a].tests = e.testAlreadyInList(t.tests)
                    }), void 0 !== e.firstPageList.healthian_package) {
                    e.healthian_package = e.firstPageList.healthian_package;
                    for (var a = 1; a < e.pkglimit; a++) e.includeList.push(e.healthian_package[a])
                }
                e.dataforcheckout = e.pathology
            }
        })
    }, e.viewMore = function() {
        e.includeList = [], e.pkglimit += 5;
        for (var t = 1; t < e.pkglimit; t++) e.includeList.push(e.healthian_package[t])
    }, e.checkSelection = function(t) {
        var a = $(t.target).find("a").text() || $(t.target).text(),
            r = $(t.target).find("a").attr("id") || $(t.target).attr("id"),
            o = $(t.target).closest("li").hasClass("selectedtest"),
            i = $(t.target).closest("li").hasClass("suggestpackage");
        if (o) e.findIndex("tags", a, "text", function(r) {
            r !== -1 && (e.tags.splice(r, 1), $(t.target).closest("li").removeClass("selectedtest"), e.findIndex("searchValue", a, "text", function(t) {
                t !== -1 && e.searchValue.splice(t, 1)
            }))
        });
        else if (i) {
            var s = {
                text: a,
                id: r
            };
            e.findIndex("tags", a, "text", function(t) {
                t == -1 && (e.tags.push(s), e.searchValue.push(s), $('li:contains("' + a + '")').addClass("selectedtest"))
            })
        } else {
            var s = {
                text: a,
                id: r
            };
            e.findIndex("tags", a, "text", function(a) {
                a == -1 && (e.tags.push(s), e.searchValue.push(s), $(t.target).closest("li").addClass("selectedtest"))
            })
        }
    }, e.loadTags = function(e) {
        return r({
            method: "POST",
            url: y.serverUrl + "commonservice/packageSuggestion",
            data: {
                keyword: e
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).success(function(t) {
            null == t.data && h.eventTrack("Received Zero Suggestions from Auto-suggestor", {
                category: "Search",
                label: e
            })
        })
    }, e.toggleList = function() {
        e.tags.forEach(function(e, t) {
            $('.Navpopulartests li:contains("' + e.text + '")').addClass("selectedtest")
        }), $("tags-input .tags .tag-item").css({
            background: "#1b75bc",
            color: "white"
        }), e.popularPackageList = !e.popularPackageList
    }, e.addToCart = function(a) {
        e.cartclicked = !0;
        var r = angular.copy(a);
        if (k.setTempPackage(r), "true" == localStorage.getItem("isLogin")) {
            e.member = JSON.parse(localStorage.getItem("user")).relatives, 0 === e.member.length || 0 !== t.count && "undefined" != typeof t.count ? e.tempUser = JSON.parse(localStorage.getItem("tempUser")) : (e.tempUser = e.member, localStorage.setItem("tempUser", JSON.stringify(e.tempUser))), e.addToCartModal = !0;
            var o = k.getCartDetails();
            if (o.length > 0) {
                var i = k.getSelectedPatient();
                "" !== i.name ? o.forEach(function(t, a) {
                    if (t.name == i.name && t.contact_number == i.phone)
                        if ("undefined" != typeof o[a].pkg) {
                            if ("undefined" !== r.test_packages[0].tcategory_name) var s = _.where(o[a].pkg.test_packages, {
                                tcategory_name: r.test_packages[0].tcategory_name
                            });
                            else var s = _.where(o[a].pkg.test_packages, {
                                display_name: r.test_packages[0].display_name
                            });
                            if (0 == s.length) o[a].pkg.test_packages.push(r.test_packages[0]), o[a].newpkg.push(r), k.setCartDetails(o), k.setSelectedPatient(t.name, t.contact_number), e.totalAmount(), v.go("cart");
                            else {
                                var n = "Same package can't be added for " + o[a].name.toUpperCase() + " . Please select another package.";
                                window.alert(n)
                            }
                        } else o[a].pkg = r, o[a].newpkg = [], o[a].newpkg.push(r), k.setCartDetails(o), k.setSelectedPatient(t.name, t.contact_number), v.go("cart")
                }) : v.go("cart")
            } else o = e.member, 1 == o.length && (o[0].pkg = r, o[0].newpkg = [], o[0].newpkg.push(r), k.setCartDetails(o), k.setSelectedPatient(o[0].name, o[0].contact_number)), k.setCartDetails(o), v.go("cart")
        } else e.$$childHead.loginModal = !e.$$childHead.loginModal, e.$$childHead.signupModal = !1, e.$$childHead.loginTab = !1, e.$$childHead.signupText = "Continue to Cart";
        e.temp = a
    }, e.$on("showPatientDialog", function(a, r) {
        if ("true" == localStorage.getItem("isLogin")) {
            t.loggedin = !0;
            var o = JSON.parse(localStorage.getItem("user")).name,
                i = o.split(" ");
            t.user = i[0].charAt(0).toUpperCase().concat(i[0].substr(1)), e.userLoginDetails = JSON.parse(localStorage.getItem("user")), "true" == localStorage.getItem("isSocialLogin") && ("" === e.userLoginDetails.mobile ? e.mobileModal = !0 : e.mobileModal = !1);
            var s = k.getTempPackage();
            e.addToCart(s)
        }
    }), e.customSearch = function() {
        doPost(r, y.serverUrl + "commonservice/packageSuggestion", {
            keyword: e.customSearchVal
        }, "", function(t) {
            e.suggestPackageList = t.data
        })
    }, e.customLocalitySearch = function(t) {
        e.getcustomerForm.sampledate = "", e.getcustomerForm.collectiondate.$dirty = !1, void 0 !== e.getcustomerForm.location && "" !== e.getcustomerForm.location || (e.getcustomerForm.location = "");
        var r = {
            city_id: JSON.parse(localStorage.getItem("cityID"))[0].city_id,
            locality: e.getcustomerForm.location
        };
        a.getLocalityByCity(r, function(t) {
            "success" == t.status ? (e.localityList = t.data, e.hideSuggestedLocation = !0, e.addNewAddress = !1, e.newlocation = !1) : "error" == t.status ? "Record not found" == t.message ? (e.addNewAddress = !0, e.hideSuggestedLocation = !1) : e.hideSuggestedLocation = !1 : e.addNewAddress = !1
        })
    }, e.checkSelection1 = function(t) {
        localStorage.setItem("locality", JSON.stringify(t)), e.getcustomerForm.location = t.location_name, e.loc_id = t.loc_id, e.addNewAddress = !1, e.hideSuggestedLocation = !1
    }, e.addNewLocation = function(t) {
        var r = {
            locality_name: t,
            city_id: JSON.parse(localStorage.getItem("cityID"))[0].city_id
        };
        a.addNewLocality(r, function(t) {
            "SUGGESTED_LOCALITY_ADDED" == t.message && (e.newlocation = !0)
        })
    }, e.testAlreadyInList = function(t) {
        var a = [];
        return void 0 !== t && t.forEach(function(t, r) {
            var o = -1;
            e.tags.forEach(function(e, a) {
                var r = e.text.toString().toUpperCase(),
                    i = t.tcategory_name.toString().toUpperCase();
                i == r && (o = a)
            }), o == -1 && a.push(t)
        }), a
    }, e.findIndex = function(t, a, r, o) {
        var i = -1;
        e[t].forEach(function(e, t) {
            (a || "").replace(/\s/g, "") === (e.text || "").replace(/\s/g, "") && (i = t)
        }), o(i)
    }, e.updateSearch = function() {
        g.scrollTo(0, angular.element(document.getElementById("topdiv")).offsetTop), e.pkglimit = 2, 0 != e.searchValue.length && (e.searchFlag = !0), e.loading = !0, e.filters.suggested_test = t.selectData || [];
        e.searchValue || [];
        e.filters.cities = {
            city_id: JSON.parse(localStorage.getItem("cityID"))[0].city_id
        };
        var a = {
            filters: e.filters,
            searchValue: e.searchValue
        };
        doPost(r, y.serverUrl + "search", a, "", function(t) {
            if (e.popularPackageList = !1, e.includeList = [], e.loading = !1, e.firstPageList = t.data.pathology, void 0 !== e.firstPageList.healthian_package && e.firstPageList.healthian_package.length > 0 && (e.firstPageList.custom_package = e.firstPageList.healthian_package[0], e.customincludeList = e.firstPageList.custom_package.include_tests, e.customincludeList1 = e.firstPageList.custom_package.also_include_tests), void 0 !== e.firstPageList.non_healthian_package && e.firstPageList.non_healthian_package.length > 0 && e.firstPageList.non_healthian_package.forEach(function(t, a) {
                    e.accordionList[a] = t, e.accordionList[a].tests = e.testAlreadyInList(t.tests)
                }), void 0 !== e.firstPageList.healthian_package) {
                e.healthian_package = e.firstPageList.healthian_package;
                for (var a = 1; a < e.pkglimit; a++) e.includeList.push(e.healthian_package[a])
            }
        })
    }, e.getAllHabits = function() {
        a.getAllHabitsDetails(function(t) {
            "success" == t.status && (e.habitList = t.data)
        })
    }, e.getAllRiskDetails = function() {
        a.getAllRiskDetails(function(t) {
            "success" == t.status && (e.riskgroups = t.data)
        })
    }, e.toggleSelection = function(t) {
        e.findIndex("selection", t.test_name, "test_name", function(a) {
            a == -1 ? e.selection.push(t) : e.selection.splice(a, 1)
        })
    }, e.addTest = function() {
        $(".added-parameter").slideToggle("fast"), $("#fadeOuttest").delay(1e3).fadeOut(1e3), e.selection.forEach(function(a, r) {
            var o = -1;
            t.selectData.forEach(function(e, t) {
                a.test_name == e.text && (o = 1)
            }), 1 != o && (t.selectData.push({
                text: a.test_name,
                id: a.test_id
            }), e.tags.push({
                text: a.test_name,
                id: a.test_id
            }))
        }), e.updateSearch()
    }, e.suggestedListActions = function() {
        e.hideSuggestedTest = !0, $(".added-parameter1").slideToggle("fast"), $("#suggestTestMsg").delay(1e3).fadeOut(1e3)
    }, e.closeaddToCartModal = function() {
        e.rel = !1, e.btnshow = !1, e.addToCartModal = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1
    }, e.listdata = function(t) {
        e.getcustomerForm.name = t.name, e.getcustomerForm.phone = t.contact_number, e.getcustomerForm.gender = t.gender, e.relationToUser = t.relationship, e.getcustomerForm.relation = t.relationship
    }, t.removeTag = function(t) {
        e.findIndex("searchValue", t.text, "test_name", function(t) {
            t != -1 && e.searchValue.splice(t, 1)
        }), e.habitListCheckbox[t.id] = !1, e.findIndex("selection", t.test_name, "test_name", function(t) {
            t != -1 && e.selection.splice(t, 1)
        })
    }, e.addPatient = function() {
        e.disableRelation = !1, e.noResults = !1, e.customerDetails.forEach(function(t, a) {
            "self" === t.relationship && (e.rel = !0, e.addNewPatient = !0)
        }), e.disablePhone = !1, e.disableGender = !1
    }, e.fillPatientDetail = function(t) {
        e.rel = !1, e.getcustomerForm.name = t.name, e.getcustomerForm.phone = t.contact_number, e.getcustomerForm.relation = t.relationship, e.getcustomerForm.gender = t.gender, e.getcustomerForm.age = t.age, "00/00/0000" == t.dob && (e.getcustomerForm.userDOB = ""), e.getcustomerForm.userDOB = t.dob, e.disablePhone = !0, e.disableRelation = !0, e.disableGender = !1, void 0 === e.getcustomerForm.phone || "" === e.getcustomerForm.phone ? e.disablePhone = !1 : void 0 === e.getcustomerForm.relation || "" === e.getcustomerForm.relation ? e.disableRelation = !1 : void 0 !== e.getcustomerForm.gender && "" !== e.getcustomerForm.gender || (e.disableGender = !1), e.addNewPatient = !1
    }, e.getcustomerdetails = function() {
        if (e.loaderVar = !0, e.getcustomerFormSubmitted = !1, void 0 === e.getcustomerForm.name || "" === e.getcustomerForm.name) return e.getcustomerForm.customername.$dirty = !0, e.getcustomerForm.customername.$invalid = !0, e.getcustomerForm.customername.$error.required = !0, e.loaderVar = !1, h.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Name"
        }), focus("customername"), !1;
        if (void 0 === e.getcustomerForm.relation || "" === e.getcustomerForm.relation) return e.getcustomerForm.selectrelation.$dirty = !0, e.getcustomerForm.selectrelation.$invalid = !0, e.getcustomerForm.selectrelation.$error.required = !0, e.loaderVar = !1, h.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Relation"
        }), focus("selectrelation"), !1;
        if (void 0 === e.getcustomerForm.phone || "" === e.getcustomerForm.phone) return e.getcustomerForm.customerphone.$dirty = !0, e.getcustomerForm.customerphone.$invalid = !0, e.getcustomerForm.customerphone.$error.required = !0, e.loaderVar = !1, h.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Contact No."
        }), focus("customerphone"), !1;
        if (void 0 === e.getcustomerForm.age || "" === e.getcustomerForm.age || e.getcustomerForm.age > 120 || e.getcustomerForm.age <= 0) return e.getcustomerForm.customerage.$dirty = !0, e.getcustomerForm.customerage.$invalid = !0, e.getcustomerForm.customerage.$error.required = !0, e.loaderVar = !1, h.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Age"
        }), focus("customerage"), !1;
        if (void 0 === e.getcustomerForm.gender || "" === e.getcustomerForm.gender) return e.getcustomerForm.customergender.$dirty = !0, e.getcustomerForm.customergender.$invalid = !0, e.getcustomerForm.customergender.$error.required = !0, e.loaderVar = !1, h.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Gender"
        }), focus("customergender"), !1;
        if (e.samepkg = !0, e.addhide = !1, e.addNewPatient === !0 || e.addNewPatientSocial === !0) {
            var a = _.where(e.tempUser, {
                name: e.getcustomerForm.name
            });
            0 == a.length && (e.tempUser.push({
                name: e.getcustomerForm.name,
                contact_number: e.getcustomerForm.phone,
                relationship: e.getcustomerForm.relation,
                gender: e.getcustomerForm.gender,
                age: e.getcustomerForm.age,
                dob: e.getcustomerForm.userDOB
            }), localStorage.setItem("tempUser", JSON.stringify(e.tempUser)), e.tempUser = JSON.parse(localStorage.getItem("tempUser")))
        }
        if ("true" == localStorage.getItem("isLogin") ? e.userId = JSON.parse(localStorage.getItem("user")).user_id : e.relationToUser = e.getcustomerForm.relation, e.customerDetails.length > 2) {
            var r, o = angular.copy(e.temp);
            e.customerDetails.forEach(function(t, a) {
                if (t.name == e.getcustomerForm.name && t.phone == e.getcustomerForm.phone) {
                    if (void 0 !== o.test_packages[0].tcategory_name) var i = _.where(e.customerDetails[a].pkg.test_packages, {
                        tcategory_name: o.test_packages[0].tcategory_name
                    });
                    else var i = _.where(e.customerDetails[a].pkg.test_packages, {
                        display_name: o.test_packages[0].display_name
                    });
                    0 == i.length ? (e.customerDetails[a].pkg.test_packages.push(o.test_packages[0]), e.customerDetails[a].newpkg.push(o), r = !0, e.totalAmount()) : (e.patientAddErrorDiv = !0, e.errorMsg = "Same package can't be added for " + e.customerDetails[a].name.toUpperCase(), r = !0, e.totalAmount())
                }
            }), r !== !0 && (e.alertDiv = !0, e.loaderVar = !1, e.btnshow = !0, e.addhide = !1), 3 === e.customerDetails.length && (e.btnshow = !0, e.addhide = !1), e.loaderVar = !1
        } else {
            var i = {
                    family_head: e.userId,
                    cust_name: e.getcustomerForm.name,
                    age: e.getcustomerForm.age,
                    birth_date: e.getcustomerForm.userDOB,
                    phone: e.getcustomerForm.phone,
                    gender: e.getcustomerForm.gender,
                    relationship: e.getcustomerForm.relation,
                    dob_type: e.type
                },
                o = angular.copy(e.temp);
            e.freezeSlot(i).then(function(a) {
                var r;
                e.customerDetails.forEach(function(t, a) {
                    if (t.name == e.getcustomerForm.name && t.phone == e.getcustomerForm.phone) {
                        if (void 0 !== o.test_packages[0].tcategory_name) var i = _.where(e.customerDetails[a].pkg.test_packages, {
                            tcategory_name: o.test_packages[0].tcategory_name
                        });
                        else var i = _.where(e.customerDetails[a].pkg.test_packages, {
                            display_name: o.test_packages[0].display_name
                        });
                        0 == i.length ? (e.customerDetails[a].pkg.test_packages.push(o.test_packages[0]), e.customerDetails[a].newpkg.push(o), r = !0, e.totalAmount()) : (e.patientAddErrorDiv = !0, e.errorMsg = "Same package can't be added for " + e.customerDetails[a].name.toUpperCase(), r = !0)
                    }
                }), r !== !0 && (e.pkgNew = [], e.pkgNew.push(o), e.customerDetails.push({
                    user_id: a.user_id,
                    name: e.getcustomerForm.name,
                    age: e.getcustomerForm.age,
                    relationship: e.getcustomerForm.relation,
                    phone: e.getcustomerForm.phone,
                    gender: e.getcustomerForm.gender,
                    pkg: o,
                    newpkg: e.pkgNew
                }), e.totalAmount()), e.getcustomerForm.selectrelation.$dirty = !1, e.totalAmount(), e.loaderVar = !1, e.btnshow = !0, e.addhide = !1, 0 !== e.amount && 0 !== e.customerDetails[0].pkg.healthian_price ? e.orderList = !0 : e.orderList = !1, t.count++
            });
            e.disableName = !0, e.disableRelation = !0, e.disablePhone = !0, e.disableGender = !1, f(function() {
                e.patientAddErrorDiv = !1, e.errorMsg = ""
            }, 7e3)
        }
    }, e.checkTime = function(t) {
        var a = parseInt(t);
        a > 6 && a < 11 ? (e.notification = !1, e.notificationPeak = !0) : (e.notificationPeak = !1, e.notification = !0)
    }, e.freezeSlot = function(t) {
        var a = c.defer(),
            r = e.generateUserId(t);
        return a.resolve(r), a.promise
    }, e.generateUserId = function(e) {
        var r, o = c.defer();
        return a.getUserId(e, function(e) {
            "error" === e.status ? "TOKEN_EXPIRED" != e.code && "INVALID_TOKEN" != e.code && "AUTH_FAILED" != e.code || t.$broadcast("tokenExpired") : (r = e.data[0], o.resolve(r))
        }), o.promise
    }, e.totalAmount = function() {
        e.amount = 0, e.customerDetails.forEach(function(t, a) {
            t.newpkg.forEach(function(t, a) {
                e.amount += parseInt(t.healthian_price)
            })
        }), 0 == e.amount && (e.orderList = !1, e.addToCartModal = !1), localStorage.setItem("amountfinal", e.amount)
    }, e.getSubTotal = function(t, a) {
        return e.subtotal = 0, t.forEach(function(t, a) {
            e.subtotal += parseInt(t.healthian_price)
        }), e.subtotal
    }, e.customerEdit = function(t, a, r) {
        e.previewDiv0 = e.previewDiv1 = e.previewDiv2 = e.previewDiv3 = e.previewDiv4 = e.previewDiv5 = !1;
        parseInt(t.healthian_price);
        e.customerDetails.splice(r, 1), e.totalAmount(), e.alertDiv = !1, 0 == e.customerDetails.length && (e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.addhide = !0, e.btnshow = !1, e.getcustomerFormSubmitted = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1, "true" !== localStorage.getItem("isLogin") && (e.tempUser = []))
    }, e.calculateAge = function(t, a) {
        var r = moment(t, "DD/MM/YYYY").format("M"),
            o = (moment(t, "DD/MM/YYYY").format("D"), moment(t, "DD/MM/YYYY").format("Y")),
            i = moment().month() + 1,
            s = new Date,
            n = new Date(t),
            l = s.getFullYear() - o;
        s.getMonth() - n.getMonth();
        i >= r ? e.getcustomerForm.age = l : e.getcustomerForm.age = l - 1, angular.element("#customerage").val(e.getcustomerForm.age)
    }, angular.element("#usedob").datepicker({
        endDate: "-182d",
        onSelect: function(t, a) {
            e.calculateAge(e.getcustomerForm.userDOB, "")
        }
    }), e.getDOB = function(t, a) {
        var r = moment().subtract(t, "years").format("DD/MM/YYYY");
        if (e.getcustomerForm.userDOB = r, angular.element("#usedob").datepicker({
                endDate: "-182d"
            }).datepicker("update", e.getcustomerForm.userDOB).on("changeDate", function() {
                e.calculateAge(e.getcustomerForm.userDOB)
            }), e.type = "estimated", e.loggedin === !0) {
            var o = JSON.parse(localStorage.getItem("user"));
            o.relatives.forEach(function(r, o) {
                r.name === a && (r.age = t, r.dob = e.getcustomerForm.userDOB)
            }), localStorage.setItem("user", JSON.stringify(o))
        }
    }, e.hoverInOrder = function(t) {
        0 === t ? e.previewDiv3 = !0 : 1 == t ? e.previewDiv4 = !0 : 2 == t && (e.previewDiv5 = !0), e.previewList = e.customerDetails[t].newpkg
    }, e.hoverIn = function(t) {
        0 === t ? e.previewDiv0 = !0 : 1 == t ? e.previewDiv1 = !0 : 2 == t && (e.previewDiv2 = !0), e.previewList = e.customerDetails[t].newpkg
    }, e.hoverOut = function(t) {
        e.previewDiv0 = !1, e.previewDiv1 = !1, e.previewDiv2 = !1, e.previewDiv3 = !1, e.previewDiv4 = !1, e.previewDiv5 = !1, e.previewList = []
    }, e.getTestIncluedCount = function(e, t) {
        var a = e.include_tests.length,
            r = e.also_include_tests.length;
        return a + r
    }, e.getTestInclued = function(e, t) {
        var a = "",
            r = "";
        return e.include_tests.forEach(function(e, t) {
            r = e.tcategory_name + ",", a += r
        }), e.also_include_tests.forEach(function(e, t) {
            r = e.tcategory_name + ",", a += r
        }), a
    }, e.getPkgCount = function(t, a) {
        return e.testCount = 0, t.newpkg.forEach(function(t, a) {
            e.testCount++
        }), e.testCount
    }, e.clearSearch = function() {
        e.searchValue = [], e.habitListCheckbox = {}, e.selection = [], t.selectData = [], e.tags = [], $(".populartests li").removeClass("selectedtest"), e.updateSearch()
    }, e.booksamePkg = function() {
        "self" === e.getcustomerForm.relation && (e.rel = !0), e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.addhide = !0, e.btnshow = !1, e.getcustomerFormSubmitted = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1
    }, e.bookanotherPkg = function() {
        "self" === e.getcustomerForm.relation && (e.rel = !0), "true" == localStorage.getItem("isLogin") && (e.rel = !0), e.searchFlag = !1, e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.clearSearch(), e.samepkg = !1, e.getcustomerFormSubmitted = !1, e.addToCartModal = !1, e.btnshow = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1
    }, e.confirmBook = function() {
        t.total = e.amount, n.sendData1(e.customerDetails), localStorage.setItem("Detailscustomer", JSON.stringify(e.customerDetails))
    }, doPost(r, y.serverUrl + "commonservice/getPopularPackages", {
        city: JSON.parse(localStorage.getItem("cityID"))[0].city_name
    }, "", function(t) {
        e.popularPackages1 = t.data
    }), doGet(r, y.serverUrl + "commonservice/getPopulerTests", function(t) {
        e.popularTest1 = t.data
    }), e.getRealtion = function() {
        a.getRealtion(function(t) {
            t.status === !0 && (e.RelationShip = t.data)
        })
    }, e.getRealtionwithoutself = function() {
        a.getRealtionwithoutself(function(t) {
            t.status === !0 && (e.RelationShipwithoutSelf = t.data)
        })
    }, e.getAllRiskDetails(), e.getAllHabits(), e.frontPageSearchInt(), e.getRealtionwithoutself(), e.getRealtion(), e.addFamilyForm = !1, e.showFamilyForm = function() {
        e.addFamilyForm = !0
    }, e.coupondata = {}, localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), doGet(r, y.serverUrl + "commonservice/getHealthQuote", function(t) {
        t && (e.randomQuote = t.data)
    })
}

function careerController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    e.addAddressForm = {}, e.noticPeriodList = [{
        name: "15 Days"
    }, {
        name: "30 Days"
    }, {
        name: "2 Months"
    }], e.notice = e.noticPeriodList[0], e.postList = [{
        name: "Sr. Software Engineer-PHP"
    }, {
        name: "Data Mining Executive"
    }, {
        name: "Android Application Developer"
    }, {
        name: "Sales Associate – Inbound"
    }, {
        name: "Sales Associate – Outbound"
    }, {
        name: "Customer Experience Executive"
    }, {
        name: "Medical Health & Service Manager"
    }, {
        name: "Wellness Consultant - Nutritionist"
    }, {
        name: "Phlebotomist"
    }], e.post = e.postList[0], e.carrerAnchor = function() {
        p("careerAnchore")
    }, e.oneAtATime = !0, e.status = {
        first: !1,
        second: !1,
        third: !1,
        fourth: !1,
        fifth: !1,
        six: !1,
        seven: !1,
        eight: !1,
        nine: !1
    }, e.toggleOpen = function(t) {
        _.map(e.status, function(a, r) {
            r === t ? e.status[t] = !e.status[t] : e.status[r] = !1
        })
    }, e.verifyAddress = function() {
        if (e.addAddressFormSubmitted = !1, void 0 === e.addAddressForm.Name || "" === e.addAddressForm.Name) return e.addAddressForm.name.$dirty = !0, e.addAddressForm.name.$invalid = !0, e.addAddressForm.name.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.customerEmail || "" === e.addAddressForm.customerEmail) return e.addAddressForm.customeremail.$dirty = !0, e.addAddressForm.customeremail.$invalid = !0, e.addAddressForm.customeremail.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.No || "" === e.addAddressForm.No) return e.addAddressForm.customerno.$dirty = !0, e.addAddressForm.customerno.$invalid = !0, e.addAddressForm.customerno.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.Exp || "" === e.addAddressForm.Exp) return e.addAddressForm.customerexp.$dirty = !0, e.addAddressForm.customerexp.$invalid = !0, e.addAddressForm.customerexp.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.currentOrg || "" === e.addAddressForm.currentOrg) return e.addAddressForm.currentorg.$dirty = !0, e.addAddressForm.currentorg.$invalid = !0, e.addAddressForm.currentorg.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.currentDes || "" === e.addAddressForm.currentDes) return e.addAddressForm.currentdes.$dirty = !0, e.addAddressForm.currentdes.$invalid = !0, e.addAddressForm.currentdes.$error.required = !0, !1;
        var t = {
            full_name: e.addAddressForm.Name,
            email_id: e.addAddressForm.customerEmail,
            mobile: e.addAddressForm.No,
            post_applied: e.post.name,
            experience: e.addAddressForm.Exp,
            current_organization: e.addAddressForm.currentOrg,
            current_designation: e.addAddressForm.currentDes,
            notice_period: e.notice.name,
            address: e.addAddressForm.Address,
            file_name: "",
            file: ""
        };
        "undefined" != typeof e.opts && (t.file_name = e.opts.name, t.file = e.opts.doc), doPostImage(l, g.serverUrl + "commonservice/workWithUs", t, "", function(t) {
            1 == t.status ? (alert(t.message), e.addAddressForm.Name = "", e.addAddressForm.customerEmail = "", e.addAddressForm.No = "", e.post.name = "", e.addAddressForm.Exp = "", e.addAddressForm.currentOrg = "", e.addAddressForm.currentDes = "", e.notice.name = "", e.addAddressForm.Address = "", e.opts.name = "", e.opts.doc = "", e.addAddressForm.name.$dirty = !1, e.addAddressForm.customeremail.$dirty = !1, e.addAddressForm.customerno.$dirty = !1, e.addAddressForm.customerexp.$dirty = !1, e.addAddressForm.currentorg.$dirty = !1, e.addAddressForm.currentdes.$dirty = !1) : alert(t.message)
        })
    }
}

function cartController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p, f) {
    if (e.cartData = g.getCartDetails(), e.userCheckBox = {}, e.userEdit = {}, e.familyCountError = !1, e.familyCountErrorMsg = "Selection of maximum numbers (3) of family members per booking achieved. Please do another booking", e.editCustomerForm = {}, e.editCustomerFormModel = {}, e.totalAmount = function() {
            e.amount = 0, e.cartData.forEach(function(t, a) {
                t.hasOwnProperty("newpkg") && t.newpkg.forEach(function(t, a) {
                    e.amount += parseInt(t.healthian_price)
                })
            }), localStorage.setItem("amountfinal", e.amount)
        }, e.getCartTotalTest = function() {
            "true" == localStorage.getItem("isLogin") && (e.cartData = g.getCartDetails(), s.totalCartTest = 0, e.cartData.forEach(function(e, t) {
                e.hasOwnProperty("newpkg") && (s.totalCartTest += e.newpkg.length)
            }))
        }, "true" == localStorage.getItem("isLogin")) {
        e.userId = JSON.parse(localStorage.getItem("user")).user_id, 0 === e.cartData.length && (e.member = JSON.parse(localStorage.getItem("user")).relatives, 0 === e.member.length || 0 !== s.count && "undefined" != typeof s.count ? (e.tempUser = JSON.parse(localStorage.getItem("tempUser")), e.cartData = e.tempUser, g.setCartDetails(cartData)) : (e.tempUser = e.member, localStorage.setItem("tempUser", JSON.stringify(e.tempUser)), e.tempUser = JSON.parse(localStorage.getItem("tempUser"))), e.cartData = e.member, g.setCartDetails(e.cartData));
        var y = g.getSelectedPatient(),
            h = g.getTempPackage();
        e.cartData.forEach(function(t, a) {
            if ("" !== y.name)
                if (t.name === y.name && t.contact_number === y.phone) e.userCheckBox[t.user_id] = !0, e.userEdit[t.user_id] = !1;
                else if (null !== h && t.hasOwnProperty("newpkg")) {
                var r = _.where(e.cartData[a].newpkg, {
                    testId: h.testId
                });
                r.length > 0 && (e.userCheckBox[t.user_id] = !0, e.userEdit[t.user_id] = !1)
            } else e.userCheckBox[t.user_id] = !1, e.userEdit[t.user_id] = !1;
            else if (null !== h && t.hasOwnProperty("newpkg")) {
                var r = _.where(e.cartData[a].newpkg, {
                    testId: h.testId
                });
                r.length > 0 && (e.userCheckBox[t.user_id] = !0, e.userEdit[t.user_id] = !1)
            } else e.userCheckBox[t.user_id] = !1, e.userEdit[t.user_id] = !1
        }), e.totalAmount(), e.getCartTotalTest()
    } else c.go("orderbook");
    e.addTest = function(t, a) {
        e.cartData = g.getCartDetails();
        var r = 0,
            o = !1;
        _.each(e.cartData, function(e) {
            e.hasOwnProperty("newpkg") && (r += 1, e.name === t && e.contact_number === a && (o = !0))
        }), r < 3 || o ? (e.familyCountError = !1, e.familyCountErrorMsg = "Selection of maximum numbers (3) of family members per booking achieved. Please do another booking", g.setSelectedPatient(t, a), g.setClearSearch(!0), c.go("orderbook")) : (e.familyCountError = !0, o = !1, f.scrollTo(0, angular.element(document.getElementById("familyerrordiv")).offsetTop)), e.getCartTotalTest()
    }, e.removeTest = function(t, a, r) {
        e.familyCountError = !1, e.cartData = g.getCartDetails();
        var o = g.getTempPackage();
        e.cartData.forEach(function(i, s) {
            if (i.name === t && i.contact_number === a) {
                if (1 === i.newpkg.length) e.userCheckBox[e.cartData[s].user_id] = !1, delete e.cartData[s].newpkg, delete e.cartData[s].pkg, g.setCartDetails(e.cartData);
                else if (i.newpkg.forEach(function(t, a) {
                        t.testId === r && (e.cartData[s].pkg.test_packages.splice(a, 1), e.cartData[s].newpkg.splice(a, 1), g.setCartDetails(e.cartData))
                    }), null !== o) {
                    var n = _.where(e.cartData[s].newpkg, {
                        testId: o.testId
                    });
                    n.length > 0 ? (e.userCheckBox[e.cartData[s].user_id] = !0, e.userEdit[e.cartData[s].user_id] = !1) : e.userCheckBox[e.cartData[s].user_id] = !1
                } else e.userCheckBox[e.cartData[s].user_id] = !1;
                e.totalAmount(), e.getCartTotalTest()
            }
        })
    }, e.selectUserCheckBox = function(t, a, r) {
        var o = g.getTempPackage();
        e.cartData = g.getCartDetails();
        var i = 0,
            s = !1;
        if (_.each(e.cartData, function(e) {
                e.hasOwnProperty("newpkg") && (i += 1, e.name === t && e.contact_number === a && (s = !0))
            }), e.getCartTotalTest(), i < 3 || s)
            if ("" !== t && "" !== a && null !== o && e.userCheckBox[r]) {
                var n = angular.copy(o);
                e.cartData.forEach(function(r, o) {
                    if (r.name == t && r.contact_number == a)
                        if (e.cartData[o].hasOwnProperty("pkg")) {
                            if (n.test_packages[0].hasOwnProperty("tcategory_name")) var i = _.where(e.cartData[o].pkg.test_packages, {
                                tcategory_name: n.test_packages[0].tcategory_name
                            });
                            else var i = _.where(e.cartData[o].pkg.test_packages, {
                                display_name: n.test_packages[0].display_name
                            });
                            0 == i.length && (e.cartData[o].pkg.test_packages.push(n.test_packages[0]), e.cartData[o].newpkg.push(n), g.setCartDetails(e.cartData))
                        } else e.cartData[o].pkg = n, e.cartData[o].newpkg = [], e.cartData[o].newpkg.push(n), g.setCartDetails(e.cartData)
                }), e.totalAmount(), e.getCartTotalTest()
            } else e.userCheckBox[r] = !1, e.familyCountError = !0, e.familyCountErrorMsg = "Please Click on ADD TESTS to book tests.";
        else p.eventTrack("Select 4th member in a booking", {
            category: "My Cart",
            label: r
        }), e.familyCountError = !0, e.familyCountErrorMsg = "Selection of maximum numbers (3) of family members per booking achieved. Please do another booking", e.userCheckBox[r] = !1, f.scrollTo(0, angular.element(document.getElementById("familyerrordiv")).offsetTop)
    }, e.addMemberDiv = !1, e.showAddMemberForm = function() {
        e.getcustomerFormModel = {}, e.addMemberDiv = !e.addMemberDiv, e.getcustomerForm.selectrelation.$dirty = !1,
            e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1, e.getcustomerForm.userdob.$dirty = !1
    }, e.addFamilyMember = function() {
        if (e.loaderVar = !0, e.getcustomerFormSubmitted = !1, void 0 === e.getcustomerFormModel.name || "" === e.getcustomerFormModel.name) return e.getcustomerForm.customername.$dirty = !0, e.getcustomerForm.customername.$invalid = !0, e.getcustomerForm.customername.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Name"
        }), focus("customername"), !1;
        if (void 0 === e.getcustomerFormModel.relation || "" === e.getcustomerFormModel.relation) return e.getcustomerForm.selectrelation.$dirty = !0, e.getcustomerForm.selectrelation.$invalid = !0, e.getcustomerForm.selectrelation.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Relation"
        }), focus("selectrelation"), !1;
        if (void 0 === e.getcustomerFormModel.phone || "" === e.getcustomerFormModel.phone) return e.getcustomerForm.customerphone.$dirty = !0, e.getcustomerForm.customerphone.$invalid = !0, e.getcustomerForm.customerphone.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Contact No."
        }), focus("customerphone"), !1;
        if (void 0 === e.getcustomerFormModel.age || "" === e.getcustomerFormModel.age || e.getcustomerFormModel.age > 120 || e.getcustomerFormModel.age <= 0) return e.getcustomerForm.customerage.$dirty = !0, e.getcustomerForm.customerage.$invalid = !0, e.getcustomerForm.customerage.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Age"
        }), focus("customerage"), !1;
        if (void 0 === e.getcustomerFormModel.gender || "" === e.getcustomerFormModel.gender) return e.getcustomerForm.customergender.$dirty = !0, e.getcustomerForm.customergender.$invalid = !0, e.getcustomerForm.customergender.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Gender"
        }), focus("customergender"), !1;
        var t = {
            family_head: e.userId,
            cust_name: e.getcustomerFormModel.name,
            age: e.getcustomerFormModel.age,
            birth_date: e.getcustomerFormModel.userDOB,
            phone: e.getcustomerFormModel.phone,
            gender: e.getcustomerFormModel.gender,
            relationship: e.getcustomerFormModel.relation,
            dob_type: e.type
        };
        m.insertNewUserInFamily(t, function(t) {
            if ("error" === t.status) "TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired");
            else if (t.status) {
                var a = t.data[0],
                    r = {
                        user_id: a.user_id,
                        name: e.getcustomerFormModel.name,
                        email_address: "",
                        age: e.getcustomerFormModel.age,
                        dob: e.getcustomerFormModel.userDOB,
                        contact_number: e.getcustomerFormModel.phone,
                        gender: e.getcustomerFormModel.gender,
                        relationship: e.getcustomerFormModel.relation,
                        dob_type: e.type
                    };
                e.cartData = g.getCartDetails(), e.cartData.push(r), g.setCartDetails(e.cartData);
                var o = JSON.parse(localStorage.getItem("user"));
                o.relatives.push(r), localStorage.setItem("user", JSON.stringify(o)), e.getcustomerFormSubmitted = !1, e.showAddMemberForm()
            } else window.alert(t.message)
        })
    }, e.getRealtionwithoutself = function() {
        m.getRealtionwithoutself(function(t) {
            t.status === !0 && (e.RelationShip = t.data)
        })
    }, e.getRealtionwithoutself(), e.calculateAge = function(t) {
        var a = moment(t, "DD/MM/YYYY").format("M"),
            r = (moment(t, "DD/MM/YYYY").format("D"), moment(t, "DD/MM/YYYY").format("Y")),
            o = moment().month() + 1,
            i = new Date,
            s = new Date(t),
            n = i.getFullYear() - r;
        i.getMonth() - s.getMonth();
        o >= a ? e.getcustomerFormModel.age = n : e.getcustomerFormModel.age = n - 1, angular.element("#customerage").val(e.getcustomerFormModel.age)
    }, angular.element("#usepdob").datepicker({
        endDate: "-182d",
        onSelect: function(t, a) {
            e.calculateAge(e.getcustomerFormModel.userDOB)
        }
    }), e.getDOB = function(t, a) {
        void 0 === t && (t = 0);
        var r = moment().subtract(t, "years").format("DD/MM/YYYY");
        e.getcustomerFormModel.userDOB = r, angular.element("#usepdob").datepicker({
            endDate: "-182d"
        }).datepicker("update", e.getcustomerFormModel.userDOB).on("changeDate", function() {
            e.calculateAge(e.getcustomerFormModel.userDOB)
        }), e.type = "estimated"
    }, e.confirmBook = function() {
        s.total = e.amount;
        var t = angular.copy(e.cartData),
            r = [];
        t.forEach(function(e, t) {
            e.hasOwnProperty("newpkg") && r.push(e)
        }), r.length > 0 ? (a.sendData1(r), localStorage.setItem("Detailscustomer", JSON.stringify(r))) : (e.familyCountError = !0, e.familyCountErrorMsg = "No tests added. Please Click on ADD TESTS to book tests.", f.scrollTo(0, angular.element(document.getElementById("familyerrordiv")).offsetTop))
    }, e.calculateAgeEditUser = function(t, a) {
        var r = moment(t, "DD/MM/YYYY").format("M"),
            o = (moment(t, "DD/MM/YYYY").format("D"), moment(t, "DD/MM/YYYY").format("Y")),
            i = moment().month() + 1,
            s = new Date,
            n = new Date(t),
            l = s.getFullYear() - o;
        s.getMonth() - n.getMonth();
        i >= r ? e.editCustomerFormModel[a].age = l : e.editCustomerFormModel[a].age = l - 1, angular.element("#customerage_" + a).val(e.editCustomerFormModel[a].age)
    }, e.getDOBEditUser = function(t, a) {
        var r = moment().subtract(t, "years").format("DD/MM/YYYY");
        e.editCustomerFormModel[a].userDOB = r, angular.element("#userdob_" + a).datepicker({
            endDate: "-182d"
        }).datepicker("update", e.editCustomerFormModel[a].userDOB).on("changeDate", function() {
            e.calculateAge(e.editCustomerFormModel[a].userDOB, a)
        }), e.type = "estimated"
    }, e.editUser = function(t, a, r, o, i, s, n) {
        e.userEdit[t] = !e.userEdit[t], e.editCustomerFormModel[t] = {}, e.editCustomerFormModel[t].name = a, e.editCustomerFormModel[t].age = r, e.editCustomerFormModel[t].relation = i, e.editCustomerFormModel[t].gender = o, e.editCustomerFormModel[t].phone = s, e.editCustomerFormModel[t].userDOB = n, angular.element("#userdob_" + t).datepicker({
            endDate: "-182d"
        }).datepicker("update", n).on("changeDate", function() {
            e.calculateAge(n)
        })
    }, e.cancelEditUser = function(t) {
        e.userEdit[t] = !e.userEdit[t]
    }, e.updateUserDetails = function(t) {
        if (e.loaderVar = !0, e.editCustomerFormSubmitted = !1, void 0 === e.editCustomerFormModel[t].name || "" === e.editCustomerFormModel[t].name) return e.editCustomerForm[t].customername.$dirty = !0, e.editCustomerForm[t].customername.$invalid = !0, e.editCustomerForm[t].customername.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Name"
        }), focus("customername"), !1;
        if (void 0 === e.editCustomerFormModel[t].relation || "" === e.editCustomerFormModel[t].relation) return e.editCustomerForm[t].selectrelation.$dirty = !0, e.editCustomerForm[t].selectrelation.$invalid = !0, e.editCustomerForm[t].selectrelation.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Relation"
        }), focus("selectrelation"), !1;
        if (void 0 === e.editCustomerFormModel[t].phone || "" === e.editCustomerFormModel[t].phone) return e.editCustomerForm[t].customerphone.$dirty = !0, e.editCustomerForm[t].customerphone.$invalid = !0, e.editCustomerForm[t].customerphone.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Contact No."
        }), focus("customerphone"), !1;
        if (void 0 === e.editCustomerFormModel[t].age || "" === e.editCustomerFormModel[t].age || e.editCustomerFormModel[t].age > 120 || e.editCustomerFormModel[t].age <= 0) return e.editCustomerForm[t].customerage.$dirty = !0, e.editCustomerForm[t].customerage.$invalid = !0, e.editCustomerForm[t].customerage.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Age"
        }), focus("customerage"), !1;
        if (void 0 === e.editCustomerFormModel[t].gender || "" === e.editCustomerFormModel[t].gender) return e.editCustomerForm[t].customergender.$dirty = !0, e.editCustomerForm[t].customergender.$invalid = !0, e.editCustomerForm[t].customergender.$error.required = !0, e.loaderVar = !1, p.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Gender"
        }), focus("customergender"), !1;
        var a = {
            user_id: t,
            cust_name: e.editCustomerFormModel[t].name,
            age: e.editCustomerFormModel[t].age,
            birth_date: e.editCustomerFormModel[t].userDOB,
            phone: e.editCustomerFormModel[t].phone,
            gender: e.editCustomerFormModel[t].gender,
            relationship: e.editCustomerFormModel[t].relation,
            dob_type: e.type
        };
        m.updateUserDetail(a, function(r) {
            if ("error" === r.status) "TOKEN_EXPIRED" != r.code && "INVALID_TOKEN" != r.code && "AUTH_FAILED" != r.code || s.$broadcast("tokenExpired");
            else if (r.status) {
                e.userEdit[t] = !e.userEdit[t], e.cartData = g.getCartDetails(), e.cartData.forEach(function(r, o) {
                    r.user_id === t && (e.cartData[o].name = a.cust_name, e.cartData[o].contact_number = a.phone, e.cartData[o].gender = a.gender, e.cartData[o].age = a.age, e.cartData[o].relationship = a.relationship, e.cartData[o].dob = a.birth_date, e.cartData[o].dob_type = a.type)
                }), g.setCartDetails(e.cartData);
                var o = JSON.parse(localStorage.getItem("user"));
                o.relatives.forEach(function(e, r) {
                    e.user_id === t && (o.relatives[r].name = a.cust_name, o.relatives[r].contact_number = a.phone, o.relatives[r].gender = a.gender, o.relatives[r].age = a.age, o.relatives[r].relationship = a.relationship, o.relatives[r].dob = a.birth_date, o.relatives[r].dob_type = a.type)
                }), localStorage.setItem("user", JSON.stringify(o))
            } else window.alert(r.message)
        })
    }, i(function() {
        e.familyCountError = !1
    }, 8e3), e.totalAmount(), e.getCartTotalTest(), angular.element(".modal-backdrop").remove(), angular.element("body").css("padding-right", "0px")
}

function contactUsController(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    e.verifyAddress = function() {
        if (e.addAddressFormSubmitted = !1, void 0 === e.addAddressForm.Name || "" === e.addAddressForm.Name) return e.addAddressForm.name.$dirty = !0, e.addAddressForm.name.$invalid = !0, e.addAddressForm.name.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.customerEmail || "" === e.addAddressForm.customerEmail) return e.addAddressForm.customeremail.$dirty = !0, e.addAddressForm.customeremail.$invalid = !0, e.addAddressForm.customeremail.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.No || "" === e.addAddressForm.No) return e.addAddressForm.customerno.$dirty = !0, e.addAddressForm.customerno.$invalid = !0, e.addAddressForm.customerno.$error.required = !0, !1;
        if (void 0 === e.addAddressForm.customerComp || "" === e.addAddressForm.customerComp) return e.addAddressForm.customercomp.$dirty = !0, e.addAddressForm.customercomp.$invalid = !0, e.addAddressForm.customercomp.$error.required = !0, !1;
        var t = {
            full_name: e.addAddressForm.Name,
            email_id: e.addAddressForm.customerEmail,
            mobile: e.addAddressForm.No,
            company: e.addAddressForm.customerComp,
            message: e.message
        };
        doPost(l, g.serverUrl + "commonservice/contactUs", t, "", function(e) {
            1 == e.status ? alert(e.message) : alert(e.message)
        })
    }
}

function dashboardController(e, t, a, r, o, i, s, n) {
    e.editProfile = !1, e.familyList = [], e.myReportData = [], e.mybookingList = [], e.myReportCountMember = 5, e.myReportCountUser = 5, e.docCommentCount = 2, e.nodata = !1, e.selection = [], e.preferslots = [], e.closeFamilyReport = !0, e.heghtInInches = 0, e.addGlucose = !1, e.userAge = 0, e.addBP = !1, e.subscribe = !1, e.history = !1, e.loaderVar = !0, e.shareReport = !1, e.reorderReport = !1, e.reportSharemsgflag = !1, e.nodataReport = !1, e.nodataBooking = !1, e.slotFlag = !1, e.dayFlag = !1, e.orderDetail = !1, e.subscribeThanks = !1, e.subscriptionerror = !1, e.errorallreadysubscribe = !1, e.oldreportFound = !1, e.reportName = "", e.reportpath = "", e.userWeight = "", e.report = {}, e.userDetail = {}, e.loaderVar1 = !1, e.customerDetails = {}, e.bookingEveryList = [{
        value: "01"
    }, {
        value: "02"
    }, {
        value: "03"
    }, {
        value: "04"
    }, {
        value: "05"
    }, {
        value: "06"
    }, {
        value: "07"
    }, {
        value: "08"
    }, {
        value: "09"
    }, {
        value: "10"
    }, {
        value: "11"
    }, {
        value: "12"
    }, {
        value: "13"
    }, {
        value: "14"
    }, {
        value: "15"
    }, {
        value: "16"
    }, {
        value: "17"
    }, {
        value: "18"
    }, {
        value: "19"
    }, {
        value: "20"
    }, {
        value: "21"
    }, {
        value: "22"
    }, {
        value: "23"
    }, {
        value: "24"
    }, {
        value: "25"
    }, {
        value: "26"
    }, {
        value: "27"
    }, {
        value: "28"
    }, {
        value: "29"
    }, {
        value: "30"
    }], e.repeatDate = "03", e.userBooking = {
        repeat: "month"
    }, e.bmr = e.bmi = e.profilecomplete = 0, $("#booking").addClass("selected");
    localStorage.getItem("token");
    e.heightList = [{
        id: "24",
        value: "2'0\""
    }, {
        id: "25",
        value: "2'1\""
    }, {
        id: "26",
        value: "2'2\""
    }, {
        id: "27",
        value: "2'3\""
    }, {
        id: "28",
        value: "2'4\""
    }, {
        id: "29",
        value: "2'5\""
    }, {
        id: "30",
        value: "2'6\""
    }, {
        id: "31",
        value: "2'7\""
    }, {
        id: "32",
        value: "2'8\""
    }, {
        id: "33",
        value: "2'9\""
    }, {
        id: "34",
        value: "2'10\""
    }, {
        id: "35",
        value: "2'11\""
    }, {
        id: "36",
        value: "3'0\""
    }, {
        id: "37",
        value: "3'1\""
    }, {
        id: "38",
        value: "3'2\""
    }, {
        id: "39",
        value: "3'3\""
    }, {
        id: "40",
        value: "3'4\""
    }, {
        id: "41",
        value: "3'5\""
    }, {
        id: "42",
        value: "3'6\""
    }, {
        id: "43",
        value: "3'7\""
    }, {
        id: "44",
        value: "3'8\""
    }, {
        id: "45",
        value: "3'9\""
    }, {
        id: "46",
        value: "3'10\""
    }, {
        id: "47",
        value: "3'11\""
    }, {
        id: "48",
        value: "4'0\""
    }, {
        id: "49",
        value: "4'1\""
    }, {
        id: "50",
        value: "4'2\""
    }, {
        id: "51",
        value: "4'3\""
    }, {
        id: "52",
        value: "4'4\""
    }, {
        id: "53",
        value: "4'5\""
    }, {
        id: "54",
        value: "4'6\""
    }, {
        id: "55",
        value: "4'7\""
    }, {
        id: "56",
        value: "4'8\""
    }, {
        id: "57",
        value: "4'9\""
    }, {
        id: "58",
        value: "4'10\""
    }, {
        id: "59",
        value: "4'11\""
    }, {
        id: "60",
        value: "5'0\""
    }, {
        id: "61",
        value: "5'1\""
    }, {
        id: "62",
        value: "5'2\""
    }, {
        id: "63",
        value: "5'3\""
    }, {
        id: "64",
        value: "5'4\""
    }, {
        id: "65",
        value: "5'5\""
    }, {
        id: "66",
        value: "5'6\""
    }, {
        id: "67",
        value: "5'7\""
    }, {
        id: "68",
        value: "5'8\""
    }, {
        id: "69",
        value: "5'9\""
    }, {
        id: "70",
        value: "5'10\""
    }, {
        id: "71",
        value: "5'11\""
    }, {
        id: "72",
        value: "6'0\""
    }, {
        id: "73",
        value: "6'1\""
    }, {
        id: "74",
        value: "6'2\""
    }, {
        id: "75",
        value: "6'3\""
    }, {
        id: "76",
        value: "6'4\""
    }, {
        id: "77",
        value: "6'5\""
    }, {
        id: "78",
        value: "6'6\""
    }, {
        id: "79",
        value: "6'7\""
    }, {
        id: "80",
        value: "6'8\""
    }, {
        id: "81",
        value: "6'9\""
    }, {
        id: "82",
        value: "6'10\""
    }, {
        id: "83",
        value: "6'11\""
    }, {
        id: "84",
        value: "7'0\""
    }, {
        id: "85",
        value: "7'1\""
    }, {
        id: "86",
        value: "7'2\""
    }, {
        id: "87",
        value: "7'3\""
    }, {
        id: "88",
        value: "7'4\""
    }, {
        id: "89",
        value: "7'5\""
    }, {
        id: "90",
        value: "7'6\""
    }, {
        id: "91",
        value: "7'7\""
    }, {
        id: "92",
        value: "7'8\""
    }, {
        id: "93",
        value: "7'9\""
    }, {
        id: "94",
        value: "7'10\""
    }, {
        id: "95",
        value: "7'11\""
    }], e.userHeightFeetList = [{
        value: "2"
    }, {
        value: "3"
    }, {
        value: "4"
    }, {
        value: "5"
    }, {
        value: "6"
    }, {
        value: "7"
    }, {
        value: "8"
    }], e.userHeightInchList = [{
        value: "0"
    }, {
        value: "1"
    }, {
        value: "2"
    }, {
        value: "3"
    }, {
        value: "4"
    }, {
        value: "5"
    }, {
        value: "6"
    }, {
        value: "7"
    }, {
        value: "8"
    }, {
        value: "9"
    }, {
        value: "10"
    }, {
        value: "11"
    }], e.getdashboardData = function() {
        if ("true" == localStorage.getItem("isLogin")) var a = {
            user_id: JSON.parse(localStorage.getItem("user")).user_id
        };
        else var a = {
            user_id: ""
        };
        o.getmyProfileData(a, function(a) {
            a.status === !0 ? (e.profileData = a.data, e.userBloodType = e.profileData.user_detail.blood_group, e.userWeight = e.profileData.user_detail.weight, e.userHeight = e.profileData.user_detail.height, e.heghtInInches = e.profileData.user_detail.height, e.userCompanyName = e.profileData.user_detail.company, e.userInsuranceCompany = e.profileData.user_detail.insurance_company, e.username = e.profileData.user_detail.name, e.userage = e.profileData.user_detail.age, e.usergender = e.profileData.user_detail.gender, e.city = e.profileData.user_detail.city, e.country = e.profileData.user_detail.country_name, e.familyList = e.profileData.family_member, e.stepsModel = e.profileData.user_detail.image, e.userEmail = e.profileData.user_detail.email_address, e.userContact = e.profileData.user_detail.contact_number, e.userWaist = e.profileData.user_detail.waist, e.loaderVar = !1, "" !== e.userContact ? e.userContactDisabled = !0 : e.userContactDisabled = !1) : "error" === a.status && ("TOKEN_EXPIRED" != a.code && "INVALID_TOKEN" != a.code && "AUTH_FAILED" != a.code || t.$broadcast("tokenExpired"))
        })
    }, e.getdashboardData(), e.profileEdit = function() {
        e.editProfile = !0;
        var t = parseInt(parseInt(e.userHeight) / 12),
            a = parseInt(e.userHeight) % 12;
        e.userHeightFeet = t.toString(), e.userHeightInch = a.toString()
    }, e.cancelEdit = function() {
        e.editProfile = !1, e.getdashboardData()
    }, e.getHeight = function() {
        e.heghtInInches = 12 * parseInt(e.userHeightFeet) + parseInt(e.userHeightInch)
    }, e.updateData = [], e.updateProfile = function(t) {
        if (t) {
            e.bmiCalculator(), e.bmrCalculator(), e.editProfile = !1;
            var a = {
                userId: JSON.parse(localStorage.getItem("user")).user_id,
                bloodtype: e.userBloodType,
                weight: e.userWeight ? e.userWeight : "",
                age: e.userage,
                gender: e.usergender,
                height: e.heghtInInches,
                waist: e.userWaist ? e.userWaist : "",
                companyname: e.userCompanyName ? e.userCompanyName : "",
                insurancecompany: e.userInsuranceCompany ? e.userInsuranceCompany : "",
                email: e.userEmail,
                mobile: e.userContact
            };
            o.updateProfile(a, function(t) {
                if (t.status === !0) {
                    e.updateData = t.data, e.userBloodType = e.updateData.blood_group, e.userWeight = e.updateData.weight, e.userHeight = e.updateData.height, e.heghtInInches = e.updateData.height, e.userCompanyName = e.updateData.company, e.usergender = e.updateData.gender, e.userage = e.updateData.age, e.userInsuranceCompany = e.updateData.insurance_company, e.userEmail = e.updateData.email_address, e.userContact = e.updateData.contact_number, e.userWaist = e.updateData.waist, e.bmiCalculator(), e.profileComplete(), e.profileData.user_detail.gender = e.updateData.gender, e.profileData.user_detail.age = e.updateData.age, "" !== e.userContact ? e.userContactDisabled = !0 : e.userContactDisabled = !1;
                    var a = JSON.parse(localStorage.getItem("user"));
                    a.relatives.forEach(function(t, a) {
                        t.name === e.username && (t.gender = e.usergender)
                    }), localStorage.setItem("user", JSON.stringify(a))
                }
            })
        }
    }, e.gotoMyBooking = function() {
        e.history = !1, r("mybooking"), $("#booking").addClass("selected"), $("#report").removeClass("selected")
    }, e.gotoReport = function() {
        e.history = !0, r("myreport"), $("#report").addClass("selected"), $("#booking").removeClass("selected")
    }, e.$on("my-booking", function(t, a) {
        e.history = !1, r("mybooking"), $("#booking").addClass("selected"), $("#report").removeClass("selected")
    }), e.stepsModel = "", e.imageUpload = function(t) {
        var a = new FileReader;
        a.onload = e.imageIsLoaded, a.readAsDataURL(t.files[0])
    }, e.imageIsLoaded = function(t) {
        e.$apply(function() {
            var a = document.getElementById("upload").value,
                r = {
                    name: a.split(/(\\|\/)/g).pop(),
                    image: t.target.result,
                    user_id: JSON.parse(localStorage.getItem("user")).user_id
                };
            o.uploadImage(r, function(t) {
                t.status === !0 && (e.stepsModel = t.data.image, e.profileComplete())
            })
        })
    }, e.coverImage = "", e.imageUploadcover = function(t) {
        var a = new FileReader;
        a.onload = e.imageIsLoadedcover, a.readAsDataURL(t.files[0])
    }, e.imageIsLoadedcover = function(t) {
        e.$apply(function() {
            var a = document.getElementById("uploadcover").value,
                r = {
                    name: a.split(/(\\|\/)/g).pop(),
                    image: t.target.result,
                    user_id: JSON.parse(localStorage.getItem("user")).user_id
                };
            o.uploadCoverImage(r, function(t) {
                t.status === !0 && (e.coverImage = t.data.image)
            })
        })
    }, e.myreport = function() {
        if ("true" == localStorage.getItem("isLogin")) var t = {
            user_id: JSON.parse(localStorage.getItem("user")).user_id,
            user_limit: e.myReportCountUser,
            member_limit: e.myReportCountMember
        };
        else var t = {
            user_id: ""
        };
        o.myReports(t, function(t) {
            t.status === !0 && (null !== t.data ? (e.loaderVar = !1, e.myReportData = t.data, e.nodata = !0) : (e.nodata = !1, e.loaderVar = !1))
        })
    }, e.myreport(), e.reportList = function(t) {
        "user" === t ? e.myReportCountUser += 5 : "member" === t && (e.myReportCountMember += 5), e.myreport()
    }, e.pdfReport = function() {}, e.docterComments = function() {
        e.docCommentCount += 2, e.docterCommentList()
    }, e.docterCommentList = function() {
        if ("true" == localStorage.getItem("isLogin")) var t = {
            user_id: JSON.parse(localStorage.getItem("user")).user_id,
            limit: e.docCommentCount
        };
        else var t = {
            user_id: ""
        };
        o.getDoctorConsultant(t, function(t) {
            t.status === !0 && null !== t.data && "" != t.data[0].doctor_comment ? e.docterCommentData = t.data : e.docterCommentData = 0
        })
    }, e.docterCommentList(), e.bmiCalculator = function() {
        if ("" !== e.userWeight && "" !== e.heghtInInches) {
            var t = .025 * e.heghtInInches * (.025 * e.heghtInInches),
                a = e.userWeight / t;
            e.bmi = Math.round(100 * a) / 100
        } else e.bmi = 0
    }, e.bmrCalculator = function() {
        var t;
        "" !== e.userWeight && "" !== e.heghtInInches ? (t = "F" == e.usergender ? 10 * e.userWeight + 6.25 * (2.54 * e.heghtInInches) - 5 * e.userage - 161 : 10 * e.userWeight + 6.25 * (2.54 * e.heghtInInches) - 5 * e.userage + 5, e.bmr = Math.round(100 * t) / 100) : e.bmr = 0
    }, s(function() {
        e.bmiCalculator(), e.nodata || (e.nodataReport = !0), e.bmrCalculator(), e.profileComplete()
    }, 3e3), e.profileComplete = function() {
        e.profilecomplete = 0, "" !== e.userBloodType && (e.profilecomplete += 10), "" !== e.userWeight && (e.profilecomplete += 10), "" !== e.userHeight && (e.profilecomplete += 10), "" !== e.userCompanyName && (e.profilecomplete += 10), "" !== e.userInsuranceCompany && (e.profilecomplete += 10), e.stepsModel && (e.profilecomplete += 10), "" !== e.userEmail && (e.profilecomplete += 5), "" !== e.userContact && (e.profilecomplete += 10), 0 !== e.bmi && (e.profilecomplete += 5), e.userWaist && (e.profilecomplete += 10), e.usergender && (e.profilecomplete += 5), "0" !== e.userage && (e.profilecomplete += 5)
    }, e.glucose = 50, e.upperLimitBP = 120, e.lowerLimitBP = 80, e.updateBloodGlucose = function() {
        ({
            date: "01/04/2016",
            time: "11111",
            upper: e.userGlucose
        });
        e.editGlucose = !1, e.glucose = e.userGlucose
    }, e.updateBloodPressure = function() {
        ({
            date: "01/04/2016",
            time: "11111",
            upper: e.userSystolic,
            lower: e.userDiastolic
        });
        e.editBP = !1, e.upperLimitBP = e.userSystolic, e.lowerLimitBP = e.userDiastolic
    }, e.preferdDays = [], e.$watchCollection("checkDay", function() {
        e.preferdDays = [], angular.forEach(e.checkDay, function(t, a) {
            t && e.preferdDays.push(t)
        })
    }), e.checkAllDays = function(t) {
        t ? (e.preferdDays = ["any"], e.dayFlag = !0) : (e.preferdDays = [], e.dayFlag = !1, e.checkDay.monday = e.checkDay.tuesday = e.checkDay.wednesday = e.checkDay.thursday = e.checkDay.friday = e.checkDay.saturday = e.checkDay.sunday = !1)
    }, e.selectionText = "", e.selectionSlots = [], e.selection = [], e.toggleSelection = function(t, a) {
        var r = e.selection.indexOf(t.slot_time);
        a ? e.selection.push(t.slot_time) : e.selection.splice(r, 1)
    }, e.checkAllSlot = function(t) {
        t ? (e.selection = ["any"], e.slotFlag = !0) : (e.selection = [], e.slotFlag = !1)
    }, $("#subscribestart").datepicker({
        startDate: "d"
    }), e.reportsubscribe = function(t) {
        e.subscribe = !0, e.repeatDate = "03", e.userBooking = {
            repeat: "month"
        }, e.checkDay = {
            monday: !1,
            tuesday: !1,
            wednesday: !1,
            thursday: !1,
            friday: !1,
            saturday: !1,
            sunday: !1
        }, e.selection = [], e.preferdDays = [], e.getsubscribeForm.name = t.name, e.getsubscribeForm.age = t.age, e.getsubscribeForm.gender = t.gender, e.getsubscribeForm.address = t.address, e.report = t, $(".time-list input[type=checkbox]").prop("checked", !1)
    }, e.closesubscription = function() {
        e.subscribe = !1, e.subscribeThanks = !1, e.preferdDays = [], e.selection = [], e.userStartDate = "", e.repeatDate = "03", e.userBooking.repeat = "month"
    }, e.subscribeReport = function() {
        e.selectionSlots = [], e.selectionText = e.selection[0], e.selection.forEach(function(t, a) {
            e.preferslots.forEach(function(a, r) {
                t === a.slot_time && e.selectionSlots.push(a)
            })
        });
        var t = {
            week_days: e.preferdDays,
            frequency: e.repeatDate,
            frequency_type: e.userBooking.repeat,
            booking_id: e.report.booking_id,
            order_id: e.report.order_id,
            user_id: JSON.parse(localStorage.getItem("user")).user_id,
            prefered_time: e.selection,
            start_date: e.userStartDate
        };
        o.subscribe_order(t, function(t) {
            t.status === !0 ? "Successfully subscribed." === t.message && (e.subscribe = !1, e.subscribeThanks = !0) : t.status === !1 ? "Item already subscribed." === t.message && (e.errorallreadysubscribe = !0) : e.subscriptionerror = !0, s(function() {
                e.subscriptionerror = !1, e.errorallreadysubscribe = !1
            }, 5e3)
        })
    }, e.reportPdf = function(e) {
        n.open(e, "_blank")
    }, e.reportShare = function(t) {
        e.shareReport = !0, e.reportpath = t.share_path, e.reportName = t.report_name
    }, e.closereportShare = function() {
        e.shareReport = !1
    }, e.userReportShare = function(t) {
        var a = {
            email: t,
            report: e.reportpath,
            report_name: e.reportName
        };
        o.shareCustReport(a, function(t) {
            e.reportSharemsg = t.message, e.reportSharemsgflag = !0, s(function() {
                e.reportSharemsg = "", e.shareReport = !1, e.reportSharemsgflag = !1
            }, 5e3)
        })
    }, e.reportReorder = function(t) {
        e.report = {}, e.reorderReport = !0, e.customerDetails.name = t.name, e.customerDetails.age = t.age, e.customerDetails.gender = t.gender, e.customerDetails.pkg = {}, e.customerDetails.pkg.fasting = "0", e.customerDetails.pkg.fasting_time = "5", e.customerDetails.newpkg = {}, e.customerDetails.newpkg.display_name = t.package_name, e.customerDetails.newpkg.healthian_price = t.price, localStorage.setItem("customerDetails", JSON.stringify(e.customerDetails)), localStorage.setItem("total_amount", t.price), e.userDetail.name = t.name, e.userDetail.age = t.age, e.userDetail.subTotal = t.price, e.userDetail.address = {}, e.userDetail.address.address = t.address, e.userDetail.email = JSON.parse(localStorage.getItem("user")).email, e.userDetail.mobile = JSON.parse(localStorage.getItem("user")).mobile, e.userDetail.user_id = JSON.parse(localStorage.getItem("user")).user_id, localStorage.setItem("userDetail", JSON.stringify(e.userDetail)), e.report = t, e.reorderCity = t.city_name, e.reorderLocality = t.locality
    }, $("#reorderdate").datepicker({
        startDate: "+1d",
        endDate: "+3d"
    }), e.getSlots = function(t) {
        e.dateError = !1, e.slotError = !1, i.getTimeSlots(e.report.locality_id, t, e.report.price, function(t) {
            "success" == t.status && (null === t.data ? e.noTimeSlot = !0 : (e.noTimeSlot = !1, e.slots = t.data))
        })
    }, e.closereportReorder = function() {
        e.reorderReport = !1
    }, e.reorderBooking = function() {
        if ("" == e.userReorderDate || void 0 == e.userReorderDate) e.dateError = !0;
        else if ("" == e.userReorderTime || void 0 == e.userReorderTime) e.slotError = !0;
        else {
            var t = {
                order_id: e.report.order_id,
                time_slot_id: e.userReorderTime.slot_id
            };
            localStorage.setItem("time_slot", JSON.stringify(e.userReorderTime)), localStorage.setItem("sample_date", e.userReorderTime), o.reorder_by_id(t, function(t) {
                t.status === !0 && (localStorage.setItem("booking_id", t.data.booking_id), e.reportReordermsg = t.message, a.path("/make-payment"))
            })
        }
    }, e.order = {}, e.hardcopy = !1, e.getBookingOrderDetail = function(t) {
        e.orderDetail = !0, e.hardcopy = !1, e.mybookingList.forEach(function(a, r) {
            t === a.booking_id && (e.order = a, "yes" == a.hard_copy && (e.hardcopy = !0))
        })
    }, e.closeBookingOrderDetail = function() {
        e.orderDetail = !1
    }, e.myBooking = function() {
        if ("true" == localStorage.getItem("isLogin")) var t = {
            user_id: JSON.parse(localStorage.getItem("user")).user_id
        };
        else var t = {
            user_id: ""
        };
        o.myBookings(t, function(t) {
            0 == e.loaderVar && (e.loaderVar1 = !0), 1 == t.status ? (e.loaderVar1 = !1, e.mybookingList = t.data, 0 == e.mybookingList.length && (e.loaderVar1 = !1, e.nodataBooking = !0)) : (e.loaderVar1 = !1, e.nodataBooking = !0)
        })
    }, e.myBooking(), e.slots = function() {
        o.prefer_slots(function(t) {
            e.preferslots = t.data
        })
    }, e.slots(), e.oldReport = function() {
        if ("true" == localStorage.getItem("isLogin")) {
            var t = {
                user_id: JSON.parse(localStorage.getItem("user")).user_id
            };
            o.previousReport(t, function(t) {
                1 == t.status ? (e.oldreportList = t.data.user_report, e.oldreportFound = !0) : e.oldreportFound = !1
            })
        }
    }, e.oldReport(), e.getoldReport = function(e) {
        n.open(e.path, "_blank")
    };
    var l = window.location.href.toString().split("#")[1];
    "mybooking" == l && s(function() {
        r("myreport")
    }, 1e3), t.$on("update_mobile", function() {
        e.userContact = JSON.parse(localStorage.getItem("user")).mobile, "" !== e.userContact ? e.userContactDisabled = !0 : e.userContactDisabled = !1, console.log("mobile update", e.userContact)
    })
}

function downloadFileController(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    e.sendOtp = !0, e.sendDetail = !1, e.displayDetail = !1, e.errorMsgFlag = !1, e.noreport = !1, e.sendOtpNo = "", e.sendOtpFunction = function() {
        return void 0 == e.sendOtpNo || "" == e.sendOtpNo ? (e.sendOtpError = !0, !1) : (e.sendOtpError = !1, doPost(l, g.serverUrl + "commonservice/send_mobile_otp", {
            mobile_number: e.sendOtpNo
        }, "", function(t) {
            t.status === !1 ? (e.errorMsgFlag = !0, e.errorMsg = t.message) : (e.sendOtp = !1, e.sendDetail = !0)
        }), "" !== e.sendOtpNo && (e.sendDetailNo = e.sendOtpNo), void i(function() {
            e.errorMsgFlag = !1
        }, 4e3))
    }, e.sendDetailFunction = function() {
        return void 0 == e.sendDetailNo || "" == e.sendDetailNo ? (e.sendDetailError = !0, !1) : void doPost(l, g.serverUrl + "commonservice/generate_report_from_mobile", {
            mobile_number: e.sendDetailNo,
            otp: e.sendDetailOtp
        }, "", function(t) {
            t.status === !0 ? (e.reportData = t.data, e.displayDetail = !0, e.sendDetail = !1) : "Invalid OTP" == t.message ? e.sendDetailError = !0 : "Report not found" == t.message && (e.sendDetail = !1, e.displayDetail = !0, e.noreport = !0)
        })
    }
}

function finalCheckoutController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    function f(e, t) {
        var a, r, o = e;
        void 0 != s.counterVal && clearInterval(s.counterVal), s.counterVal = setInterval(function() {
            a = parseInt(o / 60, 10), r = parseInt(o % 60, 10), 0 === a && 0 === r ? (clearInterval(s.counterVal), localStorage.setItem("time_slot", ""), t.hide(), window.location.href = "/pick-time") : (a = a < 10 ? "0" + a : a, r = r < 10 ? "0" + r : r, t.text(a + ":" + r)), --o < 0 && (o = e)
        }, 1e3)
    }
    e.pickTabActive = !0, e.paymentTabActive = !1, e.sublocalityDropDownSelected = !1, e.collectiontimeflag = !1, e.chosenPlace = "", e.locality_id = "", e.hardcopyPrice = 0, e.hardCopy = !1, s.hard_copyFlag = !1, e.customerDetails = [], e.customerDetails = JSON.parse(localStorage.getItem("customerDetails")), e.invalidCoupon = !1, e.coupondata = {}, e.coupondata.applied = !1, e.coupondata.hard_copy = !1, e.couponShow = !1, e.couponApplied = !1, s.couponCode = "", s.couponAmount = "", e.discountamount = JSON.parse(localStorage.getItem("total_amount")), e.onlineDiscount = 0, e.payradio = "paytm";
    var _ = c.paymentUrl;
    e.payuAction = g.trustAsResourceUrl(_ + "payupayment"), e.mobikwikAction = g.trustAsResourceUrl(_ + "mobikwikpayment"), e.payzappAction = g.trustAsResourceUrl(_ + "payzapppayment"), e.paytmAction = g.trustAsResourceUrl(_ + "paytmpayment"), e.useAddressPresent = !1, e.existingaddress = "", e.modifyAddressFlag = {}, e.defaultExistingAddressObject = {};
    var y = localStorage.getItem("token");
    if (e.showBookingLoader = !1, e.popularPackageList = !1, e.firstPageList = [], e.orderList = !1, e.userId = null, e.selection = [], e.addToCartModal = !1, e.btnshow = !1, e.rel = !0, e.addNewAddress = !1, e.newlocation = !1, e.hideSuggestedLocation = !1, e.relative = !1, e.guestUser = !1, e.alertDiv = !1, e.samepkg = !1, e.loggedin = !1, e.addfield = !0, e.loc_id = "", e.customSearchVal = "", e.suggestPackageList = [], e.localityList = [], e.filters = {}, e.filters.suggested_test = [], e.searchValue = [], s.selectData = [], e.cityList = [], e.temp = [], e.member = [], e.noTimeSlot = !1, e.subtotal = 0, e.displayData = {}, e.habitListCheckbox = {}, e.displayList = !1, s.count = 0, e.customerIndex = void 0, e.loading = !0, e.arrayList = [], e.accordionList = [], e.userDetail = {}, e.booking_id = "", e.userDetail.address = {}, e.tempUser = [], e.addNewPatient = !1, e.hideContinue = !0, e.postal_code = "", e.detailCustomer = !0, e.ignoreGeoCodeLocality = !1, e.distanceError = !1, e.tempsublocality = "", e.$on("data_shared1", function() {
            e.detailCustomer = !1;
            var t = [];
            if (a.getData().forEach(function(e, a) {
                    var r = e;
                    e.newpkg.forEach(function(e, t) {
                        r.newpkg[t].all_package_detail = [], r.newpkg[t].all_package_name = [], r.newpkg[t].all_package_StringName = {};
                        var a = e.include_tests.concat(e.also_include_tests);
                        r.newpkg[t].all_package_detail = a, a.forEach(function(e, a) {
                            r.newpkg[t].all_package_name.push(e.tcategory_name)
                        }), r.newpkg[t].all_package_StringName = r.newpkg[t].all_package_name.toString()
                    }), t.push(r)
                }), e.customerDetails = t, localStorage.setItem("customerDetails", JSON.stringify(e.customerDetails)), localStorage.setItem("total_amount", s.total), e.discountamount = s.total, "true" == localStorage.getItem("isLogin")) {
                var r = JSON.parse(localStorage.getItem("user"));
                e.userDetail.user_id = r.user_id, e.userDetail.name = r.name, e.userDetail.email = r.email, e.userDetail.mobile = r.mobile, e.userDetail.age = e.customerDetails[0].age, e.discountamount = JSON.parse(localStorage.getItem("total_amount"))
            } else e.userDetail.name = e.customerDetails[0].name, e.userDetail.mobile = e.customerDetails[0].phone, e.userDetail.user_id = e.customerDetails[0].user_id, e.userDetail.age = e.customerDetails[0].age
        }), "true" == localStorage.getItem("isLogin")) {
        var h = JSON.parse(localStorage.getItem("user"));
        if (e.userDetail.user_id = h.user_id, e.userDetail.name = h.name, e.userDetail.email = h.email, e.userDetail.mobile = h.mobile, e.loggedin = !0, null !== localStorage.getItem("coupondata")) {
            var v = JSON.parse(localStorage.getItem("coupondata")).hard_copy;
            v && (e.hardCopy = v)
        }
        var k = c.serverUrl + "commonservice/getAddressesByUserId",
            S = {
                user_id: e.userDetail.user_id
            };
        doPost(l, k, S, y, function(t) {
            t.data ? (e.noOfAdd = t.data.length, e.noOfAdd > 0 ? (e.useAddressPresent = !0, e.addressList = t.data, e.addressList.forEach(function(t, a) {
                1 == t.default_status && (e.existingaddress = parseInt(t.address_id), e.defaultExistingAddressObject = t, e.selectListedAdd(t))
            })) : e.addressList = []) : "error" === t.status && ("TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired"))
        })
    }
    e.frontPageSearchInt = function() {
        e.tags = searchDetail.getSearchPackages(), e.tags.forEach(function(t, a) {
            e.searchValue.push({
                text: t.text,
                id: t.id
            })
        }), e.createSearchRequest()
    }, e.addNewLocation = function(t) {
        var a = {
            locality_name: t,
            city_id: JSON.parse(localStorage.getItem("cityID"))[0].city_id
        };
        m.addNewLocality(a, function(t) {
            "SUGGESTED_LOCALITY_ADDED" == t.message && (e.newlocation = !0)
        })
    }, e.gettimer = function(e) {
        var t, a = d.defer();
        return m.getFreezDateBySlotId(e, function(e) {
            t = e.data[0], a.resolve(t)
        }), a.promise
    }, e.counter = function(t) {
        e.gettimer(t), e.gettimer(t).then(function(e) {
            var t = moment(e.expiryDate, "YYYY-MM-DD HH:mm:ss").diff(moment(e.nowDate, "YYYY-MM-DD HH:mm:ss"));
            if (t > 0) {
                var a = moment.utc(t),
                    r = a.format("mm"),
                    o = a.format("ss"),
                    i = 60 * r + parseInt(o);
                display = $("#counter"), f(i, display)
            }
        })
    }, e.freezeSlot = function(t) {
        var a = d.defer(),
            r = e.generateUserId(t);
        return a.resolve(r), a.promise
    };
    var b = new Date,
        D = b.getHours();
    b.getMinutes();
    if (D >= 8 && D <= 11) $("#collectiondate").datepicker({
        startDate: "+d",
        endDate: "+3d"
    });
    else if (D >= 20 || D <= 7) {
        moment().add(3, "days").format("DD-MM-YYYY");
        $("#collectiondate").datepicker({
            startDate: "+2d",
            endDate: "+4d"
        })
    } else $("#collectiondate").datepicker({
        startDate: "+1d",
        endDate: "+3d",
        disabledDates: ["2016-04-18"]
    });
    if (e.getTimeSlots = function(t) {
            e.showLoader = !0;
            var a = d.defer();
            return m.getTimeSlots(e.locality_id, t, JSON.parse(localStorage.getItem("amountfinal")), function(t) {
                "success" == t.status ? (null == t.data ? (u.eventTrack('Got "No Time Slot Avaliable" message', {
                    category: "Timeslot Selection"
                }), e.noTimeSlot = !0) : (e.noTimeSlot = !1, e.slots = t.data), e.showLoader = !1, a.resolve(e.slots)) : ("error" === t.status && ("TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired")), e.showLoader = !1)
            }), a.promise
        }, e.selectListedAdd = function(t) {
            e.slots = [], e.locality_id = "", e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0), e.existingaddress = parseInt(t.address_id);
            var a = t.address.split(",");
            e.userDetail.address.address_id = t.address_id, e.userDetail.address.address = t.address, e.userDetail.address.lat = t.lat, e.userDetail.address.long = t.long, e.userDetail.address.state_id = t.state_id, e.userDetail.address.state_name = t.state_name, e.userDetail.address.city = t.city, e.userDetail.address.locality_id = t.locality_id, e.userDetail.address.pincode = t.pincode, e.locality_id = t.locality_id, localStorage.setItem("userDetail", JSON.stringify(e.userDetail)), localStorage.setItem("houseno", a[0]), localStorage.setItem("landmark", a[1]), localStorage.setItem("postal_code", t.pincode), localStorage.setItem("address", t.address)
        }, e.modifyExistingAddress = function(t) {
            e.modifyAddressFlag[t] = !e.modifyAddressFlag[t]
        }, e.addNewAddress = function() {
            e.userDetail.address = {}, e.useAddressPresent = !e.useAddressPresent, e.slots = [], e.locality_id = "", e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0), e.resetSubLocality()
        }, e.viewExistingAddress = function() {
            e.selectListedAdd(e.defaultExistingAddressObject), e.useAddressPresent = !e.useAddressPresent, e.slots = [], e.locality_id = "", e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0), e.addressList.forEach(function(t, a) {
                1 == t.default_status && (e.existingaddress = parseInt(t.address_id), e.defaultExistingAddressObject = t, e.selectListedAdd(t))
            })
        }, e.bookSlot = function() {
            if (e.addAddressFormSubmitted = !1, e.loaderVar = !0, e.distanceError = !1, e.useAddressPresent) {
                if (void 0 === e.existingaddress) return e.addAddressForm.useraddress.$dirty = !0, e.addAddressForm.useraddress.$invalid = !0, e.addAddressForm.useraddress.$error.required = !0, e.loaderVar = !1, !1
            } else {
                if (void 0 === e.chosenPlace || "" === e.chosenPlace) return e.addAddressForm.pacinput.$dirty = !0, e.addAddressForm.pacinput.$invalid = !0, e.addAddressForm.pacinput.$error.required = !0, e.loaderVar = !1, focus("pacinput"), !1;
                if (void 0 === e.houseno || "" === e.houseno) return e.addAddressForm.houseno.$dirty = !0, e.addAddressForm.houseno.$invalid = !0, e.addAddressForm.houseno.$error.required = !0, e.loaderVar = !1, u.eventTrack("Validation Faliure on Address Form Submit", {
                    category: "Confirm Address",
                    label: "Customer House No."
                }), focus("houseno"), !1;
                if (void 0 === e.landmark || "" === e.landmark) return e.addAddressForm.landmark.$dirty = !0, e.addAddressForm.landmark.$invalid = !0, e.addAddressForm.landmark.$error.required = !0, e.loaderVar = !1, u.eventTrack("Validation Faliure on Address Form Submit", {
                    category: "Confirm Address",
                    label: "Customer Landmark"
                }), focus("landmark"), !1;
                if (!(void 0 !== e.postal_code && "" !== e.postal_code || void 0 !== e.postal_code_new && "" !== e.postal_code_new)) return e.addAddressForm.postal_code.$dirty = !0, e.addAddressForm.postal_code.$invalid = !0, e.addAddressForm.postal_code.$error.required = !0, e.loaderVar = !1, u.eventTrack("Validation Faliure on Address Form Submit", {
                    category: "Confirm Address",
                    label: "Customer Pincode"
                }), focus("pincode"), !1
            }
            if (void 0 === e.sampledate || "" === e.sampledate) return e.addAddressForm.collectiondate.$dirty = !0, e.addAddressForm.collectiondate.$invalid = !0, e.addAddressForm.collectiondate.$error.required = !0, e.loaderVar = !1, u.eventTrack("Validation Faliure on Address Form Submit", {
                category: "Confirm Address",
                label: "Sample Collection Date"
            }), focus("sampledate"), !1;
            if (void 0 === e.sampletime || "" === e.sampletime) return e.addAddressForm.collectiontime.$dirty = !0, e.addAddressForm.collectiontime.$invalid = !0, e.addAddressForm.collectiontime.$error.required = !0, e.loaderVar = !1, u.eventTrack("Validation Faliure on Address Form Submit", {
                category: "Confirm Address",
                label: "Sample Collection Time"
            }), focus("sampletime"), !1;
            if (!e.useAddressPresent) {
                e.userDetail.address.lat = e.sub_lat, e.userDetail.address.long = e.sub_long, void 0 === e.postal_code || "" === e.postal_code ? void 0 === e.postal_code_new && "" === e.postal_code_new || (e.userDetail.address.pincode = e.postal_code_new, localStorage.setItem("postal_code", e.postal_code_new)) : (e.userDetail.address.pincode = e.postal_code, localStorage.setItem("postal_code", e.postal_code)), void 0 !== e.defaultaddress && (e.userDetail.address.defaultaddress = e.defaultaddress), 0 == e.noOfAdd && (e.userDetail.address.defaultaddress = !0), e.userDetail.address.houseno = e.houseno, e.userDetail.address.landmark = e.landmark, e.userDetail.address.locality_id = e.locality_id, e.city = JSON.parse(localStorage.getItem("cityID"))[0];
                var t = c.serverUrl + "commonservice/getStateByCityId";
                doPost(l, t, {
                    city_id: e.city.city_id
                }, y, function(t) {
                    e.userDetail.address.state_id = t.data[0].state_id, e.userDetail.address.state_name = t.data[0].state_name, e.userDetail.address.country_id = t.data[0].country_id, e.userDetail.address.country_name = t.data[0].country_name, e.userDetail.address.city = e.city.city_name, e.userDetail.address.address_id = -1, localStorage.setItem("userDetail", JSON.stringify(e.userDetail))
                }), localStorage.setItem("houseno", e.houseno), localStorage.setItem("landmark", e.landmark), localStorage.setItem("address", e.chosenPlace)
            }
            e.hideContinue = !1;
            var a = c.serverUrl + "commonservice/freezeSlotBySlotId";
            doPost(l, a, {
                slot_id: e.sampletime.slot_id
            }, y, function(t) {
                1 == t.status ? (localStorage.setItem("time_slot", JSON.stringify(e.sampletime)), e.time_slot = JSON.parse(localStorage.getItem("time_slot")), localStorage.setItem("sample_date", e.sampledate)) : "error" === t.status && ("TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired")), e.loaderVar = !1, e.pickTabActive = !1, e.paymentTabActive = !0
            })
        }, e.resetSubLocality = function() {
            e.sublocalityDropDownSelected = !1, e.chosenPlace = "", e.locality_id = "", e.slots = [], e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0), focus("pacinput")
        }, e.clearSubLocality = function() {
            e.chosenPlace = "", angular.element("#pacinput").val(""), e.slots = [], e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0), e.addAddressForm.pacinput.$dirty = !1
        }, e.editPickTab = function() {
            e.pickTabActive = !e.pickTabActive, e.paymentTabActive = !1
        }, e.getHardcopyPrice = function() {
            m.getHardcopyPrice(function(t) {
                1 == t.status && (e.hardcopyPrice = t.data.price)
            })
        }, e.getHardcopyPrice(), e.hardCopyFunc = function(t) {
            e.coupondata.hard_copy = e.hardCopy, 1 == e.hardCopy ? (u.eventTrack("Checked Hard Copy", {
                category: "Order Summary"
            }), s.hard_copyFlag = !0, e.discountamount = e.discountamount + parseInt(e.hardcopyPrice), localStorage.setItem("total_amount", e.discountamount)) : (s.hard_copyFlag = !1, e.discountamount = e.discountamount - parseInt(e.hardcopyPrice), localStorage.setItem("total_amount", e.discountamount)), localStorage.setItem("coupondata", JSON.stringify(e.coupondata))
        }, e.verifyCoupon = function(t) {
            if (e.invalidCoupon = !1, e.isDisabled = !0, void 0 !== t) {
                var a = c.serverUrl + "commonservice/get_coupon_discount",
                    r = {
                        coupon: t,
                        amount: 1 == e.hardCopy ? e.discountamount - e.hardcopyPrice : e.discountamount
                    };
                doPost(l, a, r, y, function(a) {
                    void 0 !== t && a.status ? (s.couponCode = t, s.couponAmount = a.data.discount, e.invalidCoupon = !1, e.onConfirm = !0, e.couponAmount = a.data.discount, e.coupondata.percentage = e.couponAmount / e.discountamount * 100, e.coupondata.coupon = t, e.coupondata.discount = a.data.discount, e.coupondata.applied = !0, e.discountamount = e.discountamount - a.data.discount, localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), u.eventTrack("Successfully Applied Coupon", {
                        category: "Make Payment",
                        label: t
                    })) : "error" === a.status ? "TOKEN_EXPIRED" != a.code && "INVALID_TOKEN" != a.code && "AUTH_FAILED" != a.code || s.$broadcast("tokenExpired") : (e.coupondata.applied = !1, e.invalidCoupon = !0, e.couponErrorMsg = a.message, e.coupon = "", e.isDisabled = !1, u.eventTrack("Failed to Apply Coupon ", {
                        category: "Make Payment",
                        label: t
                    }))
                })
            } else e.invalidCoupon = !0, e.isDisabled = !1, e.couponErrorMsg = "Please enter coupon"
        }, e.removeCoupon = function() {
            e.discountamount = e.discountamount + parseInt(e.coupondata.discount), e.coupondata = {}, e.coupondata.applied = !1, e.coupondata.hard_copy = e.hardCopy, e.couponShow = !1, e.couponApplied = !1, e.onConfirm = !1, s.couponCode = "", s.couponAmount = "", e.coupon = "", e.isDisabled = !1, localStorage.setItem("coupondata", JSON.stringify(e.coupondata))
        }, e.makePayment = function(t) {
            if (e.showBookingLoader = !0, localStorage.setItem("type_of_payment", "cash" == e.payradio ? "Cash on delivery" : "Online"), u.eventTrack("Order Booked Successfully", {
                    category: "Make Payment",
                    label: "cash" == e.payradio ? "Cash on delivery" : "Online"
                }), e.loaderVar = !0, "cash" == e.payradio) {
                var a = c.serverUrl + "commonservice/update_payment_type",
                    r = {
                        booking_id: e.booking_id,
                        payment_type: "cash" == e.payradio ? "Cash on delivery" : "Online",
                        term_condition: !0,
                        user_id: e.userDetail.user_id
                    };
                doPost(l, a, r, "", function(t) {
                    e.loaderVar = !1, t.status && p.go("payment-summary", {
                        action: "Get",
                        booking_id: e.booking_id,
                        mobile: e.userDetail.mobile,
                        user_id: e.userDetail.user_id
                    })
                })
            } else if ("payu" == e.payradio) {
                localStorage.setItem("makepayment_to_summary", "true");
                var o = $("#payuForm");
                o.find("[name=booking_id]").val(e.booking_id), o.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), o.find("[name=custName]").val(e.userDetail.name), o.find("[name=custMobile]").val(e.userDetail.mobile), o.find("[name=custEmail]").val(e.userDetail.email), o.find("[name=stm_id]").val(e.time_slot.slot_id), o.submit()
            } else if ("paytm" == e.payradio) {
                localStorage.setItem("makepayment_to_summary", "true");
                var o = $("#paytmForm");
                o.find("[name=booking_id]").val(e.booking_id), o.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), o.find("[name=custName]").val(e.userDetail.name), o.find("[name=custMobile]").val(e.userDetail.mobile), o.find("[name=custEmail]").val(e.userDetail.email), o.find("[name=user_id]").val(e.userDetail.user_id), o.find("[name=stm_id]").val(e.time_slot.slot_id), o.submit()
            } else if ("mobikwik" == e.payradio) {
                localStorage.setItem("makepayment_to_summary", "true");
                var o = $("#mobikwikForm");
                o.find("[name=booking_id]").val(e.booking_id), o.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), o.find("[name=custName]").val(e.userDetail.name), o.find("[name=custMobile]").val(e.userDetail.mobile), o.find("[name=custEmail]").val(e.userDetail.email), o.find("[name=stm_id]").val(e.time_slot.slot_id), o.submit()
            } else if ("payzapp" == e.payradio) {
                localStorage.setItem("makepayment_to_summary", "true");
                var o = $("#payzappForm");
                o.find("[name=booking_id]").val(e.booking_id), o.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), o.find("[name=custName]").val(e.userDetail.name), o.find("[name=custMobile]").val(e.userDetail.mobile), o.find("[name=custEmail]").val(e.userDetail.email), o.find("[name=stm_id]").val(e.time_slot.slot_id), o.submit()
            }
            e.hideContinue = !1
        }, e.createOrderId = function() {
            e.showBookingLoader = !0;
            var t = e.userDetail.user_id,
                a = [];
            if (!e.useAddressPresent) {
                var r = e.houseno + "," + e.landmark + "," + localStorage.getItem("address");
                e.userDetail.address.address = r, localStorage.setItem("userDetail", JSON.stringify(e.userDetail))
            }
            if (e.customerDetails.forEach(function(e, r) {
                    0 === r && (t = e.user_id, timeSlot = e.time_slot);
                    var o = {};
                    o.user_id = e.user_id, o.location_id = e.location_id, o.package = [], e.newpkg.forEach(function(e, t) {
                        o.package.push({
                            tcategory_id: e.testId,
                            healthians_price: e.healthian_price,
                            actaul_price: e.actual_price,
                            costId: e.costId
                        })
                    }), a.push(o)
                }), 1 == s.hard_copyFlag) var o = "yes";
            else var o = "no";
            "true" == localStorage.getItem("isLogin") && (t = JSON.parse(localStorage.getItem("user")).user_id);
            var i = c.serverUrl + "commonservice/bookOrder",
                n = {
                    billing_user_id: t,
                    hard_copy: o,
                    address: e.userDetail.address,
                    deal_price: e.discountamount,
                    order_detail: a,
                    time_slot: e.sampletime,
                    coupon: s.couponCode,
                    discount: s.couponAmount,
                    email: e.userDetail.email
                };
            localStorage.setItem("total_amount", e.discountamount), doPost(l, i, n, y, function(t) {
                1 == t.status ? (e.booking_id = t.data.booking_id, localStorage.setItem("booking_id", t.data.booking_id), e.makePayment()) : ("error" === t.status ? "TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired") : alert(t.message), e.showBookingLoader = !1)
            })
        }, e.getLocalityUsingLatLong = function() {
            e.sampledate = void 0, e.sampletime = void 0, void 0 !== e.addAddressForm.collectiondate && (e.addAddressForm.collectiondate.$dirty = !1, e.addAddressForm.collectiondate = void 0), void 0 !== e.addAddressForm.collectiontime && (e.addAddressForm.collectiontime.$dirty = !1, e.addAddressForm.collectiontime = void 0);
            var t = c.serverUrl + "commonservice/getnearestlocality",
                a = {
                    lat: e.sub_lat,
                    long: e.sub_long
                };
            doPost(l, t, a, y, function(t) {
                1 == t.status ? e.locality_id = t.data.locality_id : "error" === t.status ? "TOKEN_EXPIRED" != t.code && "INVALID_TOKEN" != t.code && "AUTH_FAILED" != t.code || s.$broadcast("tokenExpired") : (e.distanceError = !0, e.sublocalityDropDownSelected = !1, e.distanceErrorMsg = t.message, e.chosenPlace = "", e.addAddressForm.pacinput.$dirty = !1, e.locality_id = "")
            })
        }, e.editbooking = function() {
            t.sendData(e.customerDetails)
        }, e.myFunction = function(t) {
            document.getElementById("pacinput").value = t, document.getElementById("pacinput").focus(), e.chosenPlace = t
        }, e.breakpoints = [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }], e.totalAmount = function() {
            e.customerDetails = JSON.parse(localStorage.getItem("Detailscustomer")), e.amount = 0, e.customerDetails && e.customerDetails.forEach(function(t, a) {
                t.newpkg.forEach(function(t, a) {
                    e.amount += parseInt(t.healthian_price)
                })
            }), e.discountamount = e.amount
        }, null === e.discountamount && e.totalAmount(), null === e.customerDetails) p.go("home");
    else {
        var F = localStorage.getItem("booking_id");
        if (null !== F && "true" == localStorage.getItem("isLogin")) {
            var h = JSON.parse(localStorage.getItem("user"));
            p.go("makepayment", {
                action: "Get",
                booking_id: F,
                mobile: h.mobile
            })
        }
    }
}

function footerController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    e.subscriber = function() {
        var t;
        return void 0 === e.addAddressForm.customerEmail || "" === e.addAddressForm.customerEmail ? (e.addAddressForm.customeremail.$dirty = !0, e.addAddressForm.customeremail.$invalid = !0, e.addAddressForm.customeremail.$error.required = !0, p.eventTrack("Failed Email Validation in Subscription Form", {
            category: "Footer"
        }), !1) : (t = e.addAddressForm.customerEmail, e.addAddressForm.customerEmail = "", e.addAddressForm.customeremail.$dirty = !1, void doPost(l, g.serverUrl + "commonservice/subscribeNewsLetter/", {
            email: t
        }, "", function(e) {
            1 == e.status ? (p.eventTrack("Subscribed Sucessfully", {
                category: "Footer"
            }), alert(e.message)) : alert(e.data.email)
        }))
    }
}

function headerController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    a.forgotPwdModal = !1, a.changePwdModal = !1, a.mobileModal = !1, d.loggedin = !1, d.user = "", a.signupmsg = !1, a.time_slot = localStorage.getItem("time_slot"), a.tempUser = JSON.parse(localStorage.getItem("tempUser"));
    var f = JSON.parse(localStorage.getItem("cityID"));
    if (null === f && localStorage.setItem("cityID", JSON.stringify([{
            city_id: "23",
            city_name: "Gurgaon"
        }])), a.loginModal = !1, a.loginTab = !0, a.signupText = "Sign Up", a.showLoginForm = function() {
            a.loginTab = !0, a.loginModal = !0
        }, a.hideLoginForm = function() {
            a.loginTab = !0, a.loginModal = !1
        }, a.showSignupForm = function() {
            a.loginTab = !1, a.loginModal = !0, "Continue to Cart" !== a.signupText ? a.signupText = "Sign Up" : a.signupText = "Continue to Cart"
        }, a.showSignUpSuccess = function() {
            a.signupmsg = !0
        }, "pick-time" == l.current.name || "payment-summary" == l.current.name || "confirm-address" == l.current.name || "make-payment" == l.current.name || "order-summary" == l.current.name || "payment-fail" == l.current.name, "pick-time" != l.current.name && "payment-summary" != l.current.name && "orderbook" != l.current.name && "confirm-address" != l.current.name && "make-payment" != l.current.name && "order-summary" != l.current.name && "payment-fail" != l.current.name || ((null == a.time_slot || "" == a.time_slot || void 0 == a.time_slot) && "pick-time" != l.current.name, void 0 != a.tempUser && null != a.tempUser || "pick-time" != l.current.name || (window.location.href = "/orderbook")), "about-us" != l.current.name && "healthians-media" != l.current.name && "career" != l.current.name && "contact-us" != l.current.name && "healthians-investors" != l.current.name && "orderbook" != l.current.name && "pick-time" != l.current.name && "make-payment" != l.current.name && "confirm-address" != l.current.name && "Support-Help" != l.current.name || t.scrollTo(0, angular.element(document.getElementById("topdiv")).offsetTop), "dashboard" == l.current.name && "true" !== localStorage.getItem("isLogin") && (window.location.href = "/home"), "download-file" == l.current.name && "true" == localStorage.getItem("isLogin") && (window.location.href = "/home"), a.getAddress = function() {
            var t = c.defer();
            return navigator.geolocation.getCurrentPosition(function(r) {
                var o = {
                        lat: r.coords.latitude,
                        lng: r.coords.longitude
                    },
                    i = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + o.lat + "," + o.lng + "&sensor=false";
                doGet(e, i, function(e) {
                    var r = e.results[0].address_components;
                    r.forEach(function(e, r) {
                        "locality" == e.types[0] && (a.googleApiCity = e.long_name, t.resolve(a.googleApiCity))
                    })
                })
            }), t.promise
        }, "package" == l.current.name || "unsubscribe" == l.current.name) {
        a.cityObj = [{
            city_id: "23",
            city_name: "Gurgaon"
        }], localStorage.setItem("cityID", JSON.stringify(a.cityObj)), a.searchCity = "Gurgaon";
        a.getAddress().then(function(t) {
            doPost(e, u.serverUrl + "commonservice/city_detail", {
                city_name: a.googleApiCity
            }, "", function(e) {
                a.searchCity = e.data[0].city_name, a.cityObj.push(e.data[0]), localStorage.setItem("cityID", JSON.stringify(a.cityObj))
            })
        })
    } else a.searchCity = JSON.parse(localStorage.getItem("cityID"))[0].city_name;
    if (a.setHeader = function() {
            if ("true" == localStorage.getItem("isLogin")) {
                d.loggedin = !0;
                var e = JSON.parse(localStorage.getItem("user")).name,
                    t = e.split(" ");
                d.user = t[0].charAt(0).toUpperCase().concat(t[0].substr(1)), a.userLoginDetails = JSON.parse(localStorage.getItem("user")), "true" == localStorage.getItem("isSocialLogin") && ("" === a.userLoginDetails.mobile ? a.mobileModal = !0 : a.mobileModal = !1), null === localStorage.getItem("token") && localStorage.setItem("showLoginDialog", "true")
            }
        }, a.setHeader(), a.showLoginModal = function() {
            a.loginModal = !0, a.forgotPwdModal = !1
        }, a.showForgotPwdForm = function() {
            a.loginModal = !1, a.forgotPwdModal = !a.forgotPwdModal
        }, a.showChangePwdForm = function() {
            a.changePwdModal = !a.changePwdModal
        }, a.showForgotPwdOtpForm = function() {
            a.forgotPwdOtpModal = !a.forgotPwdOtpModal
        }, a.getCityList = function() {
            r.getCityDetail(function(e) {
                "success" == e.status && (a.cityList = e.data)
            })
        }, a.sigOut = function() {
            r.logout({}, function(e) {
                e.status && (localStorage.setItem("isLogin", "false"), localStorage.removeItem("token"), localStorage.removeItem("customerDetails"), localStorage.removeItem("sample_date"), localStorage.removeItem("user"), localStorage.removeItem("coupondata"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("total_amount"), localStorage.removeItem("amountfinal"), localStorage.removeItem("userDetail"), localStorage.removeItem("Detailscustomer"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("address"), localStorage.removeItem("isSocialLogin"), localStorage.removeItem("booking_id"), localStorage.removeItem("makepayment_to_summary"), localStorage.removeItem("tempUser"), localStorage.removeItem("time_slot"), localStorage.removeItem("showLoginDialog"), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), s.path("/home"), d.loggedin = !1, g.getLoginStatus(function(e) {
                    "connected" == e.status && g.logout(function(e) {})
                }))
            })
        }, a.selectCity = function(e) {
            a.cityObj = [], a.searchCity = e;
            for (var t = 0; t < a.cityList.length; t++) a.searchCity === a.cityList[t].city_name && (a.cityObj.push(a.cityList[t]), localStorage.setItem("cityID", JSON.stringify(a.cityObj)))
        }, a.listCity = function() {
            "order-summary" != l.current.name && "pick-time" != l.current.name && "confirm-address" != l.current.name && "make-payment" != l.current.name && (a.cityListShow = !0)
        }, a.downloadreport = function() {
            s.path("/download-file")
        }, a.myBooking = function() {
            s.path("/dashboard"), s.hash("mybooking"), d.$broadcast("my-booking")
        }, a.getCityList(), a.$on("tokenExpired", function(e, t) {
            localStorage.setItem("isLogin", "false"), localStorage.removeItem("token"), localStorage.removeItem("customerDetails"), localStorage.removeItem("sample_date"), localStorage.removeItem("user"), localStorage.removeItem("coupondata"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("total_amount"), localStorage.removeItem("amountfinal"), localStorage.removeItem("userDetail"), localStorage.removeItem("Detailscustomer"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("address"), localStorage.removeItem("isSocialLogin"), localStorage.removeItem("booking_id"), localStorage.removeItem("makepayment_to_summary"), localStorage.removeItem("tempUser"), localStorage.removeItem("time_slot"), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), localStorage.setItem("showLoginDialog", "true"), d.loggedin = !1, g.getLoginStatus(function(e) {
                "connected" == e.status && g.logout(function(e) {})
            }), s.path("/home")
        }), a.ini = function() {
            $(document).on("click", "body", function(e) {
                "order-summary" != l.current.name && "pick-time" != l.current.name && "confirm-address" != l.current.name && "make-payment" != l.current.name && "payment-summary" != l.current.name && ("final_checkout" === l.current.name && a.sublocalityDropDownSelected ? $(".detect-drop-down").hide() : $(e.target).closest("ul.locationHeader").length > 0 && "A" == $(e.target).prop("tagName").toUpperCase() ? $(".detect-drop-down").show(50) : $(".detect-drop-down").hide())
            })
        }, a.ini(), "true" == localStorage.getItem("isLogin") && (a.member = JSON.parse(localStorage.getItem("user")).relatives, a.member.length > 0)) {
        var _ = a.member[0].user_id;
        _.length > 15 || d.$broadcast("tokenExpired")
    }
    a.getCartTotalTest = function() {
        "true" == localStorage.getItem("isLogin") && (a.cartData = p.getCartDetails(), d.totalCartTest = 0, a.cartData.forEach(function(e, t) {
            e.hasOwnProperty("newpkg") && (d.totalCartTest += e.newpkg.length)
        }))
    }, a.getCartTotalTest()
}

function homeController(e, t, a, r, o, i, a, s, n, l, d, m, c, u, g, p, f, _, y, h) {
    e.forgotPwdModal = !1, e.signupModal = !1, e.changePwdModal = !1, e.forgotPwdOtpModal = !1, t.loggedin = !1, e.popularPackageList = !1, e.recommendedPkg = !1, e.signupmsg = !1, e.packageList = [], e.ageRange = [], e.ageRange1 = [], e.riskArea = [], e.cityObj = [], e.cityList = [], e.googleApiCity = "", localStorage.removeItem("booking_id");
    var v = JSON.parse(localStorage.getItem("cityID"));
    if (null === v ? (e.cityObj = [{
            city_id: "23",
            city_name: "Gurgaon"
        }], localStorage.setItem("cityID", JSON.stringify([{
            city_id: "23",
            city_name: "Gurgaon"
        }])), e.searchCity = "Gurgaon") : (e.cityObj = v, e.searchCity = e.cityObj[0].city_name), e.loginModal = !1, e.loginTab = !0, e.signupText = "Sign Up", e.showLoginForm = function() {
            e.loginTab = !0, e.loginModal = !0
        }, e.hideLoginForm = function() {
            e.loginTab = !0, e.loginModal = !1
        }, e.showSignupForm = function() {
            e.loginTab = !1, e.loginModal = !0, "Continue to Cart" !== e.signupText ? e.signupText = "Sign Up" : e.signupText = "Continue to Cart"
        }, e.showSignUpSuccess = function() {
            e.signupmsg = !0
        }, "true" == localStorage.getItem("isLogin")) {
        t.loggedin = !0;
        var k = JSON.parse(localStorage.getItem("user")).name,
            S = k.split(" ");
        t.user = S[0].charAt(0).toUpperCase().concat(S[0].substr(1)), null === localStorage.getItem("token") && (localStorage.setItem("isLogin", "false"), localStorage.removeItem("token"), localStorage.removeItem("customerDetails"), localStorage.removeItem("sample_date"), localStorage.removeItem("user"), localStorage.removeItem("coupondata"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("total_amount"), localStorage.removeItem("amountfinal"), localStorage.removeItem("userDetail"), localStorage.removeItem("Detailscustomer"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("address"), localStorage.removeItem("isSocialLogin"), localStorage.removeItem("booking_id"), localStorage.removeItem("makepayment_to_summary"), localStorage.removeItem("tempUser"), localStorage.removeItem("time_slot"), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), t.loggedin = !1, y.getLoginStatus(function(e) {
            "connected" == e.status && y.logout(function(e) {})
        }))
    } else null !== localStorage.getItem("showLoginDialog") && "true" == localStorage.getItem("showLoginDialog") && (e.showLoginForm(), localStorage.removeItem("showLoginDialog"));
    angular.element(".modal-open").find(".modal-backdrop").remove(), "home" == r.current.name && o.scrollTo(0, angular.element(document.getElementById("topdiv")).offsetTop), e.showForgotPwdForm = function() {
        e.loginModal = !1, e.forgotPwdModal = !e.forgotPwdModal
    }, e.showChangePwdForm = function() {
        e.changePwdModal = !e.changePwdModal
    }, e.showForgotPwdOtpForm = function() {
        e.forgotPwdOtpModal = !e.forgotPwdOtpModal
    }, e.pkglisting = function() {
        e.popularPackageList = !0, a("top-search")
    }, e.pkglisting1 = function() {
        e.popularPackageList1 = !0, e.popularPackageList = !1
    }, e.pkgPopularAnchor = function() {
        a("popular-pkg")
    }, e.labHealthiansAnchor = function() {
        a("labs-healthians")
    }, e.closePopularList = function() {
        e.popularPackageList = !1
    }, e.closePopularList1 = function() {
        e.popularPackageList1 = !1
    }, e.showLoginModal = function() {
        e.loginModal = !0, e.forgotPwdModal = !1
    }, e.getAddress = function() {
        var t = g.defer();
        return navigator.geolocation.getCurrentPosition(function(a) {
            var r = {
                    lat: a.coords.latitude,
                    lng: a.coords.longitude
                },
                o = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + r.lat + "," + r.lng + "&sensor=false";
            doGet(s, o, function(a) {
                var r = a.results[0].address_components;
                r.forEach(function(a, r) {
                    "locality" == a.types[0] && (e.googleApiCity = a.long_name, t.resolve(e.googleApiCity))
                })
            })
        }), t.promise
    }, e.getRiskAreas = function() {
        i.getRiskAreas(function(t) {
            1 == t.status && (e.riskArea = t.data)
        })
    }, e.getRiskAreas(), e.getAgeArray = function() {
        for (var t = 1; t <= 80; t++) e.ageRange1.push({
            value: t
        })
    }, e.getAgeArray(), e.getCityList = function() {
        i.getCityDetail(function(t) {
            "success" == t.status && (e.cityList = t.data)
        })
    }, e.findCityDetail = function(t) {
        e.searchCity = t, e.cityId()
    }, e.cityId = function() {
        e.cityObj = [];
        for (var t = 0; t < e.cityList.length; t++) e.searchCity === e.cityList[t].city_name && (e.cityObj.push(e.cityList[t]), localStorage.setItem("cityID", JSON.stringify(e.cityObj)))
    };
    e.getAddress().then(function(t) {
        doPost(s, f.serverUrl + "commonservice/city_detail", {
            city_name: e.googleApiCity
        }, "", function(t) {
            e.searchCity = t.data[0].city_name, e.cityObj.push(t.data[0]), localStorage.setItem("cityID", JSON.stringify(e.cityObj))
        })
    });
    e.getCityList(), e.tags = [], e.loadTags = function(e) {
        return s({
            method: "POST",
            url: f.serverUrl + "commonservice/packageSuggestion",
            data: {
                keyword: e
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).success(function(t) {
            null == t.data && _.eventTrack("Received Zero Suggestions from Auto-suggestor", {
                category: "Search",
                label: e
            })
        })
    }, e.searchResult = function() {
        0 !== e.tags.length && (l.setSearchPackages(e.tags), n.path("/orderbook"))
    }, e.findIndex = function(t, a) {
        var r = -1;
        e.tags.forEach(function(e, a) {
            e.text === t && (r = a)
        }), a(r)
    }, e.checkSelection = function(t) {
        var a = $(t.target).find("a").text() || $(t.target).text(),
            r = $(t.target).find("a").attr("id") || $(t.target).attr("id"),
            o = $(t.target).closest("li").hasClass("selectedtest");
        if (o) e.findIndex(a, function(a) {
            a !== -1 && e.tags.splice(a, 1), $(t.target).closest("li").removeClass("selectedtest")
        });
        else {
            var i = {
                text: a,
                id: r
            };
            e.tags.push(i), $(t.target).closest("li").addClass("selectedtest")
        }
    }, t.addTags = function(e) {}, t.removeTag = function(e) {}, doPost(s, f.serverUrl + "commonservice/getPopularPackages", {
        city: JSON.parse(localStorage.getItem("cityID"))[0].city_name
    }, "", function(t) {
        e.popularPackages1 = t.data, e.packageList = e.popularPackages1, e.ini()
    }), doGet(s, f.serverUrl + "commonservice/getPopulerTests", function(t) {
        e.popularTest1 = t.data
    }), e.downloadreport = function() {
        n.path("/download-file")
    }, e.sigOut = function() {
        i.logout({}, function(e) {
            e.status && (localStorage.setItem("isLogin", "false"), localStorage.removeItem("token"), localStorage.removeItem("customerDetails"), localStorage.removeItem("sample_date"), localStorage.removeItem("user"), localStorage.removeItem("coupondata"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("total_amount"), localStorage.removeItem("amountfinal"), localStorage.removeItem("userDetail"), localStorage.removeItem("Detailscustomer"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("address"), localStorage.removeItem("isSocialLogin"), localStorage.removeItem("booking_id"), localStorage.removeItem("makepayment_to_summary"), localStorage.removeItem("tempUser"), localStorage.removeItem("time_slot"), localStorage.removeItem("showLoginDialog"), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), n.path("/home"), t.loggedin = !1, t.user = "", y.getLoginStatus(function(e) {
                "connected" == e.status && y.logout(function(e) {})
            }))
        })
    }, e.pkgGender = "null", e.filterPkg = function() {
        if ("null" === e.pkgGender) e.pkgSearchError = "Please select gender";
        else if (void 0 === e.pkgAge || null == e.pkgAge) e.pkgSearchError = "Please select age";
        else if (void 0 === e.pkgRisk || null == e.pkgRisk) e.pkgSearchError = "Please select risk area";
        else {
            ({
                city: JSON.parse(localStorage.getItem("cityID"))[0].city_name,
                gender: e.pkgGender,
                age: e.pkgAge.value,
                risk: e.pkgRisk
            })
        }
    }, e.pkgSearch = function(t) {
        e.tags[0] = {
            id: t.package_id,
            text: t.package_name
        }, l.setSearchPackages(e.tags), n.path("/orderbook")
    }, e.myBooking = function() {
        n.path("/dashboard"), n.hash("mybooking")
    }, e.ini = function() {
        setTimeout(function() {
            $(".slider_package").bxSlider({
                slideWidth: 330,
                minSlides: 1,
                maxSlides: 3,
                slideMargin: 15,
                moveSlides: 1,
                auto: !0
            })
        }, 70)
    }, e.coupondata = {}, localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), e.getCartTotalTest = function() {
        "true" == localStorage.getItem("isLogin") && (e.cartData = h.getCartDetails(), t.totalCartTest = 0, e.cartData.forEach(function(e, a) {
            e.hasOwnProperty("newpkg") && (t.totalCartTest += e.newpkg.length)
        }))
    }, e.getCartTotalTest()
}

function homeControllerLogin(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p, f, _, y, h, v) {
    e.loginfail = !1, t.signupmsgnotverified = !1, e.signupError = !1, e.signupErrorMsg = "", e.login = function() {
        if (e.loginFormSubmitted = !1, e.loginfail = !1, void 0 === e.loginForm.userEmail || "" === e.loginForm.userEmail) return e.loginForm.useremail.$dirty = !0, e.loginForm.useremail.$invalid = !0, e.loginForm.useremail.$error.required = !0, a("useremail"), !1;
        if (void 0 === e.loginForm.userPwd || "" === e.loginForm.userPwd) return e.loginForm.userpwd.$dirty = !0, e.loginForm.userpwd.$invalid = !0, e.loginForm.userpwd.$error.required = !0, a("userpwd"), !1;
        e.loginForm.remember ? (g("useremail", e.loginForm.userEmail), g("userpwd", e.loginForm.userPwd)) : (g("useremail", ""),
            g("userpwd", ""), e.loginForm.remember = !1), t.email = e.loginForm.userEmail, t.password = e.loginForm.userPwd;
        var o = {
            email_or_mobile: e.loginForm.userEmail,
            password: e.loginForm.userPwd
        };
        r.userLogin(o, function(a) {
            if ("success" == a.status) {
                if (a.data.status === !0) {
                    localStorage.setItem("user", JSON.stringify(a.data.data)), localStorage.setItem("isLogin", "true"), t.loggedin = !0, localStorage.setItem("token", a.data.data.token);
                    var r = JSON.parse(localStorage.getItem("user")).name,
                        o = r.split(" ");
                    t.user = o[0], angular.element("#login_signup_modal").modal("hide"), angular.element("body").removeClass("modal-open"), angular.element("body").css("padding-right", "0px"), localStorage.removeItem("showLoginDialog"), "orderbook" === f.current.name || "package" === f.current.name || "parameter" === f.current.name || "profile" === f.current.name ? e.$emit("showPatientDialog") : "reset_password" === f.current.name && i.path("/home")
                }
                "not_verified" == a.data.status && (angular.element("#login_signup_modal").modal("hide"), t.signupmsgnotverified = !0), e.closeLoginModal()
            }
            "failed" == a.status && (e.loginfail = !0, h.eventTrack("Showed Error Invalid Credentials", {
                category: "Login"
            })), n(function() {
                e.loginfail = !1
            }, 8e3)
        })
    }, e.rememberMe = function() {
        null !== g("useremail") && null !== g("userpwd") && "" !== g("useremail") && "" !== g("userpwd") && (e.loginForm.remember = !0, e.loginForm.userEmail = g("useremail"), e.loginForm.userPwd = g("userpwd"))
    }, e.sendVerificationLink = function() {
        doPost(o, p.serverUrl + "commonservice/accountActivationLink", {
            email: t.email,
            password: t.password
        }, "", function(e) {}), $(".modal.in").find("button.close").click()
    }, e.sigup = function() {
        if (e.signupError = !1, e.signupFormSubmitted = !1, void 0 === e.signupForm.userName || "" === e.signupForm.userName) return e.signupForm.username.$dirty = !0, e.signupForm.username.$invalid = !0, e.signupForm.username.$error.required = !0, h.eventTrack("Showed Error for Validation Failure", {
            category: "Signup"
        }), a("username"), !1;
        if (void 0 === e.signupForm.userEmail || "" === e.signupForm.userEmail) return e.signupForm.useremail.$dirty = !0, e.signupForm.useremail.$invalid = !0, e.signupForm.useremail.$error.required = !0, h.eventTrack("Showed Error for Validation Failure", {
            category: "Signup"
        }), a("useremail"), !1;
        if (void 0 === e.signupForm.userPhone || "" === e.signupForm.userPhone) return e.signupForm.userphone.$dirty = !0, e.signupForm.userphone.$invalid = !0, e.signupForm.userphone.$error.required = !0, h.eventTrack("Showed Error for Validation Failure", {
            category: "Signup"
        }), a("userphone"), !1;
        if (void 0 === e.signupForm.userAge || "" === e.signupForm.userAge) return e.signupForm.userage.$dirty = !0, e.signupForm.userage.$invalid = !0, e.signupForm.userage.$error.required = !0, h.eventTrack("Showed Error for Validation Failure", {
            category: "Signup"
        }), a("userage"), !1;
        if (void 0 === e.signupForm.userGender || "" === e.signupForm.userGender) return e.signupForm.usergender.$dirty = !0, e.signupForm.usergender.$invalid = !0, e.signupForm.usergender.$error.required = !0, h.eventTrack("Showed Error for Validation Failure", {
            category: "Signup"
        }), a("usergender"), !1;
        var o = {
            name: e.signupForm.userName,
            email: e.signupForm.userEmail,
            contact_number: e.signupForm.userPhone,
            age: e.signupForm.userAge,
            gender: e.signupForm.userGender,
            dob: e.signupForm.userDOB
        };
        r.userSignup(o, function(a) {
            if ("success" == a.data.status) {
                localStorage.setItem("user", JSON.stringify(a.data.data)), localStorage.setItem("isLogin", "true"), localStorage.setItem("token", a.data.data.token), t.loggedin = !0;
                var r = JSON.parse(localStorage.getItem("user")).name,
                    o = r.split(" ");
                t.user = o[0], angular.element("body").removeClass("modal-open"), angular.element("body").css("padding-right", "0px"), e.closeLoginModal(), "orderbook" === f.current.name || "package" === f.current.name || "parameter" === f.current.name || "profile" === f.current.name ? (e.$parent.setHeader(), e.$emit("showPatientDialog")) : (e.signupmsg = !0, e.$parent.showSignUpSuccess())
            }
            "failed" == a.data.status && (h.eventTrack("Showed Error for Validation Failure", {
                category: "Signup"
            }), e.signupError = !0, e.signupErrorMsg = a.data.message), n(function() {
                e.signupError = !1, e.signupErrorMsg = ""
            }, 8e3)
        })
    }, e.$watch(function() {
        return _.isReady()
    }, function(t) {
        t && (e.facebookReady = !0)
    }), e.social_login_error = !1, e.FBLogin = function() {
        g("useremail", ""), g("userpwd", "");
        var t = r.fblogin();
        t.then(function(t) {
            "undefined" != typeof t.email && e.sociallogin(t)
        })
    }, e.GPlusLogin = function() {
        g("useremail", ""), g("userpwd", ""), y.login().then(function(t) {
            y.getUser().then(function(t) {
                var a = {
                    name: t.name,
                    email: t.email,
                    termscond: "1",
                    social_login: "GooglePlus",
                    social_response: t.result,
                    gender: ""
                };
                e.sociallogin(a)
            })
        }, function(e) {
            console.log(e)
        })
    }, e.sociallogin = function(a) {
        r.userSocialLogin(a, function(r) {
            if ("success" == r.status) {
                if (r.data.status === !0) {
                    localStorage.setItem("user", JSON.stringify(r.data.data)), localStorage.setItem("isLogin", "true"), localStorage.setItem("isSocialLogin", "true"), localStorage.setItem("token", r.data.data.token), t.loggedin = !0;
                    var o = JSON.parse(localStorage.getItem("user")).name,
                        i = o.split(" ");
                    t.user = i[0], e.closeLoginModal(), angular.element("body").removeClass("modal-open"), angular.element("body").css("padding-right", "0px"), "true" === localStorage.getItem("isSocialLogin") && ("orderbook" !== f.current.name && "package" !== f.current.name && "parameter" !== f.current.name && "profile" !== f.current.name || e.$emit("showPatientDialog"))
                }
                "not_verified" == r.data.status && (angular.element("#login_signup_modal").modal("hide"), t.signupmsgnotverified = !0)
            } else e.$parent.showSignupForm(), "undefined" != typeof a.email && (e.signupForm.userName = a.name, e.signupForm.userEmail = a.email)
        })
    }, e.calculateAge = function(t) {
        var a = moment(t, "DD/MM/YYYY").format("M"),
            r = (moment(t, "DD/MM/YYYY").format("D"), moment(t, "DD/MM/YYYY").format("Y")),
            o = moment().month() + 1,
            i = new Date,
            s = new Date(t),
            n = i.getFullYear() - r;
        i.getMonth() - s.getMonth();
        n > 0 && (o >= a ? e.signupForm.userAge = n : e.signupForm.userAge = n - 1), angular.element("#userage").val(e.signupForm.userAge)
    }, e.getDOB = function(t, a) {
        var r = moment().subtract(t, "years").format("DD/MM/YYYY");
        if (e.signupForm.userDOB = r, angular.element("#userdob").datepicker({
                endDate: "-182d"
            }).datepicker("update", e.signupForm.userDOB).on("changeDate", function() {
                e.calculateAge(e.signupForm.userDOB)
            }), e.type = "estimated", e.loggedin === !0) {
            var o = JSON.parse(localStorage.getItem("user"));
            o.relatives.forEach(function(r, o) {
                r.name === a && (r.age = t, r.dob = e.signupForm.userDOB)
            }), localStorage.setItem("user", JSON.stringify(o))
        }
    }, e.closeLoginModal = function() {
        e.loginfail = !1, e.signupError = !1, angular.element("#login_signup_modal").modal("hide"), angular.element("#userdob").val("").datepicker("update"), e.loginForm.userEmail = "", e.loginForm.userPwd = "", e.loginForm.useremail.$dirty = !1, e.loginForm.userpwd.$dirty = !1, e.signupForm.userName = "", e.signupForm.userEmail = "", e.signupForm.userPhone = "", e.signupForm.userAge = "", e.signupForm.userDOB = "", e.signupForm.userGender = "", e.signupForm.userphone.$dirty = !1, e.signupForm.username.$dirty = !1, e.signupForm.useremail.$dirty = !1, e.signupForm.userage.$dirty = !1, e.signupForm.userdob.$dirty = !1, e.signupForm.usergender.$dirty = !1
    }
}

function homeControllerForgotpwd(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    e.forgotdata = !1, e.forgotdataInvalidEmail = !1, e.loaderVar = !1, e.hideContinue = !0, t.mobile, e.forgotPassword = function() {
        if (e.forgotpwdFormSubmitted = !1, e.forgotdataInvalidEmail = !1, void 0 === e.forgotpwdForm.userEmail || "" === e.forgotpwdForm.userEmail) return e.forgotpwdForm.useremail.$dirty = !0, e.forgotpwdForm.useremail.$invalid = !0, e.forgotpwdForm.useremail.$error.required = !0, o("useremail"), !1;
        var a = {
            email: e.forgotpwdForm.userEmail
        };
        e.hideContinue = !1, e.loaderVar = !0, t.mobile = e.forgotpwdForm.userEmail, i.userForgotPwd(a, function(t) {
            t.status === !0 ? "Otp send successfully" == t.message ? (e.forgotpwdForm.userEmail = "", e.forgotpwdForm.useremail.$dirty = !1, e.forgotdata = !1, e.forgotdataInvalidEmail = !1, $(".modal.in").find("button.close").click(), e.showForgotPwdOtpForm()) : (e.forgotdata = !0, e.msg = t.message, e.forgotdataInvalidEmail = !1, e.close()) : (e.forgotdataInvalidEmail = !0, e.forgotdata = !1), e.loaderVar = !1, e.hideContinue = !0, d(function() {
                e.forgotdata = !1, e.forgotdataInvalidEmail = !1
            }, 3e3)
        })
    }, e.close = function() {
        d(function() {
            e.forgotdata = !1, e.forgotdataInvalidEmail = !1, e.forgotpwdForm.userEmail = "", e.forgotpwdForm.useremail.$dirty = !1, e.msg = "", $(".modal.in").find("button.close").click(), angular.element(".modal.in").find("#closemodal").click()
        }, 6e3)
    }, e.otpVerify = function() {
        return e.otpFormSubmitted = !1, void 0 === e.otpForm.userOTP || "" === e.otpForm.userOTP ? (e.otpForm.userotp.$dirty = !0, e.otpForm.userotp.$invalid = !0, e.otpForm.userotp.$error.required = !0, o("userotp"), !1) : void doPost(s, r.serverUrl + "commonservice/otp_validate", {
            mobile: t.mobile,
            otp: e.otpForm.userOTP
        }, "", function(t) {
            if (1 == t.status) {
                var a = t.data.hash;
                a && (window.location.href = "/reset_password/" + a)
            } else e.forgotdataInvalidEmail = !0, e.close()
        })
    }
}

function homeControllerChangepwd(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    e.confirmpwdmsg = !1, e.invalidmsg = !1, e.setpwdmsg = !1, e.setpwdmsgerror = !1, e.setPassword = function() {
        return e.changepwdFormSubmitted = !1, void 0 === e.changepwdForm.userOldPwd || "" === e.changepwdForm.userOldPwd ? (e.changepwdForm.useroldpwd.$dirty = !0, e.changepwdForm.useroldpwd.$invalid = !0, e.changepwdForm.useroldpwd.$error.required = !0, a("useroldpwd"), !1) : void 0 === e.changepwdForm.userEmail || "" === e.changepwdForm.userEmail ? (e.changepwdForm.useremail.$dirty = !0, e.changepwdForm.useremail.$invalid = !0, e.changepwdForm.useremail.$error.required = !0, a("useremail"), !1) : void 0 === e.changepwdForm.userConfmEmail || "" === e.changepwdForm.userConfmEmail ? (e.changepwdForm.usereconfrmmail.$dirty = !0, e.changepwdForm.usereconfrmmail.$invalid = !0, e.changepwdForm.usereconfrmmail.$error.required = !0, a("usereconfrmmail"), !1) : (e.changepwdForm.userEmail !== e.changepwdForm.userConfmEmail ? e.confirmpwdmsg = !0 : e.setnewPassword(), void n(function() {
            e.confirmpwdmsg = !1
        }, 5e3))
    }, e.setnewPassword = function() {
        var t = {
            email: JSON.parse(localStorage.getItem("user")).email,
            old_password: e.changepwdForm.userOldPwd,
            password: e.changepwdForm.userEmail,
            user_id: JSON.parse(localStorage.getItem("user")).user_id
        };
        r.userSetNewPwd(t, function(t) {
            "success" === t.status ? (t.data.status === !1 && (e.invalidmsg = !0), t.data.status === !0 && (e.setpwdmsg = !0)) : e.setpwdmsgerror = !0, n(function() {
                e.setpwdmsg = !1, e.setpwdmsgerror = !1, e.invalidmsg = !1, e.changepwdFormSubmitted = !1, e.changepwdForm.userOldPwd = "", e.changepwdForm.useroldpwd.$dirty = !1, e.changepwdForm.userEmail = "", e.changepwdForm.useremail.$dirty = !1, e.changepwdForm.userConfmEmail = "", e.changepwdForm.usereconfrmmail.$dirty = !1, $(".modal.in").find("button.close").click()
            }, 4e3)
        })
    }, e.updateMobile = function() {
        if (void 0 === e.mobileForm.userPhone || "" === e.mobileForm.userPhone) return e.mobileForm.userphone.$dirty = !0, e.mobileForm.userphone.$invalid = !0, e.mobileForm.userphone.$error.required = !0, a("userphone"), !1;
        e.userLoginDetails = JSON.parse(localStorage.getItem("user"));
        var r = {
            userId: e.userLoginDetails.user_id,
            email: e.userLoginDetails.email,
            mobile: e.mobileForm.userPhone
        };
        g.updateProfile(r, function(a) {
            a.status === !0 && (e.userLoginDetails.mobile = e.mobileForm.userPhone, e.userLoginDetails.relatives[0].contact_number = e.mobileForm.userPhone, localStorage.setItem("user", JSON.stringify(e.userLoginDetails)), e.mobileModal = !1, t.$broadcast("update_mobile"), $(".modal.in").find("button.close").click())
        })
    }
}

function instantbookingController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p, f, _) {
    e.packageList = [];
    var y = JSON.parse(localStorage.getItem("cityID"));
    null === y && localStorage.setItem("cityID", JSON.stringify([{
        city_id: "23",
        city_name: "Gurgaon"
    }])), e.contact_number = "", e.email_address = "", e.user_exists = !1, e.instant_booking_state = "addtocart", e.getinstantForm = [], e.timeSlotForm = [], e.slot_id = "", e.SlotError = "", e.couponCode = "", e.firstDateslots = "", e.secondDateslots = "", e.thirdDateslots = "", e.fourthDateslots = "", e.fifthDateslots = "", e.hardcopy_price = 0, e.discount = "", e.payradio = "paytm", e.userDetail = {}, e.showBookingLoader = !0;
    var h = localStorage.getItem("token");
    e.token = h;
    var v = p.paymentUrl;
    e.mobikwikAction = _.trustAsResourceUrl(v + "mobikwikpayment"), e.payzappAction = _.trustAsResourceUrl(v + "payzapppayment"), e.payuAction = _.trustAsResourceUrl(v + "payupayment"), e.paytmAction = _.trustAsResourceUrl(v + "paytmpayment"), l.search() && (e.name = l.search().name, e.email_address = l.search().email, e.phone = l.search().phone, e.package_id = l.search().package_id);
    var k = l.path();
    "/book/full-body-checkup" === k && (e.static_package_name = "Healthians Full body checkup with Thyroid Profile", e.static_actual_price = 2850, e.static_healthians_price = 999, e.static_discount = 65, e.package_id = "206", e.pdetails = JSON.parse('{"test_details":[{"id":"1","ptype":"profile","name":"Lipid Profile","link_rewrite":"lipid-profile","package_id":"206","tests":[{"profile_id":"1","id":"625","ptype":"parameter","name":"Cholesterol-Total, Serum","link_rewrite":"cholesterol-total-serum"},{"profile_id":"1","id":"1033","ptype":"parameter","name":"HDL Cholesterol Direct","link_rewrite":"hdl-cholesterol-direct"},{"profile_id":"1","id":"1638","ptype":"parameter","name":"LDL Cholesterol -Direct","link_rewrite":"ldl-cholesterol-direct"},{"profile_id":"1","id":"2165","ptype":"parameter","name":"Triglycerides, Serum","link_rewrite":"triglycerides-serum"},{"profile_id":"1","id":"2272","ptype":"parameter","name":"Non - HDL Cholesterol, Serum","link_rewrite":"non-hdl-cholesterol-serum"},{"profile_id":"1","id":"2273","ptype":"parameter","name":"VLDL","link_rewrite":"vldl"},{"profile_id":"1","id":"2274","ptype":"parameter","name":"LDL/HDL RATIO","link_rewrite":"ldl-hdl-ratio"},{"profile_id":"1","id":"2275","ptype":"parameter","name":"CHOL/HDL RATIO","link_rewrite":"chol-hdl-ratio"},{"profile_id":"1","id":"2297","ptype":"parameter","name":"HDL / LDL Cholesterol Ratio","link_rewrite":"hdl-ldl-cholesterol-ratio"}]},{"id":"2","ptype":"profile","name":"Liver Function Test","link_rewrite":"liver-function-test","package_id":"206","tests":[{"profile_id":"2","id":"135","ptype":"parameter","name":"Albumin, Serum","link_rewrite":"albumin-serum"},{"profile_id":"2","id":"150","ptype":"parameter","name":"Alkaline Phosphatase, Serum","link_rewrite":"alkaline-phosphatase-serum"},{"profile_id":"2","id":"502","ptype":"parameter","name":"Bilirubin Direct, Serum","link_rewrite":"bilirubin-direct-serum"},{"profile_id":"2","id":"504","ptype":"parameter","name":"Bilirubin Total, Serum","link_rewrite":"bilirubin-total-serum"},{"profile_id":"2","id":"970","ptype":"parameter","name":"GGTP (Gamma GT)","link_rewrite":"ggtp-gamma-gt"},{"profile_id":"2","id":"1947","ptype":"parameter","name":"Proteins, Serum","link_rewrite":"proteins-serum"},{"profile_id":"2","id":"2024","ptype":"parameter","name":"SGOT AST","link_rewrite":"sgot-ast"},{"profile_id":"2","id":"2025","ptype":"parameter","name":"SGPT ALT","link_rewrite":"sgpt-alt"},{"profile_id":"2","id":"2269","ptype":"parameter","name":"Bilirubin- Indirect, serum","link_rewrite":"bilirubin-indirect-serum"},{"profile_id":"2","id":"2270","ptype":"parameter","name":"Globulin","link_rewrite":"globulin"},{"profile_id":"2","id":"2271","ptype":"parameter","name":"A/G Ratio","link_rewrite":"a-g-ratio"},{"profile_id":"2","id":"2302","ptype":"parameter","name":"SGOT/SGPT Ratio","link_rewrite":"sgot-sgpt-ratio"}]},{"id":"4","ptype":"profile","name":"Thyroid Profile-Total","link_rewrite":"thyroid-profile-total","package_id":"206","tests":[{"profile_id":"4","id":"2097","ptype":"parameter","name":"T3, Total Tri Iodothyronine","link_rewrite":"t3-total-tri-iodothyronine"},{"profile_id":"4","id":"2099","ptype":"parameter","name":"T4, Total Thyroxine","link_rewrite":"t4-total-thyroxine"},{"profile_id":"4","id":"2192","ptype":"parameter","name":"TSH-Ultrasensitive","link_rewrite":"tsh-ultrasensitive"}]},{"id":"6","ptype":"profile","name":"Kidney Function Test","link_rewrite":"kidney-function-test","package_id":"206","tests":[{"profile_id":"6","id":"531","ptype":"parameter","name":"BUN Urea Nitrogen, Serum","link_rewrite":"bun-urea-nitrogen-serum"},{"profile_id":"6","id":"548","ptype":"parameter","name":"Calcium Total, Serum","link_rewrite":"calcium-total-serum"},{"profile_id":"6","id":"621","ptype":"parameter","name":"Chlorides, Serum","link_rewrite":"chlorides-serum"},{"profile_id":"6","id":"696","ptype":"parameter","name":"Creatinine, Serum","link_rewrite":"creatinine-serum"},{"profile_id":"6","id":"1919","ptype":"parameter","name":"Potassium, Serum","link_rewrite":"potassium-serum"},{"profile_id":"6","id":"1947","ptype":"parameter","name":"Proteins, Serum","link_rewrite":"proteins-serum"},{"profile_id":"6","id":"2040","ptype":"parameter","name":"Sodium, Serum","link_rewrite":"sodium-serum"},{"profile_id":"6","id":"2206","ptype":"parameter","name":"Urea, Serum","link_rewrite":"urea-serum"},{"profile_id":"6","id":"2208","ptype":"parameter","name":"Uric Acid, Serum","link_rewrite":"uric-acid-serum"},{"profile_id":"6","id":"2298","ptype":"parameter","name":"BUN/Creatinine Ratio ","link_rewrite":"bun-creatinine-ratio"},{"profile_id":"6","id":"2299","ptype":"parameter","name":"Urea/Creatinine Ratio","link_rewrite":"urea-creatinine-ratio"},{"profile_id":"6","id":"2303","ptype":"parameter","name":"EGFR","link_rewrite":"egfr-5"}]},{"id":"7","ptype":"profile","name":"Urine Routine & Microscopy","link_rewrite":"urine-routine-microscopy","package_id":"206","tests":[{"profile_id":"7","id":"1886","ptype":"parameter","name":"pH Urine","link_rewrite":"ph-urine"},{"profile_id":"7","id":"2044","ptype":"parameter","name":"Specific gravity","link_rewrite":"specific-gravity"},{"profile_id":"7","id":"2211","ptype":"parameter","name":"Urobilinogen","link_rewrite":"urobilinogen"},{"profile_id":"7","id":"2276","ptype":"parameter","name":"Colour","link_rewrite":"colour"},{"profile_id":"7","id":"2277","ptype":"parameter","name":"Transparency","link_rewrite":"transparency"},{"profile_id":"7","id":"2279","ptype":"parameter","name":"Albumin","link_rewrite":"albumin"},{"profile_id":"7","id":"2280","ptype":"parameter","name":"Sugar","link_rewrite":"sugar"},{"profile_id":"7","id":"2281","ptype":"parameter","name":"Ketone","link_rewrite":"ketone"},{"profile_id":"7","id":"2283","ptype":"parameter","name":"Bile pigments, urine","link_rewrite":"bile-pigments-urine"},{"profile_id":"7","id":"2285","ptype":"parameter","name":"Red blood cells","link_rewrite":"red-blood-cells"},{"profile_id":"7","id":"2286","ptype":"parameter","name":"Pus cells (Leukocytes)","link_rewrite":"pus-cells-leukocytes"},{"profile_id":"7","id":"2287","ptype":"parameter","name":"Epithelial cells","link_rewrite":"epithelial-cells"},{"profile_id":"7","id":"2288","ptype":"parameter","name":"Crystals","link_rewrite":"crystals"},{"profile_id":"7","id":"2289","ptype":"parameter","name":"Cast","link_rewrite":"cast"},{"profile_id":"7","id":"2290","ptype":"parameter","name":"Bacteria","link_rewrite":"bacteria"},{"profile_id":"7","id":"2291","ptype":"parameter","name":"Yeast cells","link_rewrite":"yeast-cells"},{"profile_id":"7","id":"2304","ptype":"parameter","name":"Nitrate","link_rewrite":"nitrate"}]},{"id":"977","ptype":"parameter","name":"Glucose","link_rewrite":"glucose","package_id":"206"}]}'), e.test_count = 54), "/book/blood-screening-with-lft" === k && (e.static_package_name = "Basic Blood Screening With LFT", e.static_actual_price = 2100, e.static_healthians_price = 599, e.static_discount = 71, e.package_id = "222", e.test_count = 39, e.pdetails = JSON.parse('{"test_details":[{"id":"1","ptype":"profile","name":"Lipid Profile","link_rewrite":"lipid-profile","package_id":"222","tests":[{"profile_id":"1","id":"625","ptype":"parameter","name":"Cholesterol-Total, Serum","link_rewrite":"cholesterol-total-serum"},{"profile_id":"1","id":"1033","ptype":"parameter","name":"HDL Cholesterol Direct","link_rewrite":"hdl-cholesterol-direct"},{"profile_id":"1","id":"1638","ptype":"parameter","name":"LDL Cholesterol -Direct","link_rewrite":"ldl-cholesterol-direct"},{"profile_id":"1","id":"2165","ptype":"parameter","name":"Triglycerides, Serum","link_rewrite":"triglycerides-serum"},{"profile_id":"1","id":"2272","ptype":"parameter","name":"Non - HDL Cholesterol, Serum","link_rewrite":"non-hdl-cholesterol-serum"},{"profile_id":"1","id":"2273","ptype":"parameter","name":"VLDL","link_rewrite":"vldl"},{"profile_id":"1","id":"2274","ptype":"parameter","name":"LDL/HDL RATIO","link_rewrite":"ldl-hdl-ratio"},{"profile_id":"1","id":"2275","ptype":"parameter","name":"CHOL/HDL RATIO","link_rewrite":"chol-hdl-ratio"},{"profile_id":"1","id":"2297","ptype":"parameter","name":"HDL / LDL Cholesterol Ratio","link_rewrite":"hdl-ldl-cholesterol-ratio"}]},{"id":"2","ptype":"profile","name":"Liver Function Test","link_rewrite":"liver-function-test","package_id":"222","tests":[{"profile_id":"2","id":"135","ptype":"parameter","name":"Albumin, Serum","link_rewrite":"albumin-serum"},{"profile_id":"2","id":"150","ptype":"parameter","name":"Alkaline Phosphatase, Serum","link_rewrite":"alkaline-phosphatase-serum"},{"profile_id":"2","id":"502","ptype":"parameter","name":"Bilirubin Direct, Serum","link_rewrite":"bilirubin-direct-serum"},{"profile_id":"2","id":"504","ptype":"parameter","name":"Bilirubin Total, Serum","link_rewrite":"bilirubin-total-serum"},{"profile_id":"2","id":"970","ptype":"parameter","name":"GGTP (Gamma GT)","link_rewrite":"ggtp-gamma-gt"},{"profile_id":"2","id":"1947","ptype":"parameter","name":"Proteins, Serum","link_rewrite":"proteins-serum"},{"profile_id":"2","id":"2024","ptype":"parameter","name":"SGOT AST","link_rewrite":"sgot-ast"},{"profile_id":"2","id":"2025","ptype":"parameter","name":"SGPT ALT","link_rewrite":"sgpt-alt"},{"profile_id":"2","id":"2269","ptype":"parameter","name":"Bilirubin- Indirect, serum","link_rewrite":"bilirubin-indirect-serum"},{"profile_id":"2","id":"2270","ptype":"parameter","name":"Globulin","link_rewrite":"globulin"},{"profile_id":"2","id":"2271","ptype":"parameter","name":"A/G Ratio","link_rewrite":"a-g-ratio"},{"profile_id":"2","id":"2302","ptype":"parameter","name":"SGOT/SGPT Ratio","link_rewrite":"sgot-sgpt-ratio"}]},{"id":"7","ptype":"profile","name":"Urine Routine & Microscopy","link_rewrite":"urine-routine-microscopy","package_id":"222","tests":[{"profile_id":"7","id":"1886","ptype":"parameter","name":"pH Urine","link_rewrite":"ph-urine"},{"profile_id":"7","id":"2044","ptype":"parameter","name":"Specific gravity","link_rewrite":"specific-gravity"},{"profile_id":"7","id":"2211","ptype":"parameter","name":"Urobilinogen","link_rewrite":"urobilinogen"},{"profile_id":"7","id":"2276","ptype":"parameter","name":"Colour","link_rewrite":"colour"},{"profile_id":"7","id":"2277","ptype":"parameter","name":"Transparency","link_rewrite":"transparency"},{"profile_id":"7","id":"2279","ptype":"parameter","name":"Albumin","link_rewrite":"albumin"},{"profile_id":"7","id":"2280","ptype":"parameter","name":"Sugar","link_rewrite":"sugar"},{"profile_id":"7","id":"2281","ptype":"parameter","name":"Ketone","link_rewrite":"ketone"},{"profile_id":"7","id":"2283","ptype":"parameter","name":"Bile pigments, urine","link_rewrite":"bile-pigments-urine"},{"profile_id":"7","id":"2285","ptype":"parameter","name":"Red blood cells","link_rewrite":"red-blood-cells"},{"profile_id":"7","id":"2286","ptype":"parameter","name":"Pus cells (Leukocytes)","link_rewrite":"pus-cells-leukocytes"},{"profile_id":"7","id":"2287","ptype":"parameter","name":"Epithelial cells","link_rewrite":"epithelial-cells"},{"profile_id":"7","id":"2288","ptype":"parameter","name":"Crystals","link_rewrite":"crystals"},{"profile_id":"7","id":"2289","ptype":"parameter","name":"Cast","link_rewrite":"cast"},{"profile_id":"7","id":"2290","ptype":"parameter","name":"Bacteria","link_rewrite":"bacteria"},{"profile_id":"7","id":"2291","ptype":"parameter","name":"Yeast cells","link_rewrite":"yeast-cells"},{"profile_id":"7","id":"2304","ptype":"parameter","name":"Nitrate","link_rewrite":"nitrate"}]},{"id":"977","ptype":"parameter","name":"Glucose","link_rewrite":"glucose","package_id":"222"}] }')), "/book/blood-screening-with-kft" === k && (e.static_package_name = "Basic Blood Screening With KFT", e.static_actual_price = 2100, e.static_healthians_price = 599, e.static_discount = 71, e.package_id = "223", e.test_count = 39, e.pdetails = JSON.parse('{"test_details":[{"id":"1","ptype":"profile","name":"Lipid Profile","link_rewrite":"lipid-profile","package_id":"223","tests":[{"profile_id":"1","id":"625","ptype":"parameter","name":"Cholesterol-Total, Serum","link_rewrite":"cholesterol-total-serum"},{"profile_id":"1","id":"1033","ptype":"parameter","name":"HDL Cholesterol Direct","link_rewrite":"hdl-cholesterol-direct"},{"profile_id":"1","id":"1638","ptype":"parameter","name":"LDL Cholesterol -Direct","link_rewrite":"ldl-cholesterol-direct"},{"profile_id":"1","id":"2165","ptype":"parameter","name":"Triglycerides, Serum","link_rewrite":"triglycerides-serum"},{"profile_id":"1","id":"2272","ptype":"parameter","name":"Non - HDL Cholesterol, Serum","link_rewrite":"non-hdl-cholesterol-serum"},{"profile_id":"1","id":"2273","ptype":"parameter","name":"VLDL","link_rewrite":"vldl"},{"profile_id":"1","id":"2274","ptype":"parameter","name":"LDL/HDL RATIO","link_rewrite":"ldl-hdl-ratio"},{"profile_id":"1","id":"2275","ptype":"parameter","name":"CHOL/HDL RATIO","link_rewrite":"chol-hdl-ratio"},{"profile_id":"1","id":"2297","ptype":"parameter","name":"HDL / LDL Cholesterol Ratio","link_rewrite":"hdl-ldl-cholesterol-ratio"}]},{"id":"6","ptype":"profile","name":"Kidney Function Test","link_rewrite":"kidney-function-test","package_id":"223","tests":[{"profile_id":"6","id":"531","ptype":"parameter","name":"BUN Urea Nitrogen, Serum","link_rewrite":"bun-urea-nitrogen-serum"},{"profile_id":"6","id":"548","ptype":"parameter","name":"Calcium Total, Serum","link_rewrite":"calcium-total-serum"},{"profile_id":"6","id":"621","ptype":"parameter","name":"Chlorides, Serum","link_rewrite":"chlorides-serum"},{"profile_id":"6","id":"696","ptype":"parameter","name":"Creatinine, Serum","link_rewrite":"creatinine-serum"},{"profile_id":"6","id":"1919","ptype":"parameter","name":"Potassium, Serum","link_rewrite":"potassium-serum"},{"profile_id":"6","id":"1947","ptype":"parameter","name":"Proteins, Serum","link_rewrite":"proteins-serum"},{"profile_id":"6","id":"2040","ptype":"parameter","name":"Sodium, Serum","link_rewrite":"sodium-serum"},{"profile_id":"6","id":"2206","ptype":"parameter","name":"Urea, Serum","link_rewrite":"urea-serum"},{"profile_id":"6","id":"2208","ptype":"parameter","name":"Uric Acid, Serum","link_rewrite":"uric-acid-serum"},{"profile_id":"6","id":"2298","ptype":"parameter","name":"BUN/Creatinine Ratio ","link_rewrite":"bun-creatinine-ratio"},{"profile_id":"6","id":"2299","ptype":"parameter","name":"Urea/Creatinine Ratio","link_rewrite":"urea-creatinine-ratio"},{"profile_id":"6","id":"2303","ptype":"parameter","name":"EGFR","link_rewrite":"egfr-5"}]},{"id":"7","ptype":"profile","name":"Urine Routine & Microscopy","link_rewrite":"urine-routine-microscopy","package_id":"223","tests":[{"profile_id":"7","id":"1886","ptype":"parameter","name":"pH Urine","link_rewrite":"ph-urine"},{"profile_id":"7","id":"2044","ptype":"parameter","name":"Specific gravity","link_rewrite":"specific-gravity"},{"profile_id":"7","id":"2211","ptype":"parameter","name":"Urobilinogen","link_rewrite":"urobilinogen"},{"profile_id":"7","id":"2276","ptype":"parameter","name":"Colour","link_rewrite":"colour"},{"profile_id":"7","id":"2277","ptype":"parameter","name":"Transparency","link_rewrite":"transparency"},{"profile_id":"7","id":"2279","ptype":"parameter","name":"Albumin","link_rewrite":"albumin"},{"profile_id":"7","id":"2280","ptype":"parameter","name":"Sugar","link_rewrite":"sugar"},{"profile_id":"7","id":"2281","ptype":"parameter","name":"Ketone","link_rewrite":"ketone"},{"profile_id":"7","id":"2283","ptype":"parameter","name":"Bile pigments, urine","link_rewrite":"bile-pigments-urine"},{"profile_id":"7","id":"2285","ptype":"parameter","name":"Red blood cells","link_rewrite":"red-blood-cells"},{"profile_id":"7","id":"2286","ptype":"parameter","name":"Pus cells (Leukocytes)","link_rewrite":"pus-cells-leukocytes"},{"profile_id":"7","id":"2287","ptype":"parameter","name":"Epithelial cells","link_rewrite":"epithelial-cells"},{"profile_id":"7","id":"2288","ptype":"parameter","name":"Crystals","link_rewrite":"crystals"},{"profile_id":"7","id":"2289","ptype":"parameter","name":"Cast","link_rewrite":"cast"},{"profile_id":"7","id":"2290","ptype":"parameter","name":"Bacteria","link_rewrite":"bacteria"},{"profile_id":"7","id":"2291","ptype":"parameter","name":"Yeast cells","link_rewrite":"yeast-cells"},{"profile_id":"7","id":"2304","ptype":"parameter","name":"Nitrate","link_rewrite":"nitrate"}]},{"id":"977","ptype":"parameter","name":"Glucose","link_rewrite":"glucose","package_id":"223"}]}')), e.getuserDetails = function(t, a) {
        doPost(d, p.serverUrl + "commonservice/getprofiledetails", {
            keyword: a,
            type: t
        }, "", function(t) {
            t.status && (e.name = t.data.name, e.phone = parseInt(t.data.contact_number), e.email_address = t.data.email_address, e.address = t.data.address, e.locality = t.data.locality, e.locality_id = t.data.locality_id, e.address_id = t.data.address_id, e.city_name = t.data.city_name, e.state_id = t.data.state_id, e.state_name = t.data.state_name, e.latitude = t.data.latitude, e.longitude = t.data.longitude, e.pin_code = t.data.pin_code, e.gender = t.data.gender, e.age = parseInt(t.data.age), e.user_id = t.data.user_id, e.billing_user_id = e.user_id, localStorage.setItem("token", t.data.token), e.token = t.data.token, doPost(d, p.serverUrl + "commonservice/time_slots_post", {
                date: e.availableSlotDates[0].date,
                locality_id: e.locality_id,
                amount: e.deal_price
            }, t.data.token, function(t) {
                t.data && (e.firstDateslots = t.data)
            }), e.user_exists = !0)
        })
    }, doPost(d, p.serverUrl + "commonservice/getSlotDates", {}, "", function(t) {
        "success" == t.status ? e.availableSlotDates = t.data : e.availableSlotDates = []
    }), e.validateForm = function(t) {
        if (e.empty_package = !1, !parseInt(t.instant_package.$viewValue)) return e.invalid_form = !0, e.empty_package = !0, e.fireInvalidFormEvent(t), !1;
        if (t.email_address.$viewValue) {
            var a = t.email_address.$viewValue,
                r = a.indexOf("@"),
                i = a.lastIndexOf(".");
            if (r < 1 || i < r + 2 || i + 2 >= a.length) return e.invalid_form = !0, t.email_address.$invalid = !0, e.fireInvalidFormEvent(t), !1
        }
        if (0 == t.$valid) e.fireInvalidFormEvent(t), e.invalid_form = !0;
        else {
            if (e.package_id = parseInt(t.instant_package.$viewValue), e.package_info = o("getById")(e.packageList, e.package_id), e.deal_price = e.package_info.healthians_price, e.locality = e.locality_id, e.pin_code = parseInt(t.pin_code.$viewValue), !e.user_id) {
                e.name = t.name.$viewValue, e.phone = parseInt(t.phone.$viewValue), e.email_address = t.email_address.$viewValue, e.address = t.address.$viewValue, e.gender = t.gender.$viewValue, e.age = parseInt(t.age.$viewValue), e.relationship = "self";
                var s = {
                    name: e.name,
                    phone: e.phone,
                    email_address: e.email_address,
                    address: e.address,
                    locality: e.locality,
                    pin_code: e.pin_code,
                    gender: e.gender,
                    age: e.age,
                    package_id: e.package_id,
                    relationship: e.relationship,
                    city: e.city_name
                };
                doPost(d, p.serverUrl + "commonservice/CheckMarketingusers", s, "", function(t) {
                    t.status && (e.user_id = t.data.user_id, f.eventTrack("Success", {
                        category: "Booking Screen 1",
                        label: e.name + "," + e.phone + "," + e.email_address
                    }), e.billing_user_id = e.user_id, e.address_id = t.data.address_id, localStorage.setItem("token", t.data.token), e.token = t.data.token, e.instant_booking_state = "time_slot", doPost(d, p.serverUrl + "commonservice/time_slots_post", {
                        date: e.availableSlotDates[0].date,
                        locality_id: e.locality_id,
                        amount: e.deal_price
                    }, t.data.token, function(t) {
                        200 == t.code && (e.firstDateslots = t.data, e.instant_booking_state = "time_slot", $(".nav-tabs").scrollingTabs())
                    }))
                })
            }
            e.user_id && (f.eventTrack("Success", {
                category: "Booking Screen 1",
                label: e.name + "," + e.phone + "," + e.email_address
            }), e.instant_booking_state = "time_slot", $(".nav-tabs").scrollingTabs())
        }
    }, e.fireInvalidFormEvent = function(e) {
        f.eventTrack("Failed", {
            category: "Booking Screen 1",
            label: e.name.$viewValue + "," + parseInt(e.phone.$viewValue) + "," + e.email_address.$viewValue
        })
    }, doPost(d, p.serverUrl + "commonservice/getPackages", {
        city: e.city_id
    }, "", function(t) {
        "success" === t.status ? e.packageList = t.data : e.errorMessage = "No Time slot available for this date."
    }), e.getLocalityUsingLatLong = function() {
        var t = p.serverUrl + "commonservice/getnearestlocality",
            a = {
                lat: n.sub_lat,
                long: n.sub_long
            };
        doPost(d, t, a, "", function(t) {
            if (e.out_of_area = !1, 1 == t.status) e.locality_id = t.data.locality_id, e.locality = t.data.locality, e.city_name = t.data.city_name,
                e.state_id = t.data.state_id, e.state_name = t.data.state_name, e.latitude = t.data.latitude, e.longitude = t.data.longitude, e.pin_code = parseInt(n.postal_code);
            else {
                var a = $("#getinstantForm");
                a.find("[name=locality]").val(""), e.out_of_area = !0
            }
        })
    }, e.getDateWiseSlot = function(t, a) {
        doPost(d, p.serverUrl + "commonservice/time_slots_post", {
            date: t,
            locality_id: e.locality_id,
            amount: e.deal_price
        }, e.token, function(t) {
            if (200 == t.code) {
                switch (a) {
                    case 1:
                        e.firstDateslots = t.data;
                        break;
                    case 2:
                        e.secondDateslots = t.data;
                        break;
                    case 3:
                        e.thirdDateslots = t.data;
                        break;
                    case 4:
                        e.fourthDateslots = t.data;
                        break;
                    case 5:
                        e.fifthDateslots = t.data
                }
                e.errorMessage = ""
            } else e.errorMessage = "No Time slot available for this date."
        })
    }, e.setTimeSlot = function(t, a, r) {
        return e.slot_id === t ? (e.SlotError = "", e.slot_id = "", !1) : ($(".tab-content  a").removeClass("selected"), e.slot_id = t, e.time_slot = {
            slot_id: t,
            start_time: a,
            end_time: r
        }, void(e.SlotError = ""))
    }, e.freezeTimeSlot = function() {
        return "" == e.slot_id ? (e.SlotError = "Please select time-slot for sample.", f.eventTrack("Failed", {
            category: "Date & Slot screen",
            label: e.user_id
        }), !1) : (null != h && "undefined" != h && "" != h || (h = localStorage.getItem("token")), void doPost(d, p.serverUrl + "commonservice/freezeSlotBySlotId", {
            slot_id: e.slot_id
        }, h, function(t) {
            200 == t.code ? (e.instant_booking_state = "payment", e.SlotError = "", f.eventTrack("Success", {
                category: "Date & Slot screen",
                label: e.user_id
            })) : (e.SlotError = "Please choose another slot.", f.eventTrack("Failed", {
                category: "Date & Slot screen",
                label: e.user_id
            }))
        }))
    }, e.verifyCoupon = function(t) {
        return t ? "" == t.trim() ? (e.SlotError = "Please select time-slot for sample.", !1) : void doPost(d, p.serverUrl + "commonservice/get_coupon_discount", {
            coupon: t,
            amount: e.deal_price
        }, h, function(a) {
            a.status ? (e.coupon_message = "Coupon applied successfully.", e.couponError = "", e.discount = a.data.discount, e.couponCode = t, e.updatePrice(), f.eventTrack("Applies coupon", {
                category: "Make Payment screen",
                label: e.user_id + "-" + e.couponCode,
                value: e.discount
            })) : (e.couponError = a.message, e.coupon_message = "", e.discount = 0, e.updatePrice())
        }) : (e.couponError = "Please Enter a coupon code", e.updatePrice(), !1)
    }, e.finalPay = function() {
        e.showBookingLoader = !1, e.address_detail = {
            address_id: e.address_id,
            address: e.address,
            lat: e.latitude,
            long: e.longitude,
            state_id: e.state_id,
            state_name: e.state_name,
            city: e.city_name,
            locality_id: e.locality_id,
            pincode: e.pin_code
        }, e.order_detail = [{
            user_id: e.user_id,
            package: [{
                tcategory_id: e.package_info.tcategory_id,
                healthians_price: e.package_info.healthians_price,
                actaul_price: e.package_info.actaul_price,
                costId: e.package_info.cost_id
            }]
        }];
        var t = {
            billing_user_id: e.billing_user_id,
            hard_copy: "no",
            address: e.address_detail,
            deal_price: e.package_info.healthians_price,
            order_detail: e.order_detail,
            time_slot: e.time_slot,
            coupon: e.couponCode,
            discount: e.discount,
            email: e.email_address,
            hard_copy: e.is_hard_copy
        };
        doPost(d, p.serverUrl + "commonservice/bookorder", t, h, function(t) {
            t.status ? (e.booking_id = t.data.booking_id, localStorage.setItem("booking_id", e.booking_id), e.userDetail.name = e.name, e.userDetail.mobile = e.phone, e.userDetail.user_id = e.user_id, e.userDetail.age = e.age, console.log(JSON.stringify(e.userDetail)), localStorage.setItem("userDetail", JSON.stringify(e.userDetail)), e.makePaymentInstant(t.data.booking_id)) : e.showBookingLoader = !0
        })
    }, e.setpayradio = function(t) {
        e.payradio = t, f.eventTrack("Selects " + t, {
            category: "Make Payment screen",
            label: e.user_id,
            value: e.hardcopy_sum_price
        })
    }, e.hardCopyFunc = function() {
        if ("" == e.hardcopy_price) {
            var t = p.serverUrl + "commonservice/get_hard_copy_price";
            doGet(d, t, function(t) {
                f.eventTrack("Checked Hard Copy", {
                    category: "Make Payment screen"
                }), e.hardcopy_price = t.data.price, e.updatePrice(), e.is_hard_copy = "yes"
            })
        } else e.hardcopy_price = "", e.updatePrice()
    }, e.updatePrice = function() {
        e.hardcopy_price ? e.hardcopy_sum_price = parseInt(e.deal_price) + parseInt(e.hardcopy_price) : e.hardcopy_sum_price = parseInt(e.deal_price), e.discount ? e.hardcopy_sum_price = parseInt(e.hardcopy_sum_price) - parseInt(e.discount) : e.hardcopy_sum_price = parseInt(e.hardcopy_sum_price)
    }, e.makePaymentInstant = function(t) {
        if (e.showBookingLoader = !1, localStorage.setItem("type_of_payment", "cash" == e.payradio ? "Cash on delivery" : "Online"), e.loaderVar = !0, e.hardcopy_price ? e.txnAmount = parseInt(e.deal_price) + parseInt(e.hardcopy_price) : e.txnAmount = parseInt(e.deal_price), e.discount ? e.txnAmount = parseInt(e.txnAmount) - parseInt(e.discount) : e.txnAmount = parseInt(e.txnAmount), f.eventTrack("Complete Order", {
                category: "Make Payment screen",
                label: e.user_id,
                value: e.txnAmount
            }), "cash" == e.payradio) {
            var a = p.serverUrl + "commonservice/update_payment_type",
                r = {
                    booking_id: t,
                    payment_type: "cash" == e.payradio ? "Cash on delivery" : "Online",
                    term_condition: !0,
                    user_id: e.user_id
                };
            doPost(d, a, r, h, function(a) {
                e.showBookingLoader = !1, a.status ? (u.go("payment-summary", {
                    action: "Get",
                    booking_id: t,
                    mobile: e.phone,
                    user_id: e.user_id
                }), e.confirm_booking = !0) : e.showBookingLoader = !0
            })
        } else if ("paytm" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var o = $("#paytmForm");
            o.find("[name=booking_id]").val(t), o.find("[name=txnAmount]").val(e.txnAmount), o.find("[name=custName]").val(e.name), o.find("[name=custMobile]").val(e.phone), o.find("[name=custEmail]").val(e.email_address), o.find("[name=user_id]").val(e.user_id), o.find("[name=stm_id]").val(e.slot_id), o.submit()
        } else if ("mobikwik" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var o = $("#mobikwikForm");
            o.find("[name=booking_id]").val(t), o.find("[name=txnAmount]").val(e.txnAmount), o.find("[name=custName]").val(e.name), o.find("[name=custMobile]").val(e.phone), o.find("[name=custEmail]").val(e.email_address), o.find("[name=stm_id]").val(e.slot_id), o.submit()
        } else if ("payu" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var o = $("#payuForm");
            o.find("[name=booking_id]").val(t), o.find("[name=txnAmount]").val(e.txnAmount), o.find("[name=custName]").val(e.name), o.find("[name=custMobile]").val(e.phone), o.find("[name=custEmail]").val(e.email_address), o.find("[name=stm_id]").val(e.slot_id), o.submit()
        }
        e.hideContinue = !1
    }
}

function makeOrderPaymentController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p) {
    e.detail = {}, e.error = !1, e.wholediv = !0, e.coupondata = {}, e.coupondata.applied = !1, e.coupondata.hard_copy = !1, e.termsCondition = !0, e.termError = !1, e.payradio = "paytm", e.onlineDiscount = 0;
    var f = g.paymentUrl;
    e.payuAction = p.trustAsResourceUrl(f + "payupayment"), e.mobikwikAction = p.trustAsResourceUrl(f + "mobikwikpayment"), e.payzappAction = p.trustAsResourceUrl(f + "payzapppayment"), e.paytmAction = p.trustAsResourceUrl(f + "paytmpayment"), e.sendOtpFunction = function() {
        void 0 == e.odrderPayment || "" == e.odrderPayment ? e.sendOrderError = !0 : void 0 == e.odrderMobilePayment || "" == e.odrderMobilePayment ? e.sendMobileError = !0 : doPost(l, g.serverUrl + "commonservice/genrate_payment_link", {
            order_id: e.odrderPayment,
            mobile: e.odrderMobilePayment
        }, "", function(t) {
            if (1 == t.status) {
                e.detail = t.data, e.bookingdetail = !0, e.booking_id = e.detail.booking_id, e.discountamount = e.detail.payable_amount, e.total_booking_amount = e.detail.order_price, e.payatcollection = e.detail.payatcollection, e.name = e.detail.customer_name, e.mobile = e.detail.contact_number, e.email = e.detail.email_address, e.slot_id = e.detail.slot_id;
                var a, r = {
                        address: e.detail.address
                    },
                    o = {
                        start_time: e.detail.slot_start_time,
                        end_time: e.detail.slot_end_time
                    },
                    i = {
                        name: e.detail.customer_name,
                        mobile: e.detail.contact_number,
                        email: e.detail.email_address,
                        address: r
                    },
                    s = [];
                e.detail.orderDetail.forEach(function(e, t) {
                    var r = [],
                        o = "";
                    e.Package.forEach(function(e, t) {
                        a = {
                            fasting: e.fasting,
                            fasting_time: e.fasting_time
                        }, e.test_detail.forEach(function(e, t) {
                            o += e.name, o += ","
                        }), r.push({
                            display_name: e.display_name,
                            actual_price: e.actaul_price,
                            healthian_price: e.healthians_price,
                            all_package_StringName: o,
                            all_package_name: e.test_detail
                        })
                    }), s.push({
                        name: e.cust_name,
                        age: e.cust_age,
                        gender: e.cust_gender,
                        pkg: a,
                        newpkg: r
                    })
                }), "yes" === e.detail.hard_copy && (e.coupondata.hard_copy = !0), e.detail.coupon_code && (e.coupondata.applied = !0, e.coupondata.discount = e.detail.discounted_amount), localStorage.setItem("booking_id", e.detail.booking_id), localStorage.setItem("coupondata", e.detail.booking_id), localStorage.setItem("userDetail", JSON.stringify(i)), localStorage.setItem("sample_date", e.detail.order_date), "Cash on delivery" !== localStorage.getItem("type_of_payment") && localStorage.setItem("type_of_payment", "Online"), localStorage.setItem("customerDetails", JSON.stringify(s)), localStorage.setItem("time_slot", JSON.stringify(o)), localStorage.setItem("total_amount", e.detail.payable_amount), localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), e.bookingdetail = !1, e.paymentsection = !0
            } else e.error = !0, e.errorMsg = t.message, e.bookingdetail = !0, e.paymentsection = !1
        }), i(function() {
            e.sendOrderError = !1, e.sendMobileError = !1, e.error = !1
        }, 3e3)
    }, n.search().booking_id && n.search().mobile ? (e.odrderPayment = n.search().booking_id, e.odrderMobilePayment = n.search().mobile, e.sendOtpFunction()) : (n.search().booking_id && (e.odrderPayment = n.search().booking_id), e.bookingdetail = !0, e.paymentsection = !1), e.sendDetailFunction = function() {
        void 0 == e.orderPayment || "" == e.orderPayment ? e.sendBookingError = !0 : void 0 == e.orderReferencePayment || "" == e.orderReferencePayment ? e.sendReferenceError = !0 : doPost(l, g.serverUrl + "commonservice/varify_payment_reference_number", {
            order_id: e.orderPayment,
            reference_number: e.orderReferencePayment
        }, "", function(t) {
            if (1 == t.status) {
                e.detail = t.data, e.bookingdetail = !0, e.booking_id = e.detail.booking_id, e.discountamount = e.detail.payable_amount, e.total_booking_amount = e.detail.order_price, e.payatcollection = e.detail.payatcollection, e.name = e.detail.customer_name, e.mobile = e.detail.contact_number, e.email = e.detail.email_address, e.slot_id = e.detail.slot_id;
                var a, r = {
                        address: e.detail.address
                    },
                    o = {
                        start_time: e.detail.slot_start_time,
                        end_time: e.detail.slot_end_time
                    },
                    i = {
                        name: e.detail.customer_name,
                        mobile: e.detail.contact_number,
                        email: e.detail.email_address,
                        address: r
                    },
                    s = [],
                    n = [],
                    l = "";
                e.detail.orderDetail.forEach(function(e, t) {
                    e.Package.forEach(function(e, t) {
                        a = {
                            fasting: e.fasting,
                            fasting_time: e.fasting_time
                        }, e.test_detail.forEach(function(e, t) {
                            l += e.name, l += ","
                        }), n.push({
                            display_name: e.display_name,
                            actual_price: e.actaul_price,
                            healthian_price: e.healthians_price,
                            all_package_StringName: l,
                            all_package_name: e.test_detail
                        })
                    }), s.push({
                        name: e.cust_name,
                        age: e.cust_age,
                        gender: e.cust_gender,
                        pkg: a,
                        newpkg: n
                    })
                }), "yes" === e.detail.hard_copy && (e.coupondata.hard_copy = !0), e.detail.coupon_code && (e.coupondata.applied = !0, e.coupondata.discount = e.detail.discounted_amount), e.payatcollection = e.detail.payatcollection, localStorage.setItem("booking_id", e.detail.booking_id), localStorage.setItem("userDetail", JSON.stringify(i)), localStorage.setItem("sample_date", e.date), "Cash on delivery" !== localStorage.getItem("type_of_payment") && localStorage.setItem("type_of_payment", "Online"), localStorage.setItem("customerDetails", JSON.stringify(s)), localStorage.setItem("time_slot", JSON.stringify(o)), localStorage.setItem("total_amount", e.detail.payable_amount), localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), e.bookingdetail = !1, e.paymentsection = !0
            } else e.error = !0, e.errorMsg = t.message, e.bookingdetail = !0, e.paymentsection = !1
        }), i(function() {
            e.sendBookingError = !1, e.sendReferenceError = !1, e.error = !1
        }, 3e3)
    }, e.termsConditionCheck = function() {
        1 == e.termsCondition, e.termError = !1
    }, e.payFunction = function() {
        e.paymentsection = !0, e.bookingdetail = !1
    }, e.makeFinalPayment = function() {
        if (void 0 === e.termsCondition || e.termsCondition === !1) return e.termError = !0, focus("userterms"), !1;
        if (localStorage.setItem("type_of_payment", "cash" == e.payradio ? "Cash on delivery" : "Online"), "cash" == e.payradio) {
            var t = g.serverUrl + "commonservice/update_payment_type",
                a = {
                    booking_id: e.booking_id,
                    payment_type: "cash" == e.payradio ? "Cash on delivery" : "Online",
                    term_condition: !0
                };
            doPost(l, t, a, "", function(t) {
                e.loaderVar = !1, t.status && c.go("payment-summary", {
                    action: "Get",
                    booking_id: e.booking_id,
                    mobile: e.mobile
                })
            })
        }
        if ("payu" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var r = $("#paymentForm");
            r.find("[name=booking_id]").val(e.booking_id), r.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), r.find("[name=custName]").val(e.name), r.find("[name=custMobile]").val(e.mobile), r.find("[name=custEmail]").val(e.email), r.find("[name=stm_id]").val(e.slot_id), r.submit()
        }
        if ("mobikwik" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var r = $("#paymentForm3");
            r.find("[name=booking_id]").val(e.booking_id), r.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), r.find("[name=custName]").val(e.name), r.find("[name=custMobile]").val(e.mobile), r.find("[name=custEmail]").val(e.email), r.find("[name=stm_id]").val(e.slot_id), r.submit()
        }
        if ("paytm" == e.payradio) {
            localStorage.setItem("makepayment_to_summary", "true");
            var r = $("#paymentForm2");
            r.find("[name=booking_id]").val(e.booking_id), r.find("[name=txnAmount]").val(e.discountamount - e.onlineDiscount), r.find("[name=custName]").val(e.name), r.find("[name=custMobile]").val(e.mobile), r.find("[name=custEmail]").val(e.email), r.find("[name=user_id]").val(e.booking_id), r.find("[name=stm_id]").val(e.slot_id), r.submit()
        }
    }
}

function orderTrackingController(e, t, a, r, o, i, s, n, l, d) {
    e.packageList = [], e.tags = [], e.pkgDetail = [], e.loading = !0, e.stateParms = n;
    var m = {
        order_id: e.stateParms.booking_id,
        user_id: JSON.parse(localStorage.getItem("user")).user_id
    };
    e.allowedStatus = ["2", "5", "7", "9", "12", "15", "20", "102"], d.getOrderTrackingDetails(m, function(t) {
        if (t.status) {
            e.bookingDetail = t.data;
            var a = 0;
            null !== e.bookingDetail.discounted_amount && (a = parseInt(e.bookingDetail.discounted_amount)), "yes" === e.bookingDetail.hard_copy ? e.total_amount = parseInt(e.bookingDetail.total_amount) + 50 : e.total_amount = parseInt(e.bookingDetail.total_amount)
        } else r.path("/dashboard")
    }), e.getorderValue = function(e) {
        return e.healthians_price
    }
}

function packageController(e, t, a, r, o, i, s, n, l, d, m, c, u, g, p, m, f, y) {
    if (e.packageList = [], e.tags = [], e.pkgDetail = [], e.loading = !0, e.also_consider_loading = !0, e.stateParms = u, e.addToCartModal = !1, e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.viewPkgbox = !1, e.customerDetails = [], e.searchedCartPackage = "", e.customerIndex = void 0, e.addfield = !0, e.rel = !1, e.RelationShip = [], e.RelationShipwithoutSelf = [], e.samepkg = !1, e.addhide = !1, e.addNewPatient = !1, e.addNewPatientSocial = !1, e.tempUser = [], e.temp = "", e.errorPkg = !1, e.errorPkgMsg = "", e.packageDetailsPage = !0, e.stateParms) {
        e.deal_type = c.current.name, e.link_rewrite = e.stateParms.link_rewrite;
        var h = JSON.parse(localStorage.getItem("cityID"));
        null === h ? (e.city_id = 23, localStorage.setItem("cityID", JSON.stringify([{
            city_id: "23",
            city_name: "Gurgaon"
        }]))) : e.city_id = h[0].city_id
    }
    var v = {
            deal_type: e.deal_type,
            link_rewrite: e.link_rewrite,
            city: e.city_id
        },
        k = g.serverUrl + "commonservice/get_deal_details_for_seo";
    doPost(l, k, v, "", function(t) {
        1 == t.status ? (e.loading = !1, e.errorPkg = !1, e.pkgDetail = t.data, e.pkgDetail.healthian_price = e.pkgDetail.healthians_price, e.pkgDetail.actual_price = e.pkgDetail.actaul_price, e.pkgDetail.test_count = e.pkgDetail.test_details.length, e.pkgDetail.testId = e.pkgDetail.package_id, e.pkgDetail.display_name = e.pkgDetail.package_name, e.pkgDetail.test_packages = [{
            testId: e.pkgDetail.package_id,
            display_name: e.pkgDetail.package_name,
            healthians_price: e.pkgDetail.healthians_price,
            healthian_price: e.pkgDetail.healthians_price,
            actual_price: e.pkgDetail.actaul_price,
            costId: e.pkgDetail.costId,
            tcategory_id: e.pkgDetail.package_id
        }], e.pkgDetail.include_tests = [], e.pkgDetail.also_include_tests = [], e.pkgDetail.test_details.forEach(function(t, a) {
            t.tcategory_name = t.name, e.pkgDetail.include_tests.push(t)
        }), s.title = e.pkgDetail.page_title, s.description = e.pkgDetail.meta_description, s.keyword = e.pkgDetail.meta_keyword, s.meta_footer = e.pkgDetail.meta_footer, e.pkgDetail.is_index || (s.meta_robots = "noindex,nofollow"), e.getPopularPackages()) : (e.pkgDetail = {}, e.loading = !1, e.errorPkg = !0, e.errorPkgMsg = t.message, n.url("/404-error"))
    }), e.getPopularPackages = function() {
        if ("package" == e.deal_type) {
            var t = {
                city: JSON.parse(localStorage.getItem("cityID"))[0].city_name,
                ptype: e.deal_type,
                link_rewrite: e.link_rewrite
            };
            doPost(l, g.serverUrl + "commonservice/getPopularPackages", t, "", function(t) {
                e.packageList = t.data, e.also_consider_loading = !1
            })
        } else {
            var t = {
                city: JSON.parse(localStorage.getItem("cityID"))[0].city_name,
                ptype: e.deal_type,
                link_rewrite: e.link_rewrite
            };
            doPost(l, g.serverUrl + "commonservice/getrecomandation", t, "", function(t) {
                e.packageList = t.data, e.also_consider_loading = !1
            })
        }
    }, e.$on("data_shared", function() {
        e.customerDetails = t.getData(), 0 !== e.customerDetails[0].pkg.healthian_price && (e.orderList = !0, s.count++, "true" != localStorage.getItem("isLogin") && (e.tempUser = JSON.parse(localStorage.getItem("tempUser"))), e.getcustomerForm.sampledate = e.customerDetails[0].date, e.getcustomerForm.location = e.customerDetails[0].location, e.getcustomerForm.sampletime = e.customerDetails[0].time_slot, e.totalAmount()), e.collectiontimeflag = !0
    }), e.pkgSearch = function(t) {
        e.cartclicked = !0, e.searchedCartPackage = e.pkgDetail;
        var a = angular.copy(e.searchedCartPackage);
        if (y.setTempPackage(a), "true" == localStorage.getItem("isLogin")) {
            e.member = JSON.parse(localStorage.getItem("user")).relatives, 0 === e.member.length || 0 !== s.count && "undefined" != typeof s.count ? e.tempUser = JSON.parse(localStorage.getItem("tempUser")) : (e.tempUser = e.member, localStorage.setItem("tempUser", JSON.stringify(e.tempUser))), e.addToCartModal = !0;
            var r = y.getCartDetails();
            if (r.length > 0) {
                var o = y.getSelectedPatient();
                "" !== o.name ? r.forEach(function(t, i) {
                    if (t.name == o.name && t.contact_number == o.phone)
                        if ("undefined" != typeof r[i].pkg) {
                            if ("undefined" !== a.test_packages[0].tcategory_name) var s = _.where(r[i].pkg.test_packages, {
                                tcategory_name: a.test_packages[0].tcategory_name
                            });
                            else var s = _.where(r[i].pkg.test_packages, {
                                display_name: a.test_packages[0].display_name
                            });
                            if (0 == s.length) r[i].pkg.test_packages.push(a.test_packages[0]), r[i].newpkg.push(a), y.setCartDetails(r), y.setSelectedPatient(t.name, t.contact_number), e.totalAmount(), c.go("cart");
                            else {
                                var n = "Same package can't be added for " + r[i].name.toUpperCase() + " . Please select another package.";
                                window.alert(n)
                            }
                        } else r[i].pkg = a, r[i].newpkg = [], r[i].newpkg.push(a), y.setCartDetails(r), y.setSelectedPatient(t.name, t.contact_number), c.go("cart")
                }) : c.go("cart")
            } else r = e.member, y.setCartDetails(r), c.go("cart")
        } else e.$$childHead.loginModal = !e.$$childHead.loginModal, e.$$childHead.signupModal = !1, e.$$childHead.loginTab = !1, e.$$childHead.signupText = "Continue to Cart", e.$$childHead.showSignupForm();
        e.temp = e.searchedCartPackage
    }, e.$on("showPatientDialog", function(t, a) {
        if (console.log("show patient seo"), e.cartclicked ? e.addToCartModal = !0 : e.addToCartModal = !1, "true" == localStorage.getItem("isLogin")) {
            s.loggedin = !0;
            var r = JSON.parse(localStorage.getItem("user")).name,
                o = r.split(" ");
            s.user = o[0].charAt(0).toUpperCase().concat(o[0].substr(1)), e.userLoginDetails = JSON.parse(localStorage.getItem("user")), "true" == localStorage.getItem("isSocialLogin") && ("" === e.userLoginDetails.mobile ? e.mobileModal = !0 : e.mobileModal = !1);
            var i = y.getTempPackage();
            e.pkgSearch(i), e.member = JSON.parse(localStorage.getItem("user")).relatives
        }
    }), e.subscriber = function(t) {
        return void 0 === e.addAddressForm.customerEmail || "" === e.addAddressForm.customerEmail ? (e.addAddressForm.customeremail.$dirty = !0, e.addAddressForm.customeremail.$invalid = !0, e.addAddressForm.customeremail.$error.required = !0, !1) : void doPost(l, g.serverUrl + "commonservice/subscribeNewsLetter/", {
            email: t
        }, "", function(e) {
            1 == e.status ? alert(e.message) : alert(e.data.email)
        })
    }, e.getRelation = function() {
        m.getRealtion(function(t) {
            t.status === !0 && (e.RelationShip = t.data)
        })
    }, e.getRealtionwithoutself = function() {
        m.getRealtionwithoutself(function(t) {
            t.status === !0 && (e.RelationShipwithoutSelf = t.data)
        })
    }, e.addPatient = function() {
        e.disableRelation = !1, e.noResults = !1, e.customerDetails.forEach(function(t, a) {
            "self" === t.relationship && (e.rel = !0, e.addNewPatient = !0)
        }), e.disablePhone = !1, e.disableGender = !1
    }, e.fillPatientDetail = function(t) {
        e.rel = !1, e.getcustomerForm.name = t.name, e.getcustomerForm.phone = t.contact_number, e.getcustomerForm.relation = t.relationship, e.getcustomerForm.gender = t.gender, e.getcustomerForm.age = t.age, "00/00/0000" == t.dob && (e.getcustomerForm.userDOB = ""), e.getcustomerForm.userDOB = t.dob, e.disablePhone = !0, e.disableRelation = !0, e.disableGender = !1, void 0 === e.getcustomerForm.phone || "" === e.getcustomerForm.phone ? e.disablePhone = !1 : void 0 === e.getcustomerForm.relation || "" === e.getcustomerForm.relation ? e.disableRelation = !1 : void 0 !== e.getcustomerForm.gender && "" !== e.getcustomerForm.gender || (e.disableGender = !1), e.addNewPatient = !1
    }, e.addCustomerDetails = function() {
        if (e.loaderVar = !0, e.getcustomerFormSubmitted = !1, void 0 === e.getcustomerForm.name || "" === e.getcustomerForm.name) return e.getcustomerForm.customername.$dirty = !0, e.getcustomerForm.customername.$invalid = !0, e.getcustomerForm.customername.$error.required = !0, e.loaderVar = !1, f.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Name"
        }), focus("customername"), !1;
        if (void 0 === e.getcustomerForm.relation || "" === e.getcustomerForm.relation) return e.getcustomerForm.selectrelation.$dirty = !0, e.getcustomerForm.selectrelation.$invalid = !0, e.getcustomerForm.selectrelation.$error.required = !0, e.loaderVar = !1, f.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Relation"
        }), focus("selectrelation"), !1;
        if (void 0 === e.getcustomerForm.phone || "" === e.getcustomerForm.phone) return e.getcustomerForm.customerphone.$dirty = !0, e.getcustomerForm.customerphone.$invalid = !0, e.getcustomerForm.customerphone.$error.required = !0, e.loaderVar = !1, f.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Contact No."
        }), focus("customerphone"), !1;
        if (void 0 === e.getcustomerForm.age || "" === e.getcustomerForm.age || e.getcustomerForm.age > 120 || e.getcustomerForm.age <= 0) return e.getcustomerForm.customerage.$dirty = !0, e.getcustomerForm.customerage.$invalid = !0, e.getcustomerForm.customerage.$error.required = !0, e.loaderVar = !1, f.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Age"
        }), focus("customerage"), !1;
        if (void 0 === e.getcustomerForm.gender || "" === e.getcustomerForm.gender) return e.getcustomerForm.customergender.$dirty = !0, e.getcustomerForm.customergender.$invalid = !0, e.getcustomerForm.customergender.$error.required = !0, e.loaderVar = !1, f.eventTrack("Validation Faliure on Add Patient detail pop-up", {
            category: "Add Patient Popup",
            label: "Gender"
        }), focus("customergender"), !1;
        if (e.samepkg = !0, e.addhide = !1, e.addNewPatient === !0 && (e.tempUser.push({
                name: e.getcustomerForm.name,
                contact_number: e.getcustomerForm.phone,
                relationship: e.getcustomerForm.relation,
                gender: e.getcustomerForm.gender,
                age: e.getcustomerForm.age,
                dob: e.getcustomerForm.userDOB
            }), localStorage.setItem("tempUser", JSON.stringify(e.tempUser)), e.tempUser = JSON.parse(localStorage.getItem("tempUser"))), e.addNewPatientSocial === !0 && (e.tempUser.push({
                name: e.getcustomerForm.name,
                contact_number: e.getcustomerForm.phone,
                relationship: e.getcustomerForm.relation,
                gender: e.getcustomerForm.gender,
                age: e.getcustomerForm.age,
                dob: e.getcustomerForm.userDOB
            }), localStorage.setItem("tempUser", JSON.stringify(e.tempUser)), e.tempUser = JSON.parse(localStorage.getItem("tempUser"))), "true" == localStorage.getItem("isLogin") ? e.userId = JSON.parse(localStorage.getItem("user")).user_id : e.relationToUser = e.getcustomerForm.relation, e.customerDetails.length > 2) {
            var t, a = angular.copy(e.temp);
            e.customerDetails.forEach(function(r, o) {
                r.name == e.getcustomerForm.name && r.phone == e.getcustomerForm.phone && (e.customerDetails[o].pkg.test_packages.push(a.test_packages[0]), e.customerDetails[o].newpkg.push(a), t = !0, e.totalAmount())
            }), t !== !0 && (e.alertDiv = !0, e.loaderVar = !1, e.btnshow = !0, e.addhide = !1), e.loaderVar = !1
        } else {
            var r = {
                    family_head: e.userId,
                    cust_name: e.getcustomerForm.name,
                    age: e.getcustomerForm.age,
                    birth_date: e.getcustomerForm.userDOB,
                    phone: e.getcustomerForm.phone,
                    gender: e.getcustomerForm.gender,
                    relationship: e.getcustomerForm.relation,
                    dob_type: e.type
                },
                a = angular.copy(e.temp);
            e.freezeSlot(r).then(function(t) {
                var r;
                e.customerDetails.forEach(function(t, o) {
                    t.name == e.getcustomerForm.name && t.phone == e.getcustomerForm.phone && (e.customerDetails[o].pkg.test_packages.push(a.test_packages[0]), e.customerDetails[o].newpkg.push(a), r = !0, e.totalAmount())
                }), r !== !0 && (e.pkgNew = [], e.pkgNew.push(a), e.customerDetails.push({
                    user_id: t.user_id,
                    name: e.getcustomerForm.name,
                    age: e.getcustomerForm.age,
                    relationship: e.getcustomerForm.relation,
                    phone: e.getcustomerForm.phone,
                    gender: e.getcustomerForm.gender,
                    pkg: a,
                    newpkg: e.pkgNew
                }), e.totalAmount()), e.getcustomerForm.selectrelation.$dirty = !1, e.totalAmount(), e.loaderVar = !1, e.btnshow = !0, e.addhide = !1, 0 !== e.amount && 0 !== e.customerDetails[0].pkg.healthians_price ? e.orderList = !0 : e.orderList = !1, s.count++
            });
            e.disableName = !0, e.disableRelation = !0, e.disablePhone = !0, e.disableGender = !1
        }
    }, e.calculateAge = function(t, a) {
        var r = moment(t, "DD/MM/YYYY").format("M"),
            o = (moment(t, "DD/MM/YYYY").format("D"), moment(t, "DD/MM/YYYY").format("Y")),
            i = moment().month() + 1,
            s = new Date,
            n = new Date(t),
            l = s.getFullYear() - o;
        s.getMonth() - n.getMonth();
        i >= r ? e.getcustomerForm.age = l : e.getcustomerForm.age = l - 1, angular.element("#customerage").val(e.getcustomerForm.age)
    }, e.getDOB = function(t, a) {
        var r = moment().subtract(t, "years").format("DD/MM/YYYY");
        if (e.getcustomerForm.userDOB = r, e.type = "estimated", angular.element("#usepdob").datepicker({
                endDate: "-182d"
            }).datepicker("update", e.getcustomerForm.userDOB).on("changeDate", function() {
                e.calculateAge(e.getcustomerForm.userDOB)
            }), e.loggedin === !0) {
            var o = JSON.parse(localStorage.getItem("user"));
            o.relatives.forEach(function(r, o) {
                r.name === a && (r.age = t, r.dob = e.getcustomerForm.userDOB)
            }), localStorage.setItem("user", JSON.stringify(o))
        }
    }, e.freezeSlot = function(t) {
        var a = d.defer(),
            r = e.generateUserId(t);
        return a.resolve(r), a.promise
    }, e.generateUserId = function(e) {
        var t, a = d.defer();
        return m.getUserId(e, function(e) {
            t = e.data[0], a.resolve(t)
        }), a.promise
    }, e.totalAmount = function() {
        e.amount = 0, e.customerDetails.forEach(function(t, a) {
            t.newpkg.forEach(function(t, a) {
                e.amount += parseInt(t.healthians_price)
            })
        }), 0 == e.amount && (e.orderList = !1, e.addToCartModal = !1), localStorage.setItem("amountfinal", e.amount)
    }, e.getSubTotal = function(t, a) {
        return e.subtotal = 0, t.forEach(function(t, a) {
            e.subtotal += parseInt(t.healthians_price)
        }), e.subtotal
    }, e.customerEdit = function(t, a, r) {
        e.previewDiv0 = e.previewDiv1 = e.previewDiv2 = e.previewDiv3 = e.previewDiv4 = e.previewDiv5 = !1;
        parseInt(t.healthians_price);
        e.customerDetails.splice(r, 1), e.totalAmount(), e.alertDiv = !1, 0 == e.customerDetails.length && (e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.addhide = !0, e.btnshow = !1, e.getcustomerFormSubmitted = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1, "true" !== localStorage.getItem("isLogin") && (e.tempUser = []))
    }, e.hoverInOrder = function(t) {
        0 === t ? e.previewDiv3 = !0 : 1 == t ? e.previewDiv4 = !0 : 2 == t && (e.previewDiv5 = !0), e.previewList = e.customerDetails[t].newpkg
    }, e.hoverIn = function(t) {
        0 === t ? e.previewDiv0 = !0 : 1 == t ? e.previewDiv1 = !0 : 2 == t && (e.previewDiv2 = !0), e.previewList = e.customerDetails[t].newpkg
    }, e.hoverOut = function(t) {
        e.previewDiv0 = !1, e.previewDiv1 = !1, e.previewDiv2 = !1, e.previewDiv3 = !1, e.previewDiv4 = !1, e.previewDiv5 = !1, e.previewList = []
    }, e.getPkgCount = function(t, a) {
        return e.testCount = 0, t.newpkg.forEach(function(t, a) {
            e.testCount++
        }), e.testCount
    }, e.booksamePkg = function() {
        "self" === e.getcustomerForm.relation && (e.rel = !0), e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.addhide = !0, e.btnshow = !1, e.getcustomerFormSubmitted = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1
    }, e.bookanotherPkg = function() {
        t.sendData(e.customerDetails), n.path("/orderbook")
    }, e.confirmBook = function() {
        s.total = e.amount, a.sendData1(e.customerDetails), localStorage.setItem("Detailscustomer", JSON.stringify(e.customerDetails))
    }, e.closeaddToCartModal = function() {
        e.btnshow = !1, e.addToCartModal = !1, e.disableName = !1, e.disableRelation = !1, e.disablePhone = !1, e.disableGender = !1, e.getcustomerForm.userDOB = "", e.getcustomerFormSubmitted = !1, e.getcustomerForm.name = "", e.getcustomerForm.phone = "", e.getcustomerForm.age = "", e.getcustomerForm.gender = "", e.getcustomerForm.relation = "", e.getcustomerForm.selectrelation.$dirty = !1, e.getcustomerForm.customername.$dirty = !1, e.getcustomerForm.customerphone.$dirty = !1, e.getcustomerForm.customerage.$dirty = !1, e.getcustomerForm.customergender.$dirty = !1
    }, e.getRelation(), e.getRealtionwithoutself(), e.coupondata = {}, localStorage.setItem("coupondata", JSON.stringify(e.coupondata)), doGet(l, g.serverUrl + "commonservice/getHealthQuote", function(t) {
        t && (e.randomQuote = t.data)
    })
}

function paymentSummaryController(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    if (e.booking_id = localStorage.getItem("booking_id"), e.stateParms = u, e.onlineDiscount = 50, e.getCartTotalTest = function() {
            "true" == localStorage.getItem("isLogin") && (e.cartData = g.getCartDetails(), s.totalCartTest = 0, e.cartData.forEach(function(e, t) {
                e.hasOwnProperty("newpkg") && (s.totalCartTest += e.newpkg.length)
            }))
        }, e.stringToInt = function(e) {
            return parseInt(e)
        }, e.getHardcopyPrice = function() {
            m.getHardcopyPrice(function(t) {
                1 == t.status && (e.hardcopyPrice = t.data.price)
            })
        }, e.getHardcopyPrice(), e.getPaymentSummaryDetails = function(t, a, r) {
            var o = {
                order_id: t
            };
            a && (o.user_id = a), r && (o.mobile = r), m.getPaymentSummaryDetails(o, function(t) {
                1 == t.status ? (e.payment_data = t.data, localStorage.removeItem("booking_id"), g.setSelectedPatient("", ""), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), localStorage.removeItem("address"), localStorage.removeItem("amountfinal"), localStorage.removeItem("coupondata"), localStorage.removeItem("customerDetails"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("sample_date"), localStorage.removeItem("time_slot"), localStorage.removeItem("total_amount"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("Detailscustomer"), e.getCartTotalTest()) : e.payment_api_error = t.message
            })
        }, n.search().booking_id) {
        var p = e.stateParms.booking_id,
            f = "",
            _ = "";
        e.stateParms.user_id ? f = e.stateParms.user_id : null !== localStorage.getItem("user") && (f = JSON.parse(localStorage.getItem("user")).user_id), e.stateParms.mobile ? _ = e.stateParms.mobile : null !== localStorage.getItem("userDetail") && (_ = JSON.parse(localStorage.getItem("userDetail")).mobile), e.getPaymentSummaryDetails(p, f, _)
    }
}

function resetPasswordController(e, t, a, r, o, i, s, n, l, d, m, c, u, g) {
    e.passwordnotmatched = !1, e.resetSucess = !1, e.userHash = u, e.linkexpired = !1, e.reset = function() {
        return e.resetPwdFormSubmitted = !1, void 0 === e.resetPwdForm.userPwd || "" === e.resetPwdForm.userPwd ? (e.resetPwdForm.userpwd.$dirty = !0, e.resetPwdForm.userpwd.$invalid = !0, e.resetPwdForm.userpwd.$error.required = !0, a("userpwd"), !1) : void 0 === e.resetPwdForm.userConfmPwd || "" === e.resetPwdForm.userConfmPwd ? (e.resetPwdForm.userconfmpwd.$dirty = !0, e.resetPwdForm.userconfmpwd.$invalid = !0, e.resetPwdForm.userconfmpwd.$error.required = !0, a("userconfmpwd"), !1) : void(e.resetPwdForm.userPwd !== e.resetPwdForm.userConfmPwd ? e.passwordnotmatched = !0 : e.resetPwdForm.userPwd === e.resetPwdForm.userConfmPwd && (e.passwordnotmatched = !1, doPostJson(o, g.serverUrl + "commonservice/resetPassword", {
            hash: e.userHash.id,
            password: e.resetPwdForm.userPwd
        }, "", function(t) {
            1 == t.status ? e.resetSucess = !0 : (e.linkexpired = !0, e.errorMsg = t.message)
        })))
    }, e.showLoginForm = function() {
        localStorage.setItem("showLoginDialog", "true"), i.path("/home")
    }
}

function paymentFailController(e, t, a, r, o) {
    var i = localStorage.getItem("booking_id"),
        s = "";
    if (null !== localStorage.getItem("userDetail") && (s = JSON.parse(localStorage.getItem("userDetail")).mobile, localStorage.removeItem("address"), localStorage.removeItem("amountfinal"), localStorage.removeItem("coupondata"),
            localStorage.removeItem("customerDetails"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("sample_date"), localStorage.removeItem("time_slot"), localStorage.removeItem("total_amount"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("Detailscustomer")), "true" == localStorage.getItem("isLogin")) {
        var n = JSON.parse(localStorage.getItem("user"));
        s = n.mobile, localStorage.removeItem("address"), localStorage.removeItem("amountfinal"), localStorage.removeItem("coupondata"), localStorage.removeItem("customerDetails"), localStorage.removeItem("houseno"), localStorage.removeItem("landmark"), localStorage.removeItem("postal_code"), localStorage.removeItem("sample_date"), localStorage.removeItem("time_slot"), localStorage.removeItem("total_amount"), localStorage.removeItem("type_of_payment"), localStorage.removeItem("Detailscustomer")
    }
    o.setSelectedPatient("", ""), localStorage.removeItem("tempCart"), localStorage.removeItem("tempPkg"), e.tryAgain = function() {
        r.go("makepayment", {
            action: "Get",
            booking_id: i,
            mobile: s
        })
    }
}

function unsubscribeController(e, t, a, r, o, i, s, n, l, d, m, c, u, m) {}
App.controller("accountActivationController", accountActivationController), accountActivationController.$inject = ["$scope", "$rootScope", "focus", "HomeService", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$stateParams", "ConstConfig"], App.controller("bookOrderController", bookOrderController), bookOrderController.$inject = ["$scope", "$rootScope", "BookOrderService", "$http", "searchDetail", "$element", "dataShare", "dataShare1", "$location", "$localStorage", "$sessionStorage", "$q", "HomeService", "$window", "$filter", "$timeout", "ConstConfig", "$analytics", "$state", "cartService"], App.controller("careerController", careerController), careerController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "$anchorScroll"], App.controller("cartController", cartController), cartController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "cartService", "$analytics", "$window"], App.controller("contactUsController", contactUsController), contactUsController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig"], App.controller("dashboardController", dashboardController), dashboardController.$inject = ["$scope", "$rootScope", "$location", "$anchorScroll", "DashboardService", "BookOrderService", "$timeout", "$window"], App.controller("downloadFileController", downloadFileController), downloadFileController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig"], App.controller("finalCheckoutController", finalCheckoutController), finalCheckoutController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "ConstConfig", "$analytics", "$sce", "$state"], App.controller("footerController", footerController), footerController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "$analytics"], App.controller("headerController", headerController), headerController.$inject = ["$http", "$window", "$scope", "HomeService", "$localStorage", "$sessionStorage", "$location", "$timeout", "$state", "$rootScope", "$remember", "$q", "ConstConfig", "Facebook", "cartService"], App.controller("homeController", homeController), homeController.$inject = ["$scope", "$rootScope", "$anchorScroll", "$state", "$window", "HomeService", "$anchorScroll", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$remember", "ConstConfig", "$analytics", "Facebook", "cartService"], App.controller("homeControllerLogin", homeControllerLogin), homeControllerLogin.$inject = ["$scope", "$rootScope", "focus", "HomeService", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$window", "$remember", "ConstConfig", "$state", "Facebook", "GooglePlus", "$analytics", "fbService"], App.controller("homeControllerForgotpwd", homeControllerForgotpwd), homeControllerForgotpwd.$inject = ["$scope", "$rootScope", "$window", "ConstConfig", "focus", "HomeService", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$uibModal"], App.controller("homeControllerChangepwd", homeControllerChangepwd), homeControllerChangepwd.$inject = ["$scope", "$rootScope", "focus", "HomeService", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$uibModal", "DashboardService"], App.controller("instantbookingController", instantbookingController), instantbookingController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$filter", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "$analytics", "$sce"], App.controller("makeOrderPaymentController", makeOrderPaymentController), makeOrderPaymentController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "$sce"], App.controller("orderTrackingController", orderTrackingController), orderTrackingController.$inject = ["$scope", "$timeout", "$rootScope", "$location", "$http", "$q", "$state", "$stateParams", "ConstConfig", "BookOrderService"], App.controller("packageController", packageController), packageController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "searchDetail", "BookOrderService", "$analytics", "cartService"], App.controller("paymentSummaryController", paymentSummaryController), paymentSummaryController.$inject = ["$scope", "dataShare", "dataShare1", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "cartService"], App.controller("resetPasswordController", resetPasswordController), resetPasswordController.$inject = ["$scope", "$rootScope", "focus", "HomeService", "$http", "$location", "searchDetail", "$timeout", "dataShare", "$localStorage", "$sessionStorage", "$q", "$stateParams", "ConstConfig"], App.controller("paymentFailController", paymentFailController), paymentFailController.$inject = ["$scope", "$rootScope", "$location", "$state", "cartService"], App.controller("unsubscribeController", unsubscribeController), unsubscribeController.$inject = ["$scope", "$localStorage", "$sessionStorage", "$timeout", "$rootScope", "$location", "$http", "$q", "BookOrderService", "$state", "$stateParams", "ConstConfig", "searchDetail", "$stateParams"];
