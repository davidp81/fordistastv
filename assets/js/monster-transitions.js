//------------------------------------------------------------- Start Player
! function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof module && module.exports ? module.exports = e() : t.bodymovin = e()
}(window, function() {
    function ProjectInterface() {
        return {}
    }

    function roundValues(t) {
        bm_rnd = t ? Math.round : function(t) {
            return t
        }
    }

    function roundTo2Decimals(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function roundTo3Decimals(t) {
        return Math.round(100 * t) / 100
    }

    function styleDiv(t) {
        t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
    }

    function styleUnselectableDiv(t) {
        t.style.userSelect = "none", t.style.MozUserSelect = "none", t.style.webkitUserSelect = "none", t.style.oUserSelect = "none"
    }

    function BMEnterFrameEvent(t, e, s, r) {
        this.type = t, this.currentTime = e, this.totalTime = s, this.direction = 0 > r ? -1 : 1
    }

    function BMCompleteEvent(t, e) {
        this.type = t, this.direction = 0 > e ? -1 : 1
    }

    function BMCompleteLoopEvent(t, e, s, r) {
        this.type = t, this.currentLoop = e, this.totalLoops = s, this.direction = 0 > r ? -1 : 1
    }

    function BMSegmentStartEvent(t, e, s) {
        this.type = t, this.firstFrame = e, this.totalFrames = s
    }

    function BMDestroyEvent(t, e) {
        this.type = t, this.target = e
    }

    function _addEventListener(t, e) {
        this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e)
    }

    function _removeEventListener(t, e) {
        if (e) {
            if (this._cbs[t]) {
                for (var s = 0, r = this._cbs[t].length; r > s;) this._cbs[t][s] === e && (this._cbs[t].splice(s, 1), s -= 1, r -= 1), s += 1;
                this._cbs[t].length || (this._cbs[t] = null)
            }
        } else this._cbs[t] = null
    }

    function _triggerEvent(t, e) {
        if (this._cbs[t])
            for (var s = this._cbs[t].length, r = 0; s > r; r++) this._cbs[t][r](e)
    }

    function randomString(t, e) {
        void 0 === e && (e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        var s, r = "";
        for (s = t; s > 0; --s) r += e[Math.round(Math.random() * (e.length - 1))];
        return r
    }

    function HSVtoRGB(t, e, s) {
        var r, i, a, n, o, h, l, p;
        switch (1 === arguments.length && (e = t.s, s = t.v, t = t.h), n = Math.floor(6 * t), o = 6 * t - n, h = s * (1 - e), l = s * (1 - o * e), p = s * (1 - (1 - o) * e), n % 6) {
            case 0:
                r = s, i = p, a = h;
                break;
            case 1:
                r = l, i = s, a = h;
                break;
            case 2:
                r = h, i = s, a = p;
                break;
            case 3:
                r = h, i = l, a = s;
                break;
            case 4:
                r = p, i = h, a = s;
                break;
            case 5:
                r = s, i = h, a = l
        }
        return [r, i, a]
    }

    function RGBtoHSV(t, e, s) {
        1 === arguments.length && (e = t.g, s = t.b, t = t.r);
        var r, i = Math.max(t, e, s),
            a = Math.min(t, e, s),
            n = i - a,
            o = 0 === i ? 0 : n / i,
            h = i / 255;
        switch (i) {
            case a:
                r = 0;
                break;
            case t:
                r = e - s + n * (s > e ? 6 : 0), r /= 6 * n;
                break;
            case e:
                r = s - t + 2 * n, r /= 6 * n;
                break;
            case s:
                r = t - e + 4 * n, r /= 6 * n
        }
        return [r, o, h]
    }

    function addSaturationToRGB(t, e) {
        var s = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return s[1] += e, s[1] > 1 ? s[1] = 1 : s[1] <= 0 && (s[1] = 0), HSVtoRGB(s[0], s[1], s[2])
    }

    function addBrightnessToRGB(t, e) {
        var s = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return s[2] += e, s[2] > 1 ? s[2] = 1 : s[2] < 0 && (s[2] = 0), HSVtoRGB(s[0], s[1], s[2])
    }

    function addHueToRGB(t, e) {
        var s = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return s[0] += e / 360, s[0] > 1 ? s[0] -= 1 : s[0] < 0 && (s[0] += 1), HSVtoRGB(s[0], s[1], s[2])
    }

    function componentToHex(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e
    }

    function fillToRgba(t, e) {
        if (!cachedColors[t]) {
            var s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            cachedColors[t] = parseInt(s[1], 16) + "," + parseInt(s[2], 16) + "," + parseInt(s[3], 16)
        }
        return "rgba(" + cachedColors[t] + "," + e + ")"
    }

    function RenderedFrame(t, e) {
        this.tr = t, this.o = e
    }

    function LetterProps(t, e, s, r, i, a) {
        this.o = t, this.sw = e, this.sc = s, this.fc = r, this.m = i, this.props = a
    }

    function iterateDynamicProperties(t) {
        var e, s = this.dynamicProperties;
        for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(t)
    }

    function reversePath(t) {
        var e, s, r = [],
            i = [],
            a = [],
            n = {},
            o = 0;
        t.c && (r[0] = t.o[0], i[0] = t.i[0], a[0] = t.v[0], o = 1), s = t.i.length;
        var h = s - 1;
        for (e = o; s > e; e += 1) r.push(t.o[h]), i.push(t.i[h]), a.push(t.v[h]), h -= 1;
        return n.i = r, n.o = i, n.v = a, n
    }

    function Matrix() {}

    function matrixManagerFunction() {
        var t = new Matrix,
            e = function(e, s, r, i, a) {
                return t.reset().translate(i, a).rotate(e).scale(s, r).toCSS()
            },
            s = function(t) {
                return e(t.tr.r[2], t.tr.s[0], t.tr.s[1], t.tr.p[0], t.tr.p[1])
            };
        return {
            getMatrix: s
        }
    }

    function createElement(t, e, s) {
        if (!e) {
            var r = Object.create(t.prototype, s),
                i = {};
            return r && "[object Function]" === i.toString.call(r.init) && r.init(), r
        }
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype._parent = t.prototype
    }

    function extendPrototype(t, e) {
        for (var s in t.prototype) t.prototype.hasOwnProperty(s) && (e.prototype[s] = t.prototype[s])
    }

    function bezFunction() {
        function t(t, e, s, r, i, a) {
            var n = t * r + e * i + s * a - i * r - a * t - s * e;
            return n > -1e-4 && 1e-4 > n
        }

        function e(e, s, r, i, a, n, o, h, l) {
            return t(e, s, i, a, o, h) && t(e, r, i, n, o, l)
        }

        function s(t) {
            this.segmentLength = 0, this.points = new Array(t)
        }

        function r(t, e) {
            this.partialLength = t, this.point = e
        }

        function i(t, e) {
            var s = e.segments,
                r = s.length,
                i = bm_floor((r - 1) * t),
                a = t * e.addedLength,
                n = 0;
            if (a == s[i].l) return s[i].p;
            for (var o = s[i].l > a ? -1 : 1, h = !0; h;) s[i].l <= a && s[i + 1].l > a ? (n = (a - s[i].l) / (s[i + 1].l - s[i].l), h = !1) : i += o, (0 > i || i >= r - 1) && (h = !1);
            return s[i].p + (s[i + 1].p - s[i].p) * n
        }

        function a() {
            this.pt1 = new Array(2), this.pt2 = new Array(2), this.pt3 = new Array(2), this.pt4 = new Array(2)
        }

        function n(t, e, s, r, n, o, h) {
            var l = new a;
            n = 0 > n ? 0 : n > 1 ? 1 : n;
            var p = i(n, h);
            o = o > 1 ? 1 : o;
            var m, f = i(o, h),
                d = t.length,
                c = 1 - p,
                u = 1 - f;
            for (m = 0; d > m; m += 1) l.pt1[m] = Math.round(1e3 * (c * c * c * t[m] + (p * c * c + c * p * c + c * c * p) * s[m] + (p * p * c + c * p * p + p * c * p) * r[m] + p * p * p * e[m])) / 1e3, l.pt3[m] = Math.round(1e3 * (c * c * u * t[m] + (p * c * u + c * p * u + c * c * f) * s[m] + (p * p * u + c * p * f + p * c * f) * r[m] + p * p * f * e[m])) / 1e3, l.pt4[m] = Math.round(1e3 * (c * u * u * t[m] + (p * u * u + c * f * u + c * u * f) * s[m] + (p * f * u + c * f * f + p * u * f) * r[m] + p * f * f * e[m])) / 1e3, l.pt2[m] = Math.round(1e3 * (u * u * u * t[m] + (f * u * u + u * f * u + u * u * f) * s[m] + (f * f * u + u * f * f + f * u * f) * r[m] + f * f * f * e[m])) / 1e3;
            return l
        }
        var o = (Math, function() {
                function t(t, e) {
                    this.l = t, this.p = e
                }
                return function(e, s, r, i) {
                    var a, n, o, h, l, p, m = defaultCurveSegments,
                        f = 0,
                        d = [],
                        c = [],
                        u = {
                            addedLength: 0,
                            segments: []
                        };
                    for (o = r.length, a = 0; m > a; a += 1) {
                        for (l = a / (m - 1), p = 0, n = 0; o > n; n += 1) h = bm_pow(1 - l, 3) * e[n] + 3 * bm_pow(1 - l, 2) * l * r[n] + 3 * (1 - l) * bm_pow(l, 2) * i[n] + bm_pow(l, 3) * s[n], d[n] = h, null !== c[n] && (p += bm_pow(d[n] - c[n], 2)), c[n] = d[n];
                        p && (p = bm_sqrt(p), f += p), u.segments.push(new t(f, l))
                    }
                    return u.addedLength = f, u
                }
            }()),
            h = function() {
                var e = {};
                return function(i) {
                    var a = i.s,
                        n = i.e,
                        o = i.to,
                        h = i.ti,
                        l = (a.join("_") + "_" + n.join("_") + "_" + o.join("_") + "_" + h.join("_")).replace(/\./g, "p");
                    if (e[l]) return void(i.bezierData = e[l]);
                    var p, m, f, d, c, u, y, g = defaultCurveSegments,
                        v = 0,
                        b = null;
                    2 === a.length && (a[0] != n[0] || a[1] != n[1]) && t(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && t(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) && (g = 2);
                    var E = new s(g);
                    for (f = o.length, p = 0; g > p; p += 1) {
                        for (y = new Array(f), c = p / (g - 1), u = 0, m = 0; f > m; m += 1) d = bm_pow(1 - c, 3) * a[m] + 3 * bm_pow(1 - c, 2) * c * (a[m] + o[m]) + 3 * (1 - c) * bm_pow(c, 2) * (n[m] + h[m]) + bm_pow(c, 3) * n[m], y[m] = d, null !== b && (u += bm_pow(y[m] - b[m], 2));
                        u = bm_sqrt(u), v += u, E.points[p] = new r(u, y), b = y
                    }
                    E.segmentLength = v, i.bezierData = E, e[l] = E
                }
            }();
        return {
            getBezierLength: o,
            getNewSegment: n,
            buildBezierData: h,
            pointOnLine2D: t,
            pointOnLine3D: e
        }
    }

    function dataFunctionManager() {
        function t(i, a, o) {
            var h, l, p, m, f, d, c, u, y = i.length;
            for (m = 0; y > m; m += 1)
                if (h = i[m], "ks" in h && !h.completed) {
                    if (h.completed = !0, h.tt && (i[m - 1].td = h.tt), l = [], p = -1, h.hasMask) {
                        var g = h.masksProperties;
                        for (d = g.length, f = 0; d > f; f += 1)
                            if (g[f].pt.k.i) r(g[f].pt.k);
                            else
                                for (u = g[f].pt.k.length, c = 0; u > c; c += 1) g[f].pt.k[c].s && r(g[f].pt.k[c].s[0]), g[f].pt.k[c].e && r(g[f].pt.k[c].e[0])
                    }
                    0 === h.ty ? (h.layers = e(h.refId, a), t(h.layers, a, o)) : 4 === h.ty ? s(h.shapes) : 5 == h.ty && n(h, o)
                }
        }

        function e(t, e) {
            for (var s = 0, r = e.length; r > s;) {
                if (e[s].id === t) return e[s].layers;
                s += 1
            }
        }

        function s(t) {
            var e, i, a, n = t.length,
                o = !1;
            for (e = n - 1; e >= 0; e -= 1)
                if ("sh" == t[e].ty) {
                    if (t[e].ks.k.i) r(t[e].ks.k);
                    else
                        for (a = t[e].ks.k.length, i = 0; a > i; i += 1) t[e].ks.k[i].s && r(t[e].ks.k[i].s[0]), t[e].ks.k[i].e && r(t[e].ks.k[i].e[0]);
                    o = !0
                } else "gr" == t[e].ty && s(t[e].it)
        }

        function r(t) {
            var e, s = t.i.length;
            for (e = 0; s > e; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
        }

        function i(t, e) {
            var s = e ? e.split(".") : [100, 100, 100];
            return t[0] > s[0] ? !0 : s[0] > t[0] ? !1 : t[1] > s[1] ? !0 : s[1] > t[1] ? !1 : t[2] > s[2] ? !0 : s[2] > t[2] ? !1 : void 0
        }

        function a(e, s) {
            e.__complete || (h(e), o(e), l(e), t(e.layers, e.assets, s), e.__complete = !0)
        }

        function n(t, e) {
            var s, r, i = t.t.d.k,
                a = i.length;
            for (r = 0; a > r; r += 1) {
                var n = t.t.d.k[r].s;
                s = [];
                var o, h, l, p, m, f, d, c = 0,
                    u = t.t.m.g,
                    y = 0,
                    g = 0,
                    v = 0,
                    b = [],
                    E = 0,
                    P = 0,
                    k = e.getFontByName(n.f),
                    S = 0,
                    x = k.fStyle.split(" "),
                    C = "normal",
                    M = "normal";
                for (h = x.length, o = 0; h > o; o += 1) "italic" === x[o].toLowerCase() ? M = "italic" : "bold" === x[o].toLowerCase() ? C = "700" : "black" === x[o].toLowerCase() ? C = "900" : "medium" === x[o].toLowerCase() ? C = "500" : "regular" === x[o].toLowerCase() || "normal" === x[o].toLowerCase() ? C = "400" : ("light" === x[o].toLowerCase() || "thin" === x[o].toLowerCase()) && (C = "200");
                if (n.fWeight = C, n.fStyle = M, h = n.t.length, n.sz) {
                    var A = n.sz[0],
                        D = -1;
                    for (o = 0; h > o; o += 1) l = !1, " " === n.t.charAt(o) ? D = o : 13 === n.t.charCodeAt(o) && (E = 0, l = !0), e.chars ? (d = e.getCharData(n.t.charAt(o), k.fStyle, k.fFamily), S = l ? 0 : d.w * n.s / 100) : S = e.measureText(n.t.charAt(o), n.f, n.s), E + S > A ? (-1 === D ? (n.t = n.t.substr(0, o) + "\r" + n.t.substr(o), h += 1) : (o = D, n.t = n.t.substr(0, o) + "\r" + n.t.substr(o + 1)), D = -1, E = 0) : E += S;
                    h = n.t.length
                }
                for (E = 0, S = 0, o = 0; h > o; o += 1)
                    if (l = !1, " " === n.t.charAt(o) ? p = " " : 13 === n.t.charCodeAt(o) ? (b.push(E), P = E > P ? E : P, E = 0, p = "", l = !0, v += 1) : p = n.t.charAt(o), e.chars ? (d = e.getCharData(n.t.charAt(o), k.fStyle, e.getFontByName(n.f).fFamily), S = l ? 0 : d.w * n.s / 100) : S = e.measureText(p, n.f, n.s), E += S, s.push({
                            l: S,
                            an: S,
                            add: y,
                            n: l,
                            anIndexes: [],
                            val: p,
                            line: v
                        }), 2 == u) {
                        if (y += S, "" == p || " " == p || o == h - 1) {
                            for (("" == p || " " == p) && (y -= S); o >= g;) s[g].an = y, s[g].ind = c, s[g].extra = S, g += 1;
                            c += 1, y = 0
                        }
                    } else if (3 == u) {
                    if (y += S, "" == p || o == h - 1) {
                        for ("" == p && (y -= S); o >= g;) s[g].an = y, s[g].ind = c, s[g].extra = S, g += 1;
                        y = 0, c += 1
                    }
                } else s[c].ind = c, s[c].extra = 0, c += 1;
                if (n.l = s, P = E > P ? E : P, b.push(E), n.sz) n.boxWidth = n.sz[0], n.justifyOffset = 0;
                else switch (n.boxWidth = P, n.j) {
                    case 1:
                        n.justifyOffset = -n.boxWidth;
                        break;
                    case 2:
                        n.justifyOffset = -n.boxWidth / 2;
                        break;
                    default:
                        n.justifyOffset = 0
                }
                n.lineWidths = b;
                var T = t.t.a;
                f = T.length;
                var w, F, I = [];
                for (m = 0; f > m; m += 1) {
                    for (T[m].a.sc && (n.strokeColorAnim = !0), T[m].a.sw && (n.strokeWidthAnim = !0), (T[m].a.fc || T[m].a.fh || T[m].a.fs || T[m].a.fb) && (n.fillColorAnim = !0), F = 0, w = T[m].s.b, o = 0; h > o; o += 1) s[o].anIndexes[m] = F, (1 == w && "" != s[o].val || 2 == w && "" != s[o].val && " " != s[o].val || 3 == w && (s[o].n || " " == s[o].val || o == h - 1) || 4 == w && (s[o].n || o == h - 1)) && (1 === T[m].s.rn && I.push(F), F += 1);
                    t.t.a[m].s.totalChars = F;
                    var V, B = -1;
                    if (1 === T[m].s.rn)
                        for (o = 0; h > o; o += 1) B != s[o].anIndexes[m] && (B = s[o].anIndexes[m], V = I.splice(Math.floor(Math.random() * I.length), 1)[0]), s[o].anIndexes[m] = V
                }
                0 !== f || "m" in t.t.p || (t.singleShape = !0), n.yOffset = n.lh || 1.2 * n.s, n.ascent = k.ascent * n.s / 100
            }
        }
        var o = function() {
                function t(t) {
                    var e = t.t.d;
                    t.t.d = {
                        k: [{
                            s: e,
                            t: 0
                        }]
                    }
                }

                function e(e) {
                    var s, r = e.length;
                    for (s = 0; r > s; s += 1) 5 === e[s].ty && t(e[s])
                }
                var s = [4, 4, 14];
                return function(t) {
                    if (i(s, t.v) && (e(t.layers), t.assets)) {
                        var r, a = t.assets.length;
                        for (r = 0; a > r; r += 1) t.assets[r].layers && e(t.assets[r].layers)
                    }
                }
            }(),
            h = function() {
                function t(e) {
                    var s, r, i, a = e.length;
                    for (s = 0; a > s; s += 1)
                        if ("gr" === e[s].ty) t(e[s].it);
                        else if ("fl" === e[s].ty || "st" === e[s].ty)
                        if (e[s].c.k && e[s].c.k[0].i)
                            for (i = e[s].c.k.length, r = 0; i > r; r += 1) e[s].c.k[r].s && (e[s].c.k[r].s[0] /= 255, e[s].c.k[r].s[1] /= 255, e[s].c.k[r].s[2] /= 255, e[s].c.k[r].s[3] /= 255), e[s].c.k[r].e && (e[s].c.k[r].e[0] /= 255, e[s].c.k[r].e[1] /= 255, e[s].c.k[r].e[2] /= 255, e[s].c.k[r].e[3] /= 255);
                        else e[s].c.k[0] /= 255, e[s].c.k[1] /= 255, e[s].c.k[2] /= 255, e[s].c.k[3] /= 255
                }

                function e(e) {
                    var s, r = e.length;
                    for (s = 0; r > s; s += 1) 4 === e[s].ty && t(e[s].shapes)
                }
                var s = [4, 1, 9];
                return function(t) {
                    if (i(s, t.v) && (e(t.layers), t.assets)) {
                        var r, a = t.assets.length;
                        for (r = 0; a > r; r += 1) t.assets[r].layers && e(t.assets[r].layers)
                    }
                }
            }(),
            l = function() {
                function t(e) {
                    var s, r, i, a = e.length,
                        n = !1;
                    for (s = a - 1; s >= 0; s -= 1)
                        if ("sh" == e[s].ty) {
                            if (e[s].ks.k.i) e[s].ks.k.c = e[s].closed;
                            else
                                for (i = e[s].ks.k.length, r = 0; i > r; r += 1) e[s].ks.k[r].s && (e[s].ks.k[r].s[0].c = e[s].closed), e[s].ks.k[r].e && (e[s].ks.k[r].e[0].c = e[s].closed);
                            n = !0
                        } else "gr" == e[s].ty && t(e[s].it)
                }

                function e(e) {
                    var s, r, i, a, n, o, h = e.length;
                    for (r = 0; h > r; r += 1) {
                        if (s = e[r], s.hasMask) {
                            var l = s.masksProperties;
                            for (a = l.length, i = 0; a > i; i += 1)
                                if (l[i].pt.k.i) l[i].pt.k.c = l[i].cl;
                                else
                                    for (o = l[i].pt.k.length, n = 0; o > n; n += 1) l[i].pt.k[n].s && (l[i].pt.k[n].s[0].c = l[i].cl), l[i].pt.k[n].e && (l[i].pt.k[n].e[0].c = l[i].cl)
                        }
                        4 === s.ty && t(s.shapes)
                    }
                }
                var s = [4, 4, 18];
                return function(t) {
                    if (i(s, t.v) && (e(t.layers), t.assets)) {
                        var r, a = t.assets.length;
                        for (r = 0; a > r; r += 1) t.assets[r].layers && e(t.assets[r].layers)
                    }
                }
            }(),
            p = {};
        return p.completeData = a, p
    }

    function ShapeModifier() {}

    function TrimModifier() {}

    function RoundCornersModifier() {}

    function BaseRenderer() {}

    function SVGRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.globalData = {
            frameNum: -1
        }, this.renderConfig = {
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            progressiveLoad: e && e.progressiveLoad || !1
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1
    }

    function MaskElement(t, e, s) {
        this.dynamicProperties = [], this.data = t, this.element = e, this.globalData = s, this.paths = [], this.storedData = [], this.masksProperties = this.data.masksProperties, this.viewData = new Array(this.masksProperties.length), this.maskElement = null, this.firstFrame = !0;
        var r, i, a, n, o, h, l, p, m = this.globalData.defs,
            f = this.masksProperties.length,
            d = this.masksProperties,
            c = 0,
            u = [],
            y = randomString(10),
            g = "clipPath",
            v = "clip-path";
        for (r = 0; f > r; r++)
            if (("a" !== d[r].mode && "n" !== d[r].mode || d[r].inv || 100 !== d[r].o.k) && (g = "mask", v = "mask"), "s" != d[r].mode && "i" != d[r].mode || 0 != c ? o = null : (o = document.createElementNS(svgNS, "rect"), o.setAttribute("fill", "#ffffff"), o.setAttribute("width", this.element.comp.data ? this.element.comp.data.w : this.element.globalData.compSize.w), o.setAttribute("height", this.element.comp.data ? this.element.comp.data.h : this.element.globalData.compSize.h), u.push(o)), i = document.createElementNS(svgNS, "path"), "n" != d[r].mode) {
                if (c += 1, "s" == d[r].mode ? i.setAttribute("fill", "#000000") : i.setAttribute("fill", "#ffffff"), i.setAttribute("clip-rule", "nonzero"), 0 !== d[r].x.k) {
                    g = "mask", v = "mask", p = PropertyFactory.getProp(this.element, d[r].x, 0, null, this.dynamicProperties);
                    var b = "fi_" + randomString(10);
                    h = document.createElementNS(svgNS, "filter"), h.setAttribute("id", b), l = document.createElementNS(svgNS, "feMorphology"), l.setAttribute("operator", "dilate"), l.setAttribute("in", "SourceGraphic"), l.setAttribute("radius", "0"), h.appendChild(l), m.appendChild(h), "s" == d[r].mode ? i.setAttribute("stroke", "#000000") : i.setAttribute("stroke", "#ffffff")
                } else l = null, p = null;
                if (this.storedData[r] = {
                        elem: i,
                        x: p,
                        expan: l,
                        lastPath: "",
                        lastOperator: "",
                        filterId: b,
                        lastRadius: 0
                    }, "i" == d[r].mode) {
                    n = u.length;
                    var E = document.createElementNS(svgNS, "g");
                    for (a = 0; n > a; a += 1) E.appendChild(u[a]);
                    var P = document.createElementNS(svgNS, "mask");
                    P.setAttribute("mask-type", "alpha"), P.setAttribute("id", y + "_" + c), P.appendChild(i), m.appendChild(P), E.setAttribute("mask", "url(#" + y + "_" + c + ")"), u.length = 0, u.push(E)
                } else u.push(i);
                d[r].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[r] = {
                    elem: i,
                    lastPath: "",
                    op: PropertyFactory.getProp(this.element, d[r].o, 0, .01, this.dynamicProperties),
                    prop: ShapePropertyFactory.getShapeProp(this.element, d[r], 3, this.dynamicProperties, null)
                }, o && (this.viewData[r].invRect = o), this.viewData[r].prop.k || this.drawPath(d[r], this.viewData[r].prop.v, this.viewData[r])
            } else this.viewData[r] = {
                op: PropertyFactory.getProp(this.element, d[r].o, 0, .01, this.dynamicProperties),
                prop: ShapePropertyFactory.getShapeProp(this.element, d[r], 3, this.dynamicProperties, null),
                elem: i
            }, m.appendChild(i);
        for (this.maskElement = document.createElementNS(svgNS, g), f = u.length, r = 0; f > r; r += 1) this.maskElement.appendChild(u[r]);
        this.maskElement.setAttribute("id", y), c > 0 && this.element.maskedElement.setAttribute(v, "url(#" + y + ")"), m.appendChild(this.maskElement)
    }

    function BaseElement() {}

    function SVGBaseElement(t, e, s, r, i) {
        this.globalData = s, this.comp = r, this.data = t, this.matteElement = null, this.transformedElement = null, this.parentContainer = e, this.layerId = i ? i.layerId : "ly_" + randomString(10), this.placeholder = i, this.init()
    }

    function ITextElement(t, e, s, r) {}

    function SVGTextElement(t, e, s, r, i) {
        this.textSpans = [], this.renderType = "svg", this._parent.constructor.call(this, t, e, s, r, i)
    }

    function SVGTintFilter(t, e) {
        this.filterManager = e;
        var s = document.createElementNS(svgNS, "feColorMatrix");
        if (s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "linearRGB"), s.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), s.setAttribute("result", "f1"), t.appendChild(s), s = document.createElementNS(svgNS, "feColorMatrix"), s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), s.setAttribute("result", "f2"), t.appendChild(s), this.matrixFilter = s, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
            var r = document.createElementNS(svgNS, "feMerge");
            t.appendChild(r);
            var i;
            i = document.createElementNS(svgNS, "feMergeNode"), i.setAttribute("in", "SourceGraphic"), r.appendChild(i), i = document.createElementNS(svgNS, "feMergeNode"), i.setAttribute("in", "f2"), r.appendChild(i)
        }
    }

    function SVGFillFilter(t, e) {
        this.filterManager = e;
        var s = document.createElementNS(svgNS, "feColorMatrix");
        s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(s), this.matrixFilter = s
    }

    function SVGStrokeEffect(t, e) {
        this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
    }

    function SVGTritoneFilter(t, e) {
        this.filterManager = e;
        var s = document.createElementNS(svgNS, "feColorMatrix");
        s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "linearRGB"), s.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), s.setAttribute("result", "f1"), t.appendChild(s);
        var r = document.createElementNS(svgNS, "feComponentTransfer");
        r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), this.matrixFilter = r;
        var i = document.createElementNS(svgNS, "feFuncR");
        i.setAttribute("type", "table"), r.appendChild(i), this.feFuncR = i;
        var a = document.createElementNS(svgNS, "feFuncG");
        a.setAttribute("type", "table"), r.appendChild(a), this.feFuncG = a;
        var n = document.createElementNS(svgNS, "feFuncB");
        n.setAttribute("type", "table"), r.appendChild(n), this.feFuncB = n
    }

    function SVGProLevelsFilter(t, e) {
        this.filterManager = e;
        var s, r, i, a = this.filterManager.effectElements,
            n = document.createElementNS(svgNS, "feComponentTransfer");
        if ((a[9].p.k || 0 !== a[9].p.v || a[10].p.k || 1 !== a[10].p.v || a[11].p.k || 1 !== a[11].p.v || a[12].p.k || 0 !== a[12].p.v || a[13].p.k || 1 !== a[13].p.v) && (s = document.createElementNS(svgNS, "feFuncR"), s.setAttribute("type", "table"), n.appendChild(s), this.feFuncR = s), (a[16].p.k || 0 !== a[16].p.v || a[17].p.k || 1 !== a[17].p.v || a[18].p.k || 1 !== a[18].p.v || a[19].p.k || 0 !== a[19].p.v || a[20].p.k || 1 !== a[20].p.v) && (r = document.createElementNS(svgNS, "feFuncG"), r.setAttribute("type", "table"), n.appendChild(r), this.feFuncG = r), a[23].p.k || 0 !== a[23].p.v || a[24].p.k || 1 !== a[24].p.v || a[25].p.k || 1 !== a[25].p.v || a[26].p.k || 0 !== a[26].p.v || a[27].p.k || 1 !== a[27].p.v) {
            var i = document.createElementNS(svgNS, "feFuncB");
            i.setAttribute("type", "table"), n.appendChild(i), this.feFuncB = i
        }
        if (a[30].p.k || 0 !== a[30].p.v || a[31].p.k || 1 !== a[31].p.v || a[32].p.k || 1 !== a[32].p.v || a[33].p.k || 0 !== a[33].p.v || a[34].p.k || 1 !== a[34].p.v) {
            var o = document.createElementNS(svgNS, "feFuncA");
            o.setAttribute("type", "table"), n.appendChild(o), this.feFuncA = o
        }(this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (n.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(n), n = document.createElementNS(svgNS, "feComponentTransfer")), (a[2].p.k || 0 !== a[2].p.v || a[3].p.k || 1 !== a[3].p.v || a[4].p.k || 1 !== a[4].p.v || a[5].p.k || 0 !== a[5].p.v || a[6].p.k || 1 !== a[6].p.v) && (n.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(n), s = document.createElementNS(svgNS, "feFuncR"), s.setAttribute("type", "table"), n.appendChild(s), this.feFuncRComposed = s, r = document.createElementNS(svgNS, "feFuncG"), r.setAttribute("type", "table"), n.appendChild(r), this.feFuncGComposed = r, i = document.createElementNS(svgNS, "feFuncB"), i.setAttribute("type", "table"), n.appendChild(i), this.feFuncBComposed = i)
    }

    function SVGEffects(t) {
        var e, s = t.data.ef.length,
            r = randomString(10),
            i = filtersFactory.createFilter(r),
            a = 0;
        this.filters = [];
        var n;
        for (e = 0; s > e; e += 1) 20 === t.data.ef[e].ty ? (a += 1, n = new SVGTintFilter(i, t.effects.effectElements[e]), this.filters.push(n)) : 21 === t.data.ef[e].ty ? (a += 1, n = new SVGFillFilter(i, t.effects.effectElements[e]), this.filters.push(n)) : 22 === t.data.ef[e].ty ? (n = new SVGStrokeEffect(t, t.effects.effectElements[e]), this.filters.push(n)) : 23 === t.data.ef[e].ty ? (a += 1, n = new SVGTritoneFilter(i, t.effects.effectElements[e]), this.filters.push(n)) : 24 === t.data.ef[e].ty && (a += 1, n = new SVGProLevelsFilter(i, t.effects.effectElements[e]), this.filters.push(n));
        a && (t.globalData.defs.appendChild(i), t.layerElement.setAttribute("filter", "url(#" + r + ")"))
    }

    function ICompElement(t, e, s, r, i) {
        this._parent.constructor.call(this, t, e, s, r, i), this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? Array.apply(null, {
            length: this.layers.length
        }) : [], this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, s.frameRate, this.dynamicProperties)), this.data.xt ? (this.layerElement = document.createElementNS(svgNS, "g"), this.buildAllItems()) : s.progressiveLoad || this.buildAllItems()
    }

    function IImageElement(t, e, s, r, i) {
        this.assetData = s.getAssetData(t.refId), this._parent.constructor.call(this, t, e, s, r, i)
    }

    function IShapeElement(t, e, s, r, i) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.viewData = [], this.shapeModifiers = [], this._parent.constructor.call(this, t, e, s, r, i)
    }

    function ISolidElement(t, e, s, r, i) {
        this._parent.constructor.call(this, t, e, s, r, i)
    }

    function CanvasRenderer(t, e) {
        this.animationItem = t, this.renderConfig = {
            clearCanvas: e && void 0 !== e.clearCanvas ? e.clearCanvas : !0,
            context: e && e.context || null,
            progressiveLoad: e && e.progressiveLoad || !1,
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet"
        }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
            frameNum: -1
        }, this.contextData = {
            saved: Array.apply(null, {
                length: 15
            }),
            savedOp: Array.apply(null, {
                length: 15
            }),
            cArrPos: 0,
            cTr: new Matrix,
            cO: 1
        };
        var s, r = 15;
        for (s = 0; r > s; s += 1) this.contextData.saved[s] = Array.apply(null, {
            length: 16
        });
        this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1
    }

    function HybridRenderer(t) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.globalData = {
            frameNum: -1
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0
    }

    function CVBaseElement(t, e, s) {
        this.globalData = s, this.data = t, this.comp = e, this.canvasContext = s.canvasContext, this.init()
    }

    function CVCompElement(t, e, s) {
        this._parent.constructor.call(this, t, e, s);
        var r = {};
        for (var i in s) s.hasOwnProperty(i) && (r[i] = s[i]);
        r.renderer = this, r.compHeight = this.data.h, r.compWidth = this.data.w, this.renderConfig = {
            clearCanvas: !0
        }, this.contextData = {
            saved: Array.apply(null, {
                length: 15
            }),
            savedOp: Array.apply(null, {
                length: 15
            }),
            cArrPos: 0,
            cTr: new Matrix,
            cO: 1
        }, this.completeLayers = !1;
        var a, n = 15;
        for (a = 0; n > a; a += 1) this.contextData.saved[a] = Array.apply(null, {
            length: 16
        });
        this.transformMat = new Matrix, this.parentGlobalData = this.globalData;
        var o = document.createElement("canvas");
        r.canvasContext = o.getContext("2d"), this.canvasContext = r.canvasContext, o.width = this.data.w, o.height = this.data.h, this.canvas = o, this.globalData = r, this.layers = t.layers, this.pendingElements = [], this.elements = Array.apply(null, {
            length: this.layers.length
        }), this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, s.frameRate, this.dynamicProperties)), (this.data.xt || !s.progressiveLoad) && this.buildAllItems()
    }

    function CVImageElement(t, e, s) {
        this.assetData = s.getAssetData(t.refId), this._parent.constructor.call(this, t, e, s), this.globalData.addPendingElement()
    }

    function CVMaskElement(t, e) {
        this.data = t, this.element = e, this.dynamicProperties = [], this.masksProperties = this.data.masksProperties, this.viewData = new Array(this.masksProperties.length);
        var s, r = this.masksProperties.length;
        for (s = 0; r > s; s++) this.viewData[s] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[s], 3, this.dynamicProperties, null)
    }

    function CVShapeElement(t, e, s) {
        this.shapes = [], this.stylesList = [], this.viewData = [], this.shapeModifiers = [], this.shapesData = t.shapes, this.firstFrame = !0, this._parent.constructor.call(this, t, e, s)
    }

    function CVSolidElement(t, e, s) {
        this._parent.constructor.call(this, t, e, s)
    }

    function CVTextElement(t, e, s) {
        this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)",
            sWidth: 0,
            fValue: ""
        }, this._parent.constructor.call(this, t, e, s)
    }

    function HBaseElement(t, e, s, r, i) {
        this.globalData = s, this.comp = r, this.data = t, this.matteElement = null, this.parentContainer = e, this.layerId = i ? i.layerId : "ly_" + randomString(10), this.placeholder = i, this.init()
    }

    function HSolidElement(t, e, s, r, i) {
        this._parent.constructor.call(this, t, e, s, r, i)
    }

    function HCompElement(t, e, s, r, i) {
        this._parent.constructor.call(this, t, e, s, r, i), this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = Array.apply(null, {
            length: this.layers.length
        }), this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, s.frameRate, this.dynamicProperties)), this.data.hasMask && (this.supports3d = !1), this.data.xt && (this.layerElement = document.createElement("div")), this.buildAllItems()
    }

    function HShapeElement(t, e, s, r, i) {
        this.shapes = [], this.shapeModifiers = [], this.shapesData = t.shapes, this.stylesList = [], this.viewData = [], this._parent.constructor.call(this, t, e, s, r, i), this.addedTransforms = {
            mdf: !1,
            mats: [this.finalTransform.mat]
        }, this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
        }
    }

    function HTextElement(t, e, s, r, i) {
        this.textSpans = [], this.textPaths = [], this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
        }, this.renderType = "svg", this.isMasked = !1, this._parent.constructor.call(this, t, e, s, r, i)
    }

    function HImageElement(t, e, s, r, i) {
        this.assetData = s.getAssetData(t.refId), this._parent.constructor.call(this, t, e, s, r, i)
    }

    function HCameraElement(t, e, s, r, i) {
        if (this._parent.constructor.call(this, t, e, s, r, i), this.pe = PropertyFactory.getProp(this, t.pe, 0, 0, this.dynamicProperties), t.ks.p.s ? (this.px = PropertyFactory.getProp(this, t.ks.p.x, 1, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(this, t.ks.p.y, 1, 0, this.dynamicProperties), this.pz = PropertyFactory.getProp(this, t.ks.p.z, 1, 0, this.dynamicProperties)) : this.p = PropertyFactory.getProp(this, t.ks.p, 1, 0, this.dynamicProperties), t.ks.a && (this.a = PropertyFactory.getProp(this, t.ks.a, 1, 0, this.dynamicProperties)), t.ks.or.k.length) {
            var a, n = t.ks.or.k.length;
            for (a = 0; n > a; a += 1) t.ks.or.k[a].to = null, t.ks.or.k[a].ti = null
        }
        this.or = PropertyFactory.getProp(this, t.ks.or, 1, degToRads, this.dynamicProperties), this.or.sh = !0, this.rx = PropertyFactory.getProp(this, t.ks.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(this, t.ks.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(this, t.ks.rz, 0, degToRads, this.dynamicProperties), this.mat = new Matrix
    }

    function SliderEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, s)
    }

    function AngleEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, s)
    }

    function ColorEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, s)
    }

    function PointEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, s)
    }

    function LayerIndexEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, s)
    }

    function CheckboxEffect(t, e, s) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, s)
    }

    function NoValueEffect() {
        this.p = {}
    }

    function EffectsManager(t, e, s) {
        var r = t.ef;
        this.effectElements = [];
        var i, a, n = r.length;
        for (i = 0; n > i; i++) a = new GroupEffect(r[i], e, s), this.effectElements.push(a)
    }

    function GroupEffect(t, e, s) {
        this.dynamicProperties = [], this.init(t, e, this.dynamicProperties), this.dynamicProperties.length && s.push(this)
    }

    function play(t) {
        animationManager.play(t)
    }

    function pause(t) {
        animationManager.pause(t)
    }

    function togglePause(t) {
        animationManager.togglePause(t)
    }

    function setSpeed(t, e) {
        animationManager.setSpeed(t, e)
    }

    function setDirection(t, e) {
        animationManager.setDirection(t, e)
    }

    function stop(t) {
        animationManager.stop(t)
    }

    function moveFrame(t) {
        animationManager.moveFrame(t)
    }

    function searchAnimations() {
        standalone === !0 ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
    }

    function registerAnimation(t) {
        return animationManager.registerAnimation(t)
    }

    function resize() {
        animationManager.resize()
    }

    function start() {
        animationManager.start()
    }

    function goToAndStop(t, e, s) {
        animationManager.goToAndStop(t, e, s)
    }

    function setSubframeRendering(t) {
        subframeEnabled = t
    }

    function loadAnimation(t) {
        return standalone === !0 && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
    }

    function destroy(t) {
        return animationManager.destroy(t)
    }

    function setQuality(t) {
        if ("string" == typeof t) switch (t) {
            case "high":
                defaultCurveSegments = 200;
                break;
            case "medium":
                defaultCurveSegments = 50;
                break;
            case "low":
                defaultCurveSegments = 10
        } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
        roundValues(defaultCurveSegments >= 50 ? !1 : !0)
    }

    function installPlugin(t, e) {
        "expressions" === t && (expressionsPlugin = e)
    }

    function getFactory(t) {
        switch (t) {
            case "propertyFactory":
                return PropertyFactory;
            case "shapePropertyFactory":
                return ShapePropertyFactory;
            case "matrix":
                return Matrix
        }
    }

    function checkReady() {
        "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
    }

    function getQueryVariable(t) {
        for (var e = queryString.split("&"), s = 0; s < e.length; s++) {
            var r = e[s].split("=");
            if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1])
        }
    }
    var svgNS = "http://www.w3.org/2000/svg",
        subframeEnabled = !0,
        expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        cachedColors = {},
        bm_rounder = Math.round,
        bm_rnd, bm_pow = Math.pow,
        bm_sqrt = Math.sqrt,
        bm_abs = Math.abs,
        bm_floor = Math.floor,
        bm_max = Math.max,
        bm_min = Math.min,
        blitter = 10,
        BMMath = {};
    ! function() {
        var t, e = Object.getOwnPropertyNames(Math),
            s = e.length;
        for (t = 0; s > t; t += 1) BMMath[e[t]] = Math[e[t]]
    }(), BMMath.random = Math.random, BMMath.abs = function(t) {
        var e = typeof t;
        if ("object" === e && t.length) {
            var s, r = Array.apply(null, {
                    length: t.length
                }),
                i = t.length;
            for (s = 0; i > s; s += 1) r[s] = Math.abs(t[s]);
            return r
        }
        return Math.abs(t)
    };
    var defaultCurveSegments = 75,
        degToRads = Math.PI / 180,
        roundCorner = .5519;
    roundValues(!1);
    var rgbToHex = function() {
            var t, e, s = [];
            for (t = 0; 256 > t; t += 1) e = t.toString(16), s[t] = 1 == e.length ? "0" + e : e;
            return function(t, e, r) {
                return 0 > t && (t = 0), 0 > e && (e = 0), 0 > r && (r = 0), "#" + s[t] + s[e] + s[r]
            }
        }(),
        fillColorToString = function() {
            var t = [];
            return function(e, s) {
                return void 0 !== s && (e[3] = s), t[e[0]] || (t[e[0]] = {}), t[e[0]][e[1]] || (t[e[0]][e[1]] = {}), t[e[0]][e[1]][e[2]] || (t[e[0]][e[1]][e[2]] = {}), t[e[0]][e[1]][e[2]][e[3]] || (t[e[0]][e[1]][e[2]][e[3]] = "rgba(" + e.join(",") + ")"), t[e[0]][e[1]][e[2]][e[3]]
            }
        }(),
        Matrix = function() {
            function t() {
                return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
            }

            function e(t) {
                if (0 === t) return this;
                var e = Math.cos(t),
                    s = Math.sin(t);
                return this._t(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function s(t) {
                if (0 === t) return this;
                var e = Math.cos(t),
                    s = Math.sin(t);
                return this._t(1, 0, 0, 0, 0, e, -s, 0, 0, s, e, 0, 0, 0, 0, 1)
            }

            function r(t) {
                if (0 === t) return this;
                var e = Math.cos(t),
                    s = Math.sin(t);
                return this._t(e, 0, s, 0, 0, 1, 0, 0, -s, 0, e, 0, 0, 0, 0, 1)
            }

            function i(t) {
                if (0 === t) return this;
                var e = Math.cos(t),
                    s = Math.sin(t);
                return this._t(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function a(t, e) {
                return this._t(1, e, t, 1, 0, 0)
            }

            function n(t, e) {
                return this.shear(Math.tan(t), Math.tan(e))
            }

            function o(t, e) {
                var s = Math.cos(e),
                    r = Math.sin(e);
                return this._t(s, r, 0, 0, -r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, Math.tan(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function h(t, e, s) {
                return s = isNaN(s) ? 1 : s, 1 == t && 1 == e && 1 == s ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1)
            }

            function l(t, e, s, r, i, a, n, o, h, l, p, m, f, d, c, u) {
                return this.props[0] = t, this.props[1] = e, this.props[2] = s, this.props[3] = r, this.props[4] = i, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m,
                    this.props[12] = f, this.props[13] = d, this.props[14] = c, this.props[15] = u, this
            }

            function p(t, e, s) {
                return s = s || 0, 0 !== t || 0 !== e || 0 !== s ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, s, 1) : this
            }

            function m(t, e, s, r, i, a, n, o, h, l, p, m, f, d, c, u) {
                if (1 === t && 0 === e && 0 === s && 0 === r && 0 === i && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return (0 !== f || 0 !== d || 0 !== c) && (this.props[12] = this.props[12] * t + this.props[13] * i + this.props[14] * h + this.props[15] * f, this.props[13] = this.props[12] * e + this.props[13] * a + this.props[14] * l + this.props[15] * d, this.props[14] = this.props[12] * s + this.props[13] * n + this.props[14] * p + this.props[15] * c, this.props[15] = this.props[12] * r + this.props[13] * o + this.props[14] * m + this.props[15] * u), this;
                var y = this.props[0],
                    g = this.props[1],
                    v = this.props[2],
                    b = this.props[3],
                    E = this.props[4],
                    P = this.props[5],
                    k = this.props[6],
                    S = this.props[7],
                    x = this.props[8],
                    C = this.props[9],
                    M = this.props[10],
                    A = this.props[11],
                    D = this.props[12],
                    T = this.props[13],
                    w = this.props[14],
                    F = this.props[15];
                return this.props[0] = y * t + g * i + v * h + b * f, this.props[1] = y * e + g * a + v * l + b * d, this.props[2] = y * s + g * n + v * p + b * c, this.props[3] = y * r + g * o + v * m + b * u, this.props[4] = E * t + P * i + k * h + S * f, this.props[5] = E * e + P * a + k * l + S * d, this.props[6] = E * s + P * n + k * p + S * c, this.props[7] = E * r + P * o + k * m + S * u, this.props[8] = x * t + C * i + M * h + A * f, this.props[9] = x * e + C * a + M * l + A * d, this.props[10] = x * s + C * n + M * p + A * c, this.props[11] = x * r + C * o + M * m + A * u, this.props[12] = D * t + T * i + w * h + F * f, this.props[13] = D * e + T * a + w * l + F * d, this.props[14] = D * s + T * n + w * p + F * c, this.props[15] = D * r + T * o + w * m + F * u, this
            }

            function f(t) {
                var e;
                for (e = 0; 16 > e; e += 1) t.props[e] = this.props[e]
            }

            function d(t) {
                var e;
                for (e = 0; 16 > e; e += 1) this.props[e] = t[e]
            }

            function c(t, e, s) {
                return {
                    x: t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12],
                    y: t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13],
                    z: t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]
                }
            }

            function u(t, e, s) {
                return t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12]
            }

            function y(t, e, s) {
                return t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13]
            }

            function g(t, e, s) {
                return t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]
            }

            function v(t) {
                var e, s = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                    r = this.props[5] / s,
                    i = -this.props[1] / s,
                    a = -this.props[4] / s,
                    n = this.props[0] / s,
                    o = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / s,
                    h = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / s,
                    l = t.length,
                    p = [];
                for (e = 0; l > e; e += 1) p[e] = [t[e][0] * r + t[e][1] * a + o, t[e][0] * i + t[e][1] * n + h, 0];
                return p
            }

            function b(t, e, s) {
                return [t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]]
            }

            function E(t, e) {
                return bm_rnd(t * this.props[0] + e * this.props[4] + this.props[12]) + "," + bm_rnd(t * this.props[1] + e * this.props[5] + this.props[13])
            }

            function P() {
                return [this.props[0], this.props[1], this.props[2], this.props[3], this.props[4], this.props[5], this.props[6], this.props[7], this.props[8], this.props[9], this.props[10], this.props[11], this.props[12], this.props[13], this.props[14], this.props[15]]
            }

            function k() {
                return isSafari ? "matrix3d(" + roundTo2Decimals(this.props[0]) + "," + roundTo2Decimals(this.props[1]) + "," + roundTo2Decimals(this.props[2]) + "," + roundTo2Decimals(this.props[3]) + "," + roundTo2Decimals(this.props[4]) + "," + roundTo2Decimals(this.props[5]) + "," + roundTo2Decimals(this.props[6]) + "," + roundTo2Decimals(this.props[7]) + "," + roundTo2Decimals(this.props[8]) + "," + roundTo2Decimals(this.props[9]) + "," + roundTo2Decimals(this.props[10]) + "," + roundTo2Decimals(this.props[11]) + "," + roundTo2Decimals(this.props[12]) + "," + roundTo2Decimals(this.props[13]) + "," + roundTo2Decimals(this.props[14]) + "," + roundTo2Decimals(this.props[15]) + ")" : (this.cssParts[1] = this.props.join(","), this.cssParts.join(""))
            }

            function S() {
                return "matrix(" + this.props[0] + "," + this.props[1] + "," + this.props[4] + "," + this.props[5] + "," + this.props[12] + "," + this.props[13] + ")"
            }

            function x() {
                return "" + this.toArray()
            }
            return function() {
                this.reset = t, this.rotate = e, this.rotateX = s, this.rotateY = r, this.rotateZ = i, this.skew = n, this.skewFromAxis = o, this.shear = a, this.scale = h, this.setTransform = l, this.translate = p, this.transform = m, this.applyToPoint = c, this.applyToX = u, this.applyToY = y, this.applyToZ = g, this.applyToPointArray = b, this.applyToPointStringified = E, this.toArray = P, this.toCSS = k, this.to2dCSS = S, this.toString = x, this.clone = f, this.cloneFromProps = d, this.inversePoints = v, this._t = this.transform, this.props = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.cssParts = ["matrix3d(", "", ")"]
            }
        }();
    ! function(t, e) {
        function s(s, l, p) {
            var d = [];
            l = 1 == l ? {
                entropy: !0
            } : l || {};
            var v = n(a(l.entropy ? [s, h(t)] : null == s ? o() : s, 3), d),
                b = new r(d),
                E = function() {
                    for (var t = b.g(f), e = u, s = 0; y > t;) t = (t + s) * m, e *= m, s = b.g(1);
                    for (; t >= g;) t /= 2, e /= 2, s >>>= 1;
                    return (t + s) / e
                };
            return E.int32 = function() {
                return 0 | b.g(4)
            }, E.quick = function() {
                return b.g(4) / 4294967296
            }, E["double"] = E, n(h(b.S), t), (l.pass || p || function(t, s, r, a) {
                return a && (a.S && i(a, b), t.state = function() {
                    return i(b, {})
                }), r ? (e[c] = t, s) : t
            })(E, v, "global" in l ? l.global : this == e, l.state)
        }

        function r(t) {
            var e, s = t.length,
                r = this,
                i = 0,
                a = r.i = r.j = 0,
                n = r.S = [];
            for (s || (t = [s++]); m > i;) n[i] = i++;
            for (i = 0; m > i; i++) n[i] = n[a = v & a + t[i % s] + (e = n[i])], n[a] = e;
            (r.g = function(t) {
                for (var e, s = 0, i = r.i, a = r.j, n = r.S; t--;) e = n[i = v & i + 1], s = s * m + n[v & (n[i] = n[a = v & a + e]) + (n[a] = e)];
                return r.i = i, r.j = a, s
            })(m)
        }

        function i(t, e) {
            return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
        }

        function a(t, e) {
            var s, r = [],
                i = typeof t;
            if (e && "object" == i)
                for (s in t) try {
                    r.push(a(t[s], e - 1))
                } catch (n) {}
            return r.length ? r : "string" == i ? t : t + "\x00"
        }

        function n(t, e) {
            for (var s, r = t + "", i = 0; i < r.length;) e[v & i] = v & (s ^= 19 * e[v & i]) + r.charCodeAt(i++);
            return h(e)
        }

        function o() {
            try {
                if (l) return h(l.randomBytes(m));
                var e = new Uint8Array(m);
                return (p.crypto || p.msCrypto).getRandomValues(e), h(e)
            } catch (s) {
                var r = p.navigator,
                    i = r && r.plugins;
                return [+new Date, p, i, p.screen, h(t)]
            }
        }

        function h(t) {
            return String.fromCharCode.apply(0, t)
        }
        var l, p = this,
            m = 256,
            f = 6,
            d = 52,
            c = "random",
            u = e.pow(m, f),
            y = e.pow(2, d),
            g = 2 * y,
            v = m - 1;
        e["seed" + c] = s, n(e.random(), t)
    }([], BMMath);
    var BezierFactory = function() {
            function t(t, e, s, r, i) {
                var a = i || ("bez_" + t + "_" + e + "_" + s + "_" + r).replace(/\./g, "p");
                if (p[a]) return p[a];
                var n = new h([t, e, s, r]);
                return p[a] = n, n
            }

            function e(t, e) {
                return 1 - 3 * e + 3 * t
            }

            function s(t, e) {
                return 3 * e - 6 * t
            }

            function r(t) {
                return 3 * t
            }

            function i(t, i, a) {
                return ((e(i, a) * t + s(i, a)) * t + r(i)) * t
            }

            function a(t, i, a) {
                return 3 * e(i, a) * t * t + 2 * s(i, a) * t + r(i)
            }

            function n(t, e, s, r, a) {
                var n, o, h = 0;
                do o = e + (s - e) / 2, n = i(o, r, a) - t, n > 0 ? s = o : e = o; while (Math.abs(n) > d && ++h < c);
                return o
            }

            function o(t, e, s, r) {
                for (var n = 0; m > n; ++n) {
                    var o = a(e, s, r);
                    if (0 === o) return e;
                    var h = i(e, s, r) - t;
                    e -= h / o
                }
                return e
            }

            function h(t) {
                this._p = t, this._mSampleValues = g ? new Float32Array(u) : new Array(u), this._precomputed = !1, this.get = this.get.bind(this)
            }
            var l = {};
            l.getBezierEasing = t;
            var p = {},
                m = 4,
                f = .001,
                d = 1e-7,
                c = 10,
                u = 11,
                y = 1 / (u - 1),
                g = "function" == typeof Float32Array;
            return h.prototype = {
                get: function(t) {
                    var e = this._p[0],
                        s = this._p[1],
                        r = this._p[2],
                        a = this._p[3];
                    return this._precomputed || this._precompute(), e === s && r === a ? t : 0 === t ? 0 : 1 === t ? 1 : i(this._getTForX(t), s, a)
                },
                _precompute: function() {
                    var t = this._p[0],
                        e = this._p[1],
                        s = this._p[2],
                        r = this._p[3];
                    this._precomputed = !0, (t !== e || s !== r) && this._calcSampleValues()
                },
                _calcSampleValues: function() {
                    for (var t = this._p[0], e = this._p[2], s = 0; u > s; ++s) this._mSampleValues[s] = i(s * y, t, e)
                },
                _getTForX: function(t) {
                    for (var e = this._p[0], s = this._p[2], r = this._mSampleValues, i = 0, h = 1, l = u - 1; h !== l && r[h] <= t; ++h) i += y;
                    --h;
                    var p = (t - r[h]) / (r[h + 1] - r[h]),
                        m = i + p * y,
                        d = a(m, e, s);
                    return d >= f ? o(t, m, e, s) : 0 === d ? m : n(t, i, i + y, e, s)
                }
            }, l
        }(),
        MatrixManager = matrixManagerFunction;
    ! function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !window.requestAnimationFrame; ++s) window.requestAnimationFrame = window[e[s] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[s] + "CancelAnimationFrame"] || window[e[s] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e, s) {
            var r = (new Date).getTime(),
                i = Math.max(0, 16 - (r - t)),
                a = window.setTimeout(function() {
                    e(r + i)
                }, i);
            return t = r + i, a
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }();
    var bez = bezFunction(),
        dataManager = dataFunctionManager(),
        FontManager = function() {
            function t(t, e) {
                var s = document.createElement("span");
                s.style.fontFamily = e;
                var r = document.createElement("span");
                r.innerHTML = "giItT1WQy@!-/#", s.style.position = "absolute", s.style.left = "-10000px", s.style.top = "-10000px", s.style.fontSize = "300px", s.style.fontVariant = "normal", s.style.fontStyle = "normal", s.style.fontWeight = "normal", s.style.letterSpacing = "0", s.appendChild(r), document.body.appendChild(s);
                var i = r.offsetWidth;
                return r.style.fontFamily = t + ", " + e, {
                    node: r,
                    w: i,
                    parent: s
                }
            }

            function e() {
                var t, s, r, i = this.fonts.length,
                    a = i;
                for (t = 0; i > t; t += 1)
                    if (this.fonts[t].loaded) a -= 1;
                    else if ("t" === this.fonts[t].fOrigin) {
                    if (window.Typekit && window.Typekit.load && 0 === this.typekitLoaded) {
                        this.typekitLoaded = 1;
                        try {
                            window.Typekit.load({
                                async: !0,
                                active: function() {
                                    this.typekitLoaded = 2
                                }.bind(this)
                            })
                        } catch (n) {}
                    }
                    2 === this.typekitLoaded && (this.fonts[t].loaded = !0)
                } else "n" === this.fonts[t].fOrigin ? this.fonts[t].loaded = !0 : (s = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, s.offsetWidth !== r ? (a -= 1, this.fonts[t].loaded = !0) : (s = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, s.offsetWidth !== r && (a -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                0 !== a && Date.now() - this.initTime < h ? setTimeout(e.bind(this), 20) : setTimeout(function() {
                    this.loaded = !0
                }.bind(this), 0)
            }

            function s(t, e) {
                var s = document.createElementNS(svgNS, "text");
                s.style.fontSize = "100px", s.style.fontFamily = e.fFamily, s.textContent = "1", e.fClass ? (s.style.fontFamily = "inherit", s.className = e.fClass) : s.style.fontFamily = e.fFamily, t.appendChild(s);
                var r = document.createElement("canvas").getContext("2d");
                return r.font = "100px " + e.fFamily, r
            }

            function r(r, i) {
                if (!r) return void(this.loaded = !0);
                if (this.chars) return this.loaded = !0, void(this.fonts = r.list);
                var a, n = r.list,
                    o = n.length;
                for (a = 0; o > a; a += 1) {
                    if (n[a].loaded = !1, n[a].monoCase = t(n[a].fFamily, "monospace"), n[a].sansCase = t(n[a].fFamily, "sans-serif"), n[a].fPath) {
                        if ("p" === n[a].fOrigin) {
                            var h = document.createElement("style");
                            h.type = "text/css", h.innerHTML = "@font-face {font-family: " + n[a].fFamily + "; font-style: normal; src: url('" + n[a].fPath + "');}", i.appendChild(h)
                        } else if ("g" === n[a].fOrigin) {
                            var l = document.createElement("link");
                            l.type = "text/css", l.rel = "stylesheet", l.href = n[a].fPath, i.appendChild(l)
                        } else if ("t" === n[a].fOrigin) {
                            var p = document.createElement("script");
                            p.setAttribute("src", n[a].fPath), i.appendChild(p)
                        }
                    } else n[a].loaded = !0;
                    n[a].helper = s(i, n[a]), this.fonts.push(n[a])
                }
                e.bind(this)()
            }

            function i(t) {
                if (t) {
                    this.chars || (this.chars = []);
                    var e, s, r, i = t.length,
                        a = this.chars.length;
                    for (e = 0; i > e; e += 1) {
                        for (s = 0, r = !1; a > s;) this.chars[s].style === t[e].style && this.chars[s].fFamily === t[e].fFamily && this.chars[s].ch === t[e].ch && (r = !0), s += 1;
                        r || (this.chars.push(t[e]), a += 1)
                    }
                }
            }

            function a(t, e, s) {
                for (var r = 0, i = this.chars.length; i > r;) {
                    if (this.chars[r].ch === t && this.chars[r].style === e && this.chars[r].fFamily === s) return this.chars[r];
                    r += 1
                }
            }

            function n(t, e, s) {
                var r = this.getFontByName(e),
                    i = r.helper;
                return i.measureText(t).width * s / 100
            }

            function o(t) {
                for (var e = 0, s = this.fonts.length; s > e;) {
                    if (this.fonts[e].fName === t) return this.fonts[e];
                    e += 1
                }
                return "sans-serif"
            }
            var h = 5e3,
                l = function() {
                    this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.loaded = !1, this.initTime = Date.now()
                };
            return l.prototype.addChars = i, l.prototype.addFonts = r, l.prototype.getCharData = a, l.prototype.getFontByName = o, l.prototype.measureText = n, l
        }(),
        PropertyFactory = function() {
            function t() {
                if (this.elem.globalData.frameId !== this.frameId) {
                    this.mdf = !1;
                    var t = this.comp.renderedFrame - this.offsetTime;
                    if (t === this.lastFrame || this.lastFrame !== l && (this.lastFrame >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime && t >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime || this.lastFrame < this.keyframes[0].t - this.offsetTime && t < this.keyframes[0].t - this.offsetTime));
                    else {
                        for (var e, s, r = 0, i = this.keyframes.length - 1, a = 1, n = !0; n;) {
                            if (e = this.keyframes[r], s = this.keyframes[r + 1], r == i - 1 && t >= s.t - this.offsetTime) {
                                e.h && (e = s);
                                break
                            }
                            if (s.t - this.offsetTime > t) break;
                            i - 1 > r ? r += a : n = !1
                        }
                        var o, h, p, m, f, d = 0;
                        if (e.to) {
                            e.bezierData || bez.buildBezierData(e);
                            var c = e.bezierData;
                            if (t >= s.t - this.offsetTime || t < e.t - this.offsetTime) {
                                var u = t >= s.t - this.offsetTime ? c.points.length - 1 : 0;
                                for (h = c.points[u].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? c.points[u].point[o] * this.mult : c.points[u].point[o], this.pv[o] = c.points[u].point[o], this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o])
                            } else {
                                e.__fnct ? f = e.__fnct : (f = BezierFactory.getBezierEasing(e.o.x, e.o.y, e.i.x, e.i.y, e.n).get, e.__fnct = f), p = f((t - (e.t - this.offsetTime)) / (s.t - this.offsetTime - (e.t - this.offsetTime)));
                                var y, g = c.segmentLength * p,
                                    v = 0;
                                for (a = 1, n = !0, m = c.points.length; n;) {
                                    if (v += c.points[d].partialLength * a, 0 === g || 0 === p || d == c.points.length - 1) {
                                        for (h = c.points[d].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? c.points[d].point[o] * this.mult : c.points[d].point[o], this.pv[o] = c.points[d].point[o], this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o]);
                                        break
                                    }
                                    if (g >= v && g < v + c.points[d + 1].partialLength) {
                                        for (y = (g - v) / c.points[d + 1].partialLength, h = c.points[d].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? (c.points[d].point[o] + (c.points[d + 1].point[o] - c.points[d].point[o]) * y) * this.mult : c.points[d].point[o] + (c.points[d + 1].point[o] - c.points[d].point[o]) * y, this.pv[o] = c.points[d].point[o] + (c.points[d + 1].point[o] - c.points[d].point[o]) * y, this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o]);
                                        break
                                    }
                                    m - 1 > d && 1 == a || d > 0 && -1 == a ? d += a : n = !1
                                }
                            }
                        } else {
                            var b, E, P, k, S, x = !1;
                            for (i = e.s.length, r = 0; i > r; r += 1) {
                                if (1 !== e.h && (e.o.x instanceof Array ? (x = !0, e.__fnct || (e.__fnct = []), e.__fnct[r] || (b = e.o.x[r] || e.o.x[0], E = e.o.y[r] || e.o.y[0], P = e.i.x[r] || e.i.x[0], k = e.i.y[r] || e.i.y[0])) : (x = !1, e.__fnct || (b = e.o.x, E = e.o.y, P = e.i.x, k = e.i.y)), x ? e.__fnct[r] ? f = e.__fnct[r] : (f = BezierFactory.getBezierEasing(b, E, P, k).get, e.__fnct[r] = f) : e.__fnct ? f = e.__fnct : (f = BezierFactory.getBezierEasing(b, E, P, k).get, e.__fnct = f), p = t >= s.t - this.offsetTime ? 1 : t < e.t - this.offsetTime ? 0 : f((t - (e.t - this.offsetTime)) / (s.t - this.offsetTime - (e.t - this.offsetTime)))), this.sh && 1 !== e.h) {
                                    var C = e.s[r],
                                        M = e.e[r]; - 180 > C - M ? C += 360 : C - M > 180 && (C -= 360), S = C + (M - C) * p
                                } else S = 1 === e.h ? e.s[r] : e.s[r] + (e.e[r] - e.s[r]) * p;
                                1 === i ? (this.v = this.mult ? S * this.mult : S, this.pv = S, this.lastPValue != this.pv && (this.mdf = !0, this.lastPValue = this.pv)) : (this.v[r] = this.mult ? S * this.mult : S, this.pv[r] = S, this.lastPValue[r] !== this.pv[r] && (this.mdf = !0, this.lastPValue[r] = this.pv[r]))
                            }
                        }
                    }
                    this.lastFrame = t, this.frameId = this.elem.globalData.frameId
                }
            }

            function e() {}

            function s(t, s, r) {
                this.mult = r, this.v = r ? s.k * r : s.k, this.pv = s.k, this.mdf = !1, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.getValue = e
            }

            function r(t, s, r) {
                this.mult = r, this.data = s, this.mdf = !1, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1, this.v = new Array(s.k.length), this.pv = new Array(s.k.length), this.lastValue = new Array(s.k.length);
                var i = Array.apply(null, {
                    length: s.k.length
                });
                this.vel = i.map(function() {
                    return 0
                });
                var a, n = s.k.length;
                for (a = 0; n > a; a += 1) this.v[a] = r ? s.k[a] * r : s.k[a], this.pv[a] = s.k[a];
                this.getValue = e
            }

            function i(e, s, r) {
                this.keyframes = s.k, this.offsetTime = e.data.st, this.lastValue = -99999, this.lastPValue = -99999, this.frameId = -1, this.k = !0, this.kf = !0, this.data = s, this.mult = r, this.elem = e, this.comp = e.comp, this.lastFrame = l, this.v = r ? s.k[0].s[0] * r : s.k[0].s[0], this.pv = s.k[0].s[0], this.getValue = t
            }

            function a(e, s, r) {
                var i, a, n, o, h, p = s.k.length;
                for (i = 0; p - 1 > i; i += 1) s.k[i].to && s.k[i].s && s.k[i].e && (a = s.k[i].s, n = s.k[i].e, o = s.k[i].to, h = s.k[i].ti, (2 === a.length && (a[0] !== n[0] || a[1] !== n[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) || 3 === a.length && (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], n[0] + h[0], n[1] + h[1], n[2] + h[2])) && (s.k[i].to = null, s.k[i].ti = null));
                this.keyframes = s.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this.mult = r, this.elem = e, this.comp = e.comp, this.getValue = t, this.frameId = -1, this.v = new Array(s.k[0].s.length), this.pv = new Array(s.k[0].s.length), this.lastValue = new Array(s.k[0].s.length), this.lastPValue = new Array(s.k[0].s.length), this.lastFrame = l
            }

            function n(t, e, n, o, h) {
                var l;
                if (2 === n) l = new p(t, e, h);
                else if (e.k.length)
                    if ("number" == typeof e.k[0]) l = new r(t, e, o);
                    else switch (n) {
                        case 0:
                            l = new i(t, e, o);
                            break;
                        case 1:
                            l = new a(t, e, o)
                    } else l = new s(t, e, o);
                return l.k && h.push(l), l
            }

            function o(t, e, s, r) {
                return new f(t, e, s, r)
            }

            function h(t, e, s) {
                return new d(t, e, s)
            }
            var l = -999999,
                p = function() {
                    function t() {
                        return this.p.k && this.p.getValue(), this.p.v.key || (this.p.v.key = function(t) {
                            return this.p.v.numKeys ? this.p.keyframes[t - 1].t : 0
                        }.bind(this)), this.p.v.numKeys || (this.p.v.numKeys = this.p.keyframes ? this.p.keyframes.length : 0), this.p.v.valueAtTime || (this.p.v.valueAtTime = this.p.getValueAtTime.bind(this.p)), this.p.v
                    }

                    function e() {
                        return this.px.k && this.px.getValue(), this.px.v
                    }

                    function s() {
                        return this.py.k && this.py.getValue(), this.py.v
                    }

                    function r() {
                        return this.a.k && this.a.getValue(), this.a.v
                    }

                    function i() {
                        return this.or.k && this.or.getValue(), this.or.v
                    }

                    function a() {
                        return this.r.k && this.r.getValue(), this.r.v / degToRads
                    }

                    function n() {
                        return this.s.k && this.s.getValue(), this.s.v
                    }

                    function o() {
                        return this.o.k && this.o.getValue(), this.o.v
                    }

                    function h() {
                        return this.sk.k && this.sk.getValue(), this.sk.v
                    }

                    function l() {
                        return this.sa.k && this.sa.getValue(), this.sa.v
                    }

                    function p(t) {
                        var e, s = this.dynamicProperties.length;
                        for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e].mdf && (this.mdf = !0);
                        this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                    }

                    function m() {
                        if (this.elem.globalData.frameId !== this.frameId) {
                            this.mdf = !1;
                            var t, e = this.dynamicProperties.length;
                            for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t].mdf && (this.mdf = !0);
                            if (this.mdf) {
                                if (this.v.reset(), this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented && this.p.keyframes && this.p.getValueAtTime) {
                                    var s, r;
                                    this.p.lastFrame + this.p.offsetTime < this.p.keyframes[0].t ? (s = this.p.getValueAtTime(this.p.keyframes[0].t + .01, 0), r = this.p.getValueAtTime(this.p.keyframes[0].t, 0)) : this.p.lastFrame + this.p.offsetTime > this.p.keyframes[this.p.keyframes.length - 1].t ? (s = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t, 0), r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t - .01, 0)) : (s = this.p.pv, r = this.p.getValueAtTime(this.p.lastFrame + this.p.offsetTime - .01, this.p.offsetTime)), this.v.rotate(-Math.atan2(s[1] - r[1], s[0] - r[0]))
                                }
                                this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                            }
                            this.frameId = this.elem.globalData.frameId
                        }
                    }

                    function f() {
                        this.inverted = !0, this.iv = new Matrix, this.k || (this.data.p.s ? this.iv.translate(this.px.v, this.py.v, -this.pz.v) : this.iv.translate(this.p.v[0], this.p.v[1], -this.p.v[2]), this.r ? this.iv.rotate(-this.r.v) : this.iv.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.s && this.iv.scale(this.s.v[0], this.s.v[1], 1), this.a && this.iv.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]))
                    }

                    function d() {}
                    return function(c, u, y) {
                        this.elem = c, this.frameId = -1, this.dynamicProperties = [], this.mdf = !1, this.data = u, this.getValue = m, this.applyToMatrix = p, this.setInverted = f, this.autoOrient = d, this.v = new Matrix, u.p.s ? (this.px = PropertyFactory.getProp(c, u.p.x, 0, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(c, u.p.y, 0, 0, this.dynamicProperties), u.p.z && (this.pz = PropertyFactory.getProp(c, u.p.z, 0, 0, this.dynamicProperties))) : this.p = PropertyFactory.getProp(c, u.p, 1, 0, this.dynamicProperties), u.r ? this.r = PropertyFactory.getProp(c, u.r, 0, degToRads, this.dynamicProperties) : u.rx && (this.rx = PropertyFactory.getProp(c, u.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(c, u.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(c, u.rz, 0, degToRads, this.dynamicProperties), this.or = PropertyFactory.getProp(c, u.or, 0, degToRads, this.dynamicProperties)), u.sk && (this.sk = PropertyFactory.getProp(c, u.sk, 0, degToRads, this.dynamicProperties), this.sa = PropertyFactory.getProp(c, u.sa, 0, degToRads, this.dynamicProperties)), u.a && (this.a = PropertyFactory.getProp(c, u.a, 1, 0, this.dynamicProperties)), u.s && (this.s = PropertyFactory.getProp(c, u.s, 1, .01, this.dynamicProperties)), this.o = u.o ? PropertyFactory.getProp(c, u.o, 0, .01, y) : {
                            mdf: !1,
                            v: 1
                        }, this.dynamicProperties.length ? y.push(this) : (this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? u.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])), Object.defineProperty(this, "position", {
                            get: t
                        }), Object.defineProperty(this, "xPosition", {
                            get: e
                        }), Object.defineProperty(this, "yPosition", {
                            get: s
                        }), Object.defineProperty(this, "orientation", {
                            get: i
                        }), Object.defineProperty(this, "anchorPoint", {
                            get: r
                        }), Object.defineProperty(this, "rotation", {
                            get: a
                        }), Object.defineProperty(this, "scale", {
                            get: n
                        }), Object.defineProperty(this, "opacity", {
                            get: o
                        }), Object.defineProperty(this, "skew", {
                            get: h
                        }), Object.defineProperty(this, "skewAxis", {
                            get: l
                        })
                    }
                }(),
                m = function() {
                    function t(t) {
                        if (this.prop.getValue(), this.cmdf = !1, this.omdf = !1, this.prop.mdf || t) {
                            var e, s, r, i = 4 * this.data.p;
                            for (e = 0; i > e; e += 1) s = e % 4 === 0 ? 100 : 255, r = Math.round(this.prop.v[e] * s), this.c[e] !== r && (this.c[e] = r, this.cmdf = !0);
                            if (this.o.length)
                                for (i = this.prop.v.length, e = 4 * this.data.p; i > e; e += 1) s = e % 2 === 0 ? 100 : 1, r = e % 2 === 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== r && (this.o[e - 4 * this.data.p] = r, this.omdf = !0)
                        }
                    }

                    function e(e, s, r) {
                        this.prop = n(e, s.k, 1, null, []), this.data = s, this.k = this.prop.k, this.c = Array.apply(null, {
                            length: 4 * s.p
                        });
                        var i = s.k.k[0].s ? s.k.k[0].s.length - 4 * s.p : s.k.k.length - 4 * s.p;
                        this.o = Array.apply(null, {
                            length: i
                        }), this.cmdf = !1, this.omdf = !1, this.getValue = t, this.prop.k && r.push(this), this.getValue(!0)
                    }
                    return function(t, s, r) {
                        return new e(t, s, r)
                    }
                }(),
                f = function() {
                    function t(t) {
                        var e = 0,
                            s = this.dataProps.length;
                        if (this.elem.globalData.frameId !== this.frameId || t) {
                            for (this.mdf = !1, this.frameId = this.elem.globalData.frameId; s > e;) {
                                if (this.dataProps[e].p.mdf) {
                                    this.mdf = !0;
                                    break
                                }
                                e += 1
                            }
                            if (this.mdf || t)
                                for ("svg" === this.renderer && (this.dasharray = ""), e = 0; s > e; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dasharray += " " + this.dataProps[e].p.v : this.dasharray[e] = this.dataProps[e].p.v : this.dashoffset = this.dataProps[e].p.v
                        }
                    }
                    return function(e, s, r, i) {
                        this.elem = e, this.frameId = -1, this.dataProps = new Array(s.length), this.renderer = r, this.mdf = !1, this.k = !1, this.dasharray = "svg" === this.renderer ? "" : new Array(s.length - 1), this.dashoffset = 0;
                        var a, n, o = s.length;
                        for (a = 0; o > a; a += 1) n = PropertyFactory.getProp(e, s[a].v, 0, 0, i), this.k = n.k ? !0 : this.k, this.dataProps[a] = {
                            n: s[a].n,
                            p: n
                        };
                        this.getValue = t, this.k ? i.push(this) : this.getValue(!0)
                    }
                }(),
                d = function() {
                    function t() {
                        if (this.dynamicProperties.length) {
                            var t, e = this.dynamicProperties.length;
                            for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t].mdf && (this.mdf = !0)
                        }
                        var s = this.data.totalChars,
                            r = 2 === this.data.r ? 1 : 100 / s,
                            i = this.o.v / r,
                            a = this.s.v / r + i,
                            n = this.e.v / r + i;
                        if (a > n) {
                            var o = a;
                            a = n, n = o
                        }
                        this.finalS = a, this.finalE = n
                    }

                    function e(t) {
                        var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                            a = 0,
                            n = this.finalS,
                            o = this.finalE,
                            h = this.data.sh;
                        if (2 == h) a = o === n ? t >= o ? 1 : 0 : s(0, r(.5 / (o - n) + (t - n) / (o - n), 1)), a = e(a);
                        else if (3 == h) a = o === n ? t >= o ? 0 : 1 : 1 - s(0, r(.5 / (o - n) + (t - n) / (o - n), 1)), a = e(a);
                        else if (4 == h) o === n ? a = t >= o ? 0 : 1 : (a = s(0, r(.5 / (o - n) + (t - n) / (o - n), 1)), .5 > a ? a *= 2 : a = 1 - 2 * (a - .5)), a = e(a);
                        else if (5 == h) {
                            if (o === n) a = t >= o ? 0 : 1;
                            else {
                                var l = o - n;
                                t = r(s(0, t + .5 - n), o - n);
                                var p = -l / 2 + t,
                                    m = l / 2;
                                a = Math.sqrt(1 - p * p / (m * m))
                            }
                            a = e(a)
                        } else 6 == h ? (o === n ? a = t >= o ? 0 : 1 : (t = r(s(0, t + .5 - n), o - n), a = (1 + Math.cos(Math.PI + 2 * Math.PI * t / (o - n))) / 2), a = e(a)) : (t >= i(n) && (a = 0 > t - n ? 1 - (n - t) : s(0, r(o - t, 1))), a = e(a));
                        return a * this.a.v
                    }
                    var s = Math.max,
                        r = Math.min,
                        i = Math.floor;
                    return this.mdf = !1,
                        function(s, r, i) {
                            this.mdf = !1, this.k = !1, this.data = r, this.dynamicProperties = [], this.getValue = t, this.getMult = e, this.comp = s.comp, this.finalS = 0, this.finalE = 0, this.s = PropertyFactory.getProp(s, r.s || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.e = "e" in r ? PropertyFactory.getProp(s, r.e, 0, 0, this.dynamicProperties) : {
                                v: 2 === r.r ? r.totalChars : 100
                            }, this.o = PropertyFactory.getProp(s, r.o || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.xe = PropertyFactory.getProp(s, r.xe || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.ne = PropertyFactory.getProp(s, r.ne || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.a = PropertyFactory.getProp(s, r.a, 0, .01, this.dynamicProperties), this.dynamicProperties.length ? i.push(this) : this.getValue()
                        }
                }(),
                c = {};
            return c.getProp = n, c.getDashProp = o, c.getTextSelectorProp = h, c.getGradientProp = m, c
        }(),
        ShapePropertyFactory = function() {
            function t() {
                if (this.elem.globalData.frameId !== this.frameId) {
                    this.mdf = !1;
                    var t = this.comp.renderedFrame - this.offsetTime;
                    if (this.lastFrame !== n && (this.lastFrame < this.keyframes[0].t - this.offsetTime && t < this.keyframes[0].t - this.offsetTime || this.lastFrame > this.keyframes[this.keyframes.length - 1].t - this.offsetTime && t > this.keyframes[this.keyframes.length - 1].t - this.offsetTime));
                    else {
                        var e, s, r;
                        if (t < this.keyframes[0].t - this.offsetTime) e = this.keyframes[0].s[0], r = !0;
                        else if (t >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime) e = 1 === this.keyframes[this.keyframes.length - 2].h ? this.keyframes[this.keyframes.length - 1].s[0] : this.keyframes[this.keyframes.length - 2].e[0], r = !0;
                        else {
                            for (var i, a, o, h, l, p, m = 0, f = this.keyframes.length - 1, d = !0; d && (i = this.keyframes[m], a = this.keyframes[m + 1], !(a.t - this.offsetTime > t));) f - 1 > m ? m += 1 : d = !1;
                            r = 1 === i.h, r && m === f && (i = a);
                            var c;
                            if (!r) {
                                var u;
                                i.__fnct ? u = i.__fnct : (u = BezierFactory.getBezierEasing(i.o.x, i.o.y, i.i.x, i.i.y).get, i.__fnct = u), c = t >= a.t - this.offsetTime ? 1 : t < i.t - this.offsetTime ? 0 : u((t - (i.t - this.offsetTime)) / (a.t - this.offsetTime - (i.t - this.offsetTime))), s = i.e[0]
                            }
                            e = i.s[0]
                        }
                        h = this.v.i.length, p = e.i[0].length;
                        var y, g = !1;
                        for (o = 0; h > o; o += 1)
                            for (l = 0; p > l; l += 1) r ? (y = e.i[o][l], this.v.i[o][l] !== y && (this.v.i[o][l] = y, this.pv.i[o][l] = y, g = !0), y = e.o[o][l], this.v.o[o][l] !== y && (this.v.o[o][l] = y, this.pv.o[o][l] = y, g = !0), y = e.v[o][l], this.v.v[o][l] !== y && (this.v.v[o][l] = y, this.pv.v[o][l] = y, g = !0)) : (y = e.i[o][l] + (s.i[o][l] - e.i[o][l]) * c, this.v.i[o][l] !== y && (this.v.i[o][l] = y, this.pv.i[o][l] = y, g = !0), y = e.o[o][l] + (s.o[o][l] - e.o[o][l]) * c, this.v.o[o][l] !== y && (this.v.o[o][l] = y, this.pv.o[o][l] = y, g = !0), y = e.v[o][l] + (s.v[o][l] - e.v[o][l]) * c, this.v.v[o][l] !== y && (this.v.v[o][l] = y, this.pv.v[o][l] = y, g = !0));
                        this.mdf = g, this.paths.length = 0, this.v.c = e.c, this.paths[0] = this.v
                    }
                    this.lastFrame = t, this.frameId = this.elem.globalData.frameId
                }
            }

            function e() {
                return this.v
            }

            function s() {
                this.resetPaths.length = 1, this.resetPaths[0] = this.v, this.paths = this.resetPaths, this.k || (this.mdf = !1)
            }

            function r(t, r, i) {
                this.resetPaths = [], this.comp = t.comp, this.k = !1, this.mdf = !1, this.numNodes = 3 === i ? r.pt.k.v.length : r.ks.k.v.length, this.v = 3 === i ? r.pt.k : r.ks.k, this.getValue = e, this.pv = this.v, this.paths = [this.v], this.reset = s
            }

            function i(e, r, i) {
                this.resetPaths = [], this.comp = e.comp, this.elem = e, this.offsetTime = e.data.st, this.getValue = t, this.keyframes = 3 === i ? r.pt.k : r.ks.k, this.k = !0;
                var a, o = this.keyframes[0].s[0].i.length,
                    h = this.keyframes[0].s[0].i[0].length;
                for (this.numNodes = o, this.v = {
                        i: Array.apply(null, {
                            length: o
                        }),
                        o: Array.apply(null, {
                            length: o
                        }),
                        v: Array.apply(null, {
                            length: o
                        }),
                        c: this.keyframes[0].s[0].c
                    }, this.pv = {
                        i: Array.apply(null, {
                            length: o
                        }),
                        o: Array.apply(null, {
                            length: o
                        }),
                        v: Array.apply(null, {
                            length: o
                        }),
                        c: this.keyframes[0].s[0].c
                    }, a = 0; o > a; a += 1) this.v.i[a] = Array.apply(null, {
                    length: h
                }), this.v.o[a] = Array.apply(null, {
                    length: h
                }), this.v.v[a] = Array.apply(null, {
                    length: h
                }), this.pv.i[a] = Array.apply(null, {
                    length: h
                }), this.pv.o[a] = Array.apply(null, {
                    length: h
                }), this.pv.v[a] = Array.apply(null, {
                    length: h
                });
                this.paths = [], this.lastFrame = n, this.reset = s
            }

            function a(t, e, s, a) {
                var n;
                if (3 === s || 4 === s) {
                    var p = 3 === s ? e.pt.k : e.ks.k;
                    n = p.length ? new i(t, e, s) : new r(t, e, s)
                } else 5 === s ? n = new l(t, e) : 6 === s ? n = new o(t, e) : 7 === s && (n = new h(t, e));
                return n.k && a.push(n), n
            }
            var n = -999999,
                o = function() {
                    function t() {
                        var t = this.p.v[0],
                            e = this.p.v[1],
                            s = this.s.v[0] / 2,
                            i = this.s.v[1] / 2;
                        2 !== this.d && 3 !== this.d ? (this.v.v[0] = [t, e - i], this.v.i[0] = [t - s * r, e - i], this.v.o[0] = [t + s * r, e - i], this.v.v[1] = [t + s, e], this.v.i[1] = [t + s, e - i * r], this.v.o[1] = [t + s, e + i * r], this.v.v[2] = [t, e + i], this.v.i[2] = [t + s * r, e + i], this.v.o[2] = [t - s * r, e + i], this.v.v[3] = [t - s, e], this.v.i[3] = [t - s, e + i * r], this.v.o[3] = [t - s, e - i * r]) : (this.v.v[0] = [t, e - i], this.v.o[0] = [t - s * r, e - i], this.v.i[0] = [t + s * r, e - i], this.v.v[1] = [t - s, e], this.v.o[1] = [t - s, e + i * r], this.v.i[1] = [t - s, e - i * r], this.v.v[2] = [t, e + i], this.v.o[2] = [t + s * r, e + i], this.v.i[2] = [t - s * r, e + i], this.v.v[3] = [t + s, e], this.v.o[3] = [t + s, e - i * r], this.v.i[3] = [t + s, e + i * r]), this.paths.length = 0, this.paths[0] = this.v
                    }

                    function e(t) {
                        var e, s = this.dynamicProperties.length;
                        if (this.elem.globalData.frameId !== this.frameId) {
                            for (this.mdf = !1, this.frameId = this.elem.globalData.frameId, e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(t), this.dynamicProperties[e].mdf && (this.mdf = !0);
                            this.mdf && (this.convertEllToPath(), this.paths.length = 0, this.paths[0] = this.v)
                        }
                    }
                    var r = roundCorner;
                    return function(r, i) {
                        this.v = {
                            v: Array.apply(null, {
                                length: 4
                            }),
                            i: Array.apply(null, {
                                length: 4
                            }),
                            o: Array.apply(null, {
                                length: 4
                            }),
                            c: !0
                        }, this.numNodes = 4, this.d = i.d, this.dynamicProperties = [], this.resetPaths = [], this.paths = [], this.elem = r, this.comp = r.comp, this.frameId = -1, this.mdf = !1, this.getValue = e, this.convertEllToPath = t, this.reset = s, this.p = PropertyFactory.getProp(r, i.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(r, i.s, 1, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertEllToPath()
                    }
                }(),
                h = function() {
                    function t() {
                        var t = Math.floor(this.pt.v),
                            e = 2 * Math.PI / t;
                        this.v.v.length = t, this.v.i.length = t, this.v.o.length = t;
                        var s, r = this.or.v,
                            i = this.os.v,
                            a = 2 * Math.PI * r / (4 * t),
                            n = -Math.PI / 2,
                            o = 3 === this.data.d ? -1 : 1;
                        for (n += this.r.v, s = 0; t > s; s += 1) {
                            var h = r * Math.cos(n),
                                l = r * Math.sin(n),
                                p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                                m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                            h += +this.p.v[0], l += +this.p.v[1], this.v.v[s] = [h, l], this.v.i[s] = [h + p * a * i * o, l + m * a * i * o], this.v.o[s] = [h - p * a * i * o, l - m * a * i * o], n += e * o
                        }
                        this.numNodes = t, this.paths.length = 0, this.paths[0] = this.v
                    }

                    function e() {
                        var t = 2 * Math.floor(this.pt.v),
                            e = 2 * Math.PI / t;
                        this.v.v.length = t, this.v.i.length = t, this.v.o.length = t;
                        var s, r, i, a, n = !0,
                            o = this.or.v,
                            h = this.ir.v,
                            l = this.os.v,
                            p = this.is.v,
                            m = 2 * Math.PI * o / (2 * t),
                            f = 2 * Math.PI * h / (2 * t),
                            d = -Math.PI / 2;
                        d += this.r.v;
                        var c = 3 === this.data.d ? -1 : 1;
                        for (s = 0; t > s; s += 1) {
                            r = n ? o : h, i = n ? l : p, a = n ? m : f;
                            var u = r * Math.cos(d),
                                y = r * Math.sin(d),
                                g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                                v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                            u += +this.p.v[0], y += +this.p.v[1], this.v.v[s] = [u, y], this.v.i[s] = [u + g * a * i * c, y + v * a * i * c], this.v.o[s] = [u - g * a * i * c, y - v * a * i * c], n = !n, d += e * c
                        }
                        this.numNodes = t, this.paths.length = 0, this.paths[0] = this.v
                    }

                    function r() {
                        if (this.elem.globalData.frameId !== this.frameId) {
                            this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                            var t, e = this.dynamicProperties.length;
                            for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t].mdf && (this.mdf = !0);
                            this.mdf && this.convertToPath()
                        }
                    }
                    return function(i, a) {
                        this.v = {
                            v: [],
                            i: [],
                            o: [],
                            c: !0
                        }, this.resetPaths = [], this.elem = i, this.comp = i.comp, this.data = a, this.frameId = -1, this.d = a.d, this.dynamicProperties = [], this.mdf = !1, this.getValue = r, this.reset = s, 1 === a.sy ? (this.ir = PropertyFactory.getProp(i, a.ir, 0, 0, this.dynamicProperties),
                            this.is = PropertyFactory.getProp(i, a.is, 0, .01, this.dynamicProperties), this.convertToPath = e) : this.convertToPath = t, this.pt = PropertyFactory.getProp(i, a.pt, 0, 0, this.dynamicProperties), this.p = PropertyFactory.getProp(i, a.p, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(i, a.r, 0, degToRads, this.dynamicProperties), this.or = PropertyFactory.getProp(i, a.or, 0, 0, this.dynamicProperties), this.os = PropertyFactory.getProp(i, a.os, 0, .01, this.dynamicProperties), this.paths = [], this.dynamicProperties.length ? this.k = !0 : this.convertToPath()
                    }
                }(),
                l = function() {
                    function t(t) {
                        if (this.elem.globalData.frameId !== this.frameId) {
                            this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                            var e, s = this.dynamicProperties.length;
                            for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(t), this.dynamicProperties[e].mdf && (this.mdf = !0);
                            this.mdf && this.convertRectToPath()
                        }
                    }

                    function e() {
                        var t = this.p.v[0],
                            e = this.p.v[1],
                            s = this.s.v[0] / 2,
                            r = this.s.v[1] / 2,
                            i = bm_min(s, r, this.r.v),
                            a = i * (1 - roundCorner);
                        0 === i ? (this.v.v.length = 4, this.v.i.length = 4, this.v.o.length = 4) : (this.v.v.length = 8, this.v.i.length = 8, this.v.o.length = 8), 2 === this.d || 1 === this.d ? (this.v.v[0] = [t + s, e - r + i], this.v.o[0] = this.v.v[0], this.v.i[0] = [t + s, e - r + a], this.v.v[1] = [t + s, e + r - i], this.v.o[1] = [t + s, e + r - a], this.v.i[1] = this.v.v[1], 0 !== i ? (this.v.v[2] = [t + s - i, e + r], this.v.o[2] = this.v.v[2], this.v.i[2] = [t + s - a, e + r], this.v.v[3] = [t - s + i, e + r], this.v.o[3] = [t - s + a, e + r], this.v.i[3] = this.v.v[3], this.v.v[4] = [t - s, e + r - i], this.v.o[4] = this.v.v[4], this.v.i[4] = [t - s, e + r - a], this.v.v[5] = [t - s, e - r + i], this.v.o[5] = [t - s, e - r + a], this.v.i[5] = this.v.v[5], this.v.v[6] = [t - s + i, e - r], this.v.o[6] = this.v.v[6], this.v.i[6] = [t - s + a, e - r], this.v.v[7] = [t + s - i, e - r], this.v.o[7] = [t + s - a, e - r], this.v.i[7] = this.v.v[7]) : (this.v.v[2] = [t - s + i, e + r], this.v.o[2] = [t - s + a, e + r], this.v.i[2] = this.v.v[2], this.v.v[3] = [t - s, e - r + i], this.v.o[3] = [t - s, e - r + a], this.v.i[3] = this.v.v[3])) : (this.v.v[0] = [t + s, e - r + i], this.v.o[0] = [t + s, e - r + a], this.v.i[0] = this.v.v[0], 0 !== i ? (this.v.v[1] = [t + s - i, e - r], this.v.o[1] = this.v.v[1], this.v.i[1] = [t + s - a, e - r], this.v.v[2] = [t - s + i, e - r], this.v.o[2] = [t - s + a, e - r], this.v.i[2] = this.v.v[2], this.v.v[3] = [t - s, e - r + i], this.v.o[3] = this.v.v[3], this.v.i[3] = [t - s, e - r + a], this.v.v[4] = [t - s, e + r - i], this.v.o[4] = [t - s, e + r - a], this.v.i[4] = this.v.v[4], this.v.v[5] = [t - s + i, e + r], this.v.o[5] = this.v.v[5], this.v.i[5] = [t - s + a, e + r], this.v.v[6] = [t + s - i, e + r], this.v.o[6] = [t + s - a, e + r], this.v.i[6] = this.v.v[6], this.v.v[7] = [t + s, e + r - i], this.v.o[7] = this.v.v[7], this.v.i[7] = [t + s, e + r - a]) : (this.v.v[1] = [t - s + i, e - r], this.v.o[1] = [t - s + a, e - r], this.v.i[1] = this.v.v[1], this.v.v[2] = [t - s, e + r - i], this.v.o[2] = [t - s, e + r - a], this.v.i[2] = this.v.v[2], this.v.v[3] = [t + s - i, e + r], this.v.o[3] = [t + s - a, e + r], this.v.i[3] = this.v.v[3])), this.paths.length = 0, this.paths[0] = this.v
                    }
                    return function(r, i) {
                        this.v = {
                            v: Array.apply(null, {
                                length: 8
                            }),
                            i: Array.apply(null, {
                                length: 8
                            }),
                            o: Array.apply(null, {
                                length: 8
                            }),
                            c: !0
                        }, this.resetPaths = [], this.paths = [], this.numNodes = 8, this.elem = r, this.comp = r.comp, this.frameId = -1, this.d = i.d, this.dynamicProperties = [], this.mdf = !1, this.getValue = t, this.convertRectToPath = e, this.reset = s, this.p = PropertyFactory.getProp(r, i.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(r, i.s, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(r, i.r, 0, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertRectToPath()
                    }
                }(),
                p = {};
            return p.getShapeProp = a, p
        }(),
        ShapeModifiers = function() {
            function t(t, e) {
                r[t] || (r[t] = e)
            }

            function e(t, e, s, i) {
                return new r[t](e, s, i)
            }
            var s = {},
                r = {};
            return s.registerModifier = t, s.getModifier = e, s
        }();
    ShapeModifier.prototype.initModifierProperties = function() {}, ShapeModifier.prototype.addShapeToModifier = function() {}, ShapeModifier.prototype.addShape = function(t) {
        this.closed || (this.shapes.push({
            shape: t,
            last: []
        }), this.addShapeToModifier(t))
    }, ShapeModifier.prototype.init = function(t, e, s) {
        this.elem = t, this.frameId = -1, this.shapes = [], this.dynamicProperties = [], this.mdf = !1, this.closed = !1, this.k = !1, this.isTrimming = !1, this.comp = t.comp, this.initModifierProperties(t, e), this.dynamicProperties.length ? (this.k = !0, s.push(this)) : this.getValue(!0)
    }, extendPrototype(ShapeModifier, TrimModifier), TrimModifier.prototype.processKeys = function(t) {
        if (this.elem.globalData.frameId !== this.frameId || t) {
            this.mdf = t ? !0 : !1, this.frameId = this.elem.globalData.frameId;
            var e, s = this.dynamicProperties.length;
            for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e].mdf && (this.mdf = !0);
            if (this.mdf || t) {
                var r = this.o.v % 360 / 360;
                0 > r && (r += 1);
                var i = this.s.v + r,
                    a = this.e.v + r;
                if (i > a) {
                    var n = i;
                    i = a, a = n
                }
                this.sValue = i, this.eValue = a, this.oValue = r
            }
        }
    }, TrimModifier.prototype.initModifierProperties = function(t, e) {
        this.sValue = 0, this.eValue = 0, this.oValue = 0, this.getValue = this.processKeys, this.s = PropertyFactory.getProp(t, e.s, 0, .01, this.dynamicProperties), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this.dynamicProperties), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this.dynamicProperties), this.dynamicProperties.length || this.getValue(!0)
    }, TrimModifier.prototype.getSegmentsLength = function(t) {
        var e, s = t.c,
            r = t.v,
            i = t.o,
            a = t.i,
            n = r.length,
            o = [],
            h = 0;
        for (e = 0; n - 1 > e; e += 1) o[e] = bez.getBezierLength(r[e], r[e + 1], i[e], a[e + 1]), h += o[e].addedLength;
        return s && (o[e] = bez.getBezierLength(r[e], r[0], i[e], a[0]), h += o[e].addedLength), {
            lengths: o,
            totalLength: h
        }
    }, TrimModifier.prototype.processShapes = function(t) {
        var e, s, r, i, a, n, o, h = this.shapes.length,
            l = this.sValue,
            p = this.eValue,
            m = 0;
        if (p === l)
            for (s = 0; h > s; s += 1) this.shapes[s].shape.paths = [], this.shapes[s].shape.mdf = !0;
        else if (1 === p && 0 === l || 0 === p && 1 === l)
            for (s = 0; h > s; s += 1) f = this.shapes[s], f.shape.paths !== f.last && (f.shape.mdf = !0, f.last = f.shape.paths);
        else {
            var f, d, c = [];
            for (s = 0; h > s; s += 1)
                if (f = this.shapes[s], f.shape.mdf || this.mdf || t) {
                    if (e = f.shape.paths, i = e.length, o = 0, !f.shape.mdf && f.pathsData) o = f.totalShapeLength;
                    else {
                        for (a = [], r = 0; i > r; r += 1) n = this.getSegmentsLength(e[r]), a.push(n), o += n.totalLength;
                        f.totalShapeLength = o, f.pathsData = a
                    }
                    m += o, f.shape.mdf = !0
                } else f.shape.paths = f.last;
            for (s = 0; h > s; s += 1)
                if (d = [], f = this.shapes[s], f.shape.mdf) {
                    c.length = 0, 1 >= p ? c.push({
                        s: f.totalShapeLength * l,
                        e: f.totalShapeLength * p
                    }) : l >= 1 ? c.push({
                        s: f.totalShapeLength * (l - 1),
                        e: f.totalShapeLength * (p - 1)
                    }) : (c.push({
                        s: f.totalShapeLength * l,
                        e: f.totalShapeLength
                    }), c.push({
                        s: 0,
                        e: f.totalShapeLength * (p - 1)
                    }));
                    var u, y = this.addShapes(f, c[0]);
                    d.push(y), c.length > 1 && (f.shape.v.c ? this.addShapes(f, c[1], y) : (y.i[0] = [y.v[0][0], y.v[0][1]], u = y.v.length - 1, y.o[u] = [y.v[u][0], y.v[u][1]], y = this.addShapes(f, c[1]), d.push(y))), y.i[0] = [y.v[0][0], y.v[0][1]], u = y.v.length - 1, y.o[u] = [y.v[u][0], y.v[u][1]], f.last = d, f.shape.paths = d
                }
        }
        this.dynamicProperties.length || (this.mdf = !1)
    }, TrimModifier.prototype.addSegment = function(t, e, s, r, i, a) {
        i.o[a] = e, i.i[a + 1] = s, i.v[a + 1] = r, i.v[a] = t
    }, TrimModifier.prototype.addShapes = function(t, e, s) {
        var r, i, a, n, o, h, l, p = t.pathsData,
            m = t.shape.paths,
            f = m.length,
            d = 0;
        for (s ? o = s.v.length - 1 : (s = {
                c: !1,
                v: [],
                i: [],
                o: []
            }, o = 0), r = 0; f > r; r += 1) {
            for (h = p[r].lengths, a = m[r].c ? h.length : h.length + 1, i = 1; a > i; i += 1)
                if (n = h[i - 1], d + n.addedLength < e.s) d += n.addedLength;
                else {
                    if (d > e.e) break;
                    e.s <= d && e.e >= d + n.addedLength ? this.addSegment(m[r].v[i - 1], m[r].o[i - 1], m[r].i[i], m[r].v[i], s, o) : (l = bez.getNewSegment(m[r].v[i - 1], m[r].v[i], m[r].o[i - 1], m[r].i[i], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[i - 1]), this.addSegment(l.pt1, l.pt3, l.pt4, l.pt2, s, o)), d += n.addedLength, o += 1
                }
            if (m[r].c && d <= e.e) {
                var c = h[i - 1].addedLength;
                e.s <= d && e.e >= d + c ? this.addSegment(m[r].v[i - 1], m[r].o[i - 1], m[r].i[0], m[r].v[0], s, o) : (l = bez.getNewSegment(m[r].v[i - 1], m[r].v[0], m[r].o[i - 1], m[r].i[0], (e.s - d) / c, (e.e - d) / c, h[i - 1]), this.addSegment(l.pt1, l.pt3, l.pt4, l.pt2, s, o))
            }
        }
        return s
    }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype(ShapeModifier, RoundCornersModifier), RoundCornersModifier.prototype.processKeys = function(t) {
        if (this.elem.globalData.frameId !== this.frameId || t) {
            this.mdf = t ? !0 : !1, this.frameId = this.elem.globalData.frameId;
            var e, s = this.dynamicProperties.length;
            for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e].mdf && (this.mdf = !0)
        }
    }, RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this.dynamicProperties), this.dynamicProperties.length || this.getValue(!0)
    }, RoundCornersModifier.prototype.processPath = function(t, e) {
        var s, r, i, a, n, o, h, l, p, m, f = t.v.length,
            d = [],
            c = [],
            u = [];
        for (s = 0; f > s; s += 1) r = t.v[s], a = t.o[s], i = t.i[s], r[0] === a[0] && r[1] === a[1] && r[0] === i[0] && r[1] === i[1] ? 0 !== s && s !== f - 1 || t.c ? (n = 0 === s ? t.v[f - 1] : t.v[s - 1], p = Math.sqrt(Math.pow(r[0] - n[0], 2) + Math.pow(r[1] - n[1], 2)), m = p ? Math.min(p / 2, e) / p : 0, o = [r[0] + (n[0] - r[0]) * m, r[1] - (r[1] - n[1]) * m], l = o, h = [o[0] - (o[0] - r[0]) * roundCorner, o[1] - (o[1] - r[1]) * roundCorner], d.push(o), c.push(h), u.push(l), n = s === f - 1 ? t.v[0] : t.v[s + 1], p = Math.sqrt(Math.pow(r[0] - n[0], 2) + Math.pow(r[1] - n[1], 2)), m = p ? Math.min(p / 2, e) / p : 0, o = [r[0] + (n[0] - r[0]) * m, r[1] + (n[1] - r[1]) * m], l = [o[0] - (o[0] - r[0]) * roundCorner, o[1] - (o[1] - r[1]) * roundCorner], h = o, d.push(o), c.push(h), u.push(l)) : (d.push(r), c.push(a), u.push(i)) : (d.push(t.v[s]), c.push(t.o[s]), u.push(t.i[s]));
        return {
            v: d,
            o: c,
            i: u,
            c: t.c
        }
    }, RoundCornersModifier.prototype.processShapes = function() {
        var t, e, s, r, i = this.shapes.length,
            a = this.rd.v;
        if (0 !== a) {
            var n, o;
            for (e = 0; i > e; e += 1)
                if (o = [], n = this.shapes[e], n.shape.mdf || this.mdf) {
                    for (n.shape.mdf = !0, t = n.shape.paths, r = t.length, s = 0; r > s; s += 1) o.push(this.processPath(t[s], a));
                    n.shape.paths = o, n.last = o
                } else n.shape.paths = n.last
        }
        this.dynamicProperties.length || (this.mdf = !1)
    }, ShapeModifiers.registerModifier("rd", RoundCornersModifier);
    var ImagePreloader = function() {
            function t() {
                this.loadedAssets += 1, this.loadedAssets === this.totalImages
            }

            function e(t) {
                var e = "";
                if (this.assetsPath) {
                    var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), e = this.assetsPath + s
                } else e = this.path, e += t.u ? t.u : "", e += t.p;
                return e
            }

            function s(e) {
                var s = document.createElement("img");
                s.addEventListener("load", t.bind(this), !1), s.addEventListener("error", t.bind(this), !1), s.src = e
            }

            function r(t) {
                this.totalAssets = t.length;
                var r;
                for (r = 0; r < this.totalAssets; r += 1) t[r].layers || (s.bind(this)(e.bind(this)(t[r])), this.totalImages += 1)
            }

            function i(t) {
                this.path = t || ""
            }

            function a(t) {
                this.assetsPath = t || ""
            }
            return function() {
                this.loadAssets = r, this.setAssetsPath = a, this.setPath = i, this.assetsPath = "", this.path = "", this.totalAssets = 0, this.totalImages = 0, this.loadedAssets = 0
            }
        }(),
        featureSupport = function() {
            var t = {
                maskType: !0
            };
            return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
        }(),
        filtersFactory = function() {
            function t(t) {
                var e = document.createElementNS(svgNS, "filter");
                return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
            }

            function e() {
                var t = document.createElementNS(svgNS, "feColorMatrix");
                return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1"), t
            }
            var s = {};
            return s.createFilter = t, s.createAlphaToLuminanceFilter = e, s
        }();
    BaseRenderer.prototype.checkLayers = function(t) {
        var e, s, r = this.layers.length;
        for (this.completeLayers = !0, e = r - 1; e >= 0; e--) this.elements[e] || (s = this.layers[e], s.ip - s.st <= t - this.layers[e].st && s.op - s.st > t - this.layers[e].st && this.buildItem(e)), this.completeLayers = this.elements[e] ? this.completeLayers : !1;
        this.checkPendingElements()
    }, BaseRenderer.prototype.createItem = function(t) {
        switch (t.ty) {
            case 2:
                return this.createImage(t);
            case 0:
                return this.createComp(t);
            case 1:
                return this.createSolid(t);
            case 4:
                return this.createShape(t);
            case 5:
                return this.createText(t);
            case 99:
                return null
        }
        return this.createBase(t)
    }, BaseRenderer.prototype.buildAllItems = function() {
        var t, e = this.layers.length;
        for (t = 0; e > t; t += 1) this.buildItem(t);
        this.checkPendingElements()
    }, BaseRenderer.prototype.includeLayers = function(t) {
        this.completeLayers = !1;
        var e, s, r = t.length,
            i = this.layers.length;
        for (e = 0; r > e; e += 1)
            for (s = 0; i > s;) {
                if (this.layers[s].id == t[e].id) {
                    this.layers[s] = t[e];
                    break
                }
                s += 1
            }
    }, BaseRenderer.prototype.setProjectInterface = function(t) {
        this.globalData.projectInterface = t
    }, BaseRenderer.prototype.initItems = function() {
        this.globalData.progressiveLoad || this.buildAllItems()
    }, BaseRenderer.prototype.buildElementParenting = function(t, e, s) {
        s = s || [];
        for (var r = this.elements, i = this.layers, a = 0, n = i.length; n > a;) i[a].ind == e && (r[a] && r[a] !== !0 ? void 0 !== i[a].parent ? (s.push(r[a]), this.buildElementParenting(t, i[a].parent, s)) : (s.push(r[a]), t.setHierarchy(s)) : (this.buildItem(a), this.addPendingElement(t))), a += 1
    }, BaseRenderer.prototype.addPendingElement = function(t) {
        this.pendingElements.push(t)
    }, extendPrototype(BaseRenderer, SVGRenderer), SVGRenderer.prototype.createBase = function(t) {
        return new SVGBaseElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.createShape = function(t) {
        return new IShapeElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.createText = function(t) {
        return new SVGTextElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.createImage = function(t) {
        return new IImageElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.createComp = function(t) {
        return new ICompElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.createSolid = function(t) {
        return new ISolidElement(t, this.layerElement, this.globalData, this)
    }, SVGRenderer.prototype.configAnimation = function(t) {
        this.layerElement = document.createElementNS(svgNS, "svg"), this.layerElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.layerElement.setAttribute("width", t.w), this.layerElement.setAttribute("height", t.h), this.layerElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.layerElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.layerElement.style.width = "100%", this.layerElement.style.height = "100%", this.animationItem.wrapper.appendChild(this.layerElement);
        var e = document.createElementNS(svgNS, "defs");
        this.globalData.defs = e, this.layerElement.appendChild(e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.frameId = 0, this.globalData.compSize = {
            w: t.w,
            h: t.h
        }, this.globalData.frameRate = t.fr;
        var s = document.createElementNS(svgNS, "clipPath"),
            r = document.createElementNS(svgNS, "rect");
        r.setAttribute("width", t.w), r.setAttribute("height", t.h), r.setAttribute("x", 0), r.setAttribute("y", 0);
        var i = "animationMask_" + randomString(10);
        s.setAttribute("id", i), s.appendChild(r);
        var a = document.createElementNS(svgNS, "g");
        a.setAttribute("clip-path", "url(#" + i + ")"), this.layerElement.appendChild(a), e.appendChild(s), this.layerElement = a, this.layers = t.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.elements = Array.apply(null, {
            length: t.layers.length
        })
    }, SVGRenderer.prototype.destroy = function() {
        this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; e > t; t++) this.elements[t] && this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null
    }, SVGRenderer.prototype.updateContainerSize = function() {}, SVGRenderer.prototype.buildItem = function(t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
            e[t] = !0;
            var s = this.createItem(this.layers[t]);
            e[t] = s, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(s), s.initExpressions()), this.appendElementInPos(s, t), this.layers[t].tt && (this.elements[t - 1] && this.elements[t - 1] !== !0 ? s.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(s)))
        }
    }, SVGRenderer.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length;) {
            var t = this.pendingElements.pop();
            if (t.checkParenting(), t.data.tt)
                for (var e = 0, s = this.elements.length; s > e;) {
                    if (this.elements[e] === t) {
                        t.setMatte(this.elements[e - 1].layerId);
                        break
                    }
                    e += 1
                }
        }
    }, SVGRenderer.prototype.renderFrame = function(t) {
        if (this.renderedFrame != t && !this.destroyed) {
            null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t;
            var e, s = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), e = s - 1; e >= 0; e--)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
            for (e = s - 1; e >= 0; e--)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
        }
    }, SVGRenderer.prototype.appendElementInPos = function(t, e) {
        var s = t.getBaseElement();
        if (s) {
            for (var r, i = 0; e > i;) this.elements[i] && this.elements[i] !== !0 && this.elements[i].getBaseElement() && (r = this.elements[i].getBaseElement()), i += 1;
            r ? this.layerElement.insertBefore(s, r) : this.layerElement.appendChild(s)
        }
    }, SVGRenderer.prototype.hide = function() {
        this.layerElement.style.display = "none"
    }, SVGRenderer.prototype.show = function() {
        this.layerElement.style.display = "block"
    }, SVGRenderer.prototype.searchExtraCompositions = function(t) {
        var e, s = t.length,
            r = document.createElementNS(svgNS, "g");
        for (e = 0; s > e; e += 1)
            if (t[e].xt) {
                var i = this.createComp(t[e], r, this.globalData.comp, null);
                i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
            }
    }, MaskElement.prototype.getMaskProperty = function(t) {
        return this.viewData[t].prop
    }, MaskElement.prototype.prepareFrame = function() {
        var t, e = this.dynamicProperties.length;
        for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue()
    }, MaskElement.prototype.renderFrame = function(t) {
        var e, s = this.masksProperties.length;
        for (e = 0; s > e; e++)
            if ((this.viewData[e].prop.mdf || this.firstFrame) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op.mdf || this.firstFrame) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp.mdf || this.firstFrame) && (this.viewData[e].invRect.setAttribute("x", -t.props[12]), this.viewData[e].invRect.setAttribute("y", -t.props[13])), this.storedData[e].x && (this.storedData[e].x.mdf || this.firstFrame))) {
                var r = this.storedData[e].expan;
                this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(#" + this.storedData[e].filterId + ")")), r.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
            }
        this.firstFrame = !1
    }, MaskElement.prototype.getMaskelement = function() {
        return this.maskElement
    }, MaskElement.prototype.createLayerSolidPath = function() {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
    }, MaskElement.prototype.drawPath = function(t, e, s) {
        var r, i, a = "";
        for (i = e.v.length, r = 1; i > r; r += 1) 1 == r && (a += " M" + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1])), a += " C" + bm_rnd(e.o[r - 1][0]) + "," + bm_rnd(e.o[r - 1][1]) + " " + bm_rnd(e.i[r][0]) + "," + bm_rnd(e.i[r][1]) + " " + bm_rnd(e.v[r][0]) + "," + bm_rnd(e.v[r][1]);
        e.c && i > 1 && (a += " C" + bm_rnd(e.o[r - 1][0]) + "," + bm_rnd(e.o[r - 1][1]) + " " + bm_rnd(e.i[0][0]) + "," + bm_rnd(e.i[0][1]) + " " + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1])), s.lastPath !== a && (s.elem && (e.c ? t.inv ? s.elem.setAttribute("d", this.solidPath + a) : s.elem.setAttribute("d", a) : s.elem.setAttribute("d", "")), s.lastPath = a)
    }, MaskElement.prototype.getMask = function(t) {
        for (var e = 0, s = this.masksProperties.length; s > e;) {
            if (this.masksProperties[e].nm === t) return {
                maskPath: this.viewData[e].prop.pv
            };
            e += 1
        }
    }, MaskElement.prototype.destroy = function() {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.paths = null, this.masksProperties = null
    }, BaseElement.prototype.checkMasks = function() {
        if (!this.data.hasMask) return !1;
        for (var t = 0, e = this.data.masksProperties.length; e > t;) {
            if ("n" !== this.data.masksProperties[t].mode && this.data.masksProperties[t].cl !== !1) return !0;
            t += 1
        }
        return !1
    }, BaseElement.prototype.checkParenting = function() {
        void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent)
    }, BaseElement.prototype.prepareFrame = function(t) {
        this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? this.isVisible !== !0 && (this.elemMdf = !0, this.globalData.mdf = !0, this.isVisible = !0, this.firstFrame = !0, this.data.hasMask && (this.maskManager.firstFrame = !0)) : this.isVisible !== !1 && (this.elemMdf = !0, this.globalData.mdf = !0, this.isVisible = !1);
        var e, s = this.dynamicProperties.length;
        for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e].mdf && (this.elemMdf = !0, this.globalData.mdf = !0);
        return this.data.hasMask && this.maskManager.prepareFrame(t * this.data.sr), this.currentFrameNum = t * this.data.sr, this.isVisible
    }, BaseElement.prototype.globalToLocal = function(t) {
        var e = [];
        e.push(this.finalTransform);
        for (var s = !0, r = this.comp; s;) r.finalTransform ? (r.data.hasMask && e.splice(0, 0, r.finalTransform), r = r.comp) : s = !1;
        var i, a, n = e.length;
        for (i = 0; n > i; i += 1) a = e[i].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
        return t
    }, BaseElement.prototype.initExpressions = function() {
        this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.layerInterface.registerMaskInterface(this.maskManager);
        var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
        this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty && (this.layerInterface.shapeInterface = ShapeExpressionInterface.createShapeInterface(this.shapesData, this.viewData, this.layerInterface))
    }, BaseElement.prototype.setBlendMode = function() {
        var t = "";
        switch (this.data.bm) {
            case 1:
                t = "multiply";
                break;
            case 2:
                t = "screen";
                break;
            case 3:
                t = "overlay";
                break;
            case 4:
                t = "darken";
                break;
            case 5:
                t = "lighten";
                break;
            case 6:
                t = "color-dodge";
                break;
            case 7:
                t = "color-burn";
                break;
            case 8:
                t = "hard-light";
                break;
            case 9:
                t = "soft-light";
                break;
            case 10:
                t = "difference";
                break;
            case 11:
                t = "exclusion";
                break;
            case 12:
                t = "hue";
                break;
            case 13:
                t = "saturation";
                break;
            case 14:
                t = "color";
                break;
            case 15:
                t = "luminosity"
        }
        var e = this.baseElement || this.layerElement;
        e.style["mix-blend-mode"] = t
    }, BaseElement.prototype.init = function() {
        this.data.sr || (this.data.sr = 1), this.dynamicProperties = [], this.data.ef && (this.effects = new EffectsManager(this.data, this, this.dynamicProperties)), this.hidden = !1, this.firstFrame = !0, this.isVisible = !1, this.currentFrameNum = -99999, this.lastNum = -99999, this.data.ks && (this.finalTransform = {
            mProp: PropertyFactory.getProp(this, this.data.ks, 2, null, this.dynamicProperties),
            matMdf: !1,
            opMdf: !1,
            mat: new Matrix,
            opacity: 1
        }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.finalTransform.op = this.finalTransform.mProp.o, this.transform = this.finalTransform.mProp, 11 !== this.data.ty && this.createElements(), this.data.hasMask && this.addMasks(this.data)), this.elemMdf = !1
    }, BaseElement.prototype.getType = function() {
        return this.type
    }, BaseElement.prototype.resetHierarchy = function() {
        this.hierarchy ? this.hierarchy.length = 0 : this.hierarchy = []
    }, BaseElement.prototype.getHierarchy = function() {
        return this.hierarchy || (this.hierarchy = []), this.hierarchy
    }, BaseElement.prototype.setHierarchy = function(t) {
        this.hierarchy = t
    }, BaseElement.prototype.getLayerSize = function() {
        return 5 === this.data.ty ? {
            w: this.data.textData.width,
            h: this.data.textData.height
        } : {
            w: this.data.width,
            h: this.data.height
        }
    }, BaseElement.prototype.hide = function() {}, BaseElement.prototype.mHelper = new Matrix, createElement(BaseElement, SVGBaseElement), SVGBaseElement.prototype.createElements = function() {
        this.layerElement = document.createElementNS(svgNS, "g"), this.transformedElement = this.layerElement, this.data.hasMask && (this.maskedElement = this.layerElement);
        var t = null;
        if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
                var e = document.createElementNS(svgNS, "mask");
                if (e.setAttribute("id", this.layerId), e.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), e.appendChild(this.layerElement), t = e, this.globalData.defs.appendChild(e), !featureSupport.maskType && 1 == this.data.td) {
                    e.setAttribute("mask-type", "luminance");
                    var s = randomString(10),
                        r = filtersFactory.createFilter(s);
                    this.globalData.defs.appendChild(r), r.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                    var i = document.createElementNS(svgNS, "g");
                    i.appendChild(this.layerElement), t = i, e.appendChild(i), i.setAttribute("filter", "url(#" + s + ")")
                }
            } else if (2 == this.data.td) {
                var a = document.createElementNS(svgNS, "mask");
                a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
                var n = document.createElementNS(svgNS, "g");
                a.appendChild(n);
                var s = randomString(10),
                    r = filtersFactory.createFilter(s),
                    o = document.createElementNS(svgNS, "feColorMatrix");
                o.setAttribute("type", "matrix"), o.setAttribute("color-interpolation-filters", "sRGB"), o.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1"), r.appendChild(o), this.globalData.defs.appendChild(r);
                var h = document.createElementNS(svgNS, "rect");
                if (h.setAttribute("width", this.comp.data ? this.comp.data.w : this.globalData.compSize.w), h.setAttribute("height", this.comp.data ? this.comp.data.h : this.globalData.compSize.h), h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("fill", "#ffffff"), h.setAttribute("opacity", "0"), n.setAttribute("filter", "url(#" + s + ")"), n.appendChild(h), n.appendChild(this.layerElement), t = n, !featureSupport.maskType) {
                    a.setAttribute("mask-type", "luminance"), r.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                    var i = document.createElementNS(svgNS, "g");
                    n.appendChild(h), i.appendChild(this.layerElement), t = i, n.appendChild(i)
                }
                this.globalData.defs.appendChild(a)
            }
        } else(this.data.hasMask || this.data.tt) && this.data.tt ? (this.matteElement = document.createElementNS(svgNS, "g"), this.matteElement.appendChild(this.layerElement), t = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
        if (!this.data.ln && !this.data.cl || 4 !== this.data.ty && 0 !== this.data.ty || (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)), 0 === this.data.ty) {
            var l = document.createElementNS(svgNS, "clipPath"),
                p = document.createElementNS(svgNS, "path");
            p.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var m = "cp_" + randomString(8);
            if (l.setAttribute("id", m), l.appendChild(p), this.globalData.defs.appendChild(l), this.checkMasks()) {
                var f = document.createElementNS(svgNS, "g");
                f.setAttribute("clip-path", "url(#" + m + ")"), f.appendChild(this.layerElement), this.transformedElement = f, t ? t.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
            } else this.layerElement.setAttribute("clip-path", "url(#" + m + ")")
        }
        0 !== this.data.bm && this.setBlendMode(), this.layerElement !== this.parentContainer && (this.placeholder = null), this.data.ef && (this.effectsManager = new SVGEffects(this)), this.checkParenting()
    }, SVGBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode, SVGBaseElement.prototype.renderFrame = function(t) {
        if (3 === this.data.ty || this.data.hd) return !1;
        if (!this.isVisible) return this.isVisible;
        this.lastNum = this.currentFrameNum, this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
        var e, s = this.finalTransform.mat;
        if (this.hierarchy) {
            var r, i = this.hierarchy.length;
            for (e = this.finalTransform.mProp.v.props, s.cloneFromProps(e), r = 0; i > r; r += 1) this.finalTransform.matMdf = this.hierarchy[r].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[r].finalTransform.mProp.v.props, s.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
        } else this.isVisible && s.cloneFromProps(this.finalTransform.mProp.v.props);
        return t && (e = t.mat.props, s.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf), this.finalTransform.matMdf && this.layerElement && this.transformedElement.setAttribute("transform", s.to2dCSS()), this.finalTransform.opMdf && this.layerElement && this.transformedElement.setAttribute("opacity", this.finalTransform.opacity), this.data.hasMask && this.maskManager.renderFrame(s), this.effectsManager && this.effectsManager.renderFrame(this.firstFrame), this.isVisible
    }, SVGBaseElement.prototype.destroy = function() {
        this.layerElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && this.maskManager.destroy()
    }, SVGBaseElement.prototype.getBaseElement = function() {
        return this.baseElement
    }, SVGBaseElement.prototype.addMasks = function(t) {
        this.maskManager = new MaskElement(t, this, this.globalData)
    }, SVGBaseElement.prototype.setMatte = function(t) {
        this.matteElement && this.matteElement.setAttribute("mask", "url(#" + t + ")")
    }, SVGBaseElement.prototype.setMatte = function(t) {
        this.matteElement && this.matteElement.setAttribute("mask", "url(#" + t + ")")
    }, SVGBaseElement.prototype.hide = function() {}, ITextElement.prototype.init = function() {
        this._parent.init.call(this), this.lettersChangedFlag = !1, this.currentTextDocumentData = {};
        var t = this.data;
        this.viewData = {
            m: {
                a: PropertyFactory.getProp(this, t.t.m.a, 1, 0, this.dynamicProperties)
            }
        };
        var e = this.data.t;
        if (e.a.length) {
            this.viewData.a = Array.apply(null, {
                length: e.a.length
            });
            var s, r, i, a = e.a.length;
            for (s = 0; a > s; s += 1) i = e.a[s], r = {
                a: {},
                s: {}
            }, "r" in i.a && (r.a.r = PropertyFactory.getProp(this, i.a.r, 0, degToRads, this.dynamicProperties)), "rx" in i.a && (r.a.rx = PropertyFactory.getProp(this, i.a.rx, 0, degToRads, this.dynamicProperties)), "ry" in i.a && (r.a.ry = PropertyFactory.getProp(this, i.a.ry, 0, degToRads, this.dynamicProperties)), "sk" in i.a && (r.a.sk = PropertyFactory.getProp(this, i.a.sk, 0, degToRads, this.dynamicProperties)), "sa" in i.a && (r.a.sa = PropertyFactory.getProp(this, i.a.sa, 0, degToRads, this.dynamicProperties)), "s" in i.a && (r.a.s = PropertyFactory.getProp(this, i.a.s, 1, .01, this.dynamicProperties)), "a" in i.a && (r.a.a = PropertyFactory.getProp(this, i.a.a, 1, 0, this.dynamicProperties)), "o" in i.a && (r.a.o = PropertyFactory.getProp(this, i.a.o, 0, .01, this.dynamicProperties)), "p" in i.a && (r.a.p = PropertyFactory.getProp(this, i.a.p, 1, 0, this.dynamicProperties)), "sw" in i.a && (r.a.sw = PropertyFactory.getProp(this, i.a.sw, 0, 0, this.dynamicProperties)), "sc" in i.a && (r.a.sc = PropertyFactory.getProp(this, i.a.sc, 1, 0, this.dynamicProperties)), "fc" in i.a && (r.a.fc = PropertyFactory.getProp(this, i.a.fc, 1, 0, this.dynamicProperties)), "fh" in i.a && (r.a.fh = PropertyFactory.getProp(this, i.a.fh, 0, 0, this.dynamicProperties)), "fs" in i.a && (r.a.fs = PropertyFactory.getProp(this, i.a.fs, 0, .01, this.dynamicProperties)), "fb" in i.a && (r.a.fb = PropertyFactory.getProp(this, i.a.fb, 0, .01, this.dynamicProperties)), "t" in i.a && (r.a.t = PropertyFactory.getProp(this, i.a.t, 0, 0, this.dynamicProperties)), r.s = PropertyFactory.getTextSelectorProp(this, i.s, this.dynamicProperties), r.s.t = i.s.t, this.viewData.a[s] = r
        } else this.viewData.a = [];
        e.p && "m" in e.p ? (this.viewData.p = {
            f: PropertyFactory.getProp(this, e.p.f, 0, 0, this.dynamicProperties),
            l: PropertyFactory.getProp(this, e.p.l, 0, 0, this.dynamicProperties),
            r: e.p.r,
            m: this.maskManager.getMaskProperty(e.p.m)
        }, this.maskPath = !0) : this.maskPath = !1
    }, ITextElement.prototype.prepareFrame = function(t) {
        var e = 0,
            s = this.data.t.d.k.length,
            r = this.data.t.d.k[e].s;
        for (e += 1; s > e && !(this.data.t.d.k[e].t > t);) r = this.data.t.d.k[e].s, e += 1;
        this.lettersChangedFlag = !1, r !== this.currentTextDocumentData && (this.currentTextDocumentData = r, this.lettersChangedFlag = !0, this.buildNewText()), this._parent.prepareFrame.call(this, t)
    }, ITextElement.prototype.createPathShape = function(t, e) {
        var s, r, i, a, n = e.length,
            o = "";
        for (s = 0; n > s; s += 1) {
            for (i = e[s].ks.k.i.length, a = e[s].ks.k, r = 1; i > r; r += 1) 1 == r && (o += " M" + t.applyToPointStringified(a.v[0][0], a.v[0][1])), o += " C" + t.applyToPointStringified(a.o[r - 1][0], a.o[r - 1][1]) + " " + t.applyToPointStringified(a.i[r][0], a.i[r][1]) + " " + t.applyToPointStringified(a.v[r][0], a.v[r][1]);
            o += " C" + t.applyToPointStringified(a.o[r - 1][0], a.o[r - 1][1]) + " " + t.applyToPointStringified(a.i[0][0], a.i[0][1]) + " " + t.applyToPointStringified(a.v[0][0], a.v[0][1]),
                o += "z"
        }
        return o
    }, ITextElement.prototype.getMeasures = function() {
        var t, e, s, r, i = this.mHelper,
            a = this.renderType,
            n = this.data,
            o = this.currentTextDocumentData,
            h = o.l;
        if (this.maskPath) {
            var l = this.viewData.p.m;
            if (!this.viewData.p.n || this.viewData.p.mdf) {
                var p = l.v;
                this.viewData.p.r && (p = reversePath(p));
                var m = {
                    tLength: 0,
                    segments: []
                };
                r = p.v.length - 1;
                var f, d = 0;
                for (s = 0; r > s; s += 1) f = {
                    s: p.v[s],
                    e: p.v[s + 1],
                    to: [p.o[s][0] - p.v[s][0], p.o[s][1] - p.v[s][1]],
                    ti: [p.i[s + 1][0] - p.v[s + 1][0], p.i[s + 1][1] - p.v[s + 1][1]]
                }, bez.buildBezierData(f), m.tLength += f.bezierData.segmentLength, m.segments.push(f), d += f.bezierData.segmentLength;
                s = r, l.v.c && (f = {
                    s: p.v[s],
                    e: p.v[0],
                    to: [p.o[s][0] - p.v[s][0], p.o[s][1] - p.v[s][1]],
                    ti: [p.i[0][0] - p.v[0][0], p.i[0][1] - p.v[0][1]]
                }, bez.buildBezierData(f), m.tLength += f.bezierData.segmentLength, m.segments.push(f), d += f.bezierData.segmentLength), this.viewData.p.pi = m
            }
            var c, u, y, m = this.viewData.p.pi,
                g = this.viewData.p.f.v,
                v = 0,
                b = 1,
                E = 0,
                P = !0,
                k = m.segments;
            if (0 > g && l.v.c)
                for (m.tLength < Math.abs(g) && (g = -Math.abs(g) % m.tLength), v = k.length - 1, y = k[v].bezierData.points, b = y.length - 1; 0 > g;) g += y[b].partialLength, b -= 1, 0 > b && (v -= 1, y = k[v].bezierData.points, b = y.length - 1);
            y = k[v].bezierData.points, u = y[b - 1], c = y[b];
            var S, x, C = c.partialLength
        }
        r = h.length, t = 0, e = 0;
        var M, A, D, T, w, F = 1.2 * o.s * .714,
            I = !0,
            V = this.viewData,
            B = Array.apply(null, {
                length: r
            });
        T = V.a.length;
        var R, N, _, L, G, j, O, z, H, W, q, X, Y, U, Z, J, K = -1,
            Q = g,
            $ = v,
            tt = b,
            et = -1,
            st = 0;
        for (s = 0; r > s; s += 1)
            if (i.reset(), j = 1, h[s].n) t = 0, e += o.yOffset, e += I ? 1 : 0, g = Q, I = !1, st = 0, this.maskPath && (v = $, b = tt, y = k[v].bezierData.points, u = y[b - 1], c = y[b], C = c.partialLength, E = 0), B[s] = this.emptyProp;
            else {
                if (this.maskPath) {
                    if (et !== h[s].line) {
                        switch (o.j) {
                            case 1:
                                g += d - o.lineWidths[h[s].line];
                                break;
                            case 2:
                                g += (d - o.lineWidths[h[s].line]) / 2
                        }
                        et = h[s].line
                    }
                    K !== h[s].ind && (h[K] && (g += h[K].extra), g += h[s].an / 2, K = h[s].ind), g += V.m.a.v[0] * h[s].an / 200;
                    var rt = 0;
                    for (D = 0; T > D; D += 1) M = V.a[D].a, "p" in M && (A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), rt += N.length ? M.p.v[0] * N[0] : M.p.v[0] * N);
                    for (P = !0; P;) E + C >= g + rt || !y ? (S = (g + rt - E) / c.partialLength, L = u.point[0] + (c.point[0] - u.point[0]) * S, G = u.point[1] + (c.point[1] - u.point[1]) * S, i.translate(0, -(V.m.a.v[1] * F / 100) + e), P = !1) : y && (E += c.partialLength, b += 1, b >= y.length && (b = 0, v += 1, k[v] ? y = k[v].bezierData.points : l.v.c ? (b = 0, v = 0, y = k[v].bezierData.points) : (E -= c.partialLength, y = null)), y && (u = c, c = y[b], C = c.partialLength));
                    _ = h[s].an / 2 - h[s].add, i.translate(-_, 0, 0)
                } else _ = h[s].an / 2 - h[s].add, i.translate(-_, 0, 0), i.translate(-V.m.a.v[0] * h[s].an / 200, -V.m.a.v[1] * F / 100, 0);
                for (st += h[s].l / 2, D = 0; T > D; D += 1) M = V.a[D].a, "t" in M && (A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), this.maskPath ? g += N.length ? M.t * N[0] : M.t * N : t += N.length ? M.t.v * N[0] : M.t.v * N);
                for (st += h[s].l / 2, o.strokeWidthAnim && (z = o.sw || 0), o.strokeColorAnim && (O = o.sc ? [o.sc[0], o.sc[1], o.sc[2]] : [0, 0, 0]), o.fillColorAnim && (H = [o.fc[0], o.fc[1], o.fc[2]]), D = 0; T > D; D += 1) M = V.a[D].a, "a" in M && (A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), N.length ? i.translate(-M.a.v[0] * N[0], -M.a.v[1] * N[1], M.a.v[2] * N[2]) : i.translate(-M.a.v[0] * N, -M.a.v[1] * N, M.a.v[2] * N));
                for (D = 0; T > D; D += 1) M = V.a[D].a, "s" in M && (A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), N.length ? i.scale(1 + (M.s.v[0] - 1) * N[0], 1 + (M.s.v[1] - 1) * N[1], 1) : i.scale(1 + (M.s.v[0] - 1) * N, 1 + (M.s.v[1] - 1) * N, 1));
                for (D = 0; T > D; D += 1) {
                    if (M = V.a[D].a, A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), "sk" in M && (N.length ? i.skewFromAxis(-M.sk.v * N[0], M.sa.v * N[1]) : i.skewFromAxis(-M.sk.v * N, M.sa.v * N)), "r" in M && i.rotateZ(N.length ? -M.r.v * N[2] : -M.r.v * N), "ry" in M && i.rotateY(N.length ? M.ry.v * N[1] : M.ry.v * N), "rx" in M && i.rotateX(N.length ? M.rx.v * N[0] : M.rx.v * N), "o" in M && (j += N.length ? (M.o.v * N[0] - j) * N[0] : (M.o.v * N - j) * N), o.strokeWidthAnim && "sw" in M && (z += N.length ? M.sw.v * N[0] : M.sw.v * N), o.strokeColorAnim && "sc" in M)
                        for (W = 0; 3 > W; W += 1) O[W] = Math.round(N.length ? 255 * (O[W] + (M.sc.v[W] - O[W]) * N[0]) : 255 * (O[W] + (M.sc.v[W] - O[W]) * N));
                    if (o.fillColorAnim) {
                        if ("fc" in M)
                            for (W = 0; 3 > W; W += 1) H[W] = N.length ? H[W] + (M.fc.v[W] - H[W]) * N[0] : H[W] + (M.fc.v[W] - H[W]) * N;
                        "fh" in M && (H = N.length ? addHueToRGB(H, M.fh.v * N[0]) : addHueToRGB(H, M.fh.v * N)), "fs" in M && (H = N.length ? addSaturationToRGB(H, M.fs.v * N[0]) : addSaturationToRGB(H, M.fs.v * N)), "fb" in M && (H = N.length ? addBrightnessToRGB(H, M.fb.v * N[0]) : addBrightnessToRGB(H, M.fb.v * N))
                    }
                }
                for (D = 0; T > D; D += 1) M = V.a[D].a, "p" in M && (A = V.a[D].s, N = A.getMult(h[s].anIndexes[D], n.t.a[D].s.totalChars), this.maskPath ? N.length ? i.translate(0, M.p.v[1] * N[0], -M.p.v[2] * N[1]) : i.translate(0, M.p.v[1] * N, -M.p.v[2] * N) : N.length ? i.translate(M.p.v[0] * N[0], M.p.v[1] * N[1], -M.p.v[2] * N[2]) : i.translate(M.p.v[0] * N, M.p.v[1] * N, -M.p.v[2] * N));
                if (o.strokeWidthAnim && (q = 0 > z ? 0 : z), o.strokeColorAnim && (X = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), o.fillColorAnim && (Y = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"), this.maskPath) {
                    if (n.t.p.p) {
                        x = (c.point[1] - u.point[1]) / (c.point[0] - u.point[0]);
                        var it = 180 * Math.atan(x) / Math.PI;
                        c.point[0] < u.point[0] && (it += 180), i.rotate(-it * Math.PI / 180)
                    }
                    i.translate(L, G, 0), i.translate(V.m.a.v[0] * h[s].an / 200, V.m.a.v[1] * F / 100, 0), g -= V.m.a.v[0] * h[s].an / 200, h[s + 1] && K !== h[s + 1].ind && (g += h[s].an / 2, g += o.tr / 1e3 * o.s)
                } else {
                    switch (i.translate(t, e, 0), o.ps && i.translate(o.ps[0], o.ps[1] + o.ascent, 0), o.j) {
                        case 1:
                            i.translate(o.justifyOffset + (o.boxWidth - o.lineWidths[h[s].line]), 0, 0);
                            break;
                        case 2:
                            i.translate(o.justifyOffset + (o.boxWidth - o.lineWidths[h[s].line]) / 2, 0, 0)
                    }
                    i.translate(_, 0, 0), i.translate(V.m.a.v[0] * h[s].an / 200, V.m.a.v[1] * F / 100, 0), t += h[s].l + o.tr / 1e3 * o.s
                }
                "html" === a ? U = i.toCSS() : "svg" === a ? U = i.to2dCSS() : Z = [i.props[0], i.props[1], i.props[2], i.props[3], i.props[4], i.props[5], i.props[6], i.props[7], i.props[8], i.props[9], i.props[10], i.props[11], i.props[12], i.props[13], i.props[14], i.props[15]], J = j, R = this.renderedLetters[s], !R || R.o === J && R.sw === q && R.sc === X && R.fc === Y ? "svg" !== a && "html" !== a || R && R.m === U ? "canvas" !== a || R && R.props[0] === Z[0] && R.props[1] === Z[1] && R.props[4] === Z[4] && R.props[5] === Z[5] && R.props[12] === Z[12] && R.props[13] === Z[13] ? w = R : (this.lettersChangedFlag = !0, w = new LetterProps(J, q, X, Y, null, Z)) : (this.lettersChangedFlag = !0, w = new LetterProps(J, q, X, Y, U)) : (this.lettersChangedFlag = !0, w = new LetterProps(J, q, X, Y, U, Z)), this.renderedLetters[s] = w
            }
    }, ITextElement.prototype.emptyProp = new LetterProps, createElement(SVGBaseElement, SVGTextElement), SVGTextElement.prototype.init = ITextElement.prototype.init, SVGTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, SVGTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, SVGTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, SVGTextElement.prototype.createElements = function() {
        this._parent.createElements.call(this), this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
    }, SVGTextElement.prototype.buildNewText = function() {
        var t, e, s = this.currentTextDocumentData;
        this.renderedLetters = Array.apply(null, {
            length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
        }), s.fc ? this.layerElement.setAttribute("fill", "rgb(" + Math.round(255 * s.fc[0]) + "," + Math.round(255 * s.fc[1]) + "," + Math.round(255 * s.fc[2]) + ")") : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), s.sc && (this.layerElement.setAttribute("stroke", "rgb(" + Math.round(255 * s.sc[0]) + "," + Math.round(255 * s.sc[1]) + "," + Math.round(255 * s.sc[2]) + ")"), this.layerElement.setAttribute("stroke-width", s.sw)), this.layerElement.setAttribute("font-size", s.s);
        var r = this.globalData.fontManager.getFontByName(s.f);
        if (r.fClass) this.layerElement.setAttribute("class", r.fClass);
        else {
            this.layerElement.setAttribute("font-family", r.fFamily);
            var i = s.fWeight,
                a = s.fStyle;
            this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", i)
        }
        var n = s.l || [];
        if (e = n.length) {
            var o, h, l = this.mHelper,
                p = "",
                m = this.data.singleShape;
            if (m) var f = 0,
                d = 0,
                c = s.lineWidths,
                u = s.boxWidth,
                y = !0;
            var g = 0;
            for (t = 0; e > t; t += 1) {
                if (this.globalData.fontManager.chars ? m && 0 !== t || (o = this.textSpans[g] ? this.textSpans[g] : document.createElementNS(svgNS, "path")) : o = this.textSpans[g] ? this.textSpans[g] : document.createElementNS(svgNS, "text"), o.style.display = "inherit", o.setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4"), m && n[t].n && (f = 0, d += s.yOffset, d += y ? 1 : 0, y = !1), l.reset(), this.globalData.fontManager.chars && l.scale(s.s / 100, s.s / 100), m) {
                    switch (s.ps && l.translate(s.ps[0], s.ps[1] + s.ascent, 0), s.j) {
                        case 1:
                            l.translate(s.justifyOffset + (u - c[n[t].line]), 0, 0);
                            break;
                        case 2:
                            l.translate(s.justifyOffset + (u - c[n[t].line]) / 2, 0, 0)
                    }
                    l.translate(f, d, 0)
                }
                if (this.globalData.fontManager.chars) {
                    var v, b = this.globalData.fontManager.getCharData(s.t.charAt(t), r.fStyle, this.globalData.fontManager.getFontByName(s.f).fFamily);
                    v = b ? b.data : null, v && v.shapes && (h = v.shapes[0].it, m || (p = ""), p += this.createPathShape(l, h), m || o.setAttribute("d", p)), m || this.layerElement.appendChild(o)
                } else o.textContent = n[t].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.layerElement.appendChild(o), m && o.setAttribute("transform", l.to2dCSS());
                m && (f += n[t].l, f += s.tr / 1e3 * s.s), this.textSpans[g] = o, g += 1
            }
            if (!m)
                for (; g < this.textSpans.length;) this.textSpans[g].style.display = "none", g += 1;
            m && this.globalData.fontManager.chars && (o.setAttribute("d", p), this.layerElement.appendChild(o))
        }
    }, SVGTextElement.prototype.hide = function() {
        this.hidden || (this.layerElement.style.display = "none", this.hidden = !0)
    }, SVGTextElement.prototype.renderFrame = function(t) {
        var e = this._parent.renderFrame.call(this, t);
        if (e === !1) return void this.hide();
        if (this.hidden && (this.hidden = !1, this.layerElement.style.display = "block"), !this.data.singleShape && (this.getMeasures(), this.lettersChangedFlag)) {
            var s, r, i = this.renderedLetters,
                a = this.currentTextDocumentData.l;
            r = a.length;
            var n;
            for (s = 0; r > s; s += 1) a[s].n || (n = i[s], this.textSpans[s].setAttribute("transform", n.m), this.textSpans[s].setAttribute("opacity", n.o), n.sw && this.textSpans[s].setAttribute("stroke-width", n.sw), n.sc && this.textSpans[s].setAttribute("stroke", n.sc), n.fc && this.textSpans[s].setAttribute("fill", n.fc));
            this.firstFrame && (this.firstFrame = !1)
        }
    }, SVGTextElement.prototype.destroy = function() {
        this._parent.destroy.call()
    }, SVGTintFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager.mdf) {
            var e = this.filterManager.effectElements[0].p.v,
                s = this.filterManager.effectElements[1].p.v,
                r = this.filterManager.effectElements[2].p.v / 100;
            this.matrixFilter.setAttribute("values", s[0] - e[0] + " 0 0 0 " + e[0] + " " + (s[1] - e[1]) + " 0 0 0 " + e[1] + " " + (s[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
        }
    }, SVGFillFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager.mdf) {
            var e = this.filterManager.effectElements[2].p.v,
                s = this.filterManager.effectElements[6].p.v;
            this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + s + " 0")
        }
    }, SVGStrokeEffect.prototype.initialize = function() {
        var t, e, s, r, i = this.elem.layerElement.children || this.elem.layerElement.childNodes;
        for (1 === this.filterManager.effectElements[1].p.v ? (r = this.elem.maskManager.masksProperties.length, s = 0) : (s = this.filterManager.effectElements[0].p.v - 1, r = s + 1), e = document.createElementNS(svgNS, "g"), e.setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1), s; r > s; s += 1) t = document.createElementNS(svgNS, "path"), e.appendChild(t), this.paths.push({
            p: t,
            m: s
        });
        if (3 === this.filterManager.effectElements[10].p.v) {
            var a = document.createElementNS(svgNS, "mask"),
                n = "stms_" + randomString(10);
            a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
            var o = document.createElementNS(svgNS, "g");
            o.setAttribute("mask", "url(#" + n + ")"), i[0] && o.appendChild(i[0]), this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff")
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
            if (2 === this.filterManager.effectElements[10].p.v)
                for (var i = this.elem.layerElement.children || this.elem.layerElement.childNodes; i.length;) this.elem.layerElement.removeChild(i[0]);
            this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
        }
        this.initialized = !0, this.pathMasker = e
    }, SVGStrokeEffect.prototype.renderFrame = function(t) {
        this.initialized || this.initialize();
        var e, s, r, i = this.paths.length;
        for (e = 0; i > e; e += 1)
            if (s = this.elem.maskManager.viewData[this.paths[e].m], r = this.paths[e].p, (t || this.filterManager.mdf || s.prop.mdf) && r.setAttribute("d", s.lastPath), t || this.filterManager.effectElements[9].p.mdf || this.filterManager.effectElements[4].p.mdf || this.filterManager.effectElements[7].p.mdf || this.filterManager.effectElements[8].p.mdf || s.prop.mdf) {
                var a;
                if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                    var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                        o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                        h = r.getTotalLength();
                    a = "0 0 0 " + h * n + " ";
                    var l, p = h * (o - n),
                        m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                        f = Math.floor(p / m);
                    for (l = 0; f > l; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                    a += "0 " + 10 * h + " 0 0"
                } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                r.setAttribute("stroke-dasharray", a)
            }
        if ((t || this.filterManager.effectElements[4].p.mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p.mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p.mdf)) {
            var d = this.filterManager.effectElements[3].p.v;
            this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * d[0]) + "," + bm_floor(255 * d[1]) + "," + bm_floor(255 * d[2]) + ")")
        }
    }, SVGTritoneFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager.mdf) {
            var e = this.filterManager.effectElements[0].p.v,
                s = this.filterManager.effectElements[1].p.v,
                r = this.filterManager.effectElements[2].p.v,
                i = r[0] + " " + s[0] + " " + e[0],
                a = r[1] + " " + s[1] + " " + e[1],
                n = r[2] + " " + s[2] + " " + e[2];
            this.feFuncR.setAttribute("tableValues", i), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n)
        }
    }, SVGProLevelsFilter.prototype.createFeFunc = function(t, e) {
        var s = document.createElementNS(svgNS, t);
        return s.setAttribute("type", "table"), feComponentTransfer.appendChild(s), s
    }, SVGProLevelsFilter.prototype.getTableValue = function(t, e, s, r, i) {
        for (var a, n, o = 0, h = 256, l = Math.min(t, e), p = Math.max(t, e), m = Array.call(null, {
                length: h
            }), f = 0, d = i - r, c = e - t; 256 >= o;) a = o / 256, n = l >= a ? 0 > c ? i : r : a >= p ? 0 > c ? r : i : r + d * Math.pow((a - t) / c, 1 / s), m[f++] = n, o += 256 / (h - 1);
        return m.join(" ")
    }, SVGProLevelsFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager.mdf) {
            var e, s = this.filterManager.effectElements;
            this.feFuncRComposed && (t || s[2].p.mdf || s[3].p.mdf || s[4].p.mdf || s[5].p.mdf || s[6].p.mdf) && (e = this.getTableValue(s[2].p.v, s[3].p.v, s[4].p.v, s[5].p.v, s[6].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || s[9].p.mdf || s[10].p.mdf || s[11].p.mdf || s[12].p.mdf || s[13].p.mdf) && (e = this.getTableValue(s[9].p.v, s[10].p.v, s[11].p.v, s[12].p.v, s[13].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || s[16].p.mdf || s[17].p.mdf || s[18].p.mdf || s[19].p.mdf || s[20].p.mdf) && (e = this.getTableValue(s[16].p.v, s[17].p.v, s[18].p.v, s[19].p.v, s[20].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || s[23].p.mdf || s[24].p.mdf || s[25].p.mdf || s[26].p.mdf || s[27].p.mdf) && (e = this.getTableValue(s[23].p.v, s[24].p.v, s[25].p.v, s[26].p.v, s[27].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || s[30].p.mdf || s[31].p.mdf || s[32].p.mdf || s[33].p.mdf || s[34].p.mdf) && (e = this.getTableValue(s[30].p.v, s[31].p.v, s[32].p.v, s[33].p.v, s[34].p.v), this.feFuncA.setAttribute("tableValues", e))
        }
    }, SVGEffects.prototype.renderFrame = function(t) {
        var e, s = this.filters.length;
        for (e = 0; s > e; e += 1) this.filters[e].renderFrame(t)
    }, createElement(SVGBaseElement, ICompElement), ICompElement.prototype.hide = function() {
        if (!this.hidden) {
            var t, e = this.elements.length;
            for (t = 0; e > t; t += 1) this.elements[t] && this.elements[t].hide();
            this.hidden = !0
        }
    }, ICompElement.prototype.prepareFrame = function(t) {
        if (this._parent.prepareFrame.call(this, t), this.isVisible !== !1 || this.data.xt) {
            if (this.tm) {
                var e = this.tm.v;
                e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
            } else this.renderedFrame = t / this.data.sr;
            var s, r = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame), s = 0; r > s; s += 1)(this.completeLayers || this.elements[s]) && this.elements[s].prepareFrame(this.renderedFrame - this.layers[s].st)
        }
    }, ICompElement.prototype.renderFrame = function(t) {
        var e, s = this._parent.renderFrame.call(this, t),
            r = this.layers.length;
        if (s === !1) return void this.hide();
        for (this.hidden = !1, e = 0; r > e; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        this.firstFrame && (this.firstFrame = !1)
    }, ICompElement.prototype.setElements = function(t) {
        this.elements = t
    }, ICompElement.prototype.getElements = function() {
        return this.elements
    }, ICompElement.prototype.destroy = function() {
        this._parent.destroy.call();
        var t, e = this.layers.length;
        for (t = 0; e > t; t += 1) this.elements[t] && this.elements[t].destroy()
    }, ICompElement.prototype.checkLayers = SVGRenderer.prototype.checkLayers, ICompElement.prototype.buildItem = SVGRenderer.prototype.buildItem, ICompElement.prototype.buildAllItems = SVGRenderer.prototype.buildAllItems, ICompElement.prototype.buildElementParenting = SVGRenderer.prototype.buildElementParenting, ICompElement.prototype.createItem = SVGRenderer.prototype.createItem, ICompElement.prototype.createImage = SVGRenderer.prototype.createImage, ICompElement.prototype.createComp = SVGRenderer.prototype.createComp, ICompElement.prototype.createSolid = SVGRenderer.prototype.createSolid, ICompElement.prototype.createShape = SVGRenderer.prototype.createShape, ICompElement.prototype.createText = SVGRenderer.prototype.createText, ICompElement.prototype.createBase = SVGRenderer.prototype.createBase, ICompElement.prototype.appendElementInPos = SVGRenderer.prototype.appendElementInPos, ICompElement.prototype.checkPendingElements = SVGRenderer.prototype.checkPendingElements, ICompElement.prototype.addPendingElement = SVGRenderer.prototype.addPendingElement, createElement(SVGBaseElement, IImageElement), IImageElement.prototype.createElements = function() {
        var t = this.globalData.getAssetsPath(this.assetData);
        this._parent.createElements.call(this), this.innerElem = document.createElementNS(svgNS, "image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", "xMidYMid slice"), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.maskedElement = this.innerElem, this.layerElement.appendChild(this.innerElem), this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
    }, IImageElement.prototype.hide = function() {
        this.hidden || (this.layerElement.style.display = "none", this.hidden = !0)
    }, IImageElement.prototype.renderFrame = function(t) {
        var e = this._parent.renderFrame.call(this, t);
        return e === !1 ? void this.hide() : (this.hidden && (this.hidden = !1, this.layerElement.style.display = "block"), void(this.firstFrame && (this.firstFrame = !1)))
    }, IImageElement.prototype.destroy = function() {
        this._parent.destroy.call(), this.innerElem = null
    }, createElement(SVGBaseElement, IShapeElement), IShapeElement.prototype.lcEnum = {
        1: "butt",
        2: "round",
        3: "butt"
    }, IShapeElement.prototype.ljEnum = {
        1: "miter",
        2: "round",
        3: "butt"
    }, IShapeElement.prototype.buildExpressionInterface = function() {}, IShapeElement.prototype.createElements = function() {
        this._parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.layerElement, this.dynamicProperties, 0), (!this.data.hd || this.data.td) && styleUnselectableDiv(this.layerElement)
    }, IShapeElement.prototype.setGradientData = function(t, e, s) {
        var r, i = "gr_" + randomString(10);
        r = 1 === e.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"), r.setAttribute("id", i), r.setAttribute("spreadMethod", "pad"), r.setAttribute("gradientUnits", "userSpaceOnUse");
        var a, n, o, h = [];
        for (o = 4 * e.g.p, n = 0; o > n; n += 4) a = document.createElementNS(svgNS, "stop"), r.appendChild(a), h.push(a);
        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(#" + i + ")"), this.globalData.defs.appendChild(r), s.gf = r, s.cst = h
    }, IShapeElement.prototype.setGradientOpacity = function(t, e, s) {
        if (t.g.k.k[0].s && t.g.k.k[0].s.length > 4 * t.g.p || t.g.k.k.length > 4 * t.g.p) {
            var r, i, a, n, o = document.createElementNS(svgNS, "mask"),
                h = document.createElementNS(svgNS, "path");
            o.appendChild(h);
            var l = "op_" + randomString(10),
                p = "mk_" + randomString(10);
            o.setAttribute("id", p), r = 1 === t.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"), r.setAttribute("id", l), r.setAttribute("spreadMethod", "pad"), r.setAttribute("gradientUnits", "userSpaceOnUse"), n = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
            var m = [];
            for (a = 4 * t.g.p; n > a; a += 2) i = document.createElementNS(svgNS, "stop"), i.setAttribute("stop-color", "rgb(255,255,255)"), r.appendChild(i), m.push(i);
            return h.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(#" + l + ")"), this.globalData.defs.appendChild(r), this.globalData.defs.appendChild(o), e.of = r, e.ost = m, s.msElem = h, p
        }
    }, IShapeElement.prototype.searchShapes = function(t, e, s, r, i, a) {
        a = a || [];
        var n, o, h, l, p, m = [].concat(a),
            f = t.length - 1,
            d = [],
            c = [];
        for (n = f; n >= 0; n -= 1)
            if ("fl" == t[n].ty || "st" == t[n].ty || "gf" == t[n].ty || "gs" == t[n].ty) {
                e[n] = {}, l = {
                    type: t[n].ty,
                    d: "",
                    ld: "",
                    lvl: i,
                    mdf: !1
                };
                var u = document.createElementNS(svgNS, "path");
                if (e[n].o = PropertyFactory.getProp(this, t[n].o, 0, .01, r), ("st" == t[n].ty || "gs" == t[n].ty) && (u.setAttribute("stroke-linecap", this.lcEnum[t[n].lc] || "round"), u.setAttribute("stroke-linejoin", this.ljEnum[t[n].lj] || "round"), u.setAttribute("fill-opacity", "0"), 1 == t[n].lj && u.setAttribute("stroke-miterlimit", t[n].ml), e[n].w = PropertyFactory.getProp(this, t[n].w, 0, null, r), t[n].d)) {
                    var y = PropertyFactory.getDashProp(this, t[n].d, "svg", r);
                    y.k || (u.setAttribute("stroke-dasharray", y.dasharray), u.setAttribute("stroke-dashoffset", y.dashoffset)), e[n].d = y
                }
                if ("fl" == t[n].ty || "st" == t[n].ty) e[n].c = PropertyFactory.getProp(this, t[n].c, 1, 255, r), s.appendChild(u);
                else {
                    e[n].g = PropertyFactory.getGradientProp(this, t[n].g, r), 2 == t[n].t && (e[n].h = PropertyFactory.getProp(this, t[n].h, 1, .01, r), e[n].a = PropertyFactory.getProp(this, t[n].a, 1, degToRads, r)), e[n].s = PropertyFactory.getProp(this, t[n].s, 1, null, r), e[n].e = PropertyFactory.getProp(this, t[n].e, 1, null, r), this.setGradientData(u, t[n], e[n], l);
                    var g = this.setGradientOpacity(t[n], e[n], l);
                    g && u.setAttribute("mask", "url(#" + g + ")"), e[n].elem = u, s.appendChild(u)
                }
                t[n].ln && u.setAttribute("id", t[n].ln), t[n].cl && u.setAttribute("class", t[n].cl), l.pElem = u, this.stylesList.push(l), e[n].style = l, d.push(l)
            } else if ("gr" == t[n].ty) {
            e[n] = {
                it: []
            };
            var v = document.createElementNS(svgNS, "g");
            s.appendChild(v), e[n].gr = v, this.searchShapes(t[n].it, e[n].it, v, r, i + 1, a)
        } else if ("tr" == t[n].ty) e[n] = {
            transform: {
                op: PropertyFactory.getProp(this, t[n].o, 0, .01, r),
                mProps: PropertyFactory.getProp(this, t[n], 2, null, r)
            },
            elements: []
        }, p = e[n].transform, m.push(p);
        else if ("sh" == t[n].ty || "rc" == t[n].ty || "el" == t[n].ty || "sr" == t[n].ty) {
            e[n] = {
                elements: [],
                caches: [],
                styles: [],
                transformers: m,
                lStr: ""
            };
            var b = 4;
            for ("rc" == t[n].ty ? b = 5 : "el" == t[n].ty ? b = 6 : "sr" == t[n].ty && (b = 7), e[n].sh = ShapePropertyFactory.getShapeProp(this, t[n], b, r), e[n].lvl = i, this.shapes.push(e[n].sh), this.addShapeToModifiers(e[n].sh), h = this.stylesList.length, o = 0; h > o; o += 1) this.stylesList[o].closed || e[n].elements.push({
                ty: this.stylesList[o].type,
                st: this.stylesList[o]
            })
        } else if ("tm" == t[n].ty || "rd" == t[n].ty || "ms" == t[n].ty) {
            var E = ShapeModifiers.getModifier(t[n].ty);
            E.init(this, t[n], r), this.shapeModifiers.push(E), c.push(E), e[n] = E
        }
        for (f = d.length, n = 0; f > n; n += 1) d[n].closed = !0;
        for (f = c.length, n = 0; f > n; n += 1) c[n].closed = !0
    }, IShapeElement.prototype.addShapeToModifiers = function(t) {
        var e, s = this.shapeModifiers.length;
        for (e = 0; s > e; e += 1) this.shapeModifiers[e].addShape(t)
    }, IShapeElement.prototype.renderModifiers = function() {
        if (this.shapeModifiers.length) {
            var t, e = this.shapes.length;
            for (t = 0; e > t; t += 1) this.shapes[t].reset();
            for (e = this.shapeModifiers.length, t = e - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this.firstFrame)
        }
    }, IShapeElement.prototype.renderFrame = function(t) {
        var e = this._parent.renderFrame.call(this, t);
        return e === !1 ? void this.hide() : (this.globalToLocal([0, 0, 0]), this.hidden && (this.layerElement.style.display = "block", this.hidden = !1), this.renderModifiers(), void this.renderShape(null, null, !0, null))
    }, IShapeElement.prototype.hide = function() {
        if (!this.hidden) {
            this.layerElement.style.display = "none";
            var t, e = this.stylesList.length;
            for (t = e - 1; t >= 0; t -= 1) "0" !== this.stylesList[t].ld && (this.stylesList[t].ld = "0", this.stylesList[t].pElem.style.display = "none", this.stylesList[t].pElem.parentNode && (this.stylesList[t].parent = this.stylesList[t].pElem.parentNode));
            this.hidden = !0
        }
    }, IShapeElement.prototype.renderShape = function(t, e, s, r) {
        var i, a;
        if (!t)
            for (t = this.shapesData, a = this.stylesList.length, i = 0; a > i; i += 1) this.stylesList[i].d = "", this.stylesList[i].mdf = !1;
        e || (e = this.viewData), a = t.length - 1;
        var n;
        for (i = a; i >= 0; i -= 1) n = t[i].ty, "tr" == n ? ((this.firstFrame || e[i].transform.op.mdf && r) && r.setAttribute("opacity", e[i].transform.op.v), (this.firstFrame || e[i].transform.mProps.mdf && r) && r.setAttribute("transform", e[i].transform.mProps.v.to2dCSS())) : "sh" == n || "el" == n || "rc" == n || "sr" == n ? this.renderPath(t[i], e[i]) : "fl" == n ? this.renderFill(t[i], e[i]) : "gf" == n ? this.renderGradient(t[i], e[i]) : "gs" == n ? (this.renderGradient(t[i], e[i]), this.renderStroke(t[i], e[i])) : "st" == n ? this.renderStroke(t[i], e[i]) : "gr" == n && this.renderShape(t[i].it, e[i].it, !1, e[i].gr);
        if (s) {
            for (a = this.stylesList.length, i = 0; a > i; i += 1) "0" === this.stylesList[i].ld && (this.stylesList[i].ld = "1", this.stylesList[i].pElem.style.display = "block"), (this.stylesList[i].mdf || this.firstFrame) && (this.stylesList[i].pElem.setAttribute("d", this.stylesList[i].d), this.stylesList[i].msElem && this.stylesList[i].msElem.setAttribute("d", this.stylesList[i].d));
            this.firstFrame && (this.firstFrame = !1)
        }
    }, IShapeElement.prototype.renderPath = function(t, e) {
        var s, r, i, a, n, o, h, l, p = e.elements.length,
            m = e.lvl;
        for (l = 0; p > l; l += 1) {
            o = e.sh.mdf || this.firstFrame, n = "";
            var f = e.sh.paths;
            if (a = f.length, e.elements[l].st.lvl < m) {
                var d, c, u = this.mHelper.reset();
                for (c = e.transformers.length - 1; c >= 0; c -= 1) o = e.transformers[c].mProps.mdf || o, d = e.transformers[c].mProps.v.props, u.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]);
                if (o) {
                    for (i = 0; a > i; i += 1)
                        if (h = f[i], h && h.v) {
                            for (s = h.v.length, r = 1; s > r; r += 1) 1 == r && (n += " M" + u.applyToPointStringified(h.v[0][0], h.v[0][1])), n += " C" + u.applyToPointStringified(h.o[r - 1][0], h.o[r - 1][1]) + " " + u.applyToPointStringified(h.i[r][0], h.i[r][1]) + " " + u.applyToPointStringified(h.v[r][0], h.v[r][1]);
                            1 == s && (n += " M" + u.applyToPointStringified(h.v[0][0], h.v[0][1])), h.c && (n += " C" + u.applyToPointStringified(h.o[r - 1][0], h.o[r - 1][1]) + " " + u.applyToPointStringified(h.i[0][0], h.i[0][1]) + " " + u.applyToPointStringified(h.v[0][0], h.v[0][1]), n += "z")
                        }
                    e.caches[l] = n
                } else n = e.caches[l]
            } else if (o) {
                for (i = 0; a > i; i += 1)
                    if (h = f[i], h && h.v) {
                        for (s = h.v.length, r = 1; s > r; r += 1) 1 == r && (n += " M" + h.v[0].join(",")), n += " C" + h.o[r - 1].join(",") + " " + h.i[r].join(",") + " " + h.v[r].join(",");
                        1 == s && (n += " M" + h.v[0].join(",")), h.c && s && (n += " C" + h.o[r - 1].join(",") + " " + h.i[0].join(",") + " " + h.v[0].join(","), n += "z")
                    }
                e.caches[l] = n
            } else n = e.caches[l];
            e.elements[l].st.d += n, e.elements[l].st.mdf = o || e.elements[l].st.mdf
        }
    }, IShapeElement.prototype.renderFill = function(t, e) {
        var s = e.style;
        (e.c.mdf || this.firstFrame) && s.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || this.firstFrame) && s.pElem.setAttribute("fill-opacity", e.o.v)
    }, IShapeElement.prototype.renderGradient = function(t, e) {
        var s = e.gf,
            r = e.of,
            i = e.s.v,
            a = e.e.v;
        if (e.o.mdf || this.firstFrame) {
            var n = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
            e.elem.setAttribute(n, e.o.v)
        }
        if (e.s.mdf || this.firstFrame) {
            var o = 1 === t.t ? "x1" : "cx",
                h = "x1" === o ? "y1" : "cy";
            s.setAttribute(o, i[0]), s.setAttribute(h, i[1]), r && (r.setAttribute(o, i[0]), r.setAttribute(h, i[1]))
        }
        var l, p, m, f;
        if (e.g.cmdf || this.firstFrame) {
            l = e.cst;
            var d = e.g.c;
            for (m = l.length, p = 0; m > p; p += 1) f = l[p], f.setAttribute("offset", d[4 * p] + "%"), f.setAttribute("stop-color", "rgb(" + d[4 * p + 1] + "," + d[4 * p + 2] + "," + d[4 * p + 3] + ")")
        }
        if (r && (e.g.omdf || this.firstFrame)) {
            l = e.ost;
            var c = e.g.o;
            for (m = l.length, p = 0; m > p; p += 1) f = l[p], f.setAttribute("offset", c[2 * p] + "%"), f.setAttribute("stop-opacity", c[2 * p + 1])
        }
        if (1 === t.t)(e.e.mdf || this.firstFrame) && (s.setAttribute("x2", a[0]), s.setAttribute("y2", a[1]), r && (r.setAttribute("x2", a[0]), r.setAttribute("y2", a[1])));
        else {
            var u;
            if ((e.s.mdf || e.e.mdf || this.firstFrame) && (u = Math.sqrt(Math.pow(i[0] - a[0], 2) + Math.pow(i[1] - a[1], 2)), s.setAttribute("r", u), r && r.setAttribute("r", u)), e.e.mdf || e.h.mdf || e.a.mdf || this.firstFrame) {
                u || (u = Math.sqrt(Math.pow(i[0] - a[0], 2) + Math.pow(i[1] - a[1], 2)));
                var y = Math.atan2(a[1] - i[1], a[0] - i[0]),
                    g = e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v,
                    v = u * g,
                    b = Math.cos(y + e.a.v) * v + i[0],
                    E = Math.sin(y + e.a.v) * v + i[1];
                s.setAttribute("fx", b), s.setAttribute("fy", E), r && (r.setAttribute("fx", b), r.setAttribute("fy", E))
            }
        }
    }, IShapeElement.prototype.renderStroke = function(t, e) {
        var s = e.style,
            r = e.d;
        r && r.k && (r.mdf || this.firstFrame) && (s.pElem.setAttribute("stroke-dasharray", r.dasharray), s.pElem.setAttribute("stroke-dashoffset", r.dashoffset)), e.c && (e.c.mdf || this.firstFrame) && s.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || this.firstFrame) && s.pElem.setAttribute("stroke-opacity", e.o.v), (e.w.mdf || this.firstFrame) && (s.pElem.setAttribute("stroke-width", e.w.v), s.msElem && s.msElem.setAttribute("stroke-width", e.w.v))
    }, IShapeElement.prototype.destroy = function() {
        this._parent.destroy.call(), this.shapeData = null, this.viewData = null, this.parentContainer = null, this.placeholder = null
    }, createElement(SVGBaseElement, ISolidElement), ISolidElement.prototype.createElements = function() {
        this._parent.createElements.call(this);
        var t = document.createElementNS(svgNS, "rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t), this.innerElem = t, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
    }, ISolidElement.prototype.hide = IImageElement.prototype.hide, ISolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame, ISolidElement.prototype.destroy = IImageElement.prototype.destroy;
    var animationManager = function() {
            function t(t) {
                for (var e = 0, s = t.target; x > e;) k[e].animation === s && (k.splice(e, 1), e -= 1, x -= 1, s.isPaused || r()), e += 1
            }

            function e(t, e) {
                if (!t) return null;
                for (var s = 0; x > s;) {
                    if (k[s].elem == t && null !== k[s].elem) return k[s].animation;
                    s += 1
                }
                var r = new AnimationItem;
                return r.setData(t, e), i(r, t), r
            }

            function s() {
                M += 1, E()
            }

            function r() {
                M -= 1, 0 === M && (C = !0)
            }

            function i(e, i) {
                e.addEventListener("destroy", t), e.addEventListener("_active", s), e.addEventListener("_idle", r), k.push({
                    elem: i,
                    animation: e
                }), x += 1
            }

            function a(t) {
                var e = new AnimationItem;
                return i(e, null), e.setParams(t), e
            }

            function n(t, e) {
                var s;
                for (s = 0; x > s; s += 1) k[s].animation.setSpeed(t, e)
            }

            function o(t, e) {
                var s;
                for (s = 0; x > s; s += 1) k[s].animation.setDirection(t, e)
            }

            function h(t) {
                var e;
                for (e = 0; x > e; e += 1) k[e].animation.play(t)
            }

            function l(t, e) {
                S = Date.now();
                var s;
                for (s = 0; x > s; s += 1) k[s].animation.moveFrame(t, e)
            }

            function p(t) {
                var e, s = t - S;
                for (e = 0; x > e; e += 1) k[e].animation.advanceTime(s);
                S = t, C || requestAnimationFrame(p)
            }

            function m(t) {
                S = t, requestAnimationFrame(p)
            }

            function f(t) {
                var e;
                for (e = 0; x > e; e += 1) k[e].animation.pause(t)
            }

            function d(t, e, s) {
                var r;
                for (r = 0; x > r; r += 1) k[r].animation.goToAndStop(t, e, s)
            }

            function c(t) {
                var e;
                for (e = 0; x > e; e += 1) k[e].animation.stop(t)
            }

            function u(t) {
                var e;
                for (e = 0; x > e; e += 1) k[e].animation.togglePause(t)
            }

            function y(t) {
                var e;
                for (e = x - 1; e >= 0; e -= 1) k[e].animation.destroy(t)
            }

            function g(t, s, r) {
                var i, a = document.getElementsByClassName("bodymovin"),
                    n = a.length;

                for (i = 0; n > i; i += 1) r && a[i].setAttribute("data-bm-type", r), e(a[i], t);
                if (s && 0 === n) {
                    r || (r = "svg");
                    var o = document.getElementsByTagName("body")[0];
                    o.innerHTML = "";
                    var h = document.createElement("div");
                    h.style.width = "100%", h.style.height = "100%", h.setAttribute("data-bm-type", r), o.appendChild(h), e(h, t)
                }
            }

            function v() {
                var t;
                for (t = 0; x > t; t += 1) k[t].animation.resize()
            }

            function b() {
                requestAnimationFrame(m)
            }

            function E() {
                C && (C = !1, requestAnimationFrame(m))
            }
            var P = {},
                k = [],
                S = 0,
                x = 0,
                C = !0,
                M = 0;
            return setTimeout(b, 0), P.registerAnimation = e, P.loadAnimation = a, P.setSpeed = n, P.setDirection = o, P.play = h, P.moveFrame = l, P.pause = f, P.stop = c, P.togglePause = u, P.searchAnimations = g, P.resize = v, P.start = b, P.goToAndStop = d, P.destroy = y, P
        }(),
        AnimationItem = function() {
            this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.pendingElements = 0, this.playCount = 0, this.prerenderFramesFlag = !0, this.animationData = {}, this.layers = [], this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = randomString(10), this.scaleMode = "fit", this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this.pendingSegment = !1, this._idle = !0, this.projectInterface = ProjectInterface()
        };
    AnimationItem.prototype.setParams = function(t) {
        var e = this;
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var s = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
        switch (s) {
            case "canvas":
                this.renderer = new CanvasRenderer(this, t.rendererSettings);
                break;
            case "svg":
                this.renderer = new SVGRenderer(this, t.rendererSettings);
                break;
            case "hybrid":
            case "html":
            default:
                this.renderer = new HybridRenderer(this, t.rendererSettings)
        }
        if (this.renderer.setProjectInterface(this.projectInterface), this.animType = s, "" === t.loop || null === t.loop || (this.loop = t.loop === !1 ? !1 : t.loop === !0 ? !0 : parseInt(t.loop)), this.autoplay = "autoplay" in t ? t.autoplay : !0, this.name = t.name ? t.name : "", this.prerenderFramesFlag = "prerender" in t ? t.prerender : !0, this.autoloadSegments = t.hasOwnProperty("autoloadSegments") ? t.autoloadSegments : !0, t.animationData) e.configAnimation(t.animationData);
        else if (t.path) {
            "json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json");
            var r = new XMLHttpRequest;
            this.path = -1 != t.path.lastIndexOf("\\") ? t.path.substr(0, t.path.lastIndexOf("\\") + 1) : t.path.substr(0, t.path.lastIndexOf("/") + 1), this.assetsPath = t.assetsPath, this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), r.open("GET", t.path, !0), r.send(), r.onreadystatechange = function() {
                if (4 == r.readyState)
                    if (200 == r.status) e.configAnimation(JSON.parse(r.responseText));
                    else try {
                        var t = JSON.parse(r.responseText);
                        e.configAnimation(t)
                    } catch (s) {}
            }
        }
    }, AnimationItem.prototype.setData = function(t, e) {
        var s = {
                wrapper: t,
                animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
            },
            r = t.attributes;
        s.path = r.getNamedItem("data-animation-path") ? r.getNamedItem("data-animation-path").value : r.getNamedItem("data-bm-path") ? r.getNamedItem("data-bm-path").value : r.getNamedItem("bm-path") ? r.getNamedItem("bm-path").value : "", s.animType = r.getNamedItem("data-anim-type") ? r.getNamedItem("data-anim-type").value : r.getNamedItem("data-bm-type") ? r.getNamedItem("data-bm-type").value : r.getNamedItem("bm-type") ? r.getNamedItem("bm-type").value : r.getNamedItem("data-bm-renderer") ? r.getNamedItem("data-bm-renderer").value : r.getNamedItem("bm-renderer") ? r.getNamedItem("bm-renderer").value : "canvas";
        var i = r.getNamedItem("data-anim-loop") ? r.getNamedItem("data-anim-loop").value : r.getNamedItem("data-bm-loop") ? r.getNamedItem("data-bm-loop").value : r.getNamedItem("bm-loop") ? r.getNamedItem("bm-loop").value : "";
        "" === i || (s.loop = "false" === i ? !1 : "true" === i ? !0 : parseInt(i));
        var a = r.getNamedItem("data-anim-autoplay") ? r.getNamedItem("data-anim-autoplay").value : r.getNamedItem("data-bm-autoplay") ? r.getNamedItem("data-bm-autoplay").value : r.getNamedItem("bm-autoplay") ? r.getNamedItem("bm-autoplay").value : !0;
        s.autoplay = "false" !== a, s.name = r.getNamedItem("data-name") ? r.getNamedItem("data-name").value : r.getNamedItem("data-bm-name") ? r.getNamedItem("data-bm-name").value : r.getNamedItem("bm-name") ? r.getNamedItem("bm-name").value : "";
        var n = r.getNamedItem("data-anim-prerender") ? r.getNamedItem("data-anim-prerender").value : r.getNamedItem("data-bm-prerender") ? r.getNamedItem("data-bm-prerender").value : r.getNamedItem("bm-prerender") ? r.getNamedItem("bm-prerender").value : "";
        "false" === n && (s.prerender = !1), this.setParams(s)
    }, AnimationItem.prototype.includeLayers = function(t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip), this.animationData.tf = this.totalFrames);
        var e, s, r = this.animationData.layers,
            i = r.length,
            a = t.layers,
            n = a.length;
        for (s = 0; n > s; s += 1)
            for (e = 0; i > e;) {
                if (r[e].id == a[s].id) {
                    r[e] = a[s];
                    break
                }
                e += 1
            }
        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
            for (i = t.assets.length, e = 0; i > e; e += 1) this.animationData.assets.push(t.assets[e]);
        this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.renderFrame(null), this.loadNextSegment()
    }, AnimationItem.prototype.loadNextSegment = function() {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.animationData.tf);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var s = new XMLHttpRequest,
            r = this,
            i = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, s.open("GET", i, !0), s.send(), s.onreadystatechange = function() {
            if (4 == s.readyState)
                if (200 == s.status) r.includeLayers(JSON.parse(s.responseText));
                else try {
                    var t = JSON.parse(s.responseText);
                    r.includeLayers(t)
                } catch (e) {}
        }
    }, AnimationItem.prototype.loadSegments = function() {
        var t = this.animationData.segments;
        t || (this.timeCompleted = this.animationData.tf), this.loadNextSegment()
    }, AnimationItem.prototype.configAnimation = function(t) {
        this.renderer && this.renderer.destroyed || (this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.animationData.tf = this.totalFrames, this.renderer.configAnimation(t), t.assets || (t.assets = []), t.comps && (t.assets = t.assets.concat(t.comps), t.comps = null), this.renderer.searchExtraCompositions(t.assets), this.layers = this.animationData.layers, this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.imagePreloader = new ImagePreloader, this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(t.assets), this.loadSegments(), this.updaFrameModifier(), this.renderer.globalData.fontManager ? this.waitForFontsLoaded() : (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()))
    }, AnimationItem.prototype.waitForFontsLoaded = function() {
        function t() {
            this.renderer.globalData.fontManager.loaded ? (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()) : setTimeout(t.bind(this), 20)
        }
        return function() {
            t.bind(this)()
        }
    }(), AnimationItem.prototype.addPendingElement = function() {
        this.pendingElements += 1
    }, AnimationItem.prototype.elementLoaded = function() {
        this.pendingElements--, this.checkLoaded()
    }, AnimationItem.prototype.checkLoaded = function() {
        0 === this.pendingElements && (expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
            this.trigger("DOMLoaded")
        }.bind(this), 0), this.isLoaded = !0, this.gotoFrame(), this.autoplay && this.play())
    }, AnimationItem.prototype.resize = function() {
        this.renderer.updateContainerSize()
    }, AnimationItem.prototype.setSubframe = function(t) {
        this.subframeEnabled = t ? !0 : !1
    }, AnimationItem.prototype.gotoFrame = function() {
        this.currentFrame = this.subframeEnabled ? this.currentRawFrame : Math.floor(this.currentRawFrame), this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
    }, AnimationItem.prototype.renderFrame = function() {
        this.isLoaded !== !1 && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
    }, AnimationItem.prototype.play = function(t) {
        t && this.name != t || this.isPaused === !0 && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
    }, AnimationItem.prototype.pause = function(t) {
        t && this.name != t || this.isPaused === !1 && (this.isPaused = !0, this.pendingSegment || (this._idle = !0, this.trigger("_idle")))
    }, AnimationItem.prototype.togglePause = function(t) {
        t && this.name != t || (this.isPaused === !0 ? this.play() : this.pause())
    }, AnimationItem.prototype.stop = function(t) {
        t && this.name != t || (this.pause(), this.currentFrame = this.currentRawFrame = 0, this.playCount = 0, this.gotoFrame())
    }, AnimationItem.prototype.goToAndStop = function(t, e, s) {
        s && this.name != s || (this.setCurrentRawFrameValue(e ? t : t * this.frameModifier), this.pause())
    }, AnimationItem.prototype.goToAndPlay = function(t, e, s) {
        this.goToAndStop(t, e, s), this.play()
    }, AnimationItem.prototype.advanceTime = function(t) {
        return this.pendingSegment ? (this.pendingSegment = !1, this.adjustSegment(this.segments.shift()), void(this.isPaused && this.play())) : void(this.isPaused !== !0 && this.isLoaded !== !1 && this.setCurrentRawFrameValue(this.currentRawFrame + t * this.frameModifier))
    }, AnimationItem.prototype.updateAnimation = function(t) {
        this.setCurrentRawFrameValue(this.totalFrames * t)
    }, AnimationItem.prototype.moveFrame = function(t, e) {
        e && this.name != e || this.setCurrentRawFrameValue(this.currentRawFrame + t)
    }, AnimationItem.prototype.adjustSegment = function(t) {
        this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .01)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(0)), this.trigger("segmentStart")
    }, AnimationItem.prototype.setSegment = function(t, e) {
        var s = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? s = t : this.currentRawFrame + this.firstFrame > e && (s = e - t - .01)), this.firstFrame = t, this.totalFrames = e - t, -1 !== s && this.goToAndStop(s, !0)
    }, AnimationItem.prototype.playSegments = function(t, e) {
        if ("object" == typeof t[0]) {
            var s, r = t.length;
            for (s = 0; r > s; s += 1) this.segments.push(t[s])
        } else this.segments.push(t);
        e && this.adjustSegment(this.segments.shift()), this.isPaused && this.play()
    }, AnimationItem.prototype.resetSegments = function(t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip * this.frameRate, Math.floor(this.animationData.op - this.animationData.ip + this.animationData.ip * this.frameRate)]), t && this.adjustSegment(this.segments.shift())
    }, AnimationItem.prototype.checkSegments = function() {
        this.segments.length && (this.pendingSegment = !0)
    }, AnimationItem.prototype.remove = function(t) {
        t && this.name != t || this.renderer.destroy()
    }, AnimationItem.prototype.destroy = function(t) {
        t && this.name != t || this.renderer && this.renderer.destroyed || (this.renderer.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null)
    }, AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
        if (this.currentRawFrame = t, this.currentRawFrame >= this.totalFrames) {
            if (this.checkSegments(), this.loop === !1) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete");
            if (this.trigger("loopComplete"), this.playCount += 1, this.loop !== !0 && this.playCount == this.loop || this.pendingSegment) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete");
            this.currentRawFrame = this.currentRawFrame % this.totalFrames
        } else if (this.currentRawFrame < 0) return this.checkSegments(), this.playCount -= 1, this.playCount < 0 && (this.playCount = 0), this.loop === !1 || this.pendingSegment ? (this.currentRawFrame = 0, this.gotoFrame(), this.pause(), void this.trigger("complete")) : (this.trigger("loopComplete"), this.currentRawFrame = (this.totalFrames + this.currentRawFrame) % this.totalFrames, void this.gotoFrame());
        this.gotoFrame()
    }, AnimationItem.prototype.setSpeed = function(t) {
        this.playSpeed = t, this.updaFrameModifier()
    }, AnimationItem.prototype.setDirection = function(t) {
        this.playDirection = 0 > t ? -1 : 1, this.updaFrameModifier()
    }, AnimationItem.prototype.updaFrameModifier = function() {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
    }, AnimationItem.prototype.getPath = function() {
        return this.path
    }, AnimationItem.prototype.getAssetsPath = function(t) {
        var e = "";
        if (this.assetsPath) {
            var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), e = this.assetsPath + s
        } else e = this.path, e += t.u ? t.u : "", e += t.p;
        return e
    }, AnimationItem.prototype.getAssetData = function(t) {
        for (var e = 0, s = this.assets.length; s > e;) {
            if (t == this.assets[e].id) return this.assets[e];
            e += 1
        }
    }, AnimationItem.prototype.hide = function() {
        this.renderer.hide()
    }, AnimationItem.prototype.show = function() {
        this.renderer.show()
    }, AnimationItem.prototype.getAssets = function() {
        return this.assets
    }, AnimationItem.prototype.trigger = function(t) {
        if (this._cbs && this._cbs[t]) switch (t) {
            case "enterFrame":
                this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult));
                break;
            case "loopComplete":
                this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                break;
            case "complete":
                this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                break;
            case "segmentStart":
                this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                break;
            case "destroy":
                this.triggerEvent(t, new BMDestroyEvent(t, this));
                break;
            default:
                this.triggerEvent(t)
        }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
    }, AnimationItem.prototype.addEventListener = _addEventListener, AnimationItem.prototype.removeEventListener = _removeEventListener, AnimationItem.prototype.triggerEvent = _triggerEvent, extendPrototype(BaseRenderer, CanvasRenderer), CanvasRenderer.prototype.createBase = function(t) {
        return new CVBaseElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.createShape = function(t) {
        return new CVShapeElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.createText = function(t) {
        return new CVTextElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.createImage = function(t) {
        return new CVImageElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.createComp = function(t) {
        return new CVCompElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.createSolid = function(t) {
        return new CVSolidElement(t, this, this.globalData)
    }, CanvasRenderer.prototype.ctxTransform = function(t) {
        if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) {
            if (!this.renderConfig.clearCanvas) return void this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
            this.transformMat.cloneFromProps(t), this.transformMat.transform(this.contextData.cTr.props[0], this.contextData.cTr.props[1], this.contextData.cTr.props[2], this.contextData.cTr.props[3], this.contextData.cTr.props[4], this.contextData.cTr.props[5], this.contextData.cTr.props[6], this.contextData.cTr.props[7], this.contextData.cTr.props[8], this.contextData.cTr.props[9], this.contextData.cTr.props[10], this.contextData.cTr.props[11], this.contextData.cTr.props[12], this.contextData.cTr.props[13], this.contextData.cTr.props[14], this.contextData.cTr.props[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
            var e = this.contextData.cTr.props;
            this.canvasContext.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])
        }
    }, CanvasRenderer.prototype.ctxOpacity = function(t) {
        if (1 !== t) {
            if (!this.renderConfig.clearCanvas) return void(this.canvasContext.globalAlpha *= 0 > t ? 0 : t);
            this.contextData.cO *= 0 > t ? 0 : t, this.canvasContext.globalAlpha = this.contextData.cO
        }
    }, CanvasRenderer.prototype.reset = function() {
        return this.renderConfig.clearCanvas ? (this.contextData.cArrPos = 0, this.contextData.cTr.reset(), void(this.contextData.cO = 1)) : void this.canvasContext.restore()
    }, CanvasRenderer.prototype.save = function(t) {
        if (!this.renderConfig.clearCanvas) return void this.canvasContext.save();
        t && this.canvasContext.save();
        var e = this.contextData.cTr.props;
        (null === this.contextData.saved[this.contextData.cArrPos] || void 0 === this.contextData.saved[this.contextData.cArrPos]) && (this.contextData.saved[this.contextData.cArrPos] = new Array(16));
        var s, r = this.contextData.saved[this.contextData.cArrPos];
        for (s = 0; 16 > s; s += 1) r[s] = e[s];
        this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
    }, CanvasRenderer.prototype.restore = function(t) {
        if (!this.renderConfig.clearCanvas) return void this.canvasContext.restore();
        t && this.canvasContext.restore(), this.contextData.cArrPos -= 1;
        var e, s = this.contextData.saved[this.contextData.cArrPos],
            r = this.contextData.cTr.props;
        for (e = 0; 16 > e; e += 1) r[e] = s[e];
        this.canvasContext.setTransform(s[0], s[1], s[4], s[5], s[12], s[13]), s = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = s, this.canvasContext.globalAlpha = s
    }, CanvasRenderer.prototype.configAnimation = function(t) {
        this.animationItem.wrapper ? (this.animationItem.container = document.createElement("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d")) : this.canvasContext = this.renderConfig.context, this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.totalFrames = Math.floor(t.tf), this.globalData.compWidth = t.w, this.globalData.compHeight = t.h, this.globalData.frameRate = t.fr, this.globalData.frameId = 0, this.globalData.compSize = {
            w: t.w,
            h: t.h
        }, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.layers = t.layers, this.transformCanvas = {}, this.transformCanvas.w = t.w, this.transformCanvas.h = t.h, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, document.body), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.addPendingElement = this.animationItem.addPendingElement.bind(this.animationItem), this.globalData.transformCanvas = this.transformCanvas, this.elements = Array.apply(null, {
            length: t.layers.length
        }), this.updateContainerSize()
    }, CanvasRenderer.prototype.updateContainerSize = function() {
        var t, e;
        this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr);
        var s, r;
        if (-1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
            var i = this.renderConfig.preserveAspectRatio.split(" "),
                a = i[1] || "meet",
                n = i[0] || "xMidYMid",
                o = n.substr(0, 4),
                h = n.substr(4);
            s = t / e, r = this.transformCanvas.w / this.transformCanvas.h, r > s && "meet" === a || s > r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (s > r && "meet" === a || r > s && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (s > r && "meet" === a || r > s && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (r > s && "meet" === a || s > r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r > s && "meet" === a || s > r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
        } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
        this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1];
        var l, p = this.elements.length;
        for (l = 0; p > l; l += 1) this.elements[l] && 0 === this.elements[l].data.ty && this.elements[l].resize(this.globalData.transformCanvas)
    }, CanvasRenderer.prototype.destroy = function() {
        this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = "");
        var t, e = this.layers ? this.layers.length : 0;
        for (t = e - 1; t >= 0; t -= 1) this.elements[t].destroy();
        this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
    }, CanvasRenderer.prototype.renderFrame = function(t) {
        if (!(this.renderedFrame == t && this.renderConfig.clearCanvas === !0 || this.destroyed || null === t)) {
            this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem.firstFrame, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.renderConfig.clearCanvas === !0 ? (this.reset(), this.canvasContext.save(), this.canvasContext.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy)) : this.save(), this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip();
            var e, s = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), e = 0; s > e; e++)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
            for (e = s - 1; e >= 0; e -= 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
            this.renderConfig.clearCanvas !== !0 ? this.restore() : this.canvasContext.restore()
        }
    }, CanvasRenderer.prototype.buildItem = function(t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
            var s = this.createItem(this.layers[t], this, this.globalData);
            e[t] = s, s.initExpressions(), 0 === this.layers[t].ty && s.resize(this.globalData.transformCanvas)
        }
    }, CanvasRenderer.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length;) {
            var t = this.pendingElements.pop();
            t.checkParenting()
        }
    }, CanvasRenderer.prototype.hide = function() {
        this.animationItem.container.style.display = "none"
    }, CanvasRenderer.prototype.show = function() {
        this.animationItem.container.style.display = "block"
    }, CanvasRenderer.prototype.searchExtraCompositions = function(t) {
        {
            var e, s = t.length;
            document.createElementNS(svgNS, "g")
        }
        for (e = 0; s > e; e += 1)
            if (t[e].xt) {
                var r = this.createComp(t[e], this.globalData.comp, this.globalData);
                r.initExpressions(), this.globalData.projectInterface.registerComposition(r)
            }
    }, extendPrototype(BaseRenderer, HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length;) {
            var t = this.pendingElements.pop();
            t.checkParenting()
        }
    }, HybridRenderer.prototype.appendElementInPos = function(t, e) {
        var s = t.getBaseElement();
        if (s) {
            var r = this.layers[e];
            if (r.ddd && this.supports3d) this.addTo3dContainer(s, e);
            else {
                for (var i, a = 0; e > a;) this.elements[a] && this.elements[a] !== !0 && this.elements[a].getBaseElement && (i = this.elements[a].getBaseElement()), a += 1;
                i ? r.ddd && this.supports3d || this.layerElement.insertBefore(s, i) : r.ddd && this.supports3d || this.layerElement.appendChild(s)
            }
        }
    }, HybridRenderer.prototype.createBase = function(t) {
        return new SVGBaseElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.createShape = function(t) {
        return this.supports3d ? new HShapeElement(t, this.layerElement, this.globalData, this) : new IShapeElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.createText = function(t) {
        return this.supports3d ? new HTextElement(t, this.layerElement, this.globalData, this) : new SVGTextElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.createCamera = function(t) {
        return this.camera = new HCameraElement(t, this.layerElement, this.globalData, this), this.camera
    }, HybridRenderer.prototype.createImage = function(t) {
        return this.supports3d ? new HImageElement(t, this.layerElement, this.globalData, this) : new IImageElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.createComp = function(t) {
        return this.supports3d ? new HCompElement(t, this.layerElement, this.globalData, this) : new ICompElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.createSolid = function(t) {
        return this.supports3d ? new HSolidElement(t, this.layerElement, this.globalData, this) : new ISolidElement(t, this.layerElement, this.globalData, this)
    }, HybridRenderer.prototype.getThreeDContainer = function(t) {
        var e = document.createElement("div");
        styleDiv(e), e.style.width = this.globalData.compSize.w + "px", e.style.height = this.globalData.compSize.h + "px", e.style.transformOrigin = e.style.mozTransformOrigin = e.style.webkitTransformOrigin = "50% 50%";
        var s = document.createElement("div");
        styleDiv(s), s.style.transform = s.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)", e.appendChild(s), this.resizerElem.appendChild(e);
        var r = {
            container: s,
            perspectiveElem: e,
            startPos: t,
            endPos: t
        };
        return this.threeDElements.push(r), r
    }, HybridRenderer.prototype.build3dContainers = function() {
        var t, e, s = this.layers.length;
        for (t = 0; s > t; t += 1) this.layers[t].ddd ? (e || (e = this.getThreeDContainer(t)), e.endPos = Math.max(e.endPos, t)) : e = null
    }, HybridRenderer.prototype.addTo3dContainer = function(t, e) {
        for (var s = 0, r = this.threeDElements.length; r > s;) {
            if (e <= this.threeDElements[s].endPos) {
                for (var i, a = this.threeDElements[s].startPos; e > a;) this.elements[a] && this.elements[a].getBaseElement && (i = this.elements[a].getBaseElement()), a += 1;
                i ? this.threeDElements[s].container.insertBefore(t, i) : this.threeDElements[s].container.appendChild(t);
                break
            }
            s += 1
        }
    }, HybridRenderer.prototype.configAnimation = function(t) {
        var e = document.createElement("div"),
            s = this.animationItem.wrapper;
        e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", s.appendChild(e), e.style.overflow = "hidden";
        var r = document.createElementNS(svgNS, "svg");
        r.setAttribute("width", "1"), r.setAttribute("height", "1"), styleDiv(r), this.resizerElem.appendChild(r);
        var i = document.createElementNS(svgNS, "defs");
        r.appendChild(i), this.globalData.defs = i, this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.compSize = {
            w: t.w,
            h: t.h
        }, this.globalData.frameRate = t.fr, this.layers = t.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, r), this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
    }, HybridRenderer.prototype.destroy = function() {
        this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; e > t; t++) this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null
    }, HybridRenderer.prototype.updateContainerSize = function() {
        var t, e, s, r, i = this.animationItem.wrapper.offsetWidth,
            a = this.animationItem.wrapper.offsetHeight,
            n = i / a,
            o = this.globalData.compSize.w / this.globalData.compSize.h;
        o > n ? (t = i / this.globalData.compSize.w, e = i / this.globalData.compSize.w, s = 0, r = (a - this.globalData.compSize.h * (i / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, s = (i - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, r = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + s + "," + r + ",0,1)"
    }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function() {
        this.resizerElem.style.display = "none"
    }, HybridRenderer.prototype.show = function() {
        this.resizerElem.style.display = "block"
    }, HybridRenderer.prototype.initItems = function() {
        if (this.buildAllItems(), this.camera) this.camera.setup();
        else {
            var t, e = this.globalData.compSize.w,
                s = this.globalData.compSize.h,
                r = this.threeDElements.length;
            for (t = 0; r > t; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(s, 2)) + "px"
        }
    }, HybridRenderer.prototype.searchExtraCompositions = function(t) {
        var e, s = t.length,
            r = document.createElement("div");
        for (e = 0; s > e; e += 1)
            if (t[e].xt) {
                var i = this.createComp(t[e], r, this.globalData.comp, null);
                i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
            }
    }, createElement(BaseElement, CVBaseElement), CVBaseElement.prototype.createElements = function() {
        this.checkParenting()
    }, CVBaseElement.prototype.checkBlendMode = function(t) {
        if (t.blendMode !== this.data.bm) {
            t.blendMode = this.data.bm;
            var e = "";
            switch (this.data.bm) {
                case 0:
                    e = "normal";
                    break;
                case 1:
                    e = "multiply";
                    break;
                case 2:
                    e = "screen";
                    break;
                case 3:
                    e = "overlay";
                    break;
                case 4:
                    e = "darken";
                    break;
                case 5:
                    e = "lighten";
                    break;
                case 6:
                    e = "color-dodge";
                    break;
                case 7:
                    e = "color-burn";
                    break;
                case 8:
                    e = "hard-light";
                    break;
                case 9:
                    e = "soft-light";
                    break;
                case 10:
                    e = "difference";
                    break;
                case 11:
                    e = "exclusion";
                    break;
                case 12:
                    e = "hue";
                    break;
                case 13:
                    e = "saturation";
                    break;
                case 14:
                    e = "color";
                    break;
                case 15:
                    e = "luminosity"
            }
            t.canvasContext.globalCompositeOperation = e
        }
    }, CVBaseElement.prototype.renderFrame = function(t) {
        if (3 === this.data.ty) return !1;
        if (this.checkBlendMode(0 === this.data.ty ? this.parentGlobalData : this.globalData), !this.isVisible) return this.isVisible;
        this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v;
        var e, s = this.finalTransform.mat;
        if (this.hierarchy) {
            var r, i = this.hierarchy.length;
            for (e = this.finalTransform.mProp.v.props, s.cloneFromProps(e), r = 0; i > r; r += 1) this.finalTransform.matMdf = this.hierarchy[r].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[r].finalTransform.mProp.v.props, s.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
        } else t ? (e = this.finalTransform.mProp.v.props, s.cloneFromProps(e)) : s.cloneFromProps(this.finalTransform.mProp.v.props);
        return t && (e = t.mat.props, s.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf),
            this.data.hasMask && (this.globalData.renderer.save(!0), this.maskManager.renderFrame(0 === this.data.ty ? null : s)), this.data.hd && (this.isVisible = !1), this.isVisible
    }, CVBaseElement.prototype.addMasks = function(t) {
        this.maskManager = new CVMaskElement(t, this, this.globalData)
    }, CVBaseElement.prototype.destroy = function() {
        this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager && this.maskManager.destroy()
    }, CVBaseElement.prototype.mHelper = new Matrix, createElement(CVBaseElement, CVCompElement), CVCompElement.prototype.ctxTransform = CanvasRenderer.prototype.ctxTransform, CVCompElement.prototype.ctxOpacity = CanvasRenderer.prototype.ctxOpacity, CVCompElement.prototype.save = CanvasRenderer.prototype.save, CVCompElement.prototype.restore = CanvasRenderer.prototype.restore, CVCompElement.prototype.reset = function() {
        this.contextData.cArrPos = 0, this.contextData.cTr.reset(), this.contextData.cO = 1
    }, CVCompElement.prototype.resize = function(t) {
        var e = Math.max(t.sx, t.sy);
        this.canvas.width = this.data.w * e, this.canvas.height = this.data.h * e, this.transformCanvas = {
            sc: e,
            w: this.data.w * e,
            h: this.data.h * e,
            props: [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        var s, r = this.elements.length;
        for (s = 0; r > s; s += 1) this.elements[s] && 0 === this.elements[s].data.ty && this.elements[s].resize(t)
    }, CVCompElement.prototype.prepareFrame = function(t) {
        if (this.globalData.frameId = this.parentGlobalData.frameId, this.globalData.mdf = !1, this._parent.prepareFrame.call(this, t), this.isVisible !== !1 || this.data.xt) {
            var e = t;
            this.tm && (e = this.tm.v, e === this.data.op && (e = this.data.op - 1)), this.renderedFrame = e / this.data.sr;
            var s, r = this.elements.length;
            for (this.completeLayers || this.checkLayers(t), s = 0; r > s; s += 1)(this.completeLayers || this.elements[s]) && (this.elements[s].prepareFrame(e / this.data.sr - this.layers[s].st), 0 === this.elements[s].data.ty && this.elements[s].globalData.mdf && (this.globalData.mdf = !0));
            this.globalData.mdf && !this.data.xt && (this.canvasContext.clearRect(0, 0, this.data.w, this.data.h), this.ctxTransform(this.transformCanvas.props))
        }
    }, CVCompElement.prototype.renderFrame = function(t) {
        if (this._parent.renderFrame.call(this, t) !== !1) {
            if (this.globalData.mdf) {
                var e, s = this.layers.length;
                for (e = s - 1; e >= 0; e -= 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
            }
            this.data.hasMask && this.globalData.renderer.restore(!0), this.firstFrame && (this.firstFrame = !1), this.parentGlobalData.renderer.save(), this.parentGlobalData.renderer.ctxTransform(this.finalTransform.mat.props), this.parentGlobalData.renderer.ctxOpacity(this.finalTransform.opacity), this.parentGlobalData.renderer.canvasContext.drawImage(this.canvas, 0, 0, this.data.w, this.data.h), this.parentGlobalData.renderer.restore(), this.globalData.mdf && this.reset()
        }
    }, CVCompElement.prototype.setElements = function(t) {
        this.elements = t
    }, CVCompElement.prototype.getElements = function() {
        return this.elements
    }, CVCompElement.prototype.destroy = function() {
        var t, e = this.layers.length;
        for (t = e - 1; t >= 0; t -= 1) this.elements[t].destroy();
        this.layers = null, this.elements = null, this._parent.destroy.call()
    }, CVCompElement.prototype.checkLayers = CanvasRenderer.prototype.checkLayers, CVCompElement.prototype.buildItem = CanvasRenderer.prototype.buildItem, CVCompElement.prototype.checkPendingElements = CanvasRenderer.prototype.checkPendingElements, CVCompElement.prototype.addPendingElement = CanvasRenderer.prototype.addPendingElement, CVCompElement.prototype.buildAllItems = CanvasRenderer.prototype.buildAllItems, CVCompElement.prototype.createItem = CanvasRenderer.prototype.createItem, CVCompElement.prototype.createImage = CanvasRenderer.prototype.createImage, CVCompElement.prototype.createComp = CanvasRenderer.prototype.createComp, CVCompElement.prototype.createSolid = CanvasRenderer.prototype.createSolid, CVCompElement.prototype.createShape = CanvasRenderer.prototype.createShape, CVCompElement.prototype.createText = CanvasRenderer.prototype.createText, CVCompElement.prototype.createBase = CanvasRenderer.prototype.createBase, CVCompElement.prototype.buildElementParenting = CanvasRenderer.prototype.buildElementParenting, createElement(CVBaseElement, CVImageElement), CVImageElement.prototype.createElements = function() {
        var t = function() {
                if (this.globalData.elementLoaded(), this.assetData.w !== this.img.width || this.assetData.h !== this.img.height) {
                    var t = document.createElement("canvas");
                    t.width = this.assetData.w, t.height = this.assetData.h;
                    var e, s, r = t.getContext("2d"),
                        i = this.img.width,
                        a = this.img.height,
                        n = i / a,
                        o = this.assetData.w / this.assetData.h;
                    n > o ? (s = a, e = s * o) : (e = i, s = e / o), r.drawImage(this.img, (i - e) / 2, (a - s) / 2, e, s, 0, 0, this.assetData.w, this.assetData.h), this.img = t
                }
            }.bind(this),
            e = function() {
                this.failed = !0, this.globalData.elementLoaded()
            }.bind(this);
        this.img = new Image, this.img.addEventListener("load", t, !1), this.img.addEventListener("error", e, !1);
        var s = this.globalData.getAssetsPath(this.assetData);
        this.img.src = s, this._parent.createElements.call(this)
    }, CVImageElement.prototype.renderFrame = function(t) {
        if (!this.failed && this._parent.renderFrame.call(this, t) !== !1) {
            var e = this.canvasContext;
            this.globalData.renderer.save();
            var s = this.finalTransform.mat.props;
            this.globalData.renderer.ctxTransform(s), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.drawImage(this.img, 0, 0), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
        }
    }, CVImageElement.prototype.destroy = function() {
        this.img = null, this._parent.destroy.call()
    }, CVMaskElement.prototype.getMaskProperty = function(t) {
        return this.viewData[t]
    }, CVMaskElement.prototype.prepareFrame = function(t) {
        var e, s = this.dynamicProperties.length;
        for (e = 0; s > e; e += 1) this.dynamicProperties[e].getValue(t), this.dynamicProperties[e].mdf && (this.element.globalData.mdf = !0)
    }, CVMaskElement.prototype.renderFrame = function(t) {
        var e, s, r, i, a, n = this.element.canvasContext,
            o = this.data.masksProperties.length,
            h = !1;
        for (e = 0; o > e; e++)
            if ("n" !== this.masksProperties[e].mode) {
                h === !1 && (n.beginPath(), h = !0), this.masksProperties[e].inv && (n.moveTo(0, 0), n.lineTo(this.element.globalData.compWidth, 0), n.lineTo(this.element.globalData.compWidth, this.element.globalData.compHeight), n.lineTo(0, this.element.globalData.compHeight), n.lineTo(0, 0)), a = this.viewData[e].v, s = t ? t.applyToPointArray(a.v[0][0], a.v[0][1], 0) : a.v[0], n.moveTo(s[0], s[1]);
                var l, p = a.v.length;
                for (l = 1; p > l; l++) s = t ? t.applyToPointArray(a.o[l - 1][0], a.o[l - 1][1], 0) : a.o[l - 1], r = t ? t.applyToPointArray(a.i[l][0], a.i[l][1], 0) : a.i[l], i = t ? t.applyToPointArray(a.v[l][0], a.v[l][1], 0) : a.v[l], n.bezierCurveTo(s[0], s[1], r[0], r[1], i[0], i[1]);
                s = t ? t.applyToPointArray(a.o[l - 1][0], a.o[l - 1][1], 0) : a.o[l - 1], r = t ? t.applyToPointArray(a.i[0][0], a.i[0][1], 0) : a.i[0], i = t ? t.applyToPointArray(a.v[0][0], a.v[0][1], 0) : a.v[0], n.bezierCurveTo(s[0], s[1], r[0], r[1], i[0], i[1])
            }
        h && n.clip()
    }, CVMaskElement.prototype.getMask = function(t) {
        for (var e = 0, s = this.masksProperties.length; s > e;) {
            if (this.masksProperties[e].nm === t) return {
                maskPath: this.viewData[e].pv
            };
            e += 1
        }
    }, CVMaskElement.prototype.destroy = function() {
        this.element = null
    }, createElement(CVBaseElement, CVShapeElement), CVShapeElement.prototype.lcEnum = {
        1: "butt",
        2: "round",
        3: "butt"
    }, CVShapeElement.prototype.ljEnum = {
        1: "miter",
        2: "round",
        3: "butt"
    }, CVShapeElement.prototype.transformHelper = {
        opacity: 1,
        mat: new Matrix,
        matMdf: !1,
        opMdf: !1
    }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createElements = function() {
        this._parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.dynamicProperties)
    }, CVShapeElement.prototype.searchShapes = function(t, e, s) {
        var r, i, a, n, o = t.length - 1,
            h = [],
            l = [];
        for (r = o; r >= 0; r -= 1)
            if ("fl" == t[r].ty || "st" == t[r].ty) {
                if (n = {
                        type: t[r].ty,
                        elements: []
                    }, e[r] = {}, ("fl" == t[r].ty || "st" == t[r].ty) && (e[r].c = PropertyFactory.getProp(this, t[r].c, 1, 255, s), e[r].c.k || (n.co = "rgb(" + bm_floor(e[r].c.v[0]) + "," + bm_floor(e[r].c.v[1]) + "," + bm_floor(e[r].c.v[2]) + ")")), e[r].o = PropertyFactory.getProp(this, t[r].o, 0, .01, s), "st" == t[r].ty && (n.lc = this.lcEnum[t[r].lc] || "round", n.lj = this.ljEnum[t[r].lj] || "round", 1 == t[r].lj && (n.ml = t[r].ml), e[r].w = PropertyFactory.getProp(this, t[r].w, 0, null, s), e[r].w.k || (n.wi = e[r].w.v), t[r].d)) {
                    var p = PropertyFactory.getDashProp(this, t[r].d, "canvas", s);
                    e[r].d = p, e[r].d.k || (n.da = e[r].d.dasharray, n["do"] = e[r].d.dashoffset)
                }
                this.stylesList.push(n), e[r].style = n, h.push(e[r].style)
            } else if ("gr" == t[r].ty) e[r] = {
            it: []
        }, this.searchShapes(t[r].it, e[r].it, s);
        else if ("tr" == t[r].ty) e[r] = {
            transform: {
                mat: new Matrix,
                opacity: 1,
                matMdf: !1,
                opMdf: !1,
                op: PropertyFactory.getProp(this, t[r].o, 0, .01, s),
                mProps: PropertyFactory.getProp(this, t[r], 2, null, s)
            },
            elements: []
        };
        else if ("sh" == t[r].ty || "rc" == t[r].ty || "el" == t[r].ty || "sr" == t[r].ty) {
            e[r] = {
                nodes: [],
                trNodes: [],
                tr: [0, 0, 0, 0, 0, 0]
            };
            var m = 4;
            "rc" == t[r].ty ? m = 5 : "el" == t[r].ty ? m = 6 : "sr" == t[r].ty && (m = 7), e[r].sh = ShapePropertyFactory.getShapeProp(this, t[r], m, s), this.shapes.push(e[r].sh), this.addShapeToModifiers(e[r].sh), a = this.stylesList.length;
            var f = !1,
                d = !1;
            for (i = 0; a > i; i += 1) this.stylesList[i].closed || (this.stylesList[i].elements.push(e[r]), "st" === this.stylesList[i].type ? f = !0 : d = !0);
            e[r].st = f, e[r].fl = d
        } else if ("tm" == t[r].ty || "rd" == t[r].ty) {
            var c = ShapeModifiers.getModifier(t[r].ty);
            c.init(this, t[r], s), this.shapeModifiers.push(c), l.push(c), e[r] = c
        }
        for (o = h.length, r = 0; o > r; r += 1) h[r].closed = !0;
        for (o = l.length, r = 0; o > r; r += 1) l[r].closed = !0
    }, CVShapeElement.prototype.addShapeToModifiers = IShapeElement.prototype.addShapeToModifiers, CVShapeElement.prototype.renderModifiers = IShapeElement.prototype.renderModifiers, CVShapeElement.prototype.renderFrame = function(t) {
        this._parent.renderFrame.call(this, t) !== !1 && (this.transformHelper.mat.reset(), this.transformHelper.opacity = this.finalTransform.opacity, this.transformHelper.matMdf = !1, this.transformHelper.opMdf = this.finalTransform.opMdf, this.renderModifiers(), this.renderShape(this.transformHelper, null, null, !0), this.data.hasMask && this.globalData.renderer.restore(!0))
    }, CVShapeElement.prototype.renderShape = function(t, e, s, r) {
        var i, a;
        if (!e)
            for (e = this.shapesData, a = this.stylesList.length, i = 0; a > i; i += 1) this.stylesList[i].d = "", this.stylesList[i].mdf = !1;
        s || (s = this.viewData), a = e.length - 1;
        var n, o;
        for (n = t, i = a; i >= 0; i -= 1)
            if ("tr" == e[i].ty) {
                n = s[i].transform;
                var h = s[i].transform.mProps.v.props;
                if (n.matMdf = n.mProps.mdf, n.opMdf = n.op.mdf, o = n.mat, o.cloneFromProps(h), t) {
                    var l = t.mat.props;
                    n.opacity = t.opacity, n.opacity *= s[i].transform.op.v, n.matMdf = t.matMdf ? !0 : n.matMdf, n.opMdf = t.opMdf ? !0 : n.opMdf, o.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], l[15])
                } else n.opacity = n.op.o
            } else "sh" == e[i].ty || "el" == e[i].ty || "rc" == e[i].ty || "sr" == e[i].ty ? this.renderPath(e[i], s[i], n) : "fl" == e[i].ty ? this.renderFill(e[i], s[i], n) : "st" == e[i].ty ? this.renderStroke(e[i], s[i], n) : "gr" == e[i].ty ? this.renderShape(n, e[i].it, s[i].it) : "tm" == e[i].ty;
        if (r) {
            a = this.stylesList.length;
            var p, m, f, d, c, u, y, g = this.globalData.renderer,
                v = this.globalData.canvasContext;
            for (g.save(), g.ctxTransform(this.finalTransform.mat.props), i = 0; a > i; i += 1)
                if (y = this.stylesList[i].type, "st" !== y || 0 !== this.stylesList[i].wi) {
                    for (g.save(), c = this.stylesList[i].elements, "st" === y ? (v.strokeStyle = this.stylesList[i].co, v.lineWidth = this.stylesList[i].wi, v.lineCap = this.stylesList[i].lc, v.lineJoin = this.stylesList[i].lj, v.miterLimit = this.stylesList[i].ml || 0) : v.fillStyle = this.stylesList[i].co, g.ctxOpacity(this.stylesList[i].coOp), "st" !== y && v.beginPath(), m = c.length, p = 0; m > p; p += 1) {
                        for ("st" === y && (v.beginPath(), this.stylesList[i].da ? (v.setLineDash(this.stylesList[i].da), v.lineDashOffset = this.stylesList[i]["do"], this.globalData.isDashed = !0) : this.globalData.isDashed && (v.setLineDash(this.dashResetter), this.globalData.isDashed = !1)), u = c[p].trNodes, d = u.length, f = 0; d > f; f += 1) "m" == u[f].t ? v.moveTo(u[f].p[0], u[f].p[1]) : "c" == u[f].t ? v.bezierCurveTo(u[f].p1[0], u[f].p1[1], u[f].p2[0], u[f].p2[1], u[f].p3[0], u[f].p3[1]) : v.closePath();
                        "st" === y && v.stroke()
                    }
                    "st" !== y && v.fill(), g.restore()
                }
            g.restore(), this.firstFrame && (this.firstFrame = !1)
        }
    }, CVShapeElement.prototype.renderPath = function(t, e, s) {
        var r, i, a, n, o = s.matMdf || e.sh.mdf || this.firstFrame;
        if (o) {
            var h = e.sh.paths;
            n = h.length;
            var l = e.trNodes;
            for (l.length = 0, a = 0; n > a; a += 1) {
                var p = h[a];
                if (p && p.v) {
                    for (r = p.v.length, i = 1; r > i; i += 1) 1 == i && l.push({
                        t: "m",
                        p: s.mat.applyToPointArray(p.v[0][0], p.v[0][1], 0)
                    }), l.push({
                        t: "c",
                        p1: s.mat.applyToPointArray(p.o[i - 1][0], p.o[i - 1][1], 0),
                        p2: s.mat.applyToPointArray(p.i[i][0], p.i[i][1], 0),
                        p3: s.mat.applyToPointArray(p.v[i][0], p.v[i][1], 0)
                    });
                    1 == r && l.push({
                        t: "m",
                        p: s.mat.applyToPointArray(p.v[0][0], p.v[0][1], 0)
                    }), p.c && r && (l.push({
                        t: "c",
                        p1: s.mat.applyToPointArray(p.o[i - 1][0], p.o[i - 1][1], 0),
                        p2: s.mat.applyToPointArray(p.i[0][0], p.i[0][1], 0),
                        p3: s.mat.applyToPointArray(p.v[0][0], p.v[0][1], 0)
                    }), l.push({
                        t: "z"
                    })), e.lStr = l
                }
            }
            if (e.st)
                for (i = 0; 16 > i; i += 1) e.tr[i] = s.mat.props[i];
            e.trNodes = l
        }
    }, CVShapeElement.prototype.renderFill = function(t, e, s) {
        var r = e.style;
        (e.c.mdf || this.firstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || s.opMdf || this.firstFrame) && (r.coOp = e.o.v * s.opacity)
    }, CVShapeElement.prototype.renderStroke = function(t, e, s) {
        var r = e.style,
            i = e.d;
        i && (i.mdf || this.firstFrame) && (r.da = i.dasharray, r["do"] = i.dashoffset), (e.c.mdf || this.firstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || s.opMdf || this.firstFrame) && (r.coOp = e.o.v * s.opacity), (e.w.mdf || this.firstFrame) && (r.wi = e.w.v)
    }, CVShapeElement.prototype.destroy = function() {
        this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.viewData.length = 0, this._parent.destroy.call()
    }, createElement(CVBaseElement, CVSolidElement), CVSolidElement.prototype.renderFrame = function(t) {
        if (this._parent.renderFrame.call(this, t) !== !1) {
            var e = this.canvasContext;
            this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.fillStyle = this.data.sc, e.fillRect(0, 0, this.data.sw, this.data.sh), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
        }
    }, createElement(CVBaseElement, CVTextElement), CVTextElement.prototype.init = ITextElement.prototype.init, CVTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, CVTextElement.prototype.getMult = ITextElement.prototype.getMult, CVTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, CVTextElement.prototype.tHelper = document.createElement("canvas").getContext("2d"), CVTextElement.prototype.createElements = function() {
        this._parent.createElements.call(this)
    }, CVTextElement.prototype.buildNewText = function() {
        var t = this.currentTextDocumentData;
        this.renderedLetters = Array.apply(null, {
            length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
        });
        var e = !1;
        t.fc ? (e = !0, this.values.fill = "rgb(" + Math.round(255 * t.fc[0]) + "," + Math.round(255 * t.fc[1]) + "," + Math.round(255 * t.fc[2]) + ")") : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
        var s = !1;
        t.sc && (s = !0, this.values.stroke = "rgb(" + Math.round(255 * t.sc[0]) + "," + Math.round(255 * t.sc[1]) + "," + Math.round(255 * t.sc[2]) + ")", this.values.sWidth = t.sw);
        var r, i, a = this.globalData.fontManager.getFontByName(t.f),
            n = t.l,
            o = this.mHelper;
        this.stroke = s, this.values.fValue = t.s + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, i = t.t.length, this.tHelper.font = this.values.fValue;
        var h, l, p, m, f, d, c, u, y, g, v = this.data.singleShape;
        if (v) var b = 0,
            E = 0,
            P = t.lineWidths,
            k = t.boxWidth,
            S = !0;
        var x = 0;
        for (r = 0; i > r; r += 1) {
            h = this.globalData.fontManager.getCharData(t.t.charAt(r), a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
            var l;
            if (l = h ? h.data : null, o.reset(), v && n[r].n && (b = 0, E += t.yOffset, E += S ? 1 : 0, S = !1), l && l.shapes) {
                if (f = l.shapes[0].it, c = f.length, o.scale(t.s / 100, t.s / 100), v) {
                    switch (t.ps && o.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                        case 1:
                            o.translate(t.justifyOffset + (k - P[n[r].line]), 0, 0);
                            break;
                        case 2:
                            o.translate(t.justifyOffset + (k - P[n[r].line]) / 2, 0, 0)
                    }
                    o.translate(b, E, 0)
                }
                for (y = new Array(c), d = 0; c > d; d += 1) {
                    for (m = f[d].ks.k.i.length, u = f[d].ks.k, g = [], p = 1; m > p; p += 1) 1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
                    g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[d] = g
                }
            } else y = [];
            v && (b += n[r].l), this.textSpans[x] ? this.textSpans[x].elem = y : this.textSpans[x] = {
                elem: y
            }, x += 1
        }
    }, CVTextElement.prototype.renderFrame = function(t) {
        if (this._parent.renderFrame.call(this, t) !== !1) {
            var e = this.canvasContext,
                s = this.finalTransform.mat.props;
            this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(s), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.font = this.values.fValue, e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 4, this.data.singleShape || this.getMeasures();
            var r, i, a, n, o, h, l = this.renderedLetters,
                p = this.currentTextDocumentData.l;
            i = p.length;
            var m, f, d, c = null,
                u = null,
                y = null;
            for (r = 0; i > r; r += 1)
                if (!p[r].n) {
                    if (m = l[r], m && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(m.props), this.globalData.renderer.ctxOpacity(m.o)), this.fill) {
                        for (m && m.fc ? c !== m.fc && (c = m.fc, e.fillStyle = m.fc) : c !== this.values.fill && (c = this.values.fill, e.fillStyle = this.values.fill), f = this.textSpans[r].elem, n = f.length, this.globalData.canvasContext.beginPath(), a = 0; n > a; a += 1)
                            for (d = f[a], h = d.length, this.globalData.canvasContext.moveTo(d[0], d[1]), o = 2; h > o; o += 6) this.globalData.canvasContext.bezierCurveTo(d[o], d[o + 1], d[o + 2], d[o + 3], d[o + 4], d[o + 5]);
                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                    }
                    if (this.stroke) {
                        for (m && m.sw ? y !== m.sw && (y = m.sw, e.lineWidth = m.sw) : y !== this.values.sWidth && (y = this.values.sWidth, e.lineWidth = this.values.sWidth), m && m.sc ? u !== m.sc && (u = m.sc, e.strokeStyle = m.sc) : u !== this.values.stroke && (u = this.values.stroke, e.strokeStyle = this.values.stroke), f = this.textSpans[r].elem, n = f.length, this.globalData.canvasContext.beginPath(), a = 0; n > a; a += 1)
                            for (d = f[a], h = d.length, this.globalData.canvasContext.moveTo(d[0], d[1]), o = 2; h > o; o += 6) this.globalData.canvasContext.bezierCurveTo(d[o], d[o + 1], d[o + 2], d[o + 3], d[o + 4], d[o + 5]);
                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                    }
                    m && this.globalData.renderer.restore()
                }
            this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
        }
    }, createElement(BaseElement, HBaseElement), HBaseElement.prototype.checkBlendMode = function() {}, HBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode, HBaseElement.prototype.getBaseElement = function() {
        return this.baseElement
    }, HBaseElement.prototype.createElements = function() {
        this.data.hasMask ? (this.layerElement = document.createElementNS(svgNS, "svg"), styleDiv(this.layerElement), this.baseElement = this.layerElement, this.maskedElement = this.layerElement) : this.layerElement = this.parentContainer, this.transformedElement = this.layerElement, !this.data.ln || 4 !== this.data.ty && 0 !== this.data.ty || (this.layerElement === this.parentContainer && (this.layerElement = document.createElementNS(svgNS, "g"), this.baseElement = this.layerElement), this.layerElement.setAttribute("id", this.data.ln)), this.setBlendMode(), this.layerElement !== this.parentContainer && (this.placeholder = null), this.checkParenting()
    }, HBaseElement.prototype.renderFrame = function(t) {
        if (3 === this.data.ty) return !1;
        if (this.currentFrameNum === this.lastNum || !this.isVisible) return this.isVisible;
        this.lastNum = this.currentFrameNum, this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
        var e, s = this.finalTransform.mat;
        if (this.hierarchy) {
            var r, i = this.hierarchy.length;
            for (e = this.finalTransform.mProp.v.props, s.cloneFromProps(e), r = 0; i > r; r += 1) this.finalTransform.matMdf = this.hierarchy[r].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[r].finalTransform.mProp.v.props, s.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
        } else this.isVisible && this.finalTransform.matMdf && (t ? (e = this.finalTransform.mProp.v.props, s.cloneFromProps(e)) : s.cloneFromProps(this.finalTransform.mProp.v.props));
        return this.data.hasMask && this.maskManager.renderFrame(s), t && (e = t.mat.props, s.cloneFromProps(e), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf), this.finalTransform.matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = s.toCSS(), this.finalMat = s), this.finalTransform.opMdf && (this.transformedElement.style.opacity = this.finalTransform.opacity), this.isVisible
    }, HBaseElement.prototype.destroy = function() {
        this.layerElement = null, this.transformedElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
    }, HBaseElement.prototype.getDomElement = function() {
        return this.layerElement
    }, HBaseElement.prototype.addMasks = function(t) {
        this.maskManager = new MaskElement(t, this, this.globalData)
    }, HBaseElement.prototype.hide = function() {}, HBaseElement.prototype.setMatte = function() {}, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, createElement(HBaseElement, HSolidElement), HSolidElement.prototype.createElements = function() {
        var t = document.createElement("div");
        styleDiv(t);
        var e = document.createElementNS(svgNS, "svg");
        styleDiv(e), e.setAttribute("width", this.data.sw), e.setAttribute("height", this.data.sh), t.appendChild(e), this.layerElement = t, this.transformedElement = t, this.baseElement = t, this.innerElem = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), 0 !== this.data.bm && this.setBlendMode();
        var s = document.createElementNS(svgNS, "rect");
        s.setAttribute("width", this.data.sw), s.setAttribute("height", this.data.sh), s.setAttribute("fill", this.data.sc), e.appendChild(s), this.data.hasMask && (this.maskedElement = s), this.checkParenting()
    }, HSolidElement.prototype.hide = IImageElement.prototype.hide, HSolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame, HSolidElement.prototype.destroy = IImageElement.prototype.destroy, createElement(HBaseElement, HCompElement), HCompElement.prototype.createElements = function() {
        var t = document.createElement("div");
        if (styleDiv(t), this.data.ln && t.setAttribute("id", this.data.ln), t.style.clip = "rect(0px, " + this.data.w + "px, " + this.data.h + "px, 0px)", this.data.hasMask) {
            var e = document.createElementNS(svgNS, "svg");
            styleDiv(e), e.setAttribute("width", this.data.w), e.setAttribute("height", this.data.h);
            var s = document.createElementNS(svgNS, "g");
            e.appendChild(s), t.appendChild(e), this.maskedElement = s, this.baseElement = t, this.layerElement = s, this.transformedElement = t
        } else this.layerElement = t, this.baseElement = this.layerElement, this.transformedElement = t;
        this.checkParenting()
    }, HCompElement.prototype.hide = ICompElement.prototype.hide, HCompElement.prototype.prepareFrame = ICompElement.prototype.prepareFrame, HCompElement.prototype.setElements = ICompElement.prototype.setElements, HCompElement.prototype.getElements = ICompElement.prototype.getElements, HCompElement.prototype.destroy = ICompElement.prototype.destroy, HCompElement.prototype.renderFrame = function(t) {
        var e, s = this._parent.renderFrame.call(this, t),
            r = this.layers.length;
        if (s === !1) return void this.hide();
        for (this.hidden = !1, e = 0; r > e; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        this.firstFrame && (this.firstFrame = !1)
    }, HCompElement.prototype.checkLayers = BaseRenderer.prototype.checkLayers, HCompElement.prototype.buildItem = HybridRenderer.prototype.buildItem, HCompElement.prototype.checkPendingElements = HybridRenderer.prototype.checkPendingElements, HCompElement.prototype.addPendingElement = HybridRenderer.prototype.addPendingElement, HCompElement.prototype.buildAllItems = BaseRenderer.prototype.buildAllItems, HCompElement.prototype.createItem = HybridRenderer.prototype.createItem, HCompElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, HCompElement.prototype.createImage = HybridRenderer.prototype.createImage, HCompElement.prototype.createComp = HybridRenderer.prototype.createComp, HCompElement.prototype.createSolid = HybridRenderer.prototype.createSolid, HCompElement.prototype.createShape = HybridRenderer.prototype.createShape, HCompElement.prototype.createText = HybridRenderer.prototype.createText, HCompElement.prototype.createBase = HybridRenderer.prototype.createBase, HCompElement.prototype.appendElementInPos = HybridRenderer.prototype.appendElementInPos, createElement(HBaseElement, HShapeElement);
    var parent = HShapeElement.prototype._parent;
    extendPrototype(IShapeElement, HShapeElement), HShapeElement.prototype._parent = parent, HShapeElement.prototype.createElements = function() {
        var t = document.createElement("div");
        styleDiv(t);
        var e = document.createElementNS(svgNS, "svg");
        styleDiv(e);
        var s = this.comp.data ? this.comp.data : this.globalData.compSize;
        if (e.setAttribute("width", s.w), e.setAttribute("height", s.h), this.data.hasMask) {
            var r = document.createElementNS(svgNS, "g");
            t.appendChild(e), e.appendChild(r), this.maskedElement = r, this.layerElement = r, this.shapesContainer = r
        } else t.appendChild(e), this.layerElement = e, this.shapesContainer = document.createElementNS(svgNS, "g"), this.layerElement.appendChild(this.shapesContainer);
        this.data.hd || (this.baseElement = t), this.innerElem = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.searchShapes(this.shapesData, this.viewData, this.layerElement, this.dynamicProperties, 0), this.buildExpressionInterface(), this.layerElement = t, this.transformedElement = t, this.shapeCont = e, 0 !== this.data.bm && this.setBlendMode(), this.checkParenting()
    }, HShapeElement.prototype.renderFrame = function(t) {
        var e = this._parent.renderFrame.call(this, t);
        if (e === !1) return void this.hide();
        if (this.hidden && (this.layerElement.style.display = "block", this.hidden = !1), this.renderModifiers(), this.addedTransforms.mdf = this.finalTransform.matMdf, this.addedTransforms.mats.length = 1, this.addedTransforms.mats[0] = this.finalTransform.mat, this.renderShape(null, null, !0, null), this.isVisible && (this.elemMdf || this.firstFrame)) {
            var s = this.shapeCont.getBBox(),
                r = !1;
            this.currentBBox.w !== s.width && (this.currentBBox.w = s.width, this.shapeCont.setAttribute("width", s.width), r = !0), this.currentBBox.h !== s.height && (this.currentBBox.h = s.height, this.shapeCont.setAttribute("height", s.height), r = !0), (r || this.currentBBox.x !== s.x || this.currentBBox.y !== s.y) && (this.currentBBox.w = s.width, this.currentBBox.h = s.height, this.currentBBox.x = s.x, this.currentBBox.y = s.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
        }
    }, createElement(HBaseElement, HTextElement), HTextElement.prototype.init = ITextElement.prototype.init, HTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, HTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, HTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, HTextElement.prototype.createElements = function() {
        this.isMasked = this.checkMasks();
        var t = document.createElement("div");
        if (styleDiv(t), this.layerElement = t, this.transformedElement = t, this.isMasked) {
            this.renderType = "svg";
            var e = document.createElementNS(svgNS, "svg");
            styleDiv(e), this.cont = e, this.compW = this.comp.data ? this.comp.data.w : this.globalData.compSize.w, this.compH = this.comp.data ? this.comp.data.h : this.globalData.compSize.h, e.setAttribute("width", this.compW), e.setAttribute("height", this.compH);
            var s = document.createElementNS(svgNS, "g");
            e.appendChild(s), t.appendChild(e), this.maskedElement = s, this.innerElem = s
        } else this.renderType = "html", this.innerElem = t;
        this.baseElement = t, this.checkParenting()
    }, HTextElement.prototype.buildNewText = function() {
        var t = this.currentTextDocumentData;
        this.renderedLetters = Array.apply(null, {
            length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
        }), this.innerElem.style.color = this.innerElem.style.fill = t.fc ? "rgb(" + Math.round(255 * t.fc[0]) + "," + Math.round(255 * t.fc[1]) + "," + Math.round(255 * t.fc[2]) + ")" : "rgba(0,0,0,0)", t.sc && (this.innerElem.style.stroke = "rgb(" + Math.round(255 * t.sc[0]) + "," + Math.round(255 * t.sc[1]) + "," + Math.round(255 * t.sc[2]) + ")", this.innerElem.style.strokeWidth = t.sw + "px");
        var e = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars)
            if (this.innerElem.style.fontSize = t.s + "px", this.innerElem.style.lineHeight = t.s + "px", e.fClass) this.innerElem.className = e.fClass;
            else {
                this.innerElem.style.fontFamily = e.fFamily;
                var s = t.fWeight,
                    r = t.fStyle;
                this.innerElem.style.fontStyle = r, this.innerElem.style.fontWeight = s
            }
        var i, a, n = t.l;
        a = n.length;
        var o, h, l, p, m = this.mHelper,
            f = "",
            d = 0;
        for (i = 0; a > i; i += 1) {
            if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : (o = document.createElementNS(svgNS, "path"), o.setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? (h = this.textSpans[d], l = h.children[0]) : (h = document.createElement("div"), l = document.createElementNS(svgNS, "svg"), l.appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : document.createElementNS(svgNS, "text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (h = document.createElement("span"), styleDiv(h), o = document.createElement("span"), styleDiv(o), h.appendChild(o)), this.globalData.fontManager.chars) {
                var c, u = this.globalData.fontManager.getCharData(t.t.charAt(i), e.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                if (c = u ? u.data : null, m.reset(), c && c.shapes && (p = c.shapes[0].it, m.scale(t.s / 100, t.s / 100), f = this.createPathShape(m, p), o.setAttribute("d", f)), this.isMasked) this.innerElem.appendChild(o);
                else if (this.innerElem.appendChild(h), c && c.shapes) {
                    document.body.appendChild(l);
                    var y = l.getBBox();
                    l.setAttribute("width", y.width), l.setAttribute("height", y.height), l.setAttribute("viewBox", y.x + " " + y.y + " " + y.width + " " + y.height), l.style.transform = l.style.webkitTransform = "translate(" + y.x + "px," + y.y + "px)", n[i].yOffset = y.y, h.appendChild(l)
                } else l.setAttribute("width", 1), l.setAttribute("height", 1)
            } else o.textContent = n[i].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.s / 1.2 + "px,0)");
            this.textSpans[d] = this.isMasked ? o : h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1
        }
        for (; d < this.textSpans.length;) this.textSpans[d].style.display = "none", d += 1
    }, HTextElement.prototype.hide = SVGTextElement.prototype.hide, HTextElement.prototype.renderFrame = function(t) {
        var e = this._parent.renderFrame.call(this, t);
        if (e === !1) return void this.hide();
        if (this.hidden && (this.hidden = !1, this.innerElem.style.display = "block", this.layerElement.style.display = "block"), this.data.singleShape) {
            if (!this.firstFrame && !this.lettersChangedFlag) return;
            this.isMasked && this.finalTransform.matMdf && (this.cont.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
        }
        if (this.getMeasures(), this.lettersChangedFlag) {
            var s, r, i = this.renderedLetters,
                a = this.currentTextDocumentData.l;
            r = a.length;
            var n;
            for (s = 0; r > s; s += 1) a[s].n || (n = i[s], this.isMasked ? this.textSpans[s].setAttribute("transform", n.m) : this.textSpans[s].style.transform = this.textSpans[s].style.webkitTransform = n.m, this.textSpans[s].style.opacity = n.o, n.sw && this.textPaths[s].setAttribute("stroke-width", n.sw), n.sc && this.textPaths[s].setAttribute("stroke", n.sc), n.fc && (this.textPaths[s].setAttribute("fill", n.fc), this.textPaths[s].style.color = n.fc));
            if (this.isVisible && (this.elemMdf || this.firstFrame) && this.innerElem.getBBox) {
                var o = this.innerElem.getBBox();
                this.currentBBox.w !== o.width && (this.currentBBox.w = o.width, this.cont.setAttribute("width", o.width)), this.currentBBox.h !== o.height && (this.currentBBox.h = o.height,
                    this.cont.setAttribute("height", o.height)), (this.currentBBox.w !== o.width || this.currentBBox.h !== o.height || this.currentBBox.x !== o.x || this.currentBBox.y !== o.y) && (this.currentBBox.w = o.width, this.currentBBox.h = o.height, this.currentBBox.x = o.x, this.currentBBox.y = o.y, this.cont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
            }
            this.firstFrame && (this.firstFrame = !1)
        }
    }, HTextElement.prototype.destroy = SVGTextElement.prototype.destroy, createElement(HBaseElement, HImageElement), HImageElement.prototype.createElements = function() {
        var t = this.globalData.getAssetsPath(this.assetData),
            e = new Image;
        if (this.data.hasMask) {
            var s = document.createElement("div");
            styleDiv(s);
            var r = document.createElementNS(svgNS, "svg");
            styleDiv(r), r.setAttribute("width", this.assetData.w), r.setAttribute("height", this.assetData.h), s.appendChild(r), this.imageElem = document.createElementNS(svgNS, "image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), r.appendChild(this.imageElem), this.layerElement = s, this.transformedElement = s, this.baseElement = s, this.innerElem = s, this.maskedElement = this.imageElem
        } else styleDiv(e), this.layerElement = e, this.baseElement = e, this.innerElem = e, this.transformedElement = e;
        e.src = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.checkParenting()
    }, HImageElement.prototype.hide = HSolidElement.prototype.hide, HImageElement.prototype.renderFrame = HSolidElement.prototype.renderFrame, HImageElement.prototype.destroy = HSolidElement.prototype.destroy, createElement(HBaseElement, HCameraElement), HCameraElement.prototype.setup = function() {
        var t, e, s = this.comp.threeDElements.length;
        for (t = 0; s > t; t += 1) e = this.comp.threeDElements[t], e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
    }, HCameraElement.prototype.createElements = function() {}, HCameraElement.prototype.hide = function() {}, HCameraElement.prototype.renderFrame = function() {
        var t, e, s = this.firstFrame;
        if (this.hierarchy)
            for (e = this.hierarchy.length, t = 0; e > t; t += 1) s = this.hierarchy[t].finalTransform.mProp.mdf ? !0 : s;
        if (s || this.p && this.p.mdf || this.px && (this.px.mdf || this.py.mdf || this.pz.mdf) || this.rx.mdf || this.ry.mdf || this.rz.mdf || this.or.mdf || this.a && this.a.mdf) {
            if (this.mat.reset(), this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                var r = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
                    i = Math.sqrt(Math.pow(r[0], 2) + Math.pow(r[1], 2) + Math.pow(r[2], 2)),
                    a = [r[0] / i, r[1] / i, r[2] / i],
                    n = Math.sqrt(a[2] * a[2] + a[0] * a[0]),
                    o = Math.atan2(a[1], n),
                    h = Math.atan2(a[0], -a[2]);
                this.mat.rotateY(h).rotateX(-o)
            }
            if (this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v), this.hierarchy) {
                var l;
                for (e = this.hierarchy.length, t = 0; e > t; t += 1) l = this.hierarchy[t].finalTransform.mProp.iv.props, this.mat.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], -l[12], -l[13], l[14], l[15])
            }
            e = this.comp.threeDElements.length;
            var p;
            for (t = 0; e > t; t += 1) p = this.comp.threeDElements[t], p.container.style.transform = p.container.style.webkitTransform = this.mat.toCSS()
        }
        this.firstFrame = !1
    }, HCameraElement.prototype.destroy = function() {};
    var Expressions = function() {
        function t(t) {
            t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer)
        }
        var e = {};
        return e.initExpressions = t, e
    }();
    expressionsPlugin = Expressions,
        function() {
            function t() {
                return this.pv
            }

            function e(t, e) {
                var s, r, i = 0,
                    a = this.keyframes.length - 1,
                    n = 1,
                    o = !0;
                e = void 0 === e ? this.offsetTime : 0;
                for (var h = "object" == typeof this.pv ? [this.pv.length] : 0; o;) {
                    if (s = this.keyframes[i], r = this.keyframes[i + 1], i == a - 1 && t >= r.t - e) {
                        s.h && (s = r);
                        break
                    }
                    if (r.t - e > t) break;
                    a - 1 > i ? i += n : o = !1
                }
                var l, p, m, f, d, c = 0;
                if (s.to) {
                    s.bezierData || bez.buildBezierData(s);
                    var u = s.bezierData;
                    if (t >= r.t - e || t < s.t - e) {
                        var y = t >= r.t - e ? u.points.length - 1 : 0;
                        for (p = u.points[y].point.length, l = 0; p > l; l += 1) h[l] = u.points[y].point[l]
                    } else {
                        s.__fnct ? d = s.__fnct : (d = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = d), m = d((t - (s.t - e)) / (r.t - e - (s.t - e)));
                        var g, v = u.segmentLength * m,
                            b = 0;
                        for (n = 1, o = !0, f = u.points.length; o;) {
                            if (b += u.points[c].partialLength * n, 0 === v || 0 === m || c == u.points.length - 1) {
                                for (p = u.points[c].point.length, l = 0; p > l; l += 1) h[l] = u.points[c].point[l];
                                break
                            }
                            if (v >= b && v < b + u.points[c + 1].partialLength) {
                                for (g = (v - b) / u.points[c + 1].partialLength, p = u.points[c].point.length, l = 0; p > l; l += 1) h[l] = u.points[c].point[l] + (u.points[c + 1].point[l] - u.points[c].point[l]) * g;
                                break
                            }
                            f - 1 > c && 1 == n || c > 0 && -1 == n ? c += n : o = !1
                        }
                    }
                } else {
                    var E, P, k, S, x, C = !1;
                    for (a = s.s.length, i = 0; a > i; i += 1) {
                        if (1 !== s.h && (s.o.x instanceof Array ? (C = !0, s.__fnct || (s.__fnct = []), s.__fnct[i] || (E = s.o.x[i] || s.o.x[0], P = s.o.y[i] || s.o.y[0], k = s.i.x[i] || s.i.x[0], S = s.i.y[i] || s.i.y[0])) : (C = !1, s.__fnct || (E = s.o.x, P = s.o.y, k = s.i.x, S = s.i.y)), C ? s.__fnct[i] ? d = s.__fnct[i] : (d = BezierFactory.getBezierEasing(E, P, k, S).get, s.__fnct[i] = d) : s.__fnct ? d = s.__fnct : (d = BezierFactory.getBezierEasing(E, P, k, S).get, s.__fnct = d), m = t >= r.t - e ? 1 : t < s.t - e ? 0 : d((t - (s.t - e)) / (r.t - e - (s.t - e)))), this.sh && 1 !== s.h) {
                            var M = s.s[i],
                                A = s.e[i]; - 180 > M - A ? M += 360 : M - A > 180 && (M -= 360), x = M + (A - M) * m
                        } else x = 1 === s.h ? s.s[i] : s.s[i] + (s.e[i] - s.s[i]) * m;
                        1 === a ? h = x : h[i] = x
                    }
                }
                return h
            }

            function s(t) {
                if (void 0 !== this.vel) return this.vel;
                var e = -.01;
                t *= this.elem.globalData.frameRate;
                var s, r = this.getValueAtTime(t, 0),
                    i = this.getValueAtTime(t + e, 0);
                if (r.length) {
                    s = Array.apply(null, {
                        length: r.length
                    });
                    var a;
                    for (a = 0; a < r.length; a += 1) s[a] = this.elem.globalData.frameRate * ((i[a] - r[a]) / e)
                } else s = (i - r) / e;
                return s
            }

            function r(t) {
                this.propertyGroup = t
            }

            function i(t, e, s) {
                e.x && (s.k = !0, s.x = !0, s.getValue && (s.getPreValue = s.getValue), s.getValue = ExpressionManager.initiateExpression.bind(s)(t, e, s))
            }
            var a = function() {
                    function a(t, e) {
                        return this.textIndex = t + 1, this.textTotal = e, this.getValue(), this.v
                    }
                    return function(n, o) {
                        this.pv = 1, this.comp = n.comp, this.elem = n, this.mult = .01, this.type = "textSelector", this.textTotal = o.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], i.bind(this)(n, o, this), this.getMult = a, this.getVelocityAtTime = s, this.getValueAtTime = this.kf ? e : t, this.setGroupProperty = r
                    }
                }(),
                n = PropertyFactory.getProp;
            PropertyFactory.getProp = function(a, o, h, l, p) {
                var m = n(a, o, h, l, p);
                m.getVelocityAtTime = s, m.getValueAtTime = m.kf ? e : t, m.setGroupProperty = r;
                var f = m.k;
                return void 0 !== o.ix && Object.defineProperty(m, "propertyIndex", {
                    get: function() {
                        return o.ix
                    }
                }), i(a, o, m), !f && m.x && p.push(m), m
            };
            var o = ShapePropertyFactory.getShapeProp;
            ShapePropertyFactory.getShapeProp = function(t, e, s, a, n) {
                var h = o(t, e, s, a, n);
                h.setGroupProperty = r;
                var l = h.k;
                return void 0 !== e.ix && Object.defineProperty(h, "propertyIndex", {
                    get: function() {
                        return e.ix
                    }
                }), 3 === s ? i(t, e.pt, h) : 4 === s && i(t, e.ks, h), !l && h.x && a.push(h), h
            };
            var h = PropertyFactory.getTextSelectorProp;
            PropertyFactory.getTextSelectorProp = function(t, e, s) {
                return 1 === e.t ? new a(t, e, s) : h(t, e, s)
            }
        }();
    var ExpressionManager = function() {
            function duplicatePropertyValue(t, e) {
                if (e = e || 1, "number" == typeof t) return t * e;
                if (t.i) return JSON.parse(JSON.stringify(t));
                var s, r = Array.apply(null, {
                        length: t.length
                    }),
                    i = t.length;
                for (s = 0; i > s; s += 1) r[s] = t[s] * e;
                return r
            }

            function $bm_neg(t) {
                var e = typeof t;
                if ("number" === e || "boolean" === e) return -t;
                if ("object" === e) {
                    var s, r = t.length,
                        i = [];
                    for (s = 0; r > s; s += 1) i[s] = -t[s];
                    return i
                }
            }

            function sum(t, e) {
                var s = typeof t,
                    r = typeof e;
                if ("string" === s || "string" === r) return t + e;
                if (!("number" !== s && "boolean" !== s && "string" !== s || "number" !== r && "boolean" !== r && "string" !== r)) return t + e;
                if ("object" === s && ("number" === r || "boolean" === r || "string" === r)) return t[0] = t[0] + e, t;
                if (("number" === s || "boolean" === s || "string" === s) && "object" === r) return e[0] = t + e[0], e;
                if ("object" === s && "object" === r) {
                    for (var i = 0, a = t.length, n = e.length, o = []; a > i || n > i;) o[i] = "number" == typeof t[i] && "number" == typeof e[i] ? t[i] + e[i] : void 0 == e[i] ? t[i] : t[i] || e[i], i += 1;
                    return o
                }
                return 0
            }

            function sub(t, e) {
                var s = typeof t,
                    r = typeof e;
                if (!("number" !== s && "boolean" !== s && "string" !== s || "number" !== r && "boolean" !== r && "string" !== r)) return t - e;
                if ("object" === s && ("number" === r || "boolean" === r || "string" === r)) return t[0] = t[0] - e, t;
                if (("number" === s || "boolean" === s || "string" === s) && "object" === r) return e[0] = t - e[0], e;
                if ("object" === s && "object" === r) {
                    for (var i = 0, a = t.length, n = e.length, o = []; a > i || n > i;) o[i] = "number" == typeof t[i] && "number" == typeof e[i] ? t[i] - e[i] : void 0 == e[i] ? t[i] : t[i] || e[i], i += 1;
                    return o
                }
                return 0
            }

            function mul(t, e) {
                var s, r = typeof t,
                    i = typeof e;
                if (!("number" !== r && "boolean" !== r && "string" !== r || "number" !== i && "boolean" !== i && "string" !== i)) return t * e;
                var a, n;
                if ("object" === r && ("number" === i || "boolean" === i || "string" === i)) {
                    for (n = t.length, s = Array.apply(null, {
                            length: n
                        }), a = 0; n > a; a += 1) s[a] = t[a] * e;
                    return s
                }
                if (("number" === r || "boolean" === r || "string" === r) && "object" === i) {
                    for (n = e.length, s = Array.apply(null, {
                            length: n
                        }), a = 0; n > a; a += 1) s[a] = t * e[a];
                    return s
                }
                return 0
            }

            function div(t, e) {
                var s, r = typeof t,
                    i = typeof e;
                if (!("number" !== r && "boolean" !== r && "string" !== r || "number" !== i && "boolean" !== i && "string" !== i)) return t / e;
                var a, n;
                if ("object" === r && ("number" === i || "boolean" === i || "string" === i)) {
                    for (n = t.length, s = Array.apply(null, {
                            length: n
                        }), a = 0; n > a; a += 1) s[a] = t[a] / e;
                    return s
                }
                if (("number" === r || "boolean" === r || "string" === r) && "object" === i) {
                    for (n = e.length, s = Array.apply(null, {
                            length: n
                        }), a = 0; n > a; a += 1) s[a] = t / e[a];
                    return s
                }
                return 0
            }

            function clamp(t, e, s) {
                if (e > s) {
                    var r = s;
                    s = e, e = r
                }
                return Math.min(Math.max(t, e), s)
            }

            function radiansToDegrees(t) {
                return t / degToRads
            }

            function degreesToRadians(t) {
                return t * degToRads
            }

            function length(t, e) {
                if ("number" == typeof t) return e = e || 0, Math.abs(t - e);
                e || (e = helperLengthArray);
                var s, r = Math.min(t.length, e.length),
                    i = 0;
                for (s = 0; r > s; s += 1) i += Math.pow(e[s] - t[s], 2);
                return Math.sqrt(i)
            }

            function normalize(t) {
                return div(t, length(t))
            }

            function rgbToHsl(t) {
                var e, s, r = t[0],
                    i = t[1],
                    a = t[2],
                    n = Math.max(r, i, a),
                    o = Math.min(r, i, a),
                    h = (n + o) / 2;
                if (n == o) e = s = 0;
                else {
                    var l = n - o;
                    switch (s = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
                        case r:
                            e = (i - a) / l + (a > i ? 6 : 0);
                            break;
                        case i:
                            e = (a - r) / l + 2;
                            break;
                        case a:
                            e = (r - i) / l + 4
                    }
                    e /= 6
                }
                return [e, s, h, t[3]]
            }

            function hslToRgb(t) {
                function e(t, e, s) {
                    return 0 > s && (s += 1), s > 1 && (s -= 1), 1 / 6 > s ? t + 6 * (e - t) * s : .5 > s ? e : 2 / 3 > s ? t + (e - t) * (2 / 3 - s) * 6 : t
                }
                var s, r, i, a = t[0],
                    n = t[1],
                    o = t[2];
                if (0 == n) s = r = i = o;
                else {
                    var h = .5 > o ? o * (1 + n) : o + n - o * n,
                        l = 2 * o - h;
                    s = e(l, h, a + 1 / 3), r = e(l, h, a), i = e(l, h, a - 1 / 3)
                }
                return [s, r, i, t[3]]
            }

            function linear(t, e, s, r, i) {
                if (void 0 === r || void 0 === i) return linear(t, 0, 1, e, s);
                if (e >= t) return r;
                if (t >= s) return i;
                var a = s === e ? 0 : (t - e) / (s - e);
                if (!r.length) return r + (i - r) * a;
                var n, o = r.length,
                    h = Array.apply(null, {
                        length: o
                    });
                for (n = 0; o > n; n += 1) h[n] = r[n] + (i[n] - r[n]) * a;
                return h
            }

            function random(t, e) {
                if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
                    var s, r = e.length;
                    t || (t = Array.apply(null, {
                        length: r
                    }));
                    var i = Array.apply(null, {
                            length: r
                        }),
                        a = BMMath.random();
                    for (s = 0; r > s; s += 1) i[s] = t[s] + a * (e[s] - t[s]);
                    return i
                }
                void 0 === t && (t = 0);
                var n = BMMath.random();
                return t + n * (e - t)
            }

            function initiateExpression(elem, data, property) {
                function lookAt(t, e) {
                    var s = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                        r = Math.atan2(s[0], Math.sqrt(s[1] * s[1] + s[2] * s[2])) / degToRads,
                        i = -Math.atan2(s[1], s[2]) / degToRads;
                    return [i, r, 0]
                }

                function easeOut(t, e, s) {
                    return -(s - e) * t * (t - 2) + e
                }

                function nearestKey(t) {
                    var e, s, r, i = data.k.length;
                    if (data.k.length && "number" != typeof data.k[0]) {
                        for (s = -1, t *= elem.comp.globalData.frameRate, e = 0; i - 1 > e; e += 1) {
                            if (t === data.k[e].t) {
                                s = e + 1, r = data.k[e].t;
                                break
                            }
                            if (t > data.k[e].t && t < data.k[e + 1].t) {
                                t - data.k[e].t > data.k[e + 1].t - t ? (s = e + 2, r = data.k[e + 1].t) : (s = e + 1, r = data.k[e].t);
                                break
                            }
                        } - 1 === s && (s = e + 1, r = data.k[e].t)
                    } else s = 0, r = 0;
                    var a = {};
                    return a.index = s, a.time = r / elem.comp.globalData.frameRate, a
                }

                function key(t) {
                    if (!data.k.length || "number" == typeof data.k[0]) return {
                        time: 0
                    };
                    t -= 1;
                    var e, s = {
                        time: data.k[t].t / elem.comp.globalData.frameRate
                    };
                    e = t === data.k.length - 1 ? data.k[t - 1].e : data.k[t].s;
                    var r, i = e.length;
                    for (r = 0; i > r; r += 1) s[r] = e[r];
                    return s
                }

                function framesToTime(t, e) {
                    return e || (e = elem.comp.globalData.frameRate), t / e
                }

                function timeToFrames(t, e) {
                    return t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
                }

                function toWorld(t) {
                    if (toworldMatrix.reset(), elem.finalTransform.mProp.applyToMatrix(toworldMatrix), elem.hierarchy && elem.hierarchy.length) {
                        var e, s = elem.hierarchy.length;
                        for (e = 0; s > e; e += 1) elem.hierarchy[e].finalTransform.mProp.applyToMatrix(toworldMatrix);
                        return toworldMatrix.applyToPointArray(t[0], t[1], t[2] || 0)
                    }
                    return toworldMatrix.applyToPointArray(t[0], t[1], t[2] || 0)
                }

                function fromWorld(t) {
                    fromworldMatrix.reset();
                    var e = [];
                    if (e.push(t), elem.finalTransform.mProp.applyToMatrix(fromworldMatrix), elem.hierarchy && elem.hierarchy.length) {
                        var s, r = elem.hierarchy.length;
                        for (s = 0; r > s; s += 1) elem.hierarchy[s].finalTransform.mProp.applyToMatrix(fromworldMatrix);
                        return fromworldMatrix.inversePoints(e)[0]
                    }
                    return fromworldMatrix.inversePoints(e)[0]
                }

                function seedRandom(t) {
                    BMMath.seedrandom(randSeed + t)
                }

                function execute() {
                    if (seedRandom(randSeed), this.frameExpressionId !== elem.globalData.frameId || "textSelector" === this.type) {
                        if (this.lock) return this.v = duplicatePropertyValue(this.pv, this.mult), !0;
                        "textSelector" === this.type && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface), transform || (transform = elem.layerInterface("ADBE Transform Group")), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), hasParent = !(!elem.hierarchy || !elem.hierarchy.length), hasParent && !parent && (parent = elem.hierarchy[elem.hierarchy.length - 1].layerInterface), this.lock = !0, this.getPreValue && this.getPreValue(), value = this.pv, time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), bindedFn(), this.frameExpressionId = elem.globalData.frameId;
                        var t, e;
                        if (this.mult)
                            if ("number" == typeof this.v) this.v *= this.mult;
                            else
                                for (e = this.v.length, value === this.v && (this.v = 2 === e ? [value[0], value[1]] : [value[0], value[1], value[2]]), t = 0; e > t; t += 1) this.v[t] *= this.mult;
                        if ("number" == typeof this.v) this.lastValue !== this.v && (this.lastValue = this.v, this.mdf = !0);
                        else if (this.v.i) this.mdf = !0, this.paths.length = 0, this.paths[0] = this.v;
                        else
                            for (e = this.v.length, t = 0; e > t; t += 1) this.v[t] !== this.lastValue[t] && (this.lastValue[t] = this.v[t], this.mdf = !0);
                        this.lock = !1
                    }
                }
                var val = data.x,
                    needsVelocity = -1 !== val.indexOf("velocity"),
                    elemType = elem.data.ty,
                    transform, content, effect, thisComp = elem.comp,
                    thisProperty = property;
                elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate;
                var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                    outPoint = elem.data.op / elem.comp.globalData.frameRate,
                    thisLayer, thisComp, fn = new Function,
                    fnStr = "var fn = function(){" + val + ";this.v = $bm_rt;}";
                eval(fnStr);
                var bindedFn = fn.bind(this),
                    numKeys = data.k ? data.k.length : 0,
                    wiggle = function(t, e) {
                        var s, r, i = this.pv.length ? this.pv.length : 1,
                            a = Array.apply(null, {
                                len: i
                            });
                        for (r = 0; i > r; r += 1) a[r] = 0;
                        t = 5;
                        var n = Math.floor(time * t);
                        for (s = 0, r = 0; n > s;) {
                            for (r = 0; i > r; r += 1) a[r] += -e + 2 * e * BMMath.random();
                            s += 1
                        }
                        var o = time * t,
                            h = o - Math.floor(o),
                            l = Array.apply({
                                length: i
                            });
                        for (r = 0; i > r; r += 1) l[r] = this.pv[r] + a[r] + (-e + 2 * e * BMMath.random()) * h;
                        return l
                    }.bind(this),
                    loopIn = function(t, e, s) {
                        if (!this.k) return this.pv;
                        var r = time * elem.comp.globalData.frameRate,
                            i = this.keyframes,
                            a = i[0].t;
                        if (r >= a) return this.pv;
                        var n, o;
                        s ? (n = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - a), o = a + n) : ((!e || e > i.length - 1) && (e = i.length - 1), o = i[e].t, n = o - a);
                        var h, l, p;
                        if ("pingpong" === t) {
                            var m = Math.floor((a - r) / n);
                            if (m % 2 === 0) return this.getValueAtTime((a - r) % n + a, 0)
                        } else {
                            if ("offset" === t) {
                                var f = this.getValueAtTime(a, 0),
                                    d = this.getValueAtTime(o, 0),
                                    c = this.getValueAtTime(n - (a - r) % n + a, 0),
                                    u = Math.floor((a - r) / n) + 1;
                                if (this.pv.length) {
                                    for (p = new Array(f.length), l = p.length, h = 0; l > h; h += 1) p[h] = c[h] - (d[h] - f[h]) * u;
                                    return p
                                }
                                return c - (d - f) * u
                            }
                            if ("continue" === t) {
                                var y = this.getValueAtTime(a, 0),
                                    g = this.getValueAtTime(a + .001, 0);
                                if (this.pv.length) {
                                    for (p = new Array(y.length), l = p.length, h = 0; l > h; h += 1) p[h] = y[h] + (y[h] - g[h]) * (a - r) / 5e-4;
                                    return p
                                }
                                return y + (y - g) * (a - r) / 5e-4
                            }
                        }
                        return this.getValueAtTime(n - (a - r) % n + a, 0)
                    }.bind(this),
                    loopInDuration = function(t, e) {
                        return loopIn(t, e, !0)
                    }.bind(this),
                    loopOut = function(t, e, s) {
                        if (!this.k || !this.keyframes) return this.pv;
                        var r = time * elem.comp.globalData.frameRate,
                            i = this.keyframes,
                            a = i[i.length - 1].t;
                        if (a >= r) return this.pv;
                        var n, o;
                        s ? (n = e ? Math.abs(a - elem.comp.globalData.frameRate * e) : Math.max(0, a - this.elem.data.ip), o = a - n) : ((!e || e > i.length - 1) && (e = i.length - 1), o = i[i.length - 1 - e].t, n = a - o);
                        var h, l, p;
                        if ("pingpong" === t) {
                            var m = Math.floor((r - o) / n);
                            if (m % 2 !== 0) return this.getValueAtTime(n - (r - o) % n + o, 0)
                        } else {
                            if ("offset" === t) {
                                var f = this.getValueAtTime(o, 0),
                                    d = this.getValueAtTime(a, 0),
                                    c = this.getValueAtTime((r - o) % n + o, 0),
                                    u = Math.floor((r - o) / n);
                                if (this.pv.length) {
                                    for (p = new Array(f.length), l = p.length, h = 0; l > h; h += 1) p[h] = (d[h] - f[h]) * u + c[h];
                                    return p
                                }
                                return (d - f) * u + c
                            }
                            if ("continue" === t) {
                                var y = this.getValueAtTime(a, 0),
                                    g = this.getValueAtTime(a - .001, 0);
                                if (this.pv.length) {
                                    for (p = new Array(y.length), l = p.length, h = 0; l > h; h += 1) p[h] = y[h] + (y[h] - g[h]) * (r - a) / 5e-4;
                                    return p
                                }
                                return y + (y - g) * (r - a) / 5e-4
                            }
                        }
                        return this.getValueAtTime((r - o) % n + o, 0)
                    }.bind(this),
                    loop_out = loopOut,
                    loopOutDuration = function(t, e) {
                        return loopOut(t, e, !0)
                    }.bind(this),
                    valueAtTime = function(t) {
                        return this.getValueAtTime(t * elem.comp.globalData.frameRate, 0)
                    }.bind(this),
                    velocityAtTime = function(t) {
                        return this.getVelocityAtTime(t)
                    }.bind(this),
                    comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                    toworldMatrix = new Matrix,
                    fromworldMatrix = new Matrix,
                    time, velocity, value, textIndex, textTotal, selectorValue, index = elem.data.ind + 1,
                    hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                    parent, randSeed = Math.floor(1e6 * Math.random());
                return execute
            }
            var ob = {},
                Math = BMMath,
                radians_to_degrees = radiansToDegrees,
                degrees_to_radians = radiansToDegrees,
                helperLengthArray = [0, 0, 0, 0, 0, 0];
            return ob.initiateExpression = initiateExpression, ob
        }(),
        ShapeExpressionInterface = function() {
            function t(t, e, s) {
                return d(t, e, s)
            }

            function e(t, e, s) {
                return u(t, e, s)
            }

            function s(t, e, s) {
                return y(t, e, s)
            }

            function r(t, e, s) {
                return g(t, e, s)
            }

            function i(t, e, s) {
                return v(t, e, s)
            }

            function a(t, e, s) {
                return b(t, e, s)
            }

            function n(t, e, s) {
                return E(t, e, s)
            }

            function o(t, e, s) {
                return P(t, e, s)
            }

            function h(t, e, s) {
                return k(t, e, s)
            }

            function l(t, e, s) {
                return S(t, e, s)
            }

            function p(t, e, s) {
                return x(t, e, s)
            }

            function m(t, e, s) {
                var r, i = [],
                    a = t ? t.length : 0;
                for (r = 0; a > r; r += 1) "gr" == t[r].ty ? i.push(ShapeExpressionInterface.createGroupInterface(t[r], e[r], s)) : "fl" == t[r].ty ? i.push(ShapeExpressionInterface.createFillInterface(t[r], e[r], s)) : "st" == t[r].ty ? i.push(ShapeExpressionInterface.createStrokeInterface(t[r], e[r], s)) : "tm" == t[r].ty ? i.push(ShapeExpressionInterface.createTrimInterface(t[r], e[r], s)) : "tr" == t[r].ty || ("el" == t[r].ty ? i.push(ShapeExpressionInterface.createEllipseInterface(t[r], e[r], s)) : "sr" == t[r].ty ? i.push(ShapeExpressionInterface.createStarInterface(t[r], e[r], s)) : "sh" == t[r].ty ? i.push(ShapeExpressionInterface.createPathInterface(t[r], e[r], s)) : "rc" == t[r].ty ? i.push(ShapeExpressionInterface.createRectInterface(t[r], e[r], s)) : "rd" == t[r].ty && i.push(ShapeExpressionInterface.createRoundedInterface(t[r], e[r], s)));
                return i
            }
            var f = {
                    createShapeInterface: t,
                    createGroupInterface: e,
                    createTrimInterface: i,
                    createStrokeInterface: r,
                    createTransformInterface: a,
                    createEllipseInterface: n,
                    createStarInterface: o,
                    createRectInterface: h,
                    createRoundedInterface: l,
                    createPathInterface: p,
                    createFillInterface: s
                },
                d = function() {
                    return function(t, e, s) {
                        function r(t) {
                            if ("number" == typeof t) return i[t - 1];
                            for (var e = 0, s = i.length; s > e;) {
                                if (i[e]._name === t) return i[e];
                                e += 1
                            }
                        }
                        var i;
                        return r.propertyGroup = s, i = m(t, e, r), r
                    }
                }(),
                c = function() {
                    return function(t, e, s) {
                        var r, i = function(t) {
                            if ("number" == typeof t) return r[t - 1];
                            for (var e = 0, s = r.length; s > e;) {
                                if (r[e]._name === t || r[e].mn === t) return r[e];
                                e += 1
                            }
                        };
                        return i.propertyGroup = function(t) {
                            return 1 === t ? i : s(t - 1)
                        }, r = m(t.it, e.it, i.propertyGroup), i.numProperties = r.length, i
                    }
                }(),
                u = function() {
                    return function(t, e, s) {
                        var r = function(t) {
                            switch (t) {
                                case "ADBE Vectors Group":
                                case 2:
                                    return r.content;
                                case "ADBE Vector Transform Group":
                                case 3:
                                default:
                                    return r.transform
                            }
                        };
                        r.propertyGroup = function(t) {
                            return 1 === t ? r : s(t - 1)
                        };
                        var i = c(t, e, r.propertyGroup),
                            a = ShapeExpressionInterface.createTransformInterface(t.it[t.it.length - 1], e.it[e.it.length - 1], r.propertyGroup);
                        return r.content = i, r.transform = a, Object.defineProperty(r, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), r.numProperties = 1, r.nm = t.nm, r.mn = t.mn, r
                    }
                }(),
                y = function() {
                    return function(t, e, s) {
                        e.c.setGroupProperty(s), e.o.setGroupProperty(s);
                        var r = {
                            get color() {
                                return e.c.k && e.c.getValue(), [e.c.v[0] / e.c.mult, e.c.v[1] / e.c.mult, e.c.v[2] / e.c.mult, 1]
                            },
                            get opacity() {
                                return e.o.k && e.o.getValue(), e.o.v
                            },
                            _name: t.nm,
                            mn: t.mn
                        };
                        return r
                    }
                }(),
                g = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 === t ? i : s(t - 1)
                        }
                        e.c.setGroupProperty(r), e.o.setGroupProperty(r), e.w.setGroupProperty(r);
                        var i = {
                            get color() {
                                return e.c.k && e.c.getValue(), [e.c.v[0] / e.c.mult, e.c.v[1] / e.c.mult, e.c.v[2] / e.c.mult, 1]
                            },
                            get opacity() {
                                return e.o.k && e.o.getValue(), e.o.v
                            },
                            get strokeWidth() {
                                return e.w.k && e.w.getValue(), e.w.v
                            },
                            dashOb: {},
                            get dash() {
                                var r, i = e.d,
                                    a = t.d,
                                    n = a.length;
                                for (r = 0; n > r; r += 1) i.dataProps[r].p.k && i.dataProps[r].p.getValue(), i.dataProps[r].p.setGroupProperty(s), this.dashOb[a[r].nm] = i.dataProps[r].p.v;
                                return this.dashOb
                            },
                            _name: t.nm,
                            mn: t.mn
                        };
                        return i
                    }
                }(),
                v = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return e === t.e.ix ? i.end : e === t.s.ix ? i.start : e === t.o.ix ? i.offset : void 0
                        }
                        return i.propertyIndex = t.ix, e.s.setGroupProperty(r), e.e.setGroupProperty(r), e.o.setGroupProperty(r), i.propertyIndex = t.ix, Object.defineProperty(i, "start", {
                            get: function() {
                                return e.s.k && e.s.getValue(), e.s.v / e.s.mult
                            }
                        }), Object.defineProperty(i, "end", {
                            get: function() {
                                return e.e.k && e.e.getValue(), e.e.v / e.e.mult
                            }
                        }), Object.defineProperty(i, "offset", {
                            get: function() {
                                return e.o.k && e.o.getValue(), e.o.v
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.mn = t.mn, i
                    }
                }(),
                b = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return t.a.ix === e ? i.anchorPoint : t.o.ix === e ? i.opacity : t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.s.ix === e ? i.scale : t.sk && t.sk.ix === e ? i.skew : t.sa && t.sa.ix === e ? i.skewAxis : "Opacity" === e ? i.opacity : "Position" === e ? i.position : "Anchor Point" === e ? i.anchorPoint : "Scale" === e ? i.scale : "Rotation" === e ? i.rotation : "Skew" === e ? i.skew : "Skew Axis" === e ? i.skewAxis : void 0
                        }
                        e.transform.mProps.o.setGroupProperty(r), e.transform.mProps.p.setGroupProperty(r), e.transform.mProps.a.setGroupProperty(r), e.transform.mProps.s.setGroupProperty(r), e.transform.mProps.r.setGroupProperty(r), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(r), e.transform.mProps.sa.setGroupProperty(r)), e.transform.op.setGroupProperty(r), Object.defineProperty(i, "opacity", {
                            get: function() {
                                return e.transform.mProps.o.k && e.transform.mProps.o.getValue(), e.transform.mProps.o.v / e.transform.mProps.o.mult
                            }
                        }), Object.defineProperty(i, "position", {
                            get: function() {
                                return e.transform.mProps.p.k && e.transform.mProps.p.getValue(), [e.transform.mProps.p.v[0], e.transform.mProps.p.v[1]]
                            }
                        }), Object.defineProperty(i, "anchorPoint", {
                            get: function() {
                                return e.transform.mProps.a.k && e.transform.mProps.a.getValue(), [e.transform.mProps.a.v[0], e.transform.mProps.a.v[1]]
                            }
                        });
                        var a = [];
                        return Object.defineProperty(i, "scale", {
                            get: function() {
                                return e.transform.mProps.s.k && e.transform.mProps.s.getValue(), a[0] = e.transform.mProps.s.v[0] / e.transform.mProps.s.mult, a[1] = e.transform.mProps.s.v[1] / e.transform.mProps.s.mult, a
                            }
                        }), Object.defineProperty(i, "rotation", {
                            get: function() {
                                return e.transform.mProps.r.k && e.transform.mProps.r.getValue(), e.transform.mProps.r.v / e.transform.mProps.r.mult
                            }
                        }), Object.defineProperty(i, "skew", {
                            get: function() {
                                return e.transform.mProps.sk.k && e.transform.mProps.sk.getValue(), e.transform.mProps.sk.v
                            }
                        }), Object.defineProperty(i, "skewAxis", {
                            get: function() {
                                return e.transform.mProps.sa.k && e.transform.mProps.sa.getValue(), e.transform.mProps.sa.v
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.ty = "tr", i.mn = t.mn, i
                    }
                }(),
                E = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return t.p.ix === e ? i.position : t.s.ix === e ? i.size : void 0
                        }
                        i.propertyIndex = t.ix;
                        var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        return a.s.setGroupProperty(r), a.p.setGroupProperty(r), Object.defineProperty(i, "size", {
                            get: function() {
                                return a.s.k && a.s.getValue(), [a.s.v[0], a.s.v[1]]
                            }
                        }), Object.defineProperty(i, "position", {
                            get: function() {
                                return a.p.k && a.p.getValue(), [a.p.v[0], a.p.v[1]]
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.mn = t.mn, i
                    }
                }(),
                P = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.pt.ix === e ? i.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? i.outerRadius : t.os.ix === e ? i.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? i.innerRoundness : void 0 : i.innerRadius
                        }
                        var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        return i.propertyIndex = t.ix, a.or.setGroupProperty(r), a.os.setGroupProperty(r), a.pt.setGroupProperty(r), a.p.setGroupProperty(r), a.r.setGroupProperty(r), t.ir && (a.ir.setGroupProperty(r), a.is.setGroupProperty(r)), Object.defineProperty(i, "position", {
                            get: function() {
                                return a.p.k && a.p.getValue(), a.p.v
                            }
                        }), Object.defineProperty(i, "rotation", {
                            get: function() {
                                return a.r.k && a.r.getValue(), a.r.v / a.r.mult
                            }
                        }), Object.defineProperty(i, "points", {
                            get: function() {
                                return a.pt.k && a.pt.getValue(), a.pt.v
                            }
                        }), Object.defineProperty(i, "outerRadius", {
                            get: function() {
                                return a.or.k && a.or.getValue(), a.or.v
                            }
                        }), Object.defineProperty(i, "outerRoundness", {
                            get: function() {
                                return a.os.k && a.os.getValue(), a.os.v / a.os.mult
                            }
                        }), Object.defineProperty(i, "innerRadius", {
                            get: function() {
                                return a.ir ? (a.ir.k && a.ir.getValue(), a.ir.v) : 0
                            }
                        }), Object.defineProperty(i, "innerRoundness", {
                            get: function() {
                                return a.is ? (a.is.k && a.is.getValue(), a.is.v / a.is.mult) : 0
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.mn = t.mn, i
                    }
                }(),
                k = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.pt.ix === e ? i.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? i.outerRadius : t.os.ix === e ? i.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? i.innerRoundness : void 0 : i.innerRadius
                        }
                        var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        return i.propertyIndex = t.ix, a.p.setGroupProperty(r), a.s.setGroupProperty(r), a.r.setGroupProperty(r), Object.defineProperty(i, "position", {
                            get: function() {
                                return a.p.k && a.p.getValue(), a.p.v
                            }
                        }), Object.defineProperty(i, "roundness", {
                            get: function() {
                                return a.r.k && a.r.getValue(), a.r.v
                            }
                        }), Object.defineProperty(i, "size", {
                            get: function() {
                                return a.s.k && a.s.getValue(), a.s.v
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.mn = t.mn, i
                    }
                }(),
                S = function() {
                    return function(t, e, s) {
                        function r(t) {
                            return 1 == t ? i : s(--t)
                        }

                        function i(e) {
                            return t.r.ix === e || "Round Corners 1" === e ? i.radius : void 0
                        }
                        var a = e;
                        return i.propertyIndex = t.ix, a.rd.setGroupProperty(r), Object.defineProperty(i, "radius", {
                            get: function() {
                                return a.rd.k && a.rd.getValue(), a.rd.v
                            }
                        }), Object.defineProperty(i, "_name", {
                            get: function() {
                                return t.nm
                            }
                        }), i.mn = t.mn, i
                    }
                }(),
                x = function() {
                    return function(t, e, s) {
                        var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        r.setGroupProperty(s);
                        var i = {
                            get shape() {
                                return r.k && r.getValue(), r.v
                            },
                            get path() {
                                return r.k && r.getValue(), r.v
                            },
                            _name: t.nm,
                            mn: t.mn
                        };
                        return i
                    }
                }();
            return f
        }(),
        LayerExpressionInterface = function() {
            function t(t) {
                var e = new Matrix;
                if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
                    var s, r = this._elem.hierarchy.length;
                    for (s = 0; r > s; s += 1) this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(e);
                    return e.applyToPointArray(t[0], t[1], t[2] || 0)
                }
                return e.applyToPointArray(t[0], t[1], t[2] || 0)
            }
            return function(e) {
                function s(t) {
                    i.mask = t.getMask.bind(t)
                }

                function r(t) {
                    i.effect = t
                }

                function i(t) {
                    switch (t) {
                        case "ADBE Root Vectors Group":
                        case 2:
                            return i.shapeInterface;
                        case 1:
                        case "Transform":
                        case "transform":
                        case "ADBE Transform Group":
                            return a;
                        case 4:
                        case "ADBE Effect Parade":
                            return i.effect
                    }
                }
                var a = TransformExpressionInterface(e.transform);
                return i.toWorld = t, i.toComp = t, i._elem = e, Object.defineProperty(i, "hasParent", {
                    get: function() {
                        return !!e.hierarchy
                    }
                }), Object.defineProperty(i, "parent", {
                    get: function() {
                        return e.hierarchy[0].layerInterface
                    }
                }), Object.defineProperty(i, "rotation", {
                    get: function() {
                        return a.rotation
                    }
                }), Object.defineProperty(i, "scale", {
                    get: function() {
                        return a.scale
                    }
                }), Object.defineProperty(i, "position", {
                    get: function() {
                        return a.position
                    }
                }), Object.defineProperty(i, "anchorPoint", {
                    get: function() {
                        return a.anchorPoint
                    }
                }), Object.defineProperty(i, "transform", {
                    get: function() {
                        return a
                    }
                }), Object.defineProperty(i, "_name", {
                    value: e.data.nm
                }), Object.defineProperty(i, "content", {
                    get: function() {
                        return i.shapeInterface
                    }
                }), i.active = !0, i.registerMaskInterface = s, i.registerEffectsInterface = r, i
            }
        }(),
        CompExpressionInterface = function() {
            return function(t) {
                function e(e) {
                    for (var s = 0, r = t.layers.length; r > s;) {
                        if (t.layers[s].nm === e || t.layers[s].ind === e - 1) return t.elements[s].layerInterface;
                        s += 1
                    }
                }
                return e.layer = e, e.pixelAspect = 1, e.height = t.globalData.compSize.h, e.width = t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e
            }
        }(),
        TransformExpressionInterface = function() {
            return function(t) {
                function e(s) {
                    switch (s) {
                        case "scale":
                        case "Scale":
                        case "ADBE Scale":
                            return e.scale;
                        case "rotation":
                        case "Rotation":
                        case "ADBE Rotation":
                            return e.rotation;
                        case "position":
                        case "Position":
                        case "ADBE Position":
                            return t.position;
                        case "anchorPoint":
                        case "AnchorPoint":
                        case "ADBE AnchorPoint":
                            return e.anchorPoint;
                        case "opacity":
                        case "Opacity":
                            return e.opacity
                    }
                }
                return Object.defineProperty(e, "rotation", {
                    get: function() {
                        return t.rotation
                    }
                }), Object.defineProperty(e, "scale", {
                    get: function() {
                        var e, s = t.scale,
                            r = s.length,
                            i = Array.apply(null, {
                                length: r
                            });
                        for (e = 0; r > e; e += 1) i[e] = 100 * s[e];
                        return i
                    }
                }), Object.defineProperty(e, "position", {
                    get: function() {
                        return t.position
                    }
                }), Object.defineProperty(e, "xPosition", {
                    get: function() {
                        return t.xPosition
                    }
                }), Object.defineProperty(e, "yPosition", {
                    get: function() {
                        return t.yPosition
                    }
                }), Object.defineProperty(e, "anchorPoint", {
                    get: function() {
                        return t.anchorPoint
                    }
                }), Object.defineProperty(e, "opacity", {
                    get: function() {
                        return 100 * t.opacity
                    }
                }), Object.defineProperty(e, "skew", {
                    get: function() {
                        return t.skew
                    }
                }), Object.defineProperty(e, "skewAxis", {
                    get: function() {
                        return t.skewAxis
                    }
                }), e
            }
        }(),
        ProjectInterface = function() {
            function t(t) {
                this.compositions.push(t)
            }
            return function() {
                function e(t) {
                    for (var e = 0, s = this.compositions.length; s > e;) {
                        if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                        e += 1
                    }
                    return this.compositions[0].compInterface
                }
                return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
            }
        }(),
        EffectsExpressionInterface = function() {
            function t(t, s) {
                if (t.effects) {
                    var r, i = [],
                        a = t.data.ef,
                        n = t.effects.effectElements.length;
                    for (r = 0; n > r; r += 1) i.push(e(a[r], t.effects.effectElements[r], s, t));
                    return function(e) {
                        for (var s = t.data.ef, r = 0, a = s.length; a > r;) {
                            if (e === s[r].nm || e === s[r].mn || e === s[r].ix) return i[r];
                            r += 1
                        }
                    }
                }
            }

            function e(t, r, i, a) {
                var n, o = [],
                    h = t.ef.length;
                for (n = 0; h > n; n += 1) o.push(5 === t.ef[n].ty ? e(t.ef[n], r.effectElements[n], i, a) : s(r.effectElements[n], t.ef[n].ty, a));
                return function(e) {
                    for (var s = t.ef, r = 0, i = s.length; i > r;) {
                        if (e === s[r].nm || e === s[r].mn || e === s[r].ix) return 5 === s[r].ty ? o[r] : o[r]();
                        r += 1
                    }
                    return o[0]()
                }
            }

            function s(t, e, s) {
                return function() {
                    if (10 === e) return s.comp.compInterface(t.p.v);
                    if (t.p.k && t.p.getValue(), "number" == typeof t.p.v) return t.p.v;
                    var r, i = t.p.v.length,
                        a = Array.apply(null, {
                            length: i
                        });
                    for (r = 0; i > r; r += 1) a[r] = t.p.v[r];
                    return a
                }
            }
            var r = {
                createEffectsInterface: t
            };
            return r
        }();
    GroupEffect.prototype.getValue = function() {
        this.mdf = !1;
        var t, e = this.dynamicProperties.length;
        for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(),
            this.mdf = this.dynamicProperties[t].mdf ? !0 : this.mdf
    }, GroupEffect.prototype.init = function(t, e, s) {
        this.data = t, this.mdf = !1, this.effectElements = [];
        var r, i, a = this.data.ef.length,
            n = this.data.ef;
        for (r = 0; a > r; r += 1) switch (n[r].ty) {
            case 0:
                i = new SliderEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 1:
                i = new AngleEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 2:
                i = new ColorEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 3:
                i = new PointEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 4:
            case 7:
                i = new CheckboxEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 10:
                i = new LayerIndexEffect(n[r], e, s), this.effectElements.push(i);
                break;
            case 5:
                i = new EffectsManager(n[r], e, s), this.effectElements.push(i);
                break;
            case 6:
                i = new NoValueEffect(n[r], e, s), this.effectElements.push(i)
        }
    };
    var bodymovinjs = {};
    bodymovinjs.play = play, bodymovinjs.pause = pause, bodymovinjs.togglePause = togglePause, bodymovinjs.setSpeed = setSpeed, bodymovinjs.setDirection = setDirection, bodymovinjs.stop = stop, bodymovinjs.moveFrame = moveFrame, bodymovinjs.searchAnimations = searchAnimations, bodymovinjs.registerAnimation = registerAnimation, bodymovinjs.loadAnimation = loadAnimation, bodymovinjs.setSubframeRendering = setSubframeRendering, bodymovinjs.resize = resize, bodymovinjs.start = start, bodymovinjs.goToAndStop = goToAndStop, bodymovinjs.destroy = destroy, bodymovinjs.setQuality = setQuality, bodymovinjs.installPlugin = installPlugin, bodymovinjs.__getFactory = getFactory, bodymovinjs.version = "4.5.3";
    var standalone = "__[STANDALONE]__",
        animationData = "__[ANIMATIONDATA]__",
        renderer = "";
    if (standalone) {
        var scripts = document.getElementsByTagName("script"),
            index = scripts.length - 1,
            myScript = scripts[index],
            queryString = myScript.src.replace(/^[^\?]+\??/, "");
        renderer = getQueryVariable("renderer")
    }
    var readyStateCheckInterval = setInterval(checkReady, 100);
    return bodymovinjs
});
//------------------------------------------------------------- END Player
'use strict';
//------------------------------------------------------------- Start Transition Circle 1
var transitionCircle1 = {
  "v":"4.5.9","fr":30,"ip":0,"op":24,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 110","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.16,"y":0},"n":"0p25_1_0p16_0","t":25,"s":[772,482,0],"e":[2132,482,0],"to":[226.667,0,0],"ti":[-226.667,0,0]},{"t":39}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[-100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1022.079,1250],[-1018.181,-1152]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-7,"s":[321],"e":[2414]},{"t":22}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-7,"s":[100],"e":[0]},{"t":30}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":38,"st":-11,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 111","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"n":"0p25_1_0p75_0","t":21,"s":[960,540,0],"e":[-1240,540,0],"to":[-366.667,0,0],"ti":[366.667,0,0]},{"t":41}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[2568,1664]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-100,68],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":21,"op":38,"st":-16,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 107","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[1180,760,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1690.821,-16],[1740.632,-134]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.843,0.051,0.169,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-10,"s":[321],"e":[2279]},{"t":19}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[36,8],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-6,"s":[0],"e":[100]},{"t":21}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":24,"st":-14,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 1

//------------------------------------------------------------- Start Transition Circle 2
var transitionCircle2 = {
  "v":"4.5.9","fr":30,"ip":0,"op":13,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,0,100],"e":[638,638,100]},{"t":18}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":300,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 2

//------------------------------------------------------------- Start Transition Circle 3
var transitionCircle3 = {
  "v":"4.5.9","fr":30,"ip":6,"op":45,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":0,"ty":3,"nm":"NULL CONTROL","ks":{"o":{"a":0,"k":0},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[60,60,0]},"s":{"a":0,"k":[2293,2293,100]}},"ao":0,"ip":0,"op":26.026,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"circle 3","parent":0,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[60,60,0]},"a":{"a":0,"k":[-104.545,-63,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p667_1_0p167_0p167","0p667_1_0p167_0p167","0p667_0p667_0p167_0p167"],"t":30.013,"s":[0,0,100],"e":[4,4,100]},{"t":37.02}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[102,102]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.957,0.255,0.255,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":27.01,"s":[119],"e":[0]},{"t":43.026}]},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-104.545,-63],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":27.01,"op":43.026,"st":13.997,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"circle 2","parent":0,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[60,60,0]},"a":{"a":0,"k":[-104.545,-63,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p667_1_0p167_0p167","0p667_1_0p167_0p167","0p667_0p667_0p167_0p167"],"t":23.006,"s":[0,0,100],"e":[15,15,100]},{"t":30.013}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[102,102]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.957,0.255,0.255,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":20.003,"s":[119],"e":[0]},{"t":36.019}]},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-104.545,-63],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":20.003,"op":43.026,"st":13.997,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"circle","parent":0,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[60,60,0]},"a":{"a":0,"k":[-104.545,-63,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p667_1_0p167_0p167","0p667_1_0p167_0p167","0p667_0p667_0p167_0p167"],"t":17,"s":[0,0,100],"e":[41,41,100]},{"t":24.007}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[102,102]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.957,0.255,0.255,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":13.997,"s":[119],"e":[0]},{"t":30.013}]},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-104.545,-63],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":17,"op":43.026,"st":13.997,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"rim","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":-3.003,"s":[-243],"e":[0]},{"t":21.021}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":-7.007,"s":[107,107,100],"e":[152.1,152.1,100]},{"t":5.005}],"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\namp = 0.1;\nfreq = 1.5;\ndecay = 7;\n$bm_rt = n = 0;\nif (numKeys > 0) {\n    $bm_rt = n = nearestKey(time).index;\n    if (key(n).time > time) {\n        n--;\n    }\n}\nif (n == 0) {\n    $bm_rt = t = 0;\n} else {\n    $bm_rt = t = sub(time, key(n).time);\n}\nif (n > 0) {\n    v = velocityAtTime(sub(key(n).time, div(thisComp.frameDuration, 10)));\n    $bm_rt = sum(value, div(mul(mul(v, amp), Math.sin(mul(mul(mul(freq, t), 2), Math.PI))), Math.exp(mul(decay, t))));\n} else {\n    $bm_rt = value;\n}"}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[352,352]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.957,0.255,0.255,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":-7.007,"s":[347],"e":[50.6]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":5.005,"s":[50.6],"e":[0]},{"t":20.02}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[1.818,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0_1_0p167_0p167"],"t":6.006,"s":[0],"e":[100]},{"t":25.025}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":23.023,"st":-7.007,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0,0,0.667],"y":[1,1,0.667]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0.333]},"n":["0_1_0p566_0","0_1_0p566_0","0p667_0p667_0p333_0p333"],"t":15,"s":[0.029,0.029,100],"e":[3278.029,3278.029,100]},{"t":66}]}},"ao":0,"ef":[{"ty":5,"nm":"Drop Shadow","mn":"ADBE Drop Shadow","ix":1,"en":0,"ef":[{"ty":2,"nm":"Shadow Color","mn":"ADBE Drop Shadow-0001","ix":1,"v":{"a":0,"k":[0.641,0.897,1,1]}},{"ty":0,"nm":"Opacity","mn":"ADBE Drop Shadow-0002","ix":2,"v":{"a":0,"k":255}},{"ty":0,"nm":"Direction","mn":"ADBE Drop Shadow-0003","ix":3,"v":{"a":0,"k":135}},{"ty":0,"nm":"Distance","mn":"ADBE Drop Shadow-0004","ix":4,"v":{"a":0,"k":40}},{"ty":0,"nm":"Softness","mn":"ADBE Drop Shadow-0005","ix":5,"v":{"a":0,"k":0}},{"ty":7,"nm":"Shadow Only","mn":"ADBE Drop Shadow-0006","ix":6,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":15,"op":315,"st":15,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 3

//------------------------------------------------------------- Start Transition Circle 4
var transitionCircle4 = {
  "v":"4.5.9","fr":30,"ip":5,"op":49,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.102,"y":1},"o":{"x":0.75,"y":0},"n":"0p102_1_0p75_0","t":0,"s":[960,540,0],"e":[960,376,0],"to":[0,-27.333,0],"ti":[0,0,0]},{"i":{"x":0.25,"y":1},"o":{"x":1,"y":0},"n":"0p25_1_1_0","t":19,"s":[960,376,0],"e":[960,540,0],"to":[0,0,0],"ti":[0,-27.333,0]},{"t":38}]},"a":{"a":0,"k":[-16,-23,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p667_1_0p333_0","0p667_1_0p333_0","0p667_0p667_0p333_0p333"],"t":6,"s":[0,0,100],"e":[50,50,100]},{"t":9}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[58,58]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-16,-23],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":30,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":3,"nm":"NULL CONTROL","ks":{"o":{"a":0,"k":0},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[60,60,0]},"s":{"a":0,"k":[2293,2293,100]}},"ao":0,"ip":15,"op":41.026,"st":15,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"circle","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[60,60,0]},"a":{"a":0,"k":[-104.545,-63,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p667_1_0p167_0p167","0p667_1_0p167_0p167","0p667_0p667_0p167_0p167"],"t":32,"s":[0,0,100],"e":[41,41,100]},{"t":39.007}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[102,102]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.957,0.255,0.255,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":28.997,"s":[119],"e":[0]},{"t":45.013}]},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-104.545,-63],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":32,"op":58.026,"st":28.997,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 5","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0,0,0.667],"y":[1,1,0.667]},"o":{"x":[0.566,0.566,0.333],"y":[0,0,0.333]},"n":["0_1_0p566_0","0_1_0p566_0","0p667_0p667_0p333_0p333"],"t":40,"s":[0.029,0.029,100],"e":[3278.029,3278.029,100]},{"t":91}]}},"ao":0,"ef":[{"ty":5,"nm":"Drop Shadow","mn":"ADBE Drop Shadow","ix":1,"en":0,"ef":[{"ty":2,"nm":"Shadow Color","mn":"ADBE Drop Shadow-0001","ix":1,"v":{"a":0,"k":[0.641,0.897,1,1]}},{"ty":0,"nm":"Opacity","mn":"ADBE Drop Shadow-0002","ix":2,"v":{"a":0,"k":255}},{"ty":0,"nm":"Direction","mn":"ADBE Drop Shadow-0003","ix":3,"v":{"a":0,"k":135}},{"ty":0,"nm":"Distance","mn":"ADBE Drop Shadow-0004","ix":4,"v":{"a":0,"k":40}},{"ty":0,"nm":"Softness","mn":"ADBE Drop Shadow-0005","ix":5,"v":{"a":0,"k":0}},{"ty":7,"nm":"Shadow Only","mn":"ADBE Drop Shadow-0006","ix":6,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":40,"op":340,"st":40,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.777,0.777,0.667],"y":[0.373,0.373,0.667]},"o":{"x":[0.463,0.463,0.333],"y":[0,0,0.333]},"n":["0p777_0p373_0p463_0","0p777_0p373_0p463_0","0p667_0p667_0p333_0p333"],"t":30,"s":[0.029,0.029,100],"e":[225.527,225.527,100]},{"i":{"x":[0.777,0.777,0.667],"y":[0.777,0.777,0.667]},"o":{"x":[0.285,0.285,0.333],"y":[0.285,0.285,0.333]},"n":["0p777_0p777_0p285_0p285","0p777_0p777_0p285_0p285","0p667_0p667_0p333_0p333"],"t":40,"s":[225.527,225.527,100],"e":[225.527,225.527,100]},{"i":{"x":[0.777,0.777,0.667],"y":[0.777,0.777,0.667]},"o":{"x":[0.285,0.285,0.333],"y":[0.285,0.285,0.333]},"n":["0p777_0p777_0p285_0p285","0p777_0p777_0p285_0p285","0p667_0p667_0p333_0p333"],"t":41,"s":[225.527,225.527,100],"e":[225.527,225.527,100]},{"i":{"x":[0.777,0.777,0.667],"y":[0.777,0.777,0.667]},"o":{"x":[0.285,0.285,0.333],"y":[0.285,0.285,0.333]},"n":["0p777_0p777_0p285_0p285","0p777_0p777_0p285_0p285","0p667_0p667_0p333_0p333"],"t":42,"s":[225.527,225.527,100],"e":[225.527,225.527,100]},{"i":{"x":[-0.045,-0.045,0.667],"y":[1,1,0.667]},"o":{"x":[0.285,0.285,0.333],"y":[0,0,0.333]},"n":["-0p045_1_0p285_0","-0p045_1_0p285_0","0p667_0p667_0p333_0p333"],"t":43,"s":[225.527,225.527,100],"e":[3278.029,3278.029,100]},{"t":81}]}},"ao":0,"ef":[{"ty":5,"nm":"Drop Shadow","mn":"ADBE Drop Shadow","ix":1,"en":0,"ef":[{"ty":2,"nm":"Shadow Color","mn":"ADBE Drop Shadow-0001","ix":1,"v":{"a":0,"k":[0.641,0.897,1,1]}},{"ty":0,"nm":"Opacity","mn":"ADBE Drop Shadow-0002","ix":2,"v":{"a":0,"k":255}},{"ty":0,"nm":"Direction","mn":"ADBE Drop Shadow-0003","ix":3,"v":{"a":0,"k":135}},{"ty":0,"nm":"Distance","mn":"ADBE Drop Shadow-0004","ix":4,"v":{"a":0,"k":40}},{"ty":0,"nm":"Softness","mn":"ADBE Drop Shadow-0005","ix":5,"v":{"a":0,"k":0}},{"ty":7,"nm":"Shadow Only","mn":"ADBE Drop Shadow-0006","ix":6,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":30,"op":330,"st":30,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 4

//------------------------------------------------------------- Start Transition Circle 5
var transitionCircle5 = {
  "v":"4.5.9","fr":30,"ip":0,"op":39,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.168],"y":[0.653]},"n":["0p667_1_0p168_0p653"],"t":10.25,"s":[0],"e":[-236.927]},{"t":79.765}]},"p":{"a":0,"k":[1000,508,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.676,0.676,0.667],"y":[0.384,0.384,0.667]},"o":{"x":[0.431,0.431,0.333],"y":[0,0,0.333]},"n":["0p676_0p384_0p431_0","0p676_0p384_0p431_0","0p667_0p667_0p333_0p333"],"t":10.25,"s":[100,100,100],"e":[582,582,100]},{"t":38.057}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.678,0.831,1,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.438],"y":[1]},"o":{"x":[0.32],"y":[1.913]},"n":["0p438_1_0p32_1p913"],"t":10.25,"s":[0],"e":[139]},{"t":106.5}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":10.25,"s":[0],"e":[100]},{"t":39.125}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":10.25,"op":419,"st":-1,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.168],"y":[0.653]},"n":["0p667_1_0p168_0p653"],"t":0.25,"s":[0],"e":[-236.927]},{"t":81.5}]},"p":{"a":0,"k":[1000,508,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.676,0.676,0.667],"y":[0.384,0.384,0.667]},"o":{"x":[0.431,0.431,0.333],"y":[0,0,0.333]},"n":["0p676_0p384_0p431_0","0p676_0p384_0p431_0","0p667_0p667_0p333_0p333"],"t":0.25,"s":[100,100,100],"e":[582,582,100]},{"t":32.75}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.463,0.698,0.949,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.428],"y":[0.593]},"o":{"x":[0.32],"y":[0.515]},"n":["0p428_0p593_0p32_0p515"],"t":0.25,"s":[0],"e":[57.345]},{"i":{"x":[0.438],"y":[1]},"o":{"x":[0.103],"y":[0.412]},"n":["0p438_1_0p103_0p412"],"t":12.75,"s":[57.345],"e":[139]},{"t":112.75}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":0.25,"s":[0],"e":[100]},{"t":34}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":0.25,"op":419,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 5

//------------------------------------------------------------- Start Transition Circle 6
var transitionCircle6 = {
  "v":"4.5.9","fr":25,"ip":0,"op":16,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":1,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-0.5,-110.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[27.5,-142.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"n":"0p667_1_0p167_0p167","t":1.834,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[27.5,-142.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[23.5,-218.5],[-164.5,-126.5],[-181.515,-22.04],[-233.5,42.5],[-62.495,86.835],[-64.306,166.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}]},{"t":14.334}]},"o":{"a":0,"k":100},"x":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":1,"s":[0],"e":[218.333]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":1.834,"s":[218.333],"e":[1000]},{"t":14.334}]},"nm":"Mask 1"}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1160,-704],[-1280,-648],[-1280,744],[1160,744]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":22,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":0.166,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-0.5,-110.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[27.5,-142.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"n":"0p667_1_0p167_0p167","t":1,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[27.5,-142.5],[-36.5,-66.5],[-53.515,-26.04],[-73.5,26.5],[-62.495,86.835],[-48.306,122.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[23.5,-218.5],[-164.5,-126.5],[-181.515,-22.04],[-233.5,42.5],[-62.495,86.835],[-64.306,166.618],[-20.518,118.524],[-5.5,145.5],[35.987,132.045],[71.52,159.944],[108.863,121.312],[99.886,77.905],[122.5,52.5],[102.639,20.112],[121.5,-12.5],[60.989,-26.042],[33.818,-97.46]],"c":true}]},{"t":8.5}]},"o":{"a":0,"k":100},"x":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":0.166,"s":[0],"e":[218.333]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":1,"s":[218.333],"e":[1000]},{"t":8.5}]},"nm":"Mask 1"}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1160,-704],[-1280,-648],[-1280,744],[1160,744]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.988,0.698,0,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":22,"st":1,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 6

//------------------------------------------------------------- Start Transition Circle 7
var transitionCircle7 = {
  "v":"4.5.9","fr":30,"ip":0,"op":17,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 110","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[772,482,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-7,"s":[321],"e":[2414]},{"t":22}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-3,"s":[0],"e":[100]},{"t":28}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":-11,"op":464,"st":-11,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 107","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[1180,760,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1690.821,-16],[1740.632,-134]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.843,0.051,0.169,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-10,"s":[321],"e":[2279]},{"t":19}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[36,8],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-6,"s":[0],"e":[100]},{"t":21}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":-14,"op":461,"st":-14,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 7

//------------------------------------------------------------- Start Transition Circle 8
var transitionCircle8 = {
  "v":"4.5.9","fr":30,"ip":0,"op":14,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,0.25,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0.75,0.167]},"n":["0p25_1_0p75_0","0p25_0p25_0p75_0p75","0p833_0p833_0p167_0p167"],"t":1,"s":[0,429.985,100],"e":[119.983,429.985,100]},{"t":8}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":7,"op":8,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,0.25,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0.75,0.167]},"n":["0p25_1_0p75_0","0p25_0p25_0p75_0p75","0p833_0p833_0p167_0p167"],"t":0,"s":[0,429.985,100],"e":[119.983,429.985,100]},{"t":7}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":-1,"op":300,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.744,0.622,0.657],"y":[0.146,0.707,0.657]},"o":{"x":[0.44,0.287,0.19],"y":[0,0,0.19]},"n":["0p744_0p146_0p44_0","0p622_0p707_0p287_0","0p657_0p657_0p19_0p19"],"t":1,"s":[0,0,100],"e":[119.983,429.985,100]},{"i":{"x":[0.113,0.531,0.839],"y":[1,1,0.839]},"o":{"x":[0.294,0.22,0.394],"y":[0.357,0.553,0.394]},"n":["0p113_1_0p294_0p357","0p531_1_0p22_0p553","0p839_0p839_0p394_0p394"],"t":8,"s":[119.983,429.985,100],"e":[638,638,100]},{"t":19}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":8,"op":301,"st":1,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 8

//------------------------------------------------------------- Start Transition Circle 9
var transitionCircle9 = {
  "v":"4.5.9","fr":30,"ip":0,"op":23,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":9,"s":[0,0,100],"e":[638,638,100]},{"t":27}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.929,0.898,0.957,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":9,"op":309,"st":9,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,0,100],"e":[638,638,100]},{"t":18}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.361,0.157,0.286,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":300,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 9

//------------------------------------------------------------- Start Transition Circle 10
var transitionCircle10 = {
  "v":"4.5.9","fr":30,"ip":5,"op":27,"w":1920,"h":1080,"ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Shape Layer 54","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.307,"s":[0],"e":[100]},{"t":17.314}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.305,"s":[0],"e":[100]},{"t":15.312}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-5.709,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 53","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":11.892,"s":[0],"e":[100]},{"t":18.899}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":9.89,"s":[0],"e":[100]},{"t":16.897}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-4.124,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 52","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.245,"s":[0],"e":[100]},{"t":12.252}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.243,"s":[0],"e":[100]},{"t":10.25}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-10.771,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 51","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.451,"s":[0],"e":[100]},{"t":13.458}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":4.449,"s":[0],"e":[100]},{"t":11.456}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-9.565,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 50","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.745,"s":[0],"e":[100]},{"t":14.752}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.743,"s":[0],"e":[100]},{"t":12.75}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-8.271,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 49","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.326,"s":[0],"e":[100]},{"t":16.333}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.324,"s":[0],"e":[100]},{"t":14.331}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-6.69,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Shape Layer 48","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":12.679,"s":[0],"e":[100]},{"t":19.686}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":10.677,"s":[0],"e":[100]},{"t":17.684}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-3.337,"bm":0,"sr":1},{"ddd":0,"ind":7,"ty":4,"nm":"Shape Layer 47","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.026,"s":[0],"e":[100]},{"t":15.033}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.024,"s":[0],"e":[100]},{"t":13.031}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-7.99,"bm":0,"sr":1},{"ddd":0,"ind":8,"ty":4,"nm":"Shape Layer 46","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":11.864,"s":[0],"e":[100]},{"t":18.871}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":9.862,"s":[0],"e":[100]},{"t":16.869}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-4.152,"bm":0,"sr":1},{"ddd":0,"ind":9,"ty":4,"nm":"Shape Layer 45","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.351,"s":[0],"e":[100]},{"t":15.358}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.349,"s":[0],"e":[100]},{"t":13.356}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-7.665,"bm":0,"sr":1},{"ddd":0,"ind":10,"ty":4,"nm":"Shape Layer 44","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.991,"s":[0],"e":[100]},{"t":15.998}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.989,"s":[0],"e":[100]},{"t":13.996}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-7.025,"bm":0,"sr":1},{"ddd":0,"ind":11,"ty":4,"nm":"Shape Layer 43","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.962,"s":[0],"e":[100]},{"t":13.969}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":4.96,"s":[0],"e":[100]},{"t":11.967}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-9.054,"bm":0,"sr":1},{"ddd":0,"ind":12,"ty":4,"nm":"Shape Layer 42","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.757,"s":[0],"e":[100]},{"t":17.764}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.755,"s":[0],"e":[100]},{"t":15.762}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-5.259,"bm":0,"sr":1},{"ddd":0,"ind":13,"ty":4,"nm":"Shape Layer 41","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.078,"s":[0],"e":[100]},{"t":17.085}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.076,"s":[0],"e":[100]},{"t":15.083}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-5.938,"bm":0,"sr":1},{"ddd":0,"ind":14,"ty":4,"nm":"Shape Layer 40","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.791,"s":[0],"e":[100]},{"t":13.798}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":4.789,"s":[0],"e":[100]},{"t":11.796}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-9.225,"bm":0,"sr":1},{"ddd":0,"ind":15,"ty":4,"nm":"Shape Layer 39","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":13.268,"s":[0],"e":[100]},{"t":20.275}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":11.266,"s":[0],"e":[100]},{"t":18.273}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-2.748,"bm":0,"sr":1},{"ddd":0,"ind":16,"ty":4,"nm":"Shape Layer 38","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.952,"s":[0],"e":[100]},{"t":12.959}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.95,"s":[0],"e":[100]},{"t":10.957}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-10.064,"bm":0,"sr":1},{"ddd":0,"ind":17,"ty":4,"nm":"Shape Layer 37","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-83.25,34.5],[-99.5,42.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.3},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":14.204,"s":[0],"e":[100]},{"t":21.211}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":12.202,"s":[0],"e":[100]},{"t":19.209}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.812,"bm":0,"sr":1},{"ddd":0,"ind":18,"ty":4,"nm":"Shape Layer 36","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":12.28,"s":[0],"e":[100]},{"t":19.287}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":10.278,"s":[0],"e":[100]},{"t":17.285}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.273,"op":25.025,"st":5.273,"bm":0,"sr":1},{"ddd":0,"ind":19,"ty":4,"nm":"Shape Layer 35","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.82,"s":[0],"e":[100]},{"t":14.827}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.818,"s":[0],"e":[100]},{"t":12.825}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0.813,"op":25.025,"st":0.813,"bm":0,"sr":1},{"ddd":0,"ind":20,"ty":4,"nm":"Shape Layer 34","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.064,"s":[0],"e":[100]},{"t":13.071}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":4.062,"s":[0],"e":[100]},{"t":11.069}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.943,"bm":0,"sr":1},{"ddd":0,"ind":21,"ty":4,"nm":"Shape Layer 33","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.748,"s":[0],"e":[100]},{"t":12.755}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.746,"s":[0],"e":[100]},{"t":10.753}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.259,"bm":0,"sr":1},{"ddd":0,"ind":22,"ty":4,"nm":"Shape Layer 32","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":11.523,"s":[0],"e":[100]},{"t":18.53}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":9.521,"s":[0],"e":[100]},{"t":16.528}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.516,"op":25.025,"st":4.516,"bm":0,"sr":1},{"ddd":0,"ind":23,"ty":4,"nm":"Shape Layer 31","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":12.06,"s":[0],"e":[100]},{"t":19.067}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":10.058,"s":[0],"e":[100]},{"t":17.065}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.053,"op":25.025,"st":5.053,"bm":0,"sr":1},{"ddd":0,"ind":24,"ty":4,"nm":"Shape Layer 30","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":13.964,"s":[0],"e":[100]},{"t":20.971}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":11.962,"s":[0],"e":[100]},{"t":18.969}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":6.957,"op":25.025,"st":6.957,"bm":0,"sr":1},{"ddd":0,"ind":25,"ty":4,"nm":"Shape Layer 29","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4.438,"s":[0],"e":[100]},{"t":11.445}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":2.436,"s":[0],"e":[100]},{"t":9.443}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-2.569,"bm":0,"sr":1},{"ddd":0,"ind":26,"ty":4,"nm":"Shape Layer 28","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":11.851,"s":[0],"e":[100]},{"t":18.858}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":9.849,"s":[0],"e":[100]},{"t":16.856}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.844,"op":25.025,"st":4.844,"bm":0,"sr":1},{"ddd":0,"ind":27,"ty":4,"nm":"Shape Layer 27","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":12.659,"s":[0],"e":[100]},{"t":19.666}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":10.657,"s":[0],"e":[100]},{"t":17.664}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.652,"op":25.025,"st":5.652,"bm":0,"sr":1},{"ddd":0,"ind":28,"ty":4,"nm":"Shape Layer 26","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.674,"s":[0],"e":[100]},{"t":17.681}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.672,"s":[0],"e":[100]},{"t":15.679}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":3.667,"op":25.025,"st":3.667,"bm":0,"sr":1},{"ddd":0,"ind":29,"ty":4,"nm":"Shape Layer 25","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.693,"s":[0],"e":[100]},{"t":13.7}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":4.691,"s":[0],"e":[100]},{"t":11.698}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.314,"bm":0,"sr":1},{"ddd":0,"ind":30,"ty":4,"nm":"Shape Layer 24","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.937,"s":[0],"e":[100]},{"t":16.944}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.935,"s":[0],"e":[100]},{"t":14.942}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.93,"op":25.025,"st":2.93,"bm":0,"sr":1},{"ddd":0,"ind":31,"ty":4,"nm":"Shape Layer 23","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.934,"s":[0],"e":[100]},{"t":16.941}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.932,"s":[0],"e":[100]},{"t":14.939}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.927,"op":25.025,"st":2.927,"bm":0,"sr":1},{"ddd":0,"ind":32,"ty":4,"nm":"Shape Layer 22","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":6.001,"s":[0],"e":[100]},{"t":13.008}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.999,"s":[0],"e":[100]},{"t":11.006}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.006,"bm":0,"sr":1},{"ddd":0,"ind":33,"ty":4,"nm":"Shape Layer 21","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.144,"s":[0],"e":[100]},{"t":12.151}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.142,"s":[0],"e":[100]},{"t":10.149}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.863,"bm":0,"sr":1},{"ddd":0,"ind":34,"ty":4,"nm":"Shape Layer 20","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.245,"s":[0],"e":[100]},{"t":12.252}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.243,"s":[0],"e":[100]},{"t":10.25}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.762,"bm":0,"sr":1},{"ddd":0,"ind":35,"ty":4,"nm":"Shape Layer 19","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-40,24.5],[-73.5,47.75]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4.562,"s":[0],"e":[100]},{"t":11.569}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":2.56,"s":[0],"e":[100]},{"t":9.567}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-2.445,"bm":0,"sr":1},{"ddd":0,"ind":36,"ty":4,"nm":"Shape Layer 18","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.213,"s":[0],"e":[100]},{"t":17.22}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.211,"s":[0],"e":[100]},{"t":15.218}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.205,"op":25.025,"st":2.205,"bm":0,"sr":1},{"ddd":0,"ind":37,"ty":4,"nm":"Shape Layer 17","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":13.388,"s":[0],"e":[100]},{"t":20.395}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":11.386,"s":[0],"e":[100]},{"t":18.393}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.38,"op":25.025,"st":5.38,"bm":0,"sr":1},{"ddd":0,"ind":38,"ty":4,"nm":"Shape Layer 16","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":13.427,"s":[0],"e":[100]},{"t":20.434}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":11.425,"s":[0],"e":[100]},{"t":18.432}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.419,"op":25.025,"st":5.419,"bm":0,"sr":1},{"ddd":0,"ind":39,"ty":4,"nm":"Shape Layer 15","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.447,"s":[0],"e":[100]},{"t":15.454}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.445,"s":[0],"e":[100]},{"t":13.452}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0.439,"op":25.025,"st":0.439,"bm":0,"sr":1},{"ddd":0,"ind":40,"ty":4,"nm":"Shape Layer 14","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":16.15,"s":[0],"e":[100]},{"t":23.157}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":14.148,"s":[0],"e":[100]},{"t":21.155}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":8.142,"op":25.025,"st":8.142,"bm":0,"sr":1},{"ddd":0,"ind":41,"ty":4,"nm":"Shape Layer 13","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":16.542,"s":[0],"e":[100]},{"t":23.549}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":14.54,"s":[0],"e":[100]},{"t":21.547}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":8.534,"op":25.025,"st":8.534,"bm":0,"sr":1},{"ddd":0,"ind":42,"ty":4,"nm":"Shape Layer 12","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":15.887,"s":[0],"e":[100]},{"t":22.894}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":13.885,"s":[0],"e":[100]},{"t":20.892}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":7.879,"op":25.025,"st":7.879,"bm":0,"sr":1},{"ddd":0,"ind":43,"ty":4,"nm":"Shape Layer 11","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.728,"s":[0],"e":[100]},{"t":14.735}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.726,"s":[0],"e":[100]},{"t":12.733}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.28,"bm":0,"sr":1},{"ddd":0,"ind":44,"ty":4,"nm":"Shape Layer 10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":13.79,"s":[0],"e":[100]},{"t":20.797}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":11.788,"s":[0],"e":[100]},{"t":18.795}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.782,"op":25.025,"st":5.782,"bm":0,"sr":1},{"ddd":0,"ind":45,"ty":4,"nm":"Shape Layer 9","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":14.217,"s":[0],"e":[100]},{"t":21.224}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":12.215,"s":[0],"e":[100]},{"t":19.222}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":6.209,"op":25.025,"st":6.209,"bm":0,"sr":1},{"ddd":0,"ind":46,"ty":4,"nm":"Shape Layer 8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.641,"s":[0],"e":[100]},{"t":14.648}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.639,"s":[0],"e":[100]},{"t":12.646}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.367,"bm":0,"sr":1},{"ddd":0,"ind":47,"ty":4,"nm":"Shape Layer 7","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":14.837,"s":[0],"e":[100]},{"t":21.844}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":12.835,"s":[0],"e":[100]},{"t":19.842}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":6.829,"op":25.025,"st":6.829,"bm":0,"sr":1},{"ddd":0,"ind":48,"ty":4,"nm":"Shape Layer 6","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":15.832,"s":[0],"e":[100]},{"t":22.839}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":13.83,"s":[0],"e":[100]},{"t":20.837}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":7.824,"op":25.025,"st":7.824,"bm":0,"sr":1},{"ddd":0,"ind":49,"ty":4,"nm":"Shape Layer 5","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.957,"s":[0],"e":[100]},{"t":17.964}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.955,"s":[0],"e":[100]},{"t":15.962}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.949,"op":25.025,"st":2.949,"bm":0,"sr":1},{"ddd":0,"ind":50,"ty":4,"nm":"Shape Layer 4","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.901,"s":[0],"e":[100]},{"t":15.908}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.899,"s":[0],"e":[100]},{"t":13.906}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0.893,"op":25.025,"st":0.893,"bm":0,"sr":1},{"ddd":0,"ind":51,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":16.408,"s":[0],"e":[100]},{"t":23.415}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":14.406,"s":[0],"e":[100]},{"t":21.413}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":8.4,"op":25.025,"st":8.4,"bm":0,"sr":1},{"ddd":0,"ind":52,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.983,"s":[0],"e":[100]},{"t":15.99}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.981,"s":[0],"e":[100]},{"t":13.988}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0.975,"op":25.025,"st":0.975,"bm":0,"sr":1},{"ddd":0,"ind":53,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-104.5,81.75],[-109.5,85.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0.5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.297,"s":[0],"e":[100]},{"t":17.304}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.295,"s":[0],"e":[100]},{"t":15.302}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.289,"op":25.025,"st":2.289,"bm":0,"sr":1},{"ddd":0,"ind":54,"ty":4,"nm":"Line 18","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.542,"s":[0],"e":[100]},{"t":16.549}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.54,"s":[0],"e":[100]},{"t":14.547}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.537,"op":25.025,"st":4.537,"bm":0,"sr":1},{"ddd":0,"ind":55,"ty":4,"nm":"Line 17","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4.172,"s":[0],"e":[100]},{"t":11.179}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":2.17,"s":[0],"e":[100]},{"t":9.177}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.833,"bm":0,"sr":1},{"ddd":0,"ind":56,"ty":4,"nm":"Line 16","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5.641,"s":[0],"e":[100]},{"t":12.648}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":3.639,"s":[0],"e":[100]},{"t":10.646}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0.636,"op":25.025,"st":0.636,"bm":0,"sr":1},{"ddd":0,"ind":57,"ty":4,"nm":"Line 15","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":2.003,"s":[0],"e":[100]},{"t":9.01}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":0.001,"s":[0],"e":[100]},{"t":7.008}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-3.002,"bm":0,"sr":1},{"ddd":0,"ind":58,"ty":4,"nm":"Line 14","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":10.458,"s":[0],"e":[100]},{"t":17.465}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":8.456,"s":[0],"e":[100]},{"t":15.463}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":5.453,"op":25.025,"st":5.453,"bm":0,"sr":1},{"ddd":0,"ind":59,"ty":4,"nm":"Line 13","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":3.697,"s":[0],"e":[100]},{"t":10.704}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":1.695,"s":[0],"e":[100]},{"t":8.702}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.308,"bm":0,"sr":1},{"ddd":0,"ind":60,"ty":4,"nm":"Line 12","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.646,"s":[0],"e":[100]},{"t":14.653}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.644,"s":[0],"e":[100]},{"t":12.651}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.641,"op":25.025,"st":2.641,"bm":0,"sr":1},{"ddd":0,"ind":61,"ty":4,"nm":"Line 11","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.847,"s":[0],"e":[100]},{"t":16.854}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.845,"s":[0],"e":[100]},{"t":14.852}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.842,"op":25.025,"st":4.842,"bm":0,"sr":1},{"ddd":0,"ind":62,"ty":4,"nm":"Line 10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.073,"s":[0],"e":[100]},{"t":16.08}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.071,"s":[0],"e":[100]},{"t":14.078}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.068,"op":25.025,"st":4.068,"bm":0,"sr":1},{"ddd":0,"ind":63,"ty":4,"nm":"Line 9","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":3.044,"s":[0],"e":[100]},{"t":10.051}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":1.042,"s":[0],"e":[100]},{"t":8.049}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-1.961,"bm":0,"sr":1},{"ddd":0,"ind":64,"ty":4,"nm":"Line 8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":8.671,"s":[0],"e":[100]},{"t":15.678}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":6.669,"s":[0],"e":[100]},{"t":13.676}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":3.666,"op":25.025,"st":3.666,"bm":0,"sr":1},{"ddd":0,"ind":65,"ty":4,"nm":"Line 7","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4.735,"s":[0],"e":[100]},{"t":11.742}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":2.733,"s":[0],"e":[100]},{"t":9.74}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.27,"bm":0,"sr":1},{"ddd":0,"ind":66,"ty":4,"nm":"Line 6","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":2.819,"s":[0],"e":[100]},{"t":9.826}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":0.817,"s":[0],"e":[100]},{"t":7.824}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-2.186,"bm":0,"sr":1},{"ddd":0,"ind":67,"ty":4,"nm":"Line 5","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.187,"s":[0],"e":[100]},{"t":16.194}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.185,"s":[0],"e":[100]},{"t":14.192}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.182,"op":25.025,"st":4.182,"bm":0,"sr":1},{"ddd":0,"ind":68,"ty":4,"nm":"Line 4","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4.578,"s":[0],"e":[100]},{"t":11.585}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":2.576,"s":[0],"e":[100]},{"t":9.583}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-0.427,"bm":0,"sr":1},{"ddd":0,"ind":69,"ty":4,"nm":"Line 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":7.5,"s":[0],"e":[100]},{"t":14.507}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":5.498,"s":[0],"e":[100]},{"t":12.505}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":2.495,"op":25.025,"st":2.495,"bm":0,"sr":1},{"ddd":0,"ind":70,"ty":4,"nm":"Line 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":9.406,"s":[0],"e":[100]},{"t":16.413}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":7.404,"s":[0],"e":[100]},{"t":14.411}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":4.401,"op":25.025,"st":4.401,"bm":0,"sr":1},{"ddd":0,"ind":71,"ty":4,"nm":"Line 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0,"x":"var $bm_rt;\n$bm_rt = mul(index, 20);"},"p":{"a":0,"k":[180,160,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-36,27],[-98,76.5]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":1},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":2.664,"s":[0],"e":[100]},{"t":9.671}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"n":["0p667_1_0p167_0p167"],"t":0.662,"s":[0],"e":[100]},{"t":7.669}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":25.025,"st":-2.341,"bm":0,"sr":1}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Sunburst 04","refId":"comp_0","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[182,166,0]},"s":{"a":0,"k":[291,291,100]}},"ao":0,"w":364,"h":332,"ip":5,"op":30,"st":5,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Sunburst 04","refId":"comp_0","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[182,166,0]},"s":{"a":0,"k":[763,763,100]}},"ao":0,"w":364,"h":332,"ip":5,"op":30,"st":5,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 3","td":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":10,"s":[0,0,100],"e":[638,638,100]},{"t":28}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":10,"op":32,"st":10,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 1","tt":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,0,100],"e":[638,638,100]},{"t":18}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":32,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 10

//------------------------------------------------------------- Start Transition Circle 11
var transitionCircle11 = {
  "v":"4.5.9","fr":30,"ip":0,"op":13,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":90},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,0.25,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0.75,0.167]},"n":["0p25_1_0p75_0","0p25_0p25_0p75_0p75","0p833_0p833_0p167_0p167"],"t":1,"s":[0,429.985,100],"e":[119.983,429.985,100]},{"t":8}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":7,"op":8,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":90},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,429.985,100],"e":[166.983,627.985,100]},{"t":7}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":-1,"op":300,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":90},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.744,0.622,0.657],"y":[0.146,0.759,0.657]},"o":{"x":[0.44,0.287,0.19],"y":[0,0,0.19]},"n":["0p744_0p146_0p44_0","0p622_0p759_0p287_0","0p657_0p657_0p19_0p19"],"t":1,"s":[0,0,100],"e":[119.983,520.985,100]},{"i":{"x":[0.113,0.531,0.839],"y":[1,1,0.839]},"o":{"x":[0.294,0.22,0.394],"y":[0.357,0.983,0.394]},"n":["0p113_1_0p294_0p357","0p531_1_0p22_0p983","0p839_0p839_0p394_0p394"],"t":8,"s":[119.983,520.985,100],"e":[638,638,100]},{"t":19}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":8,"op":301,"st":1,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 11

//------------------------------------------------------------- Start Transition Circle 12
var transitionCircle12 = {
  "v":"4.5.9","fr":30,"ip":0,"op":19,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[2336,-52,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":2,"s":[0,0,100],"e":[1265,1265,100]},{"t":20}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.196,0.612,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":2,"op":302,"st":2,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-8,0,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":1,"s":[0,0,100],"e":[917,917,100]},{"t":19}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.196,1,0.877,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":301,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[-310,-294,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,0,100],"e":[638,638,100]},{"t":18}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[416,416]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-310,-294],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":300,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 12

//------------------------------------------------------------- Start Transition Circle 13
var transitionCircle13 = {
  "v":"4.5.9","fr":30,"ip":0,"op":41,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle 01","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":8.75,"s":[983.545,498.936,0],"e":[1013.28,559.569,0],"to":[-18.067,23.464,0],"ti":[-39.542,-5.302,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":12.31,"s":[1013.28,559.569,0],"e":[1075.183,479.106,0],"to":[37.968,5.091,0],"ti":[6.577,41.694,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":17.188,"s":[1075.183,479.106,0],"e":[978.531,409.521,0],"to":[-6.817,-43.213,0],"ti":[46.186,-4.558,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":22.668,"s":[978.531,409.521,0],"e":[890.082,503.99,0],"to":[-51.077,5.04,0],"ti":[8.478,-50.949,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":28.539,"s":[890.082,503.99,0],"e":[950.759,633.279,0],"to":[-7.667,46.079,0],"ti":[-54.176,-27.632,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":34.958,"s":[950.759,633.279,0],"e":[1163.82,501.543,0],"to":[84.161,42.925,0],"ti":[-5.892,126.04,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":47.476,"s":[1163.82,501.543,0],"e":[1020.346,325.071,0],"to":[4.414,-94.416,0],"ti":[92.19,20.16,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":57.957,"s":[1020.346,325.071,0],"e":[812.187,445.294,0],"to":[-63.004,-13.778,0],"ti":[48.834,-99.216,0]},{"t":68.75}]},"a":{"a":0,"k":[-351.467,20.431,0]},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":8.75,"s":[0,0,100],"e":[116,116,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":22.5,"s":[116,116,100],"e":[0,0,100]},{"t":40}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[28.911,28.911]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.447,0.302,0.749,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-318.519,10.674],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 4","np":3,"mn":"ADBE Vector Group"}],"ip":8.75,"op":420,"st":-26.25,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"circle 02","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":6.75,"s":[983.545,498.936,0],"e":[1013.28,559.569,0],"to":[-18.067,23.464,0],"ti":[-39.542,-5.302,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":10.31,"s":[1013.28,559.569,0],"e":[1075.183,479.106,0],"to":[37.968,5.091,0],"ti":[6.577,41.694,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":15.188,"s":[1075.183,479.106,0],"e":[978.531,409.521,0],"to":[-6.817,-43.213,0],"ti":[46.186,-4.558,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":20.668,"s":[978.531,409.521,0],"e":[890.082,503.99,0],"to":[-51.077,5.04,0],"ti":[8.478,-50.949,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":26.539,"s":[890.082,503.99,0],"e":[950.759,633.279,0],"to":[-7.667,46.079,0],"ti":[-54.176,-27.632,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":32.958,"s":[950.759,633.279,0],"e":[1163.82,501.543,0],"to":[84.161,42.925,0],"ti":[-5.892,126.04,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":45.476,"s":[1163.82,501.543,0],"e":[1020.346,325.071,0],"to":[4.414,-94.416,0],"ti":[92.19,20.16,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":55.957,"s":[1020.346,325.071,0],"e":[812.187,445.294,0],"to":[-63.004,-13.778,0],"ti":[48.834,-99.216,0]},{"t":66.75}]},"a":{"a":0,"k":[-351.467,20.431,0]},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":6.75,"s":[0,0,100],"e":[116,116,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":20.5,"s":[116,116,100],"e":[0,0,100]},{"t":38}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[20.238,20.238]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.447,0.302,0.749,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-351.188,20.793],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 2","np":3,"mn":"ADBE Vector Group"}],"ip":6.75,"op":418,"st":-28.25,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"circle 03","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":5.75,"s":[983.545,498.936,0],"e":[1013.28,559.569,0],"to":[-18.067,23.464,0],"ti":[-39.542,-5.302,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":9.31,"s":[1013.28,559.569,0],"e":[1075.183,479.106,0],"to":[37.968,5.091,0],"ti":[6.577,41.694,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":14.188,"s":[1075.183,479.106,0],"e":[978.531,409.521,0],"to":[-6.817,-43.213,0],"ti":[46.186,-4.558,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":19.668,"s":[978.531,409.521,0],"e":[890.082,503.99,0],"to":[-51.077,5.04,0],"ti":[8.478,-50.949,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":25.539,"s":[890.082,503.99,0],"e":[950.759,633.279,0],"to":[-7.667,46.079,0],"ti":[-54.176,-27.632,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":31.958,"s":[950.759,633.279,0],"e":[1163.82,501.543,0],"to":[84.161,42.925,0],"ti":[-5.892,126.04,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":44.476,"s":[1163.82,501.543,0],"e":[1020.346,325.071,0],"to":[4.414,-94.416,0],"ti":[92.19,20.16,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":54.957,"s":[1020.346,325.071,0],"e":[812.187,445.294,0],"to":[-63.004,-13.778,0],"ti":[48.834,-99.216,0]},{"t":65.75}]},"a":{"a":0,"k":[-351.467,20.431,0]},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":5.75,"s":[0,0,100],"e":[116,116,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":19.5,"s":[116,116,100],"e":[0,0,100]},{"t":37}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[19.659,19.659]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.447,0.302,0.749,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-346.851,59.822],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 3","np":3,"mn":"ADBE Vector Group"}],"ip":5.75,"op":417,"st":-29.25,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.168],"y":[0.653]},"n":["0p667_1_0p168_0p653"],"t":0.25,"s":[0],"e":[-236.927]},{"t":81.5}]},"p":{"a":0,"k":[1000,508,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.676,0.676,0.667],"y":[0.587,0.587,0.667]},"o":{"x":[0.431,0.431,0.333],"y":[0,0,0.333]},"n":["0p676_0p587_0p431_0","0p676_0p587_0p431_0","0p667_0p667_0p333_0p333"],"t":0.25,"s":[100,100,100],"e":[825,825,100]},{"t":33}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.82,0.788,0.941,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.428],"y":[0.879]},"o":{"x":[0.32],"y":[0.153]},"n":["0p428_0p879_0p32_0p153"],"t":0.25,"s":[0],"e":[196.345]},{"i":{"x":[0.438],"y":[1]},"o":{"x":[0.103],"y":[-0.585]},"n":["0p438_1_0p103_-0p585"],"t":13,"s":[196.345],"e":[139]},{"t":112.75}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":0.25,"s":[0],"e":[100]},{"t":34}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":0.25,"op":419,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 13

//------------------------------------------------------------- Start Transition Circle 14
var transitionCircle14 = {
  "v":"4.5.9","fr":30,"ip":0,"op":28,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":220.927},"p":{"a":0,"k":[580,648,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.724,0.778,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p724_0p381_0","0p705_0p778_0p381_0","0p667_0p667_0p333_0p333"],"t":2,"s":[-100,100,100],"e":[-776.685,294.195,100]},{"i":{"x":[0.678,0.678,0.667],"y":[0.8,0.7,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[0.29,0.195,0.333]},"n":["0p678_0p8_0p347_0p29","0p678_0p7_0p347_0p195","0p667_0p667_0p333_0p333"],"t":15,"s":[-776.685,294.195,100],"e":[-1474.606,535.022,100]},{"i":{"x":[0.671,0.671,0.667],"y":[1.46,0.681,0.667]},"o":{"x":[0.339,0.339,0.333],"y":[-0.771,0.262,0.333]},"n":["0p671_1p46_0p339_-0p771","0p671_0p681_0p339_0p262","0p667_0p667_0p333_0p333"],"t":27,"s":[-1474.606,535.022,100],"e":[-1220.664,922.257,100]},{"i":{"x":[0.648,0.648,0.667],"y":[-1.526,0.408,0.667]},"o":{"x":[0.328,0.328,0.333],"y":[-1.847,0.458,0.333]},"n":["0p648_-1p526_0p328_-1p847","0p648_0p408_0p328_0p458","0p667_0p667_0p333_0p333"],"t":43,"s":[-1220.664,922.257,100],"e":[-1146,1241,100]},{"t":62}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.643,0.537,0.859,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.843]},"o":{"x":[0.231],"y":[0.716]},"n":["0p507_0p843_0p231_0p716"],"t":2,"s":[111.435],"e":[244.345]},{"i":{"x":[0.518],"y":[-0.284]},"o":{"x":[0.185],"y":[0.579]},"n":["0p518_-0p284_0p185_0p579"],"t":15,"s":[244.345],"e":[307.867]},{"i":{"x":[0.549],"y":[1]},"o":{"x":[0.215],"y":[0.228]},"n":["0p549_1_0p215_0p228"],"t":76,"s":[307.867],"e":[410]},{"t":115}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.65],"y":[0.565]},"o":{"x":[0.292],"y":[0.407]},"n":["0p65_0p565_0p292_0p407"],"t":2,"s":[0],"e":[77.205]},{"t":36}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":2.25,"op":421,"st":-9,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":220.927},"p":{"a":0,"k":[580,648,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.724,0.778,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p724_0p381_0","0p705_0p778_0p381_0","0p667_0p667_0p333_0p333"],"t":0,"s":[-100,100,100],"e":[-776.685,294.195,100]},{"i":{"x":[0.678,0.678,0.667],"y":[0.8,0.7,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[0.29,0.195,0.333]},"n":["0p678_0p8_0p347_0p29","0p678_0p7_0p347_0p195","0p667_0p667_0p333_0p333"],"t":13,"s":[-776.685,294.195,100],"e":[-1474.606,535.022,100]},{"i":{"x":[0.671,0.671,0.667],"y":[1.46,0.681,0.667]},"o":{"x":[0.339,0.339,0.333],"y":[-0.771,0.262,0.333]},"n":["0p671_1p46_0p339_-0p771","0p671_0p681_0p339_0p262","0p667_0p667_0p333_0p333"],"t":25,"s":[-1474.606,535.022,100],"e":[-1220.664,922.257,100]},{"i":{"x":[0.648,0.648,0.667],"y":[-1.526,0.408,0.667]},"o":{"x":[0.328,0.328,0.333],"y":[-1.847,0.458,0.333]},"n":["0p648_-1p526_0p328_-1p847","0p648_0p408_0p328_0p458","0p667_0p667_0p333_0p333"],"t":41,"s":[-1220.664,922.257,100],"e":[-1146,1241,100]},{"t":60}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.82,0.788,0.941,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.843]},"o":{"x":[0.231],"y":[0.716]},"n":["0p507_0p843_0p231_0p716"],"t":0,"s":[111.435],"e":[244.345]},{"i":{"x":[0.518],"y":[-0.284]},"o":{"x":[0.185],"y":[0.579]},"n":["0p518_-0p284_0p185_0p579"],"t":13,"s":[244.345],"e":[307.867]},{"i":{"x":[0.549],"y":[1]},"o":{"x":[0.215],"y":[0.228]},"n":["0p549_1_0p215_0p228"],"t":74,"s":[307.867],"e":[410]},{"t":113}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.65],"y":[0.565]},"o":{"x":[0.292],"y":[0.407]},"n":["0p65_0p565_0p292_0p407"],"t":0,"s":[0],"e":[77.205]},{"t":34}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":0.25,"op":419,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 14

//------------------------------------------------------------- Start Transition Circle 15
var transitionCircle15 = {
  "v":"4.5.9","fr":30,"ip":0,"op":21,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 7","td":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":457.527},"p":{"a":0,"k":[452,-124,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.991,1.673,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p991_0p381_0","0p705_1p673_0p381_0","0p667_0p667_0p333_0p333"],"t":20.75,"s":[-100,100,100],"e":[-21397.685,34.555,100]},{"i":{"x":[0.25,0.975,0.667],"y":[1,1,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[-0.007,0.017,0.333]},"n":["0p25_1_0p347_-0p007","0p975_1_0p347_0p017","0p667_0p667_0p333_0p333"],"t":32.856,"s":[-21397.685,34.555,100],"e":[-1568.606,1891.022,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":40.167,"s":[-1568.606,1891.022,100],"e":[-1568.606,1891.022,100]},{"t":43}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.82,0.788,0.941,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.942]},"o":{"x":[0.231],"y":[0.265]},"n":["0p507_0p942_0p231_0p265"],"t":20.75,"s":[111.435],"e":[477.345]},{"i":{"x":[0.607],"y":[0.141]},"o":{"x":[0.274],"y":[-0.358]},"n":["0p607_0p141_0p274_-0p358"],"t":32.856,"s":[477.345],"e":[449.604]},{"t":43}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.644],"y":[0.661]},"o":{"x":[0.298],"y":[0.425]},"n":["0p644_0p661_0p298_0p425"],"t":20.75,"s":[0],"e":[53.883]},{"t":43}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":21,"op":37,"st":9.75,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 6","tt":2,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-663.527},"p":{"a":0,"k":[1732,152,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.991,1.673,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p991_0p381_0","0p705_1p673_0p381_0","0p667_0p667_0p333_0p333"],"t":2.75,"s":[-100,100,100],"e":[-21397.685,34.555,100]},{"i":{"x":[0.25,0.975,0.667],"y":[1,1,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[-0.007,0.017,0.333]},"n":["0p25_1_0p347_-0p007","0p975_1_0p347_0p017","0p667_0p667_0p333_0p333"],"t":14.856,"s":[-21397.685,34.555,100],"e":[-1568.606,1891.022,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":22.167,"s":[-1568.606,1891.022,100],"e":[-1568.606,1891.022,100]},{"t":25}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.643,0.537,0.859,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.942]},"o":{"x":[0.231],"y":[0.265]},"n":["0p507_0p942_0p231_0p265"],"t":2.75,"s":[111.435],"e":[477.345]},{"i":{"x":[0.607],"y":[0.141]},"o":{"x":[0.274],"y":[-0.358]},"n":["0p607_0p141_0p274_-0p358"],"t":14.856,"s":[477.345],"e":[449.604]},{"t":25}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.644],"y":[0.661]},"o":{"x":[0.298],"y":[0.425]},"n":["0p644_0p661_0p298_0p425"],"t":2.75,"s":[0],"e":[53.883]},{"t":25}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":3,"op":37,"st":-8.25,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-605.527},"p":{"a":0,"k":[1732,152,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.991,1.673,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p991_0p381_0","0p705_1p673_0p381_0","0p667_0p667_0p333_0p333"],"t":0.75,"s":[-100,100,100],"e":[-21397.685,34.555,100]},{"i":{"x":[0.25,0.975,0.667],"y":[1,1,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[-0.007,0.017,0.333]},"n":["0p25_1_0p347_-0p007","0p975_1_0p347_0p017","0p667_0p667_0p333_0p333"],"t":12.856,"s":[-21397.685,34.555,100],"e":[-1568.606,1891.022,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":20.167,"s":[-1568.606,1891.022,100],"e":[-1568.606,1891.022,100]},{"t":23}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.949],[-54.176,-27.632],[-5.893,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.464],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.113]],"v":[[23.545,-41.064],[53.28,19.569],[115.183,-60.894],[18.531,-130.479],[-69.918,-36.01],[-9.241,93.279],[203.82,-38.457],[60.346,-214.929],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.82,0.788,0.941,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.942]},"o":{"x":[0.231],"y":[0.265]},"n":["0p507_0p942_0p231_0p265"],"t":0.75,"s":[111.435],"e":[477.345]},{"i":{"x":[0.607],"y":[0.141]},"o":{"x":[0.274],"y":[-0.358]},"n":["0p607_0p141_0p274_-0p358"],"t":12.856,"s":[477.345],"e":[449.604]},{"t":23}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.644],"y":[0.661]},"o":{"x":[0.298],"y":[0.425]},"n":["0p644_0p661_0p298_0p425"],"t":0.75,"s":[0],"e":[53.883]},{"t":23}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":1,"op":37,"st":-10.25,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 15

//------------------------------------------------------------- Start Transition Circle 16
var transitionCircle16 = {
  "v":"4.5.9","fr":30,"ip":0,"op":17,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":363.927},"p":{"a":0,"k":[580,648,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":1,"k":[{"i":{"x":[0.705,0.705,0.667],"y":[0.724,0.778,0.667]},"o":{"x":[0.381,0.381,0.333],"y":[0,0,0.333]},"n":["0p705_0p724_0p381_0","0p705_0p778_0p381_0","0p667_0p667_0p333_0p333"],"t":0,"s":[-100,100,100],"e":[-776.685,294.195,100]},{"i":{"x":[0.678,0.678,0.667],"y":[0.8,0.7,0.667]},"o":{"x":[0.347,0.347,0.333],"y":[0.29,0.195,0.333]},"n":["0p678_0p8_0p347_0p29","0p678_0p7_0p347_0p195","0p667_0p667_0p333_0p333"],"t":13,"s":[-776.685,294.195,100],"e":[-1474.606,535.022,100]},{"i":{"x":[0.671,0.671,0.667],"y":[1.46,0.681,0.667]},"o":{"x":[0.339,0.339,0.333],"y":[-0.771,0.262,0.333]},"n":["0p671_1p46_0p339_-0p771","0p671_0p681_0p339_0p262","0p667_0p667_0p333_0p333"],"t":25,"s":[-1474.606,535.022,100],"e":[-1220.664,922.257,100]},{"i":{"x":[0.648,0.648,0.667],"y":[-1.526,0.408,0.667]},"o":{"x":[0.328,0.328,0.333],"y":[-1.847,0.458,0.333]},"n":["0p648_-1p526_0p328_-1p847","0p648_0p408_0p328_0p458","0p667_0p667_0p333_0p333"],"t":41,"s":[-1220.664,922.257,100],"e":[-1146,1241,100]},{"t":60}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[19.099,-24.805],[-39.542,-5.302],[6.577,41.694],[46.186,-4.558],[8.478,-50.95],[-54.176,-27.632],[-5.892,126.04],[92.19,20.16],[48.834,-99.216]],"o":[[-18.067,23.463],[37.968,5.091],[-6.817,-43.213],[-51.077,5.04],[-7.667,46.079],[84.161,42.925],[4.414,-94.416],[-63.004,-13.778],[-44.354,90.114]],"v":[[-7.648,-292.815],[53.28,19.569],[-26.406,-12.744],[18.531,-130.479],[103.689,86.674],[-0.369,-120.548],[16.612,-35.473],[134.132,678.845],[-147.813,-94.706]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.82,0.788,0.941,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.507],"y":[0.843]},"o":{"x":[0.231],"y":[0.716]},"n":["0p507_0p843_0p231_0p716"],"t":0,"s":[111.435],"e":[244.345]},{"i":{"x":[0.518],"y":[-0.284]},"o":{"x":[0.185],"y":[0.579]},"n":["0p518_-0p284_0p185_0p579"],"t":13,"s":[244.345],"e":[307.867]},{"i":{"x":[0.549],"y":[1]},"o":{"x":[0.215],"y":[0.228]},"n":["0p549_1_0p215_0p228"],"t":74,"s":[307.867],"e":[410]},{"t":113}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.65],"y":[0.565]},"o":{"x":[0.292],"y":[0.407]},"n":["0p65_0p565_0p292_0p407"],"t":0,"s":[0],"e":[77.205]},{"t":34}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":0.25,"op":419,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 16

//------------------------------------------------------------- Start Transition Circle 17
var transitionCircle17 = {
  "v":"4.5.9","fr":30,"ip":0,"op":39,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":3,"nm":"NULL CONTROL","ks":{"o":{"a":0,"k":0},"r":{"a":0,"k":0},"p":{"a":0,"k":[945,547.5,0]},"a":{"a":0,"k":[60,60,0]},"s":{"a":0,"k":[157,157,100]}},"ao":0,"ip":0,"op":301,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Transition 12 layer | 1","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[45,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[240.105,240.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.788,0.941,0.941,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":15.6,"s":[52],"e":[78]},{"t":38.4}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.312],"y":[1]},"o":{"x":[0.685],"y":[0]},"n":["0p312_1_0p685_0"],"t":15.6,"s":[0],"e":[100]},{"t":38.4}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":15.6,"op":301,"st":15,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Transition 12 layer | 2","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[296.105,296.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.788,0.941,0.941,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":13.2,"s":[65],"e":[76]},{"i":{"x":[0.528],"y":[1]},"o":{"x":[0.399],"y":[0]},"n":["0p528_1_0p399_0"],"t":20.4,"s":[76],"e":[128.5]},{"t":49.2}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":13.2,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":21.6,"s":[4.596],"e":[100]},{"t":43.2}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":13.2,"op":301,"st":12.6,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Transition 12 layer | 3","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[337.105,337.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.439,0.29,0.631,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":9.6,"s":[14],"e":[25]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":16.8,"s":[25],"e":[45]},{"t":39.6}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":9.6,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":18,"s":[4.596],"e":[100]},{"t":39.6}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":9.6,"op":301,"st":9,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Transition 12 layer | 4","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[252.105,252.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.439,0.29,0.631,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":9.6,"s":[0],"e":[45]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":16.8,"s":[45],"e":[65]},{"t":39.6}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":9.6,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":18,"s":[4.596],"e":[100]},{"t":39.6}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":9.6,"op":301,"st":9,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Transition 12 layer | 5","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[57,72,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[188.105,188.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.788,0.941,0.941,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":10.8,"s":[0],"e":[35]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":18,"s":[35],"e":[99]},{"t":40.8}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":10.8,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":19.2,"s":[4.596],"e":[100]},{"t":40.8}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":10.8,"op":301,"st":10.2,"bm":0,"sr":1},{"ddd":0,"ind":7,"ty":4,"nm":"Transition 12 layer | 6","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[188.105,188.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.439,0.29,0.631,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":7.2,"s":[0],"e":[45]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":14.4,"s":[45],"e":[47]},{"t":37.2}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":7.2,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":15.6,"s":[4.596],"e":[100]},{"t":37.2}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":7.2,"op":301,"st":6.6,"bm":0,"sr":1},{"ddd":0,"ind":8,"ty":4,"nm":"Transition 12 layer | 7","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[57,72,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[122.105,122.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.788,0.941,0.941,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.251],"y":[0]},"n":["0p394_1_0p251_0"],"t":4.8,"s":[0],"e":[118]},{"t":34.8}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.66],"y":[0.206]},"o":{"x":[0.408],"y":[0]},"n":["0p66_0p206_0p408_0"],"t":4.8,"s":[0],"e":[19.701]},{"i":{"x":[0.597],"y":[1]},"o":{"x":[0.29],"y":[0.415]},"n":["0p597_1_0p29_0p415"],"t":14.4,"s":[19.701],"e":[100]},{"t":38.4}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":4.8,"op":301,"st":4.2,"bm":0,"sr":1},{"ddd":0,"ind":9,"ty":4,"nm":"Transition 12 layer | 8","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[122.105,122.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.439,0.29,0.631,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":7.2,"s":[0],"e":[45]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":14.4,"s":[45],"e":[65]},{"t":37.2}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.734],"y":[0.111]},"o":{"x":[0.408],"y":[0]},"n":["0p734_0p111_0p408_0"],"t":7.2,"s":[0],"e":[4.596]},{"i":{"x":[0.235],"y":[1]},"o":{"x":[0.497],"y":[0.206]},"n":["0p235_1_0p497_0p206"],"t":15.6,"s":[4.596],"e":[100]},{"t":37.2}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":7.2,"op":301,"st":6.6,"bm":0,"sr":1},{"ddd":0,"ind":10,"ty":4,"nm":"Transition 12 layer | 9","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[57,72,0]},"a":{"a":0,"k":[0,0,0],"x":"var $bm_rt;\n$bm_rt = [\n    0,\n    0\n];"},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p667_1_0p333_0","0p667_1_0p333_0","0p667_0p667_0p333_0p333"],"t":4.8,"s":[29.884,29.884,100],"e":[44.105,44.105,100]},{"t":46.8}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.788,0.941,0.941,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.756],"y":[0.152]},"o":{"x":[0.34],"y":[0]},"n":["0p756_0p152_0p34_0"],"t":4.8,"s":[80],"e":[143.484]},{"i":{"x":[0.502],"y":[1]},"o":{"x":[0.228],"y":[0.276]},"n":["0p502_1_0p228_0p276"],"t":21.346,"s":[143.484],"e":[382]},{"t":42.299}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.66],"y":[0.242]},"o":{"x":[0.408],"y":[0]},"n":["0p66_0p242_0p408_0"],"t":4.8,"s":[0],"e":[19.701]},{"i":{"x":[0.597],"y":[1]},"o":{"x":[0.29],"y":[0.423]},"n":["0p597_1_0p29_0p423"],"t":16.254,"s":[19.701],"e":[100]},{"t":46.8}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":4.8,"op":301,"st":4.2,"bm":0,"sr":1},{"ddd":0,"ind":11,"ty":4,"nm":"Transition 12 layer | 10","parent":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[75,48,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[27.105,27.105,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[370.875,370.875]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[0.439,0.29,0.631,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":0,"s":[116],"e":[161]},{"i":{"x":[0.394],"y":[1]},"o":{"x":[0.559],"y":[0]},"n":["0p394_1_0p559_0"],"t":20.4,"s":[161],"e":[181]},{"t":69.6}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.496],"y":[1]},"o":{"x":[0.408],"y":[0]},"n":["0p496_1_0p408_0"],"t":0,"s":[0],"e":[100]},{"t":69.6}],"ix":1},"e":{"a":0,"k":0,"ix":2},"o":{"a":0,"k":42,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-38,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 5","np":4,"mn":"ADBE Vector Group"}],"ip":0,"op":301,"st":-0.6,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 17

//------------------------------------------------------------- Start Transition Circle 18
var transitionCircle18 = {
"v":"4.5.9","fr":30,"ip":0,"op":33,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 109","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-14,538,0]},"a":{"a":0,"k":[-974,-2,0]},"s":{"a":0,"k":[1143.529,100,100]}},"ao":0,"ef":[{"ty":5,"nm":"Radial Wipe","mn":"ADBE Radial Wipe","ix":1,"en":1,"ef":[{"ty":0,"nm":"Transition Completion","mn":"ADBE Radial Wipe-0001","ix":1,"v":{"a":1,"k":[{"i":{"x":[0.67],"y":[1]},"o":{"x":[0.33],"y":[0]},"n":["0p67_1_0p33_0"],"t":9,"s":[100],"e":[0]},{"t":27}]}},{"ty":0,"nm":"Start Angle","mn":"ADBE Radial Wipe-0002","ix":2,"v":{"a":0,"k":0}},{"ty":3,"nm":"Wipe Center","mn":"ADBE Radial Wipe-0003","ix":3,"v":{"a":0,"k":[960,540]}},{"ty":7,"nm":"Wipe","mn":"ADBE Radial Wipe-0004","ix":4,"v":{"a":0,"k":1}},{"ty":0,"nm":"Feather","mn":"ADBE Radial Wipe-0005","ix":5,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[170,1120]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.792,0.196,0.192,1]}, "nm":".animation_svg_color_4", "cl":"animation_svg_color_4","o":{"a":0,"k":100},"w":{"a":0,"k":0},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[0.792,0.196,0.192,1]}, "nm":".animation_svg_color_4", "cl":"animation_svg_color_4","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-889,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":10,"op":396,"st":-191.6,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 108","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-14,538,0]},"a":{"a":0,"k":[-974,-2,0]},"s":{"a":0,"k":[1143.529,100,100]}},"ao":0,"ef":[{"ty":5,"nm":"Radial Wipe","mn":"ADBE Radial Wipe","ix":1,"en":1,"ef":[{"ty":0,"nm":"Transition Completion","mn":"ADBE Radial Wipe-0001","ix":1,"v":{"a":1,"k":[{"i":{"x":[0.67],"y":[1]},"o":{"x":[0.33],"y":[0]},"n":["0p67_1_0p33_0"],"t":6,"s":[100],"e":[0]},{"t":24}]}},{"ty":0,"nm":"Start Angle","mn":"ADBE Radial Wipe-0002","ix":2,"v":{"a":0,"k":0}},{"ty":3,"nm":"Wipe Center","mn":"ADBE Radial Wipe-0003","ix":3,"v":{"a":0,"k":[960,540]}},{"ty":7,"nm":"Wipe","mn":"ADBE Radial Wipe-0004","ix":4,"v":{"a":0,"k":1}},{"ty":0,"nm":"Feather","mn":"ADBE Radial Wipe-0005","ix":5,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[170,1120]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[1,0.859,0.184,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"w":{"a":0,"k":0},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,0.859,0.184,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-889,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":7,"op":393,"st":-194.6,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 107","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-14,538,0]},"a":{"a":0,"k":[-974,-2,0]},"s":{"a":0,"k":[1143.529,100,100]}},"ao":0,"ef":[{"ty":5,"nm":"Radial Wipe","mn":"ADBE Radial Wipe","ix":1,"en":1,"ef":[{"ty":0,"nm":"Transition Completion","mn":"ADBE Radial Wipe-0001","ix":1,"v":{"a":1,"k":[{"i":{"x":[0.67],"y":[1]},"o":{"x":[0.33],"y":[0]},"n":["0p67_1_0p33_0"],"t":4,"s":[100],"e":[0]},{"t":22}]}},{"ty":0,"nm":"Start Angle","mn":"ADBE Radial Wipe-0002","ix":2,"v":{"a":0,"k":0}},{"ty":3,"nm":"Wipe Center","mn":"ADBE Radial Wipe-0003","ix":3,"v":{"a":0,"k":[960,540]}},{"ty":7,"nm":"Wipe","mn":"ADBE Radial Wipe-0004","ix":4,"v":{"a":0,"k":1}},{"ty":0,"nm":"Feather","mn":"ADBE Radial Wipe-0005","ix":5,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[170,1120]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.192,0.718,0.075,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":0},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[0.192,0.718,0.075,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-889,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":5,"op":391,"st":-196.6,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 106","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-14,538,0]},"a":{"a":0,"k":[-974,-2,0]},"s":{"a":0,"k":[1143.529,100,100]}},"ao":0,"ef":[{"ty":5,"nm":"Radial Wipe","mn":"ADBE Radial Wipe","ix":1,"en":1,"ef":[{"ty":0,"nm":"Transition Completion","mn":"ADBE Radial Wipe-0001","ix":1,"v":{"a":1,"k":[{"i":{"x":[0.67],"y":[1]},"o":{"x":[0.33],"y":[0]},"n":["0p67_1_0p33_0"],"t":0,"s":[100],"e":[0]},{"t":18}]}},{"ty":0,"nm":"Start Angle","mn":"ADBE Radial Wipe-0002","ix":2,"v":{"a":0,"k":0}},{"ty":3,"nm":"Wipe Center","mn":"ADBE Radial Wipe-0003","ix":3,"v":{"a":0,"k":[960,540]}},{"ty":7,"nm":"Wipe","mn":"ADBE Radial Wipe-0004","ix":4,"v":{"a":0,"k":1}},{"ty":0,"nm":"Feather","mn":"ADBE Radial Wipe-0005","ix":5,"v":{"a":0,"k":0}}]}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[170,1120]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.125,0.212,0.506,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":0,"k":0},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[0.125,0.212,0.506,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-889,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":387,"st":-200.6,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Circle 18

//------------------------------------------------------------- Start Transition Shutter 1
var transitionShutter1 = {
  "v":"4.5.9","fr":30,"ip":0,"op":19,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 106","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[-14,538,0]},"a":{"a":0,"k":[-974,-2,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,0.25,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0.75,0.333]},"n":["0p25_1_0p75_0","0p25_0p25_0p75_0p75","0p667_0p667_0p333_0p333"],"t":-2.6,"s":[0,100,100],"e":[1143.529,100,100]},{"t":17}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[170,1120]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.557,0.78,0.824,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":0,"k":0},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[0.557,0.78,0.824,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-889,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":387,"st":-200.6,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Shutter 1

//------------------------------------------------------------- Start Transition Shutter 2
var transitionShutter2 = {
  "v":"4.5.9","fr":30,"ip":0,"op":28,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[940,704,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":1,"k":[{"i":{"x":0.4,"y":1},"o":{"x":0.594,"y":0},"n":"0p4_1_0p594_0","t":-0.998,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-1120,434],[-1088,1052],[996,1052],[994,690]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-1116,-930],[-1088,1052],[996,1052],[996,-718]],"c":true}]},{"t":26.029}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.992,0.729,0.271,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":-0.998,"op":369,"st":-0.998,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"n":"0p833_0p833_0p333_0","t":-1.999,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1080,616],[-1144,724],[-1160,1164],[1080,1164]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1080,558.021],[-1144,802.021],[-1160,1164],[1080,1164]],"c":true}]},{"i":{"x":0.4,"y":1},"o":{"x":0.167,"y":0.167},"n":"0p4_1_0p167_0p167","t":0.003,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1080,558.021],[-1144,802.021],[-1160,1164],[1080,1164]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1080,-856],[-1144,-528],[-1160,1164],[1080,1164]],"c":true}]},{"t":24.027}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.886,0.286,0.235,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":-1.999,"op":27.03,"st":-1.999,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Shutter 2

//------------------------------------------------------------- Start Transition Shutter 3
var transitionShutter3 = {
  "v":"4.5.9","fr":30,"ip":0,"op":28,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":0,"ty":4,"nm":"03","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.167,"y":0},"n":"0p031_1_0p167_0","t":10.011,"s":[960,1660,0],"e":[960,540,0],"to":[0,-186.667,0],"ti":[0,186.667,0]},{"t":36.037}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"n","pt":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.87,"y":0},"n":"0p25_1_0p87_0","t":29.03,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1068.87,-608],[-1142.041,-604],[-1142.041,608],[1068.87,604]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1068.87,-608],[-1142.041,-604],[-1142.263,-576],[1068.648,-580]],"c":true}]},{"t":55.056}]},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 1"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[1,0.69,0.231,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":10.011,"op":370,"st":10.011,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"02","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.644,"y":0},"n":"0p031_1_0p644_0","t":1.002,"s":[2932.364,540,0],"e":[960,540,0],"to":[-328.727,0,0],"ti":[328.727,0,0]},{"t":27.028}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.699,"y":0},"n":"0_1_0p699_0","t":34.035,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[-1142.041,-604],[-1142.041,608],[1876.141,608]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[1556.141,-604],[1556.141,608],[1876.141,608]],"c":true}]},{"t":50.051}]},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[1,0.941,0.647,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":1.002,"op":37.038,"st":1.002,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"01","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.644,"y":0},"n":"0p031_1_0p644_0","t":-2.001,"s":[-1017.727,540,0],"e":[960,540,0],"to":[329.621,0,0],"ti":[-329.621,0,0]},{"t":24.025}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.699,"y":0},"n":"0_1_0p699_0","t":38.039,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[-1142.041,-604],[-1142.041,608],[1876.141,608]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[1556.141,-604],[1556.141,608],[1876.141,608]],"c":true}]},{"t":54.055}]},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0.275,0.537,0.4,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":-1,"op":37.038,"st":-1,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Shutter 3

//------------------------------------------------------------- Start Transition Shutter 4
var transitionShutter4 = {
  "v":"4.5.9","fr":30,"ip":0,"op":32,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":0,"ty":4,"nm":"03","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.644,"y":0},"n":"0p031_1_0p644_0","t":10,"s":[-1032.727,540,0],"e":[960,540,0],"to":[332.121,0,0],"ti":[-332.121,0,0]},{"t":36.036}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1068.87,-608],[-1142.041,-604],[-1142.041,608],[1068.87,604]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 1"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[1,0.69,0.231,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":9,"op":370,"st":10.01,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"02","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.644,"y":0},"n":"0p031_1_0p644_0","t":5,"s":[-1032.727,540,0],"e":[960,540,0],"to":[332.121,0,0],"ti":[-332.121,0,0]},{"t":31.031}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.699,"y":0},"n":"0_1_0p699_0","t":26.026,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[-1142.041,-604],[-1142.041,608],[1876.141,608]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[1556.141,-604],[1556.141,608],[1876.141,608]],"c":true}]},{"t":42.042}]},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[1,0.941,0.647,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":3,"op":40.04,"st":5.005,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"01","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.031,"y":1},"o":{"x":0.644,"y":0},"n":"0p031_1_0p644_0","t":-1.001,"s":[-1019.727,540,0],"e":[960,540,0],"to":[329.955,0,0],"ti":[-329.955,0,0]},{"t":25.025}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[115,115,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.699,"y":0},"n":"0_1_0p699_0","t":26.026,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[-1142.041,-604],[-1142.041,608],[1876.141,608]],"c":true}],"e":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1876.141,-604],[1556.141,-604],[1556.141,608],[1876.141,608]],"c":true}]},{"t":42.042}]},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1745.455,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0.275,0.537,0.4,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40.04,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Shutter 4

//------------------------------------------------------------- Start Transition Shutter 5
var transitionShutter5 = {
  "v":"4.5.9","fr":30,"ip":0,"op":24,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.123,"y":1},"o":{"x":0.467,"y":0},"n":"0p123_1_0p467_0","t":0,"s":[-1116,540,0],"e":[964,540,0],"to":[346.667,0,0],"ti":[-346.667,0,0]},{"t":34}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p667_1_0p333_0","0p667_1_0p333_0","0p667_0p667_0p333_0p333"],"t":9,"s":[100,100,100],"e":[128,128,100]},{"t":28}]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[868.5,-539.5],[-1299.5,-539.5],[-1299.5,540.5],[868.5,540.5]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 1"},{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[198.823,0],[0,-452.873],[-198.822,0],[0,452.874]],"o":[[-198.822,0],[0,452.874],[198.823,0],[0,-452.873]],"v":[[728.5,-771.5],[368.5,48.5],[728.5,868.5],[1088.5,48.5]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[1155.696,-601.344],[-1076,-584],[-1076,632],[1171.66,633.416]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.635,0.749,0.498,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":301,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Shutter 5

//------------------------------------------------------------- Start Transition Stripe 1
var transitionStripe1 = {
  "v":"4.5.9","fr":30,"ip":0,"op":32,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 9","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":180},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":12.75,"s":[525,-112.085,0],"e":[553.5,-22.585,0],"to":[0,28.341,0],"ti":[0,-15.816,0]},{"t":24}]},"a":{"a":0,"k":[-278,424.943,0]},"s":{"a":0,"k":[150,150,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-278,-412],[-278,438]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.797],"y":[0.56]},"o":{"x":[0.333],"y":[0]},"n":["0p797_0p56_0p333_0"],"t":10.25,"s":[0],"e":[20]},{"i":{"x":[0.761],"y":[0.81]},"o":{"x":[0.163],"y":[0.152]},"n":["0p761_0p81_0p163_0p152"],"t":15.25,"s":[20],"e":[78]},{"i":{"x":[0.385],"y":[1]},"o":{"x":[0.281],"y":[0.827]},"n":["0p385_1_0p281_0p827"],"t":21.5,"s":[78],"e":[100]},{"t":30.25}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.597],"y":[1]},"o":{"x":[0.389],"y":[0]},"n":["0p597_1_0p389_0"],"t":7.75,"s":[0],"e":[100]},{"t":19}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"st","c":{"a":0,"k":[0.537,0.851,0.976,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.528],"y":[0.842]},"o":{"x":[0.218],"y":[0.512]},"n":["0p528_0p842_0p218_0p512"],"t":7.75,"s":[62],"e":[11.573]},{"i":{"x":[0.614],"y":[1]},"o":{"x":[0.284],"y":[1.149]},"n":["0p614_1_0p284_1p149"],"t":19,"s":[11.573],"e":[6]},{"t":34}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":7.75,"op":300,"st":6.5,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 5","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":180},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":12.75,"s":[1374,206.915,0],"e":[1374,-48.085,0],"to":[0,-42.5,0],"ti":[0,42.5,0]},{"t":20.25}]},"a":{"a":0,"k":[-278,424.943,0]},"s":{"a":0,"k":[150,150,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-278,-412],[-278,438]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.797],"y":[0.56]},"o":{"x":[0.333],"y":[0]},"n":["0p797_0p56_0p333_0"],"t":9,"s":[0],"e":[20]},{"i":{"x":[0.761],"y":[0.81]},"o":{"x":[0.163],"y":[0.152]},"n":["0p761_0p81_0p163_0p152"],"t":14,"s":[20],"e":[78]},{"i":{"x":[0.385],"y":[1]},"o":{"x":[0.281],"y":[0.827]},"n":["0p385_1_0p281_0p827"],"t":20.25,"s":[78],"e":[100]},{"t":29}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.597],"y":[1]},"o":{"x":[0.389],"y":[0]},"n":["0p597_1_0p389_0"],"t":6.5,"s":[0],"e":[100]},{"t":17.75}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"st","c":{"a":0,"k":[0.537,0.851,0.976,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.528],"y":[0.842]},"o":{"x":[0.218],"y":[0.512]},"n":["0p528_0p842_0p218_0p512"],"t":6.5,"s":[62],"e":[11.573]},{"i":{"x":[0.614],"y":[1]},"o":{"x":[0.284],"y":[1.149]},"n":["0p614_1_0p284_1p149"],"t":17.75,"s":[11.573],"e":[6]},{"t":32.75}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":4,"mn":"ADBE Vector Group"}],"ip":6.5,"op":300,"st":5.25,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":141},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":4,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.612]},"n":["0p667_1_0p148_0p612"],"t":12.75,"s":[1181.676],"e":[265.5]},{"t":31.5}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.62,0.89,1,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":4,"op":300,"st":4,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 7","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":1789.5},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":4,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.611]},"n":["0p667_1_0p148_0p611"],"t":12.75,"s":[1181.676],"e":[239.5]},{"t":32}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.62,0.89,1,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":4,"op":300,"st":4,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 6","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":0.25,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.612]},"n":["0p667_1_0p148_0p612"],"t":9,"s":[1181.676],"e":[265.5]},{"t":27.75}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.62,0.89,1,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":0.25,"op":300,"st":0.25,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":141},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":2.75,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.612]},"n":["0p667_1_0p148_0p612"],"t":11.5,"s":[1181.676],"e":[265.5]},{"t":30.25}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.537,0.851,0.976,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":2.75,"op":300,"st":2.75,"bm":0,"sr":1},{"ddd":0,"ind":7,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":1789.5},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":2.75,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.612]},"n":["0p667_1_0p148_0p612"],"t":11.5,"s":[1181.676],"e":[265.5]},{"t":30.25}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.537,0.851,0.976,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":2.75,"op":300,"st":2.75,"bm":0,"sr":1},{"ddd":0,"ind":8,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":1,"k":[{"i":{"x":[0.783],"y":[0.509]},"o":{"x":[0.333],"y":[0]},"n":["0p783_0p509_0p333_0"],"t":-1,"s":[1962],"e":[1181.676]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.148],"y":[0.612]},"n":["0p667_1_0p148_0p612"],"t":7.75,"s":[1181.676],"e":[265.5]},{"t":26.5}]}},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[150,121.071,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[246,0],[0,-235.398],[0,0],[0,0],[0,116.46]],"o":[[-246,0],[0,123.894],[0,0],[0,0],[0,-257.699]],"v":[[12,-646.536],[-278,-138.572],[-280,820.366],[276,820.366],[278,-108.837]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.537,0.851,0.976,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":300,"st":-1,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 1

//------------------------------------------------------------- Start Transition Stripe 2
var transitionStripe2 = {
  "v":"4.5.9","fr":30,"ip":0,"op":22,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 111","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":180},"p":{"a":0,"k":[948,594,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.843,0.051,0.169,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":8,"s":[321],"e":[2279]},{"t":28}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":6,"s":[0],"e":[100]},{"t":23}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":-2,"op":473,"st":-2,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 108","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[948,594,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[1,0.741,0.196,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-1,"s":[321],"e":[2279]},{"t":19}]},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-3,"s":[0],"e":[100]},{"t":14}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":-11,"op":464,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 2

//------------------------------------------------------------- Start Transition Stripe 3
var transitionStripe3 = {
  "v":"4.5.9","fr":30,"ip":0,"op":39,"w":1920,"h":1080,"ddd":0,"assets":[{"id":"comp_7","layers":[{"ddd":0,"ind":0,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":6,"s":[0],"e":[10]},{"t":306}]},"w":1920,"h":416,"ip":6,"op":306,"st":6,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":-1,"s":[0],"e":[10]},{"t":299}]},"w":1920,"h":416,"ip":-1,"op":308,"st":-1,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":4,"s":[0],"e":[10]},{"t":304}]},"w":1920,"h":416,"ip":4,"op":304,"st":4,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":5,"s":[0],"e":[10]},{"t":305}]},"w":1920,"h":416,"ip":5,"op":305,"st":5,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":1,"s":[0],"e":[10]},{"t":301}]},"w":1920,"h":416,"ip":1,"op":301,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":9,"s":[0],"e":[10]},{"t":309}]},"w":1920,"h":416,"ip":9,"op":309,"st":9,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":0,"nm":"Shape 26 pre-comp 2","refId":"comp_8","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":2,"s":[0],"e":[10]},{"t":302}]},"w":1920,"h":416,"ip":2,"op":302,"st":2,"bm":0,"sr":1}]},{"id":"comp_8","layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Shape Layer 4","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":102.6},"p":{"a":0,"k":[972,636,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":0,"k":[-240,240,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[101.443,-248.917],[-47.681,-205.016],[0,0]],"o":[[0,0],[-101.443,248.917],[47.681,205.015],[0,0]],"v":[[296.453,-706.27],[281.599,-143.813],[142.595,409.025],[254.169,752.097]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.961,0.933,0.824,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"w":{"a":0,"k":92},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":9.606,"s":[0],"e":[100]},{"t":38.481}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":4,"mn":"ADBE Vector Group"}],"ip":9.856,"op":347,"st":-1.394,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":102.6},"p":{"a":0,"k":[972,636,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":0,"k":[-240,240,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[101.443,-248.917],[-47.681,-205.016],[0,0]],"o":[[0,0],[-101.443,248.917],[47.681,205.015],[0,0]],"v":[[296.453,-706.27],[281.599,-143.813],[142.595,409.025],[254.169,752.097]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.694,0.212,0.373,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":90},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":2.606,"s":[0],"e":[100]},{"t":31.481}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":4,"mn":"ADBE Vector Group"}],"ip":2.856,"op":340,"st":-8.394,"bm":0,"sr":1}]},{"id":"comp_9","layers":[{"ddd":0,"ind":0,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":13.595,"op":313.595,"st":13.595,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":13.595,"op":313.595,"st":13.595,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":10.851,"op":310.851,"st":10.851,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":9.944,"op":309.944,"st":9.944,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":8.276,"op":308.276,"st":8.276,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":17.105,"op":317.105,"st":17.105,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":0,"nm":"Shape 26 pre-comp","refId":"comp_10","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":791,"x":"var $bm_rt;\n$bm_rt = mul(sub(index, 1), 200);"}},"a":{"a":0,"k":[960,212,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":416,"ip":13.907,"op":313.907,"st":13.907,"bm":0,"sr":1}]},{"id":"comp_10","layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-106},"p":{"a":0,"k":[920,696,0]},"a":{"a":0,"k":[40,-32,0]},"s":{"a":0,"k":[240,240,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[101.443,-248.917],[-47.681,-205.016],[0,0]],"o":[[0,0],[-101.443,248.917],[47.681,205.016],[0,0]],"v":[[274.055,-654.7],[281.599,-143.813],[142.595,409.026],[254.169,752.097]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.145,0.224,0.329,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":0,"k":88.695},"lc":2,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.221],"y":[0.369]},"n":["0p667_1_0p221_0p369"],"t":-0.394,"s":[0],"e":[100]},{"t":28.481}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":4,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":4,"mn":"ADBE Vector Group"}],"ip":-0.144,"op":279.807,"st":-11.394,"bm":0,"sr":1}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Shape trans pre-comp big 2","refId":"comp_7","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":1,"op":301,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Shape trans pre-comp big","refId":"comp_9","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"tm":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":-11,"s":[0],"e":[10]},{"t":289}]},"w":1920,"h":1080,"ip":-11,"op":313,"st":-11,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 3

//------------------------------------------------------------- Start Transition Stripe 4
var transitionStripe4 = {
  "v":"4.5.9","fr":24,"ip":0,"op":29,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Stripe 09_00026","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,7.66],[-14,-0.02],[-0.01,-7.67],[0,0]],"o":[[13.99,-0.01],[0,7.65],[0,0],[0,-7.67]],"v":[[-20.99,-11.495],[20.99,-11.485],[21.01,11.505],[-21.01,11.505]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[574,528.495],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,2.75],[-29.34,0],[0,-2.75],[29.33,0]],"o":[[29.33,-0.01],[0,2.75],[-29.34,0],[0,-2.75]],"v":[[-44,-5.495],[44,-5.495],[44,5.505],[-44,5.505]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[551,147.495],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":26,"op":27,"st":26,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Stripe 09_00025","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,7.67],[-14,0],[0,-7.67],[0,0]],"o":[[14,0],[0,7.67],[0,0],[0,-7.67]],"v":[[-20.995,-11.5],[21.005,-11.5],[21.005,11.5],[-20.995,11.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[573.995,528.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.06,3.5],[-189.32,0],[0,-3.51],[189.33,0]],"o":[[189.32,0.04],[0.01,3.5],[-189.34,0],[0,-3.51]],"v":[[-283.95,-5.26],[284,-5.25],[284.01,5.26],[-283.99,5.26]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[310.99,472.74],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,3.67],[-29.33,0],[0,-3.67],[29.34,0]],"o":[[29.34,0],[0,3.67],[-29.33,0],[-0.01,-3.67]],"v":[[-43.995,-5.5],[44.005,-5.5],[44.005,5.5],[-43.995,5.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[550.995,147.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"}],"ip":25,"op":26,"st":25,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Stripe 09_00024","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.07,3.83],[-197.96,0.08],[-0.06,-36.85],[0,0],[-0.06,7.5],[-8.66,0.01],[0.01,25.5],[8.67,0.01]],"o":[[197.96,0.02],[0.19,36.84],[0,0],[0.02,-7.51],[8.65,0.01],[0,-25.5],[-8.67,-0.01],[0,-3.85]],"v":[[-297,-55.25],[296.88,-55.27],[296.96,55.27],[-297.04,55.27],[-297.01,32.76],[-271.04,32.76],[-271.04,-43.73],[-297.04,-43.73]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298.04,484.73],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,3.67],[-29.33,0],[0,-3.67],[29.33,0]],"o":[[29.34,0],[0,3.67],[-29.33,0],[-0.01,-3.67]],"v":[[-43.995,-5.5],[44.005,-5.5],[44.005,5.5],[-43.995,5.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[550.995,147.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,3.67],[-56,0],[0,-3.67],[56,0]],"o":[[56,0],[0,3.67],[-56,0],[0,-3.67]],"v":[[-83.995,-5.5],[84.005,-5.5],[84.005,5.5],[-83.995,5.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[510.995,97.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"}],"ip":24,"op":25,"st":24,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Stripe 09_00023","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.04,3.84],[-197.97,0.06],[-0.04,-36.84],[0,0],[0,20],[-8.67,0],[0,13],[8.67,0]],"o":[[197.97,0.02],[0.14,36.84],[0,0],[0,-20],[8.67,-0.01],[0,-13],[-8.67,0],[-0.01,-3.84]],"v":[[-297.005,-55.255],[296.905,-55.265],[296.965,55.265],[-297.035,55.265],[-297.035,-4.735],[-271.035,-4.735],[-271.035,-43.735],[-297.035,-43.735]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298.035,484.735],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-157.34,0],[-5.28,0.81],[-35.33,0.1],[-0.03,-7.85],[198,0],[0.01,7.67]],"o":[[5.31,-0.1],[35.33,-0.08],[0.13,7.85],[-198.01,0],[-0.04,-7.67],[157.33,0]],"v":[[174.99,-11.22],[190.93,-11.7],[296.93,-11.76],[296.99,11.78],[-297.02,11.78],[-297.02,-11.22]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298.01,366.22],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.12,33.02],[-197.96,0.06],[-0.04,-57.85],[56,0],[-0.09,3.51],[-13.32,-0.01],[-0.12,8.34],[-13.32,-0.01],[0,13],[168.65,-0.09]],"o":[[197.96,0.06],[0.13,57.85],[-56,0],[-0.01,-3.51],[13.31,0.08],[0.03,-8.34],[13.32,0.06],[0,-12.99],[-168.65,0.02],[-0.14,-33.02]],"v":[[-296.935,-86.77],[296.945,-86.77],[297.005,86.77],[129.005,86.77],[129.065,76.23],[169.005,76.26],[169.055,51.24],[209.005,51.26],[209.005,12.27],[-296.935,12.31]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[297.995,166.23],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,1.67],[0,0],[0.06,-13.51],[197.98,-0.01],[0.01,11.84],[-168.67,0]],"o":[[0,0],[-0.02,13.51],[-197.98,-0.03],[-0.04,-11.84],[168.67,0],[-0.01,-1.67]],"v":[[208.995,-20.26],[296.995,-20.26],[296.965,20.26],[-296.985,20.25],[-297.005,-15.26],[208.995,-15.26]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298.005,20.26],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"}],"ip":23,"op":24,"st":23,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Stripe 09_00022","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,41],[-198,0],[0,-41],[0,0]],"o":[[198,0],[0,41],[0,0],[0,-41]],"v":[[-297,-61.5],[297,-61.5],[297,61.5],[-297,61.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298,478.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.01,3.85],[-198,0],[0,-28.67],[198.01,0],[-0.18,11.84],[-141.98,-0.02],[0,12.99],[141.98,-0.1]],"o":[[198.01,0],[0,28.67],[-198.01,0],[0.09,-11.85],[141.98,0.11],[0,-12.99],[-141.98,0.02],[-0.2,-3.85]],"v":[[-296.94,-43],[297.07,-43],[297.07,43],[-296.96,43],[-296.87,7.45],[129.07,7.49],[129.07,-31.49],[-296.87,-31.45]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[297.93,335],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.03,59.51],[0,0],[0,-84.33],[198,0],[-0.04,11.84],[-168.66,0.01],[0,12.99],[168.65,-0.06]],"o":[[0,0],[0,84.33],[-198,0],[0.01,-11.84],[168.66,0.02],[0,-12.99],[-168.65,0],[-0.1,-59.51]],"v":[[-296.97,-126.5],[297.03,-126.5],[297.03,126.5],[-296.97,126.5],[-296.95,90.99],[209.03,90.99],[209.03,52.01],[-296.93,52.03]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[297.97,126.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"}],"ip":22,"op":23,"st":22,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Stripe 09_00021","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,41],[-198,0],[0,-41],[0,0]],"o":[[198,0],[0,41],[0,0],[0,-41]],"v":[[-297,-61.5],[297,-61.5],[297,61.5],[-297,61.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298,478.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,3.37],[-198,0],[0,-28.67],[198,0],[-0.34,11.86],[-141.96,-0.06],[0,12.99],[141.02,-0.07],[-0.61,2.07]],"o":[[198.01,0],[0,28.67],[-198,0],[0.08,-11.87],[141.96,0.24],[0,-12.99],[-141.02,0.01],[-1.04,-0.18],[-0.06,-3.38]],"v":[[-296.675,-43],[297.335,-43],[297.335,43],[-296.675,43],[-296.545,7.39],[129.335,7.49],[129.335,-31.49],[-293.725,-31.47],[-296.725,-32.88]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[297.665,335],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.02,59.51],[0,0],[0,-84.33],[198,0],[-0.09,11.84],[-168.65,0],[0,12.99],[168.66,-0.04]],"o":[[0,0],[0,84.33],[-198,0],[0.02,-11.84],[168.65,0.06],[0,-12.99],[-168.66,0],[-0.07,-59.5]],"v":[[-296.975,-126.5],[297.025,-126.5],[297.025,126.5],[-296.975,126.5],[-296.935,90.97],[209.025,90.99],[209.025,52.01],[-296.945,52.02]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[297.975,126.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"}],"ip":21,"op":22,"st":21,"bm":0,"sr":1},{"ddd":0,"ind":7,"ty":4,"nm":"Stripe 09_00020","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[0,-180],[0,0]],"o":[[0,0],[0,180],[0,0],[0,-180]],"v":[[-297,-270],[297,-270],[297,270],[-297,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[298,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,-180]],"v":[[-182.5,-270],[182.5,-270],[182.5,270],[-182.5,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":20,"op":21,"st":20,"bm":0,"sr":1},{"ddd":0,"ind":8,"ty":4,"nm":"Stripe 09_00019","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.15,-172.31],[-12.63,-0.05],[-0.06,-7.65],[0,0]],"o":[[0,0],[0.05,172.3],[12.63,0.06],[0.02,7.64],[0,0],[0,-180]],"v":[[-316.03,-270],[277.97,-270],[278.03,246.91],[315.91,247.06],[316.03,270],[-316.03,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[317.03,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.05,172.3],[0,0],[0,0],[0,0],[0.02,7.64],[12.63,0.06]],"o":[[0,0],[0,0],[0,0],[-0.06,-7.65],[-12.63,-0.05],[-0.15,-172.31]],"v":[[-182.455,-270],[182.545,-270],[182.545,270],[-144.395,270],[-144.515,247.06],[-182.395,246.91]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.455,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":19,"op":20,"st":19,"bm":0,"sr":1},{"ddd":0,"ind":9,"ty":4,"nm":"Stripe 09_00018","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.15,-172.31],[-12.63,-0.05],[-0.06,-7.65],[0,0]],"o":[[0,0],[0.05,172.3],[12.63,0.06],[0.02,7.64],[0,0],[0,-180]],"v":[[-316.03,-270],[277.97,-270],[278.03,246.91],[315.91,247.06],[316.03,270],[-316.03,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[317.03,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.05,172.3],[0,0],[0,0],[0,0],[0.02,7.64],[12.63,0.06]],"o":[[0,0],[0,0],[0,0],[-0.06,-7.65],[-12.63,-0.05],[-0.15,-172.31]],"v":[[-182.455,-270],[182.545,-270],[182.545,270],[-144.395,270],[-144.515,247.06],[-182.395,246.91]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.455,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":18,"op":19,"st":18,"bm":0,"sr":1},{"ddd":0,"ind":10,"ty":4,"nm":"Stripe 09_00017","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.07,-118.33],[-45.98,-0.1],[0.41,-7.89],[30.6,0.06],[15.31,-0.41],[-0.1,-46.13],[-12.58,0.08],[-0.11,-7.58],[0,0]],"o":[[0,0],[0.02,118.32],[45.98,0.1],[0.01,7.9],[-30.59,-0.21],[-15.31,0.12],[-0.09,46.13],[12.57,0.37],[0.44,7.57],[0,0],[0,-180]],"v":[[-366.1,-270],[227.9,-270],[227.93,84.97],[365.87,85.03],[365.69,108.72],[273.9,108.63],[227.95,108.8],[227.96,247.2],[265.7,247.27],[265.9,270],[-366.1,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[367.1,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.02,118.32],[0,0],[0,0],[0,0],[0.44,7.57],[12.57,0.37],[-0.09,46.13],[-15.31,0.12],[-30.59,-0.21],[0.01,7.9],[45.98,0.1]],"o":[[0,0],[0,0],[0,0],[-0.11,-7.58],[-12.58,0.08],[-0.1,-46.13],[15.31,-0.41],[30.6,0.06],[0.41,-7.89],[-45.98,-0.1],[-0.07,-118.33]],"v":[[-182.48,-270],[182.52,-270],[182.52,270],[-144.48,270],[-144.68,247.27],[-182.42,247.2],[-182.43,108.8],[-136.48,108.63],[-44.69,108.72],[-44.51,85.03],[-182.45,84.97]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.48,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":17,"op":18,"st":17,"bm":0,"sr":1},{"ddd":0,"ind":11,"ty":4,"nm":"Stripe 09_00016","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.05,-10],[-4,-0.05],[-0.04,-12.49],[-48.64,-0.01],[0.05,-3.67],[52.65,-0.04],[-0.02,-92.16],[-45.99,-0.03],[-0.04,-8.16],[-19.98,0.01],[0.07,-3.67],[6.65,-0.04],[0.1,-4.32],[59.32,-0.04],[-0.02,-37.99],[-12.65,0],[-0.03,-7.5],[0,0]],"o":[[0,0],[0.01,10],[3.98,0.05],[0.04,12.49],[48.65,0.04],[0.09,3.67],[-52.65,-0.01],[-0.02,92.16],[45.99,0.03],[0.05,8.16],[19.98,0.04],[0.07,3.67],[-6.65,0],[-0.06,4.33],[-59.32,0.01],[-0.02,37.99],[12.65,0.04],[0.1,7.5],[0,0],[0,-180]],"v":[[-396.015,-270],[197.985,-270],[198.005,-240.01],[209.975,-239.99],[209.995,-202.52],[355.935,-202.5],[355.945,-191.49],[197.995,-191.48],[197.995,84.99],[335.965,85.01],[335.995,109.48],[395.945,109.49],[395.945,120.51],[375.995,120.52],[375.945,133.5],[197.995,133.52],[197.995,247.48],[235.945,247.49],[235.985,270],[-396.015,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[397.015,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.01,10],[0,0],[0,0],[0,0],[0.1,7.5],[12.65,0.04],[-0.02,37.99],[-59.32,0.01],[-0.06,4.33],[-6.65,0],[0.07,3.67],[19.98,0.04],[0.05,8.16],[45.99,0.03],[-0.02,92.16],[-52.65,-0.01],[0.09,3.67],[48.65,0.04],[0.04,12.49],[3.98,0.05]],"o":[[0,0],[0,0],[0,0],[-0.03,-7.5],[-12.65,0],[-0.02,-37.99],[59.32,-0.04],[0.1,-4.32],[6.65,-0.04],[0.07,-3.67],[-19.98,0.01],[-0.04,-8.16],[-45.99,-0.03],[-0.02,-92.16],[52.65,-0.04],[0.05,-3.67],[-48.64,-0.01],[-0.04,-12.49],[-4,-0.05],[-0.05,-10]],"v":[[-182.485,-270],[182.515,-270],[182.515,270],[-144.485,270],[-144.525,247.49],[-182.475,247.48],[-182.475,133.52],[-4.525,133.5],[-4.475,120.52],[15.475,120.51],[15.475,109.49],[-44.475,109.48],[-44.505,85.01],[-182.475,84.99],[-182.475,-191.48],[-24.525,-191.49],[-24.535,-202.5],[-170.475,-202.52],[-170.495,-239.99],[-182.465,-240.01]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.485,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":16,"op":17,"st":16,"bm":0,"sr":1},{"ddd":0,"ind":12,"ty":4,"nm":"Stripe 09_00015","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.03,-5.83],[-39.32,-0.01],[0.13,-3.67],[35.31,-0.03],[-0.02,-12.99],[-48.63,0.06],[0.01,-3.68],[52.65,-0.04],[-0.02,-67.16],[-4,-0.05],[0.08,-7.83],[3.98,-0.08],[-0.03,-17.16],[-45.99,-0.04],[-0.03,-8.16],[-33.32,-0.02],[0.07,-3.67],[19.98,-0.04],[0.1,-12.66],[21.98,-0.04],[0.05,-4.16],[37.33,-0.04],[-0.02,-25.49],[-12.65,-0.01],[-0.03,-7.5],[0,0]],"o":[[0,0],[0.01,5.83],[39.32,0.04],[0.05,3.67],[-35.3,-0.03],[-0.02,12.98],[48.63,0.02],[0.18,3.67],[-52.65,0.01],[-0.02,67.15],[3.99,0.05],[0,7.83],[-3.99,0.03],[0,17.15],[45.99,0.04],[0.03,8.16],[33.31,0.05],[0.06,3.66],[-19.98,0.01],[-0.06,12.66],[-21.98,0.01],[-0.05,4.15],[-37.32,0.04],[-0.02,25.49],[12.65,0.04],[0.09,7.5],[0,0],[0,-180]],"v":[[-416.015,-270],[177.985,-270],[177.995,-252.52],[295.945,-252.5],[295.915,-241.48],[189.995,-241.48],[189.995,-202.52],[335.895,-202.53],[335.955,-191.5],[177.995,-191.48],[177.995,9.99],[189.975,10.01],[189.945,33.5],[177.985,33.53],[177.995,84.99],[315.975,85.01],[315.995,109.48],[415.945,109.5],[415.945,120.5],[355.995,120.52],[355.945,158.5],[289.995,158.52],[289.965,170.99],[177.995,171.01],[177.995,247.48],[215.945,247.5],[215.985,270],[-416.015,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[417.015,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.01,5.83],[0,0],[0,0],[0,0],[0.09,7.5],[12.65,0.04],[-0.02,25.49],[-37.32,0.04],[-0.05,4.15],[-21.98,0.01],[-0.06,12.66],[-19.98,0.01],[0.06,3.66],[33.31,0.05],[0.03,8.16],[45.99,0.04],[0,17.15],[-3.99,0.03],[0,7.83],[3.99,0.05],[-0.02,67.15],[-52.65,0.01],[0.18,3.67],[48.63,0.02],[-0.02,12.98],[-35.3,-0.03],[0.05,3.67],[39.32,0.04]],"o":[[0,0],[0,0],[0,0],[-0.03,-7.5],[-12.65,-0.01],[-0.02,-25.49],[37.33,-0.04],[0.05,-4.16],[21.98,-0.04],[0.1,-12.66],[19.98,-0.04],[0.07,-3.67],[-33.32,-0.02],[-0.03,-8.16],[-45.99,-0.04],[-0.03,-17.16],[3.98,-0.08],[0.08,-7.83],[-4,-0.05],[-0.02,-67.16],[52.65,-0.04],[0.01,-3.68],[-48.63,0.06],[-0.02,-12.99],[35.31,-0.03],[0.13,-3.67],[-39.32,-0.01],[-0.03,-5.83]],"v":[[-182.49,-270],[182.51,-270],[182.51,270],[-144.49,270],[-144.53,247.5],[-182.48,247.48],[-182.48,171.01],[-70.51,170.99],[-70.48,158.52],[-4.53,158.5],[-4.48,120.52],[55.47,120.5],[55.47,109.5],[-44.48,109.48],[-44.5,85.01],[-182.48,84.99],[-182.49,33.53],[-170.53,33.5],[-170.5,10.01],[-182.48,9.99],[-182.48,-191.48],[-24.52,-191.5],[-24.58,-202.53],[-170.48,-202.52],[-170.48,-241.48],[-64.56,-241.48],[-64.53,-252.5],[-182.48,-252.52]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.49,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":15,"op":16,"st":15,"bm":0,"sr":1},{"ddd":0,"ind":13,"ty":4,"nm":"Stripe 09_00014","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[-0.03,-5.8],[-121.66,0],[0,0],[102.33,0.03],[15.32,-0.22],[-0.04,-12.93],[-48.63,0.11],[0.04,-3.99],[-26.61,0.11],[0.01,-4.2],[-42.32,0],[0,0],[75.67,-0.03],[-0.03,-13],[-75.66,-0.01],[0,0],[121.67,-0.03],[-0.02,-38],[-52.65,-0.03],[0.07,-3.99],[-13.34,-0.06],[-0.03,-3.87],[65.97,-0.17],[-0.02,-17.13],[-121.66,-0.01],[0,0],[42.32,-0.01],[0.02,-4.2],[19.95,-0.17],[-0.04,-12.92],[-62.33,0],[0,0],[121.67,-0.03],[-0.03,-12.99],[-121.66,-0.01],[0,0],[0,0]],"o":[[0,0],[0.01,5.8],[121.66,0.2],[0,0],[-102.33,-0.11],[-15.33,0.06],[-0.04,12.92],[48.62,0.16],[-0.02,4],[26.61,0.16],[0.02,4.2],[42.32,0.01],[0,0],[-75.66,0.01],[-0.03,12.99],[75.66,0.03],[0,0],[-121.66,0.01],[-0.02,37.99],[52.66,0.04],[-0.07,3.99],[13.35,0.04],[-0.09,3.85],[-65.97,-0.11],[-0.04,17.13],[121.67,0.03],[0,0],[-42.32,0.01],[0.01,4.2],[-19.96,-0.11],[-0.04,12.93],[62.32,0.21],[0,0],[-121.66,0.01],[-0.03,12.99],[121.67,0.03],[0,0],[0,0],[0,-180]],"v":[[-479.5,-270],[114.49,-270],[114.52,-252.61],[479.5,-252.55],[479.5,-241.43],[172.5,-241.48],[126.52,-241.38],[126.52,-202.61],[272.39,-202.6],[272.56,-190.61],[352.39,-190.6],[352.55,-178],[479.5,-178],[479.5,-167],[252.51,-166.99],[252.51,-128.01],[479.5,-128],[479.5,-104],[114.51,-103.99],[114.51,9.99],[272.47,10.01],[272.52,21.99],[312.55,22.02],[312.44,33.6],[114.52,33.61],[114.51,84.99],[479.5,85],[479.5,108],[352.55,108],[352.39,120.6],[292.52,120.61],[292.52,159.38],[479.5,159.45],[479.5,171],[114.51,171.01],[114.51,209.99],[479.5,210],[479.5,270],[-479.5,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.03,12.99],[-121.66,0.01],[0,0],[121.67,0.03]],"o":[[121.67,-0.03],[0,0],[-121.66,-0.01],[-0.03,-12.99]],"v":[[-182.48,-19.49],[182.51,-19.5],[182.51,19.5],[-182.48,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.49,460.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.01,4.2],[-42.32,0.01],[0,0],[62.32,0.21],[-0.04,12.93],[-19.96,-0.11]],"o":[[42.32,-0.01],[0,0],[-62.33,0],[-0.04,-12.92],[19.95,-0.17],[0.02,-4.2]],"v":[[-33.44,-25.79],[93.51,-25.79],[93.51,25.66],[-93.47,25.59],[-93.47,-13.18],[-33.6,-13.19]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[866.49,403.79],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,37.99],[-121.66,0.01],[0,0],[121.67,0.03],[-0.04,17.13],[-65.97,-0.11],[-0.09,3.85],[13.35,0.04],[-0.07,3.99],[52.66,0.04]],"o":[[121.67,-0.03],[0,0],[-121.66,-0.01],[-0.02,-17.13],[65.97,-0.17],[-0.03,-3.87],[-13.34,-0.06],[0.07,-3.99],[-52.65,-0.03],[-0.02,-38]],"v":[[-182.48,-94.49],[182.51,-94.5],[182.51,94.5],[-182.48,94.49],[-182.47,43.11],[15.45,43.1],[15.56,31.52],[-24.47,31.49],[-24.52,19.51],[-182.48,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.49,260.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.03,12.99],[-75.66,0.01],[0,0],[75.66,0.03]],"o":[[75.67,-0.03],[0,0],[-75.66,-0.01],[-0.03,-13]],"v":[[-113.48,-19.49],[113.51,-19.5],[113.51,19.5],[-113.48,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[846.49,122.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.04,12.92],[-15.33,0.06],[-102.33,-0.11],[0,0],[42.32,0.01],[0.02,4.2],[26.61,0.16],[-0.02,4],[48.62,0.16]],"o":[[15.32,-0.22],[102.33,0.03],[0,0],[-42.32,0],[0.01,-4.2],[-26.61,0.11],[0.04,-3.99],[-48.63,0.11],[-0.04,-12.93]],"v":[[-176.47,-31.585],[-130.49,-31.685],[176.51,-31.635],[176.51,31.795],[49.56,31.795],[49.4,19.195],[-30.43,19.185],[-30.6,7.195],[-176.47,7.185]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[783.49,60.205],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0.01,5.8],[0,0],[0,0],[121.66,0.2]],"o":[[0,0],[0,0],[-121.66,0],[-0.03,-5.8]],"v":[[-182.505,-8.795],[182.505,-8.795],[182.505,8.655],[-182.475,8.595]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.495,8.795],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"mn":"ADBE Vector Group"}],"ip":14,"op":15,"st":14,"bm":0,"sr":1},{"ddd":0,"ind":14,"ty":4,"nm":"Stripe 09_00013","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[0,0],[121.67,-0.01],[0,-12.99],[-121.67,0],[0,0],[69,0],[0,-13],[-69,0],[0,0],[121.67,-0.01],[0,-12.99],[-121.67,0],[0,0],[42.33,0],[0,-13],[-42.33,0],[0,0],[121.67,0],[0,-13],[-121.67,0],[0,0],[0,0]],"o":[[0,0],[0,0],[-121.67,0],[0,12.99],[121.67,0.01],[0,0],[-69,0],[0,13],[69,0],[0,0],[-121.67,0],[0,12.99],[121.67,0.01],[0,0],[-42.33,0],[0,13],[42.33,0],[0,0],[-121.67,0],[0,13],[121.67,0],[0,0],[0,0],[0,-180]],"v":[[-479.5,-270],[479.5,-270],[479.5,-91.5],[114.5,-91.49],[114.5,-52.51],[479.5,-52.5],[479.5,-17],[272.5,-17],[272.5,22],[479.5,22],[479.5,33.5],[114.5,33.51],[114.5,72.49],[479.5,72.5],[479.5,108],[352.5,108],[352.5,147],[479.5,147],[479.5,171],[114.5,171],[114.5,210],[479.5,210],[479.5,270],[-479.5,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-121.67,0],[0,0],[121.67,0]],"o":[[121.67,0],[0,0],[-121.67,0],[0,-13]],"v":[[-182.5,-19.5],[182.5,-19.5],[182.5,19.5],[-182.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.5,460.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-42.33,0],[0,0],[42.33,0]],"o":[[42.33,0],[0,0],[-42.33,0],[0,-13]],"v":[[-63.5,-19.5],[63.5,-19.5],[63.5,19.5],[-63.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[896.5,397.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,12.99],[-121.67,0],[0,0],[121.67,0.01]],"o":[[121.67,-0.01],[0,0],[-121.67,0],[0,-12.99]],"v":[[-182.5,-19.49],[182.5,-19.5],[182.5,19.5],[-182.5,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.5,323],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-69,0],[0,0],[69,0]],"o":[[69,0],[0,0],[-69,0],[0,-13]],"v":[[-103.5,-19.5],[103.5,-19.5],[103.5,19.5],[-103.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[856.5,272.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,12.99],[-121.67,0],[0,0],[121.67,0.01]],"o":[[121.67,-0.01],[0,0],[-121.67,0],[0,-12.99]],"v":[[-182.5,-19.49],[182.5,-19.5],[182.5,19.5],[-182.5,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.5,198],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"mn":"ADBE Vector Group"}],"ip":13,"op":14,"st":13,"bm":0,"sr":1},{"ddd":0,"ind":15,"ty":4,"nm":"Stripe 09_00012","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[0,0],[121.67,0],[0,-13],[-121.67,0],[0,0],[69,0],[0,-13],[-69,0],[0,0],[121.67,0],[0,-13],[-121.67,0],[0,0],[42.33,0],[0,-13],[-42.33,0],[0,0],[0,0]],"o":[[0,0],[0,0],[-121.67,0],[0,13],[121.67,0],[0,0],[-69,0],[0,13],[69,0],[0,0],[-121.67,0],[-0.01,13],[121.67,0],[0,0],[-42.33,0],[0,13],[42.33,0],[0,0],[0,0],[0,-180]],"v":[[-479.5,-270],[479.5,-270],[479.5,-91.5],[114.5,-91.5],[114.5,-52.5],[479.5,-52.5],[479.5,-17],[272.5,-17],[272.5,22],[479.5,22],[479.5,33.5],[114.5,33.5],[114.5,72.5],[479.5,72.5],[479.5,108],[352.5,108],[352.5,147],[479.5,147],[479.5,270],[-479.5,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-42.33,0],[0,0],[42.33,0]],"o":[[42.33,0],[0,0],[-42.33,0],[0,-13]],"v":[[-63.5,-19.5],[63.5,-19.5],[63.5,19.5],[-63.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[896.5,397.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,13],[-121.67,0],[0,0],[121.67,0]],"o":[[121.67,0],[0,0],[-121.67,0],[0,-13]],"v":[[-182.495,-19.5],[182.505,-19.5],[182.505,19.5],[-182.495,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.495,323],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-69,0],[0,0],[69,0]],"o":[[69,0],[0,0],[-69,0],[0,-13]],"v":[[-103.5,-19.5],[103.5,-19.5],[103.5,19.5],[-103.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[856.5,272.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,13],[-121.67,0],[0,0],[121.67,0]],"o":[[121.67,0],[0,0],[-121.67,0],[0,-13]],"v":[[-182.5,-19.5],[182.5,-19.5],[182.5,19.5],[-182.5,19.5]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[777.5,198],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"}],"ip":12,"op":13,"st":12,"bm":0,"sr":1},{"ddd":0,"ind":16,"ty":4,"nm":"Stripe 09_00011","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,180],[0,0],[0,-7.5],[-12.34,-0.01],[0,0],[0,0]],"o":[[0,0],[0,7.5],[12.33,0.02],[0,0],[0,0],[0,-180]],"v":[[-479.5,-270],[442.5,-270],[442.5,-247.51],[479.5,-247.5],[479.5,270],[-479.5,270]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.5],[0,0],[0,0],[12.33,0.02]],"o":[[0,0],[0,0],[-12.34,-0.01],[0,-7.5]],"v":[[-18.5,-11.255],[18.5,-11.255],[18.5,11.245],[-18.5,11.235]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[941.5,11.255],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":11,"op":12,"st":11,"bm":0,"sr":1},{"ddd":0,"ind":17,"ty":4,"nm":"Stripe 09_00010","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,3.5],[0,0],[-0.03,-7.5],[-12.33,-0.01],[0,0],[0,0],[-0.02,172.33],[-4.66,0.03],[-0.07,4.17],[-12.65,0.02]],"o":[[0,0],[0,7.5],[12.33,0.02],[0,0],[0,0],[0.01,-172.33],[4.66,-0.03],[0.04,-4.16],[12.65,0.01],[0.02,-3.5]],"v":[[-427.495,-270],[442.505,-270],[442.515,-247.51],[479.505,-247.5],[479.505,270],[-479.495,270],[-479.485,-246.99],[-465.505,-247.01],[-465.465,-259.51],[-427.505,-259.51]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.495,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.5],[0,0],[0,0],[12.33,0.02]],"o":[[0,0],[0,0],[-12.33,-0.01],[-0.03,-7.5]],"v":[[-18.49,-11.255],[18.51,-11.255],[18.51,11.245],[-18.48,11.235]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[941.49,11.255],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"}],"ip":10,"op":11,"st":10,"bm":0,"sr":1},{"ddd":0,"ind":18,"ty":4,"nm":"Stripe 09_00009","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.67],[0,0],[-0.01,-7.49],[-12.33,0],[0,0],[45.67,-0.01],[0,-7.83],[-45.67,0],[0,0],[0,0],[0,172.33],[-17.33,0.01]],"o":[[0,0],[0,7.5],[12.33,0.01],[0,0],[-45.67,0.01],[0,7.83],[45.67,0],[0,0],[0,0],[0,-172.33],[17.33,-0.01],[0,-7.67]],"v":[[-427.5,-270],[442.5,-270],[442.5,-247.51],[479.5,-247.5],[479.5,-108.5],[342.5,-108.49],[342.5,-85],[479.5,-85],[479.5,270],[-479.5,270],[-479.5,-247],[-427.5,-247]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.5,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.83],[-45.67,0.01],[0,0],[45.67,0]],"o":[[45.67,-0.01],[0,0],[-45.67,0],[0,-7.83]],"v":[[-68.5,-11.74],[68.5,-11.75],[68.5,11.75],[-68.5,11.75]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[891.5,173.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.5],[0,0],[0,0],[12.33,0.01]],"o":[[0,0],[0,0],[-12.33,0],[-0.01,-7.49]],"v":[[-18.495,-11.25],[18.505,-11.25],[18.505,11.25],[-18.495,11.24]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[941.495,11.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"}],"ip":9,"op":10,"st":9,"bm":0,"sr":1},{"ddd":0,"ind":19,"ty":4,"nm":"Stripe 09_00008","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,7.66],[0,0],[-0.03,-7.5],[-12.33,-0.01],[0,0],[58.99,-0.02],[0.07,-4.33],[6.65,-0.02],[-0.02,-3.66],[-19.99,0.01],[-0.04,-8.17],[-45.66,0],[0,0],[52.33,-0.02],[-0.02,-3.66],[-48.66,0.01],[-0.04,-12.5],[-3.67,-0.01],[0,0],[0,0],[-0.02,47.33],[-32.66,0.02],[0.01,3.66],[32.66,0.02],[-0.08,104.83],[-192.65,0.02],[0.01,3.49],[192.66,0.02],[-0.01,12.99],[-17.33,0.02]],"o":[[0,0],[0,7.5],[12.33,0.02],[0,0],[-59,0.01],[-0.04,4.34],[-6.66,-0.01],[-0.02,3.66],[19.98,0.02],[0.08,8.17],[45.66,0.02],[0,0],[-52.33,0.01],[-0.02,3.66],[48.65,0.02],[0.07,12.5],[3.66,0.02],[0,0],[0,0],[0.01,-47.33],[32.66,-0.02],[0.02,-3.66],[-32.66,-0.03],[0,-104.83],[192.65,0.02],[0.01,-3.5],[-192.66,-0.02],[-0.02,-12.99],[17.33,-0.02],[0.02,-7.66]],"v":[[-427.48,-270],[442.52,-270],[442.53,-247.51],[479.52,-247.5],[479.52,-133.5],[302.53,-133.49],[302.49,-120.49],[282.53,-120.49],[282.53,-109.51],[342.49,-109.51],[342.53,-85.01],[479.52,-85],[479.52,191.5],[322.53,191.51],[322.53,202.49],[468.49,202.49],[468.53,239.99],[479.52,240],[479.52,270],[-479.48,270],[-479.47,128.01],[-381.49,127.99],[-381.49,117.01],[-479.47,116.99],[-479.44,-197.51],[98.51,-197.51],[98.51,-207.99],[-479.47,-208.01],[-479.47,-246.99],[-427.49,-247.01]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.48,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,3.66],[-52.33,0.01],[0,0],[3.66,0.02],[0.07,12.5],[48.65,0.02]],"o":[[52.33,-0.02],[0,0],[-3.67,-0.01],[-0.04,-12.5],[-48.66,0.01],[-0.02,-3.66]],"v":[[-78.485,-24.24],[78.505,-24.25],[78.505,24.25],[67.515,24.24],[67.475,-13.26],[-78.485,-13.26]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[881.495,485.75],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.04,4.34],[-59,0.01],[0,0],[45.66,0.02],[0.08,8.17],[19.98,0.02],[-0.02,3.66],[-6.66,-0.01]],"o":[[58.99,-0.02],[0,0],[-45.66,0],[-0.04,-8.17],[-19.99,0.01],[-0.02,-3.66],[6.65,-0.02],[0.07,-4.33]],"v":[[-78.485,-24.24],[98.505,-24.25],[98.505,24.25],[-38.485,24.24],[-38.525,-0.26],[-98.485,-0.26],[-98.485,-11.24],[-78.525,-11.24]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[861.495,160.75],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.5],[0,0],[0,0],[12.33,0.02]],"o":[[0,0],[0,0],[-12.33,-0.01],[-0.03,-7.5]],"v":[[-18.49,-11.255],[18.51,-11.255],[18.51,11.245],[-18.48,11.235]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[941.49,11.255],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"}],"ip":8,"op":9,"st":8,"bm":0,"sr":1},{"ddd":0,"ind":20,"ty":4,"nm":"Stripe 09_00007","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,12.33],[0,0],[-0.02,-7.5],[-12.33,-0.03],[0,0],[36.99,-0.02],[0.03,-4.17],[22,-0.02],[0.02,-12.66],[20,-0.02],[-0.01,-3.66],[-33.33,-0.01],[-0.03,-8.16],[-45.66,0],[0,0],[3.66,-0.02],[-0.02,-7.82],[-3.67,-0.01],[0,0],[52.34,-0.03],[-0.01,-3.66],[-48.66,0.02],[0,-13.01],[35.33,-0.03],[-0.01,-3.66],[-39,-0.03],[0,0],[0,0],[-0.02,30.66],[-59.33,0.02],[0.01,3.66],[59.33,0.03],[-0.02,12.99],[-32.66,0.02],[0.02,3.66],[32.66,0.02],[0,104.82],[-192.67,0.02],[0.02,11.82],[175.33,0.02]],"o":[[0,0],[0,7.5],[12.33,0.02],[0,0],[-37,0.01],[-0.03,4.16],[-22,-0.01],[-0.01,12.66],[-19.99,0.01],[-0.01,3.66],[33.33,0.02],[0.03,8.17],[45.66,0.02],[0,0],[-3.67,0.01],[0,7.83],[3.66,0.02],[0,0],[-52.33,0.02],[-0.01,3.66],[48.66,0.01],[0.07,13],[-35.33,0.02],[-0.01,3.66],[39,0.03],[0,0],[0,0],[0,-30.66],[59.33,-0.02],[0.02,-3.66],[-59.33,-0.03],[-0.01,-12.99],[32.66,-0.02],[0.02,-3.66],[-32.66,-0.02],[-0.02,-104.83],[192.67,-0.03],[0,-11.83],[-175.33,-0.02],[-0.02,-12.33]],"v":[[-427.495,-270],[442.505,-270],[442.515,-247.51],[479.505,-247.49],[479.505,-171],[368.515,-170.99],[368.495,-158.49],[302.505,-158.49],[302.495,-120.5],[242.505,-120.49],[242.505,-109.51],[342.495,-109.5],[342.515,-85.01],[479.505,-85],[479.505,-33.5],[468.505,-33.49],[468.515,-10.01],[479.505,-10],[479.505,191.5],[322.505,191.51],[322.505,202.49],[468.475,202.49],[468.495,241.5],[362.505,241.51],[362.505,252.49],[479.505,252.51],[479.505,270],[-479.495,270],[-479.485,178.01],[-301.505,177.99],[-301.505,167.01],[-479.485,166.99],[-479.485,128.01],[-381.505,127.99],[-381.505,117.01],[-479.485,116.99],[-479.495,-197.49],[98.505,-197.51],[98.495,-232.99],[-427.485,-233.01]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.495,270],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.01,3.66],[-52.33,0.02],[0,0],[39,0.03],[-0.01,3.66],[-35.33,0.02],[0.07,13],[48.66,0.01]],"o":[[52.34,-0.03],[0,0],[-39,-0.03],[-0.01,-3.66],[35.33,-0.03],[0,-13.01],[-48.66,0.02],[-0.01,-3.66]],"v":[[-78.495,-30.49],[78.505,-30.5],[78.505,30.51],[-38.495,30.49],[-38.495,19.51],[67.495,19.5],[67.475,-19.51],[-78.495,-19.51]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[881.495,492],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.83],[-3.67,0.01],[0,0],[3.66,0.02]],"o":[[3.66,-0.02],[0,0],[-3.67,-0.01],[-0.02,-7.82]],"v":[[-5.495,-11.74],[5.505,-11.75],[5.505,11.75],[-5.485,11.74]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[954.495,248.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.03,4.16],[-37,0.01],[0,0],[45.66,0.02],[0.03,8.17],[33.33,0.02],[-0.01,3.66],[-19.99,0.01],[-0.01,12.66],[-22,-0.01]],"o":[[36.99,-0.02],[0,0],[-45.66,0],[-0.03,-8.16],[-33.33,-0.01],[-0.01,-3.66],[20,-0.02],[0.02,-12.66],[22,-0.02],[0.03,-4.17]],"v":[[7.515,-42.99],[118.505,-43],[118.505,43],[-18.485,42.99],[-18.505,18.5],[-118.495,18.49],[-118.495,7.51],[-58.505,7.5],[-58.495,-30.49],[7.495,-30.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[841.495,142],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,7.5],[0,0],[0,0],[12.33,0.02]],"o":[[0,0],[0,0],[-12.33,-0.03],[-0.02,-7.5]],"v":[[-18.495,-11.255],[18.505,-11.255],[18.505,11.255],[-18.485,11.235]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[941.495,11.255],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"}],"ip":7,"op":8,"st":7,"bm":0,"sr":1},{"ddd":0,"ind":21,"ty":4,"nm":"Stripe 09_00006","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.21,4.13],[-260.25,0.12],[0,0],[0,0],[-0.3,1.61],[-26.48,0.45]],"o":[[260.25,-0.07],[0,0],[0,0],[0.32,-1.62],[26.48,-0.48],[0.1,-4.14]],"v":[[-349.995,-8.73],[430.755,-8.79],[430.755,8.8],[-430.755,8.8],[-429.865,3.95],[-350.395,3.67]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[529.245,531.2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.3,9.63],[-224.64,0.06],[-15.97,-0.24],[-0.11,-4.05],[-26.56,-0.09],[-0.1,-3.94],[-14.64,-0.17],[-33.92,0.07],[-0.1,-6.53],[0.52,-6.52],[289.84,-0.06],[0.09,3.93],[25.89,0.09],[0.15,7.52]],"o":[[224.63,-0.21],[15.97,0.08],[0.11,4.05],[26.55,0.52],[0.26,3.93],[14.62,0.55],[33.92,-0.02],[0.52,6.51],[-0.1,6.53],[-289.84,-0.06],[-0.27,-3.94],[-25.88,-0.52],[-0.6,-7.52],[0.11,-9.64]],"v":[[-473.87,-31.625],[200.04,-31.715],[247.96,-31.625],[248.12,-19.485],[327.81,-19.295],[328.13,-7.485],[372.04,-7.255],[473.8,-7.295],[474.04,12.285],[473.8,31.865],[-395.73,31.865],[-396.05,20.055],[-473.72,19.865],[-473.96,-2.715]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[474.96,479.715],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.17,12.94],[-240.31,0.06],[-33.63,-0.22],[0.16,-12.94],[213.3,-0.06],[60.63,0.21]],"o":[[240.3,-0.21],[33.63,0.07],[0.16,12.94],[-213.3,0.21],[-60.64,-0.06],[-0.18,-12.93]],"v":[[-410.9,-19.405],[310.01,-19.495],[410.92,-19.405],[410.92,19.415],[-228.99,19.505],[-410.9,19.415]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[411.99,417.495],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.16,2.16],[-35.25,-0.01],[-8.67,-0.21],[-275.67,-0.01],[0,0],[52.33,0.05],[13.28,-0.67],[-0.29,-3.69],[-13.24,-0.5],[-0.1,-3.92],[-52.29,-0.09],[0,0],[160.67,0],[112.95,0.31],[0.09,4.02],[13.2,0.32],[0.05,6.51],[-0.56,6.5],[-13.18,0.74],[0.3,7.45],[1.95,0.04],[43.92,0.03],[0.06,6.5],[0.11,29.35]],"o":[[35.25,-0.04],[8.67,0.12],[275.67,0.03],[0,0],[-52.33,-0.17],[-13.29,0.2],[-0.28,3.68],[13.24,0.5],[0.09,3.91],[52.28,0.32],[0,0],[-160.67,0],[-112.95,-0.09],[-0.1,-4.02],[-13.18,-0.73],[-0.56,-6.5],[0.05,-6.51],[13.2,-0.33],[0.3,-7.46],[-1.95,-0.15],[-43.92,0.06],[-0.55,-6.5],[-0.03,-29.35],[0.04,-2.16]],"v":[[-479.095,-94.01],[-373.355,-94.01],[-347.355,-94.49],[479.645,-94.48],[479.645,-42.86],[322.645,-42.94],[282.765,-42.67],[282.765,-31.61],[322.505,-31.35],[322.785,-19.61],[479.645,-19.48],[479.645,94.52],[-2.355,94.52],[-341.215,94.39],[-341.495,82.33],[-381.095,82.05],[-381.345,62.52],[-381.095,42.99],[-341.495,42.71],[-341.495,20.33],[-347.335,20.03],[-479.095,20.05],[-479.355,0.53],[-479.405,-87.52]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[480.355,279.48],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.56,6.18],[-260.51,0.06],[-0.1,-6.52],[0.52,-6.51],[19.88,-0.53],[0.11,-4.05],[108.97,-0.06],[131.63,0.21],[0.1,10.97]],"o":[[260.51,0.06],[0.52,6.52],[-0.1,6.53],[-19.89,0.1],[-0.11,4.04],[-108.97,0.21],[-131.64,-0.06],[-0.29,-10.97],[0.08,-6.19]],"v":[[-390.74,-25.85],[390.78,-25.85],[391.02,-6.27],[390.78,13.31],[331.1,13.5],[330.94,25.64],[4.02,25.73],[-390.89,25.64],[-390.98,-7.27]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[391.98,136.27],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.25,12.9],[-23.29,0.11],[-103.67,0],[0,0],[83,0],[43.95,0.32]],"o":[[23.29,-0.35],[103.67,0],[0,0],[-83,0],[-43.95,-0.1],[-0.25,-12.91]],"v":[[-190.31,-19.35],[-120.44,-19.49],[190.56,-19.49],[190.56,19.51],[-58.44,19.51],[-190.31,19.38]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[769.44,79.49],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.28,3.68],[-13.29,0.2],[-52.33,-0.17],[0,0],[52.28,0.32],[0.09,3.91],[13.24,0.5]],"o":[[13.28,-0.67],[52.33,0.05],[0,0],[-52.29,-0.09],[-0.1,-3.92],[-13.24,-0.5],[-0.29,-3.69]],"v":[[-98.295,-11.355],[-58.415,-11.625],[98.585,-11.545],[98.585,11.835],[-58.275,11.705],[-58.555,-0.035],[-98.295,-0.295]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[861.415,248.165],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":2,"mn":"ADBE Vector Group"}],"ip":6,"op":7,"st":6,"bm":0,"sr":1},{"ddd":0,"ind":22,"ty":4,"nm":"Stripe 09_00005","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.26,13.01],[-286.96,-0.06],[0,0],[286.98,0.01]],"o":[[286.96,0.12],[0,0],[-286.99,-0.02],[-0.01,-13.01]],"v":[[-430.31,-19.53],[430.57,-19.47],[430.57,19.53],[-430.39,19.52]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[529.43,341.98],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,12.99],[-267.33,-0.02],[0.02,-12.99],[267.33,0.02]],"o":[[267.33,-0.02],[0.01,12.99],[-267.33,0.01],[-0.07,-12.99]],"v":[[-400.965,-19.49],[401.015,-19.49],[401.015,19.49],[-400.965,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[401.975,267.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,13.01],[-260.32,-0.02],[0,0],[260.3,-0.11]],"o":[[260.32,0.01],[0,0],[-260.3,0.02],[-0.24,-13.01]],"v":[[-390.395,-19.52],[390.565,-19.51],[390.565,19.49],[-390.325,19.53]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[569.435,217.02],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,12.99],[-240.66,-0.01],[0.02,-12.99],[240.66,0.02]],"o":[[240.66,-0.02],[0.01,12.99],[-240.66,0.01],[-0.06,-12.99]],"v":[[-360.97,-19.49],[361.01,-19.49],[361.01,19.49],[-360.97,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[361.98,142.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.02,12.99],[-127,0.01],[0,0],[127,0.04]],"o":[[127,-0.03],[0,0],[-127,-0.01],[-0.02,-12.99]],"v":[[-190.485,-19.49],[190.505,-19.5],[190.505,19.5],[-190.485,19.48]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[769.495,79.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"mn":"ADBE Vector Group"}],"ip":5,"op":6,"st":5,"bm":0,"sr":1},{"ddd":0,"ind":23,"ty":4,"nm":"Stripe 09_00004","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.06,13.01],[-286.99,0],[0,0],[286.98,0]],"o":[[286.99,0.01],[0,0],[-286.98,-0.04],[-0.09,-13]],"v":[[-430.44,-19.515],[430.52,-19.505],[430.52,19.515],[-430.43,19.505]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[529.48,342.005],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.06,12.99],[-267.32,-0.02],[0.02,-12.99],[267.33,0.02]],"o":[[267.33,-0.02],[0.01,12.99],[-267.33,0.01],[-0.03,-12.99]],"v":[[-400.97,-19.49],[401.01,-19.49],[401.01,19.49],[-400.97,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[401.98,267.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-0.06,13.01],[-260.32,0],[0,0],[260.32,-0.01]],"o":[[260.32,0.01],[0,0],[-260.32,-0.03],[-0.09,-13]],"v":[[-390.44,-19.515],[390.52,-19.505],[390.52,19.515],[-390.43,19.505]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[569.48,217.005],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,12.99],[-240.66,-0.01],[0.01,-12.99],[240.66,0.02]],"o":[[240.66,-0.02],[0.02,12.99],[-240.66,0.02],[-0.08,-12.99]],"v":[[-360.96,-19.49],[361.02,-19.49],[361.02,19.49],[-360.96,19.49]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.02,0.001,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[361.97,142.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"mn":"ADBE Vector Group"}],"ip":4,"op":5,"st":4,"bm":0,"sr":1},{"ddd":0,"ind":24,"ty":4,"nm":"Stripe 09_00003","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[],"ip":3,"op":4,"st":3,"bm":0,"sr":1},{"ddd":0,"ind":25,"ty":4,"nm":"Stripe 09_00002","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[],"ip":2,"op":3,"st":2,"bm":0,"sr":1},{"ddd":0,"ind":26,"ty":4,"nm":"Stripe 09_00001","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[],"ip":1,"op":2,"st":1,"bm":0,"sr":1},{"ddd":0,"ind":27,"ty":4,"nm":"Stripe 09_00000","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[480,270,0]},"s":{"a":0,"k":[200,200,100]}},"ao":0,"shapes":[],"ip":0,"op":1,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":28,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1920,1080]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0,0,0,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"mn":"ADBE Vector Group"}],"ip":14,"op":37,"st":-27,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 4

//------------------------------------------------------------- Start Transition Stripe 5
var transitionStripe5 = {
  "v":"4.5.9","fr":30,"ip":0,"op":31,"w":1920,"h":1080,"ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":0,"ty":3,"nm":"NULL","ks":{"o":{"a":0,"k":0},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":0,"s":[45],"e":[0]},{"t":34}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[60,60,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,0.667]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p667_1_0p333_0","0p667_1_0p333_0","0p667_0p667_0p333_0p333"],"t":3,"s":[0,0,100],"e":[100,100,100]},{"t":26}]}},"ao":0,"ip":0,"op":300,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":2372},"y":{"a":0,"k":-274}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":10.938,"op":310.938,"st":10.938,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":2140},"y":{"a":0,"k":-318}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":17.7,"op":317.7,"st":17.7,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1948},"y":{"a":0,"k":-406}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":9.451,"op":309.451,"st":9.451,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1728},"y":{"a":0,"k":-454}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":8.659,"op":308.659,"st":8.659,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1636},"y":{"a":0,"k":-646}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":11.431,"op":311.431,"st":11.431,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1332},"y":{"a":0,"k":-618}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":14.651,"op":314.651,"st":14.651,"bm":0,"sr":1},{"ddd":0,"ind":7,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":2120},"y":{"a":0,"k":-26}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":5.856,"op":305.856,"st":5.856,"bm":0,"sr":1},{"ddd":0,"ind":8,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1888},"y":{"a":0,"k":-70}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":18.499,"op":318.499,"st":18.499,"bm":0,"sr":1},{"ddd":0,"ind":9,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1696},"y":{"a":0,"k":-158}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":6.378,"op":306.378,"st":6.378,"bm":0,"sr":1},{"ddd":0,"ind":10,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1476},"y":{"a":0,"k":-206}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":12.324,"op":312.324,"st":12.324,"bm":0,"sr":1},{"ddd":0,"ind":11,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1384},"y":{"a":0,"k":-398}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":12.898,"op":312.898,"st":12.898,"bm":0,"sr":1},{"ddd":0,"ind":12,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":26,"s":[950.162,-999.838,0],"e":[826.162,-875.838,0],"to":[0,0,0],"ti":[0,0,0]},{"t":37}]},"a":{"a":0,"k":[960,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":9.651,"op":309.651,"st":9.651,"bm":0,"sr":1},{"ddd":0,"ind":13,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":26,"s":[698.162,-751.838,0],"e":[574.162,-627.838,0],"to":[0,0,0],"ti":[0,0,0]},{"t":37}]},"a":{"a":0,"k":[960,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.639,"op":313.639,"st":13.639,"bm":0,"sr":1},{"ddd":0,"ind":14,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":26,"s":[190.162,-235.838,0],"e":[314.162,-359.838,0],"to":[0,0,0],"ti":[0,0,0]},{"t":37}]},"a":{"a":0,"k":[960,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":12.641,"op":312.641,"st":12.641,"bm":0,"sr":1},{"ddd":0,"ind":15,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":26,"s":[-51.838,10.162,0],"e":[72.162,-113.838,0],"to":[0,0,0],"ti":[0,0,0]},{"t":37}]},"a":{"a":0,"k":[960,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":14.892,"op":314.892,"st":14.892,"bm":0,"sr":1},{"ddd":0,"ind":16,"ty":0,"nm":"Shape 39 pre-comp","parent":58,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"s":true,"x":{"a":0,"k":960},"y":{"a":0,"k":540}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":19.892,"op":319.892,"st":19.892,"bm":0,"sr":1},{"ddd":0,"ind":17,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1864},"y":{"a":0,"k":230}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":24.29,"op":324.29,"st":24.29,"bm":0,"sr":1},{"ddd":0,"ind":18,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1632},"y":{"a":0,"k":186}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":14.291,"op":314.291,"st":14.291,"bm":0,"sr":1},{"ddd":0,"ind":19,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1440},"y":{"a":0,"k":98}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":16.27,"op":316.27,"st":16.27,"bm":0,"sr":1},{"ddd":0,"ind":20,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1220},"y":{"a":0,"k":50}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":10.183,"op":310.183,"st":10.183,"bm":0,"sr":1},{"ddd":0,"ind":21,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1128},"y":{"a":0,"k":-142}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.191,"op":313.191,"st":13.191,"bm":0,"sr":1},{"ddd":0,"ind":23,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1612},"y":{"a":0,"k":490}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":21.252,"op":321.252,"st":21.252,"bm":0,"sr":1},{"ddd":0,"ind":24,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1380},"y":{"a":0,"k":446}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":20.011,"op":320.011,"st":20.011,"bm":0,"sr":1},{"ddd":0,"ind":25,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1188},"y":{"a":0,"k":358}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":10.281,"op":310.281,"st":10.281,"bm":0,"sr":1},{"ddd":0,"ind":26,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":968},"y":{"a":0,"k":310}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":10.774,"op":310.774,"st":10.774,"bm":0,"sr":1},{"ddd":0,"ind":27,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":876},"y":{"a":0,"k":118}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":20.053,"op":320.053,"st":20.053,"bm":0,"sr":1},{"ddd":0,"ind":28,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1370},"y":{"a":0,"k":736}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.598,"op":313.598,"st":13.598,"bm":0,"sr":1},{"ddd":0,"ind":29,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1138},"y":{"a":0,"k":692}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":9.517,"op":309.517,"st":9.517,"bm":0,"sr":1},{"ddd":0,"ind":30,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":946},"y":{"a":0,"k":604}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":15.985,"op":315.985,"st":15.985,"bm":0,"sr":1},{"ddd":0,"ind":31,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":726},"y":{"a":0,"k":556}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":4.156,"op":304.156,"st":4.156,"bm":0,"sr":1},{"ddd":0,"ind":32,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":634},"y":{"a":0,"k":364}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":6.803,"op":306.803,"st":6.803,"bm":0,"sr":1},{"ddd":0,"ind":33,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1118},"y":{"a":0,"k":998}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":15.406,"op":315.406,"st":15.406,"bm":0,"sr":1},{"ddd":0,"ind":34,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":886},"y":{"a":0,"k":954}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":12.334,"op":312.334,"st":12.334,"bm":0,"sr":1},{"ddd":0,"ind":35,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":694},"y":{"a":0,"k":866}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":19.693,"op":319.693,"st":19.693,"bm":0,"sr":1},{"ddd":0,"ind":36,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":474},"y":{"a":0,"k":818}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":19.646,"op":319.646,"st":19.646,"bm":0,"sr":1},{"ddd":0,"ind":37,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":382},"y":{"a":0,"k":626}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":6.197,"op":306.197,"st":6.197,"bm":0,"sr":1},{"ddd":0,"ind":38,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":78},"y":{"a":0,"k":654}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":9.901,"op":309.901,"st":9.901,"bm":0,"sr":1},{"ddd":0,"ind":39,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1271.591},"y":{"a":0,"k":-790.471}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":20.743,"op":320.743,"st":20.743,"bm":0,"sr":1},{"ddd":0,"ind":40,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":1007.986},"y":{"a":0,"k":-562.014}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":20.743,"op":320.743,"st":20.743,"bm":0,"sr":1},{"ddd":0,"ind":41,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":775.815},"y":{"a":0,"k":-334.554}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":7.24,"op":307.24,"st":7.24,"bm":0,"sr":1},{"ddd":0,"ind":42,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":520},"y":{"a":0,"k":-78}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":3.684,"op":303.684,"st":3.684,"bm":0,"sr":1},{"ddd":0,"ind":43,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":268},"y":{"a":0,"k":182}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":14.796,"op":314.796,"st":14.796,"bm":0,"sr":1},{"ddd":0,"ind":44,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":26},"y":{"a":0,"k":428}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.721,"op":313.721,"st":13.721,"bm":0,"sr":1},{"ddd":0,"ind":45,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":-226},"y":{"a":0,"k":690}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":22.963,"op":322.963,"st":22.963,"bm":0,"sr":1},{"ddd":0,"ind":46,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":776},"y":{"a":0,"k":-620}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":20.252,"op":320.252,"st":20.252,"bm":0,"sr":1},{"ddd":0,"ind":47,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":520},"y":{"a":0,"k":-364}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":16.58,"op":316.58,"st":16.58,"bm":0,"sr":1},{"ddd":0,"ind":48,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":268},"y":{"a":0,"k":-104}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.27,"op":313.27,"st":13.27,"bm":0,"sr":1},{"ddd":0,"ind":49,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":26},"y":{"a":0,"k":142}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":5.711,"op":305.711,"st":5.711,"bm":0,"sr":1},{"ddd":0,"ind":50,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":-226},"y":{"a":0,"k":402}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":21.859,"op":321.859,"st":21.859,"bm":0,"sr":1},{"ddd":0,"ind":51,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":588},"y":{"a":0,"k":-716}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":16.043,"op":316.043,"st":16.043,"bm":0,"sr":1},{"ddd":0,"ind":52,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":336},"y":{"a":0,"k":-456}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":5.943,"op":305.943,"st":5.943,"bm":0,"sr":1},{"ddd":0,"ind":53,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":94},"y":{"a":0,"k":-210}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":19.135,"op":319.135,"st":19.135,"bm":0,"sr":1},{"ddd":0,"ind":54,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":-158},"y":{"a":0,"k":50}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":10.207,"op":310.207,"st":10.207,"bm":0,"sr":1},{"ddd":0,"ind":55,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":198},"y":{"a":0,"k":-580}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":13.209,"op":313.209,"st":13.209,"bm":0,"sr":1},{"ddd":0,"ind":56,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":-54},"y":{"a":0,"k":-320}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":16.514,"op":316.514,"st":16.514,"bm":0,"sr":1},{"ddd":0,"ind":57,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":-78},"y":{"a":0,"k":-580}},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":14.288,"op":314.288,"st":14.288,"bm":0,"sr":1},{"ddd":0,"ind":58,"ty":0,"nm":"Shape 39 pre-comp","parent":0,"refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":-45},"p":{"s":true,"x":{"a":0,"k":330},"y":{"a":0,"k":392}},"a":{"a":0,"k":[960,540,0]},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":36,"s":[100,100,100],"e":[100,100,100]},{"t":42}]}},"ao":0,"w":1920,"h":1080,"ip":19.892,"op":319.892,"st":19.892,"bm":0,"sr":1}]},{"id":"comp_1","layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Shape Layer 108","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[207.5,619.5,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"n":"0p25_1_0p75_0","t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[48.409,-502.5],[102.714,-502.5]],"c":false}],"e":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-34.436,-502],[216.5,-502]],"c":false}]},{"t":20}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.66],"y":[-0.213]},"o":{"x":[0.889],"y":[0]},"n":["0p66_-0p213_0p889_0"],"t":0.541,"s":[0],"e":[50]},{"i":{"x":[0],"y":[1]},"o":{"x":[0.194],"y":[0.474]},"n":["0_1_0p194_0p474"],"t":4.324,"s":[50],"e":[217]},{"t":12.973}]},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":1,"op":301,"st":1,"bm":0,"sr":1}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Shape 39 pre-comp 2","refId":"comp_0","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[960,540,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":1920,"h":1080,"ip":1,"op":294,"st":-6,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 5

//------------------------------------------------------------- Start Transition Stripe 6
var transitionStripe6 = {
  "v":"4.5.9","fr":30,"ip":0,"op":18,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 120","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[1640,1078,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.404,0.4,0.451,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-4.971,"s":[0],"e":[100]},{"t":12.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":11,"op":30,"st":-12.971,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 119","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[1216,942,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.22,0.22,0.251,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-6.971,"s":[0],"e":[100]},{"t":10.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":9,"op":28,"st":-14.971,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 118","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[940,742,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.722,0.722,0.749,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-8.971,"s":[0],"e":[100]},{"t":8.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":7,"op":24,"st":-16.971,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 117","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[668,530,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.404,0.4,0.451,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-10.971,"s":[0],"e":[100]},{"t":6.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":5,"op":26,"st":-18.971,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 116","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[416,302,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.22,0.22,0.251,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-12.971,"s":[0],"e":[100]},{"t":4.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":3,"op":20,"st":-20.971,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Shape Layer 115","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[232,46,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100.188,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1107.917,636],[1213.624,-678]],"c":false}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.722,0.722,0.749,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"w":{"a":0,"k":329},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":-14.971,"s":[0],"e":[100]},{"t":2.029}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 2","mn":"ADBE Vector Filter - Trim"}],"ip":1,"op":22,"st":-22.971,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Stripe 6

//------------------------------------------------------------- Start Transition Triangle 1
var transitionTriangle1 = {
  "v":"4.5.9","fr":30,"ip":0,"op":15,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":4,"s":[0],"e":[-148]},{"t":22}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,1,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0,0.333]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p667_0p667_0p333_0p333"],"t":4,"s":[100,100,100],"e":[7551,7551,100]},{"t":22}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-17,-43],[-17,42.5],[55.5,-0.25]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.957,0.933,0.878,1]}, "nm":".animation_svg_color_3", "cl":"animation_svg_color_3","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":4,"op":458,"st":-41,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":2,"s":[0],"e":[-148]},{"t":20}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,1,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0,0.333]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p667_0p667_0p333_0p333"],"t":2,"s":[100,100,100],"e":[7551,7551,100]},{"t":20}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-17,-43],[-17,42.5],[55.5,-0.25]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":2,"op":456,"st":-43,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":1,"s":[0],"e":[-148]},{"t":19}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,1,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0,0.333]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p667_0p667_0p333_0p333"],"t":1,"s":[100,100,100],"e":[7551,7551,100]},{"t":19}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-17,-43],[-17,42.5],[55.5,-0.25]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.886,0.286,0.235,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":1,"op":455,"st":-44,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Triangle 1

//------------------------------------------------------------- Start Transition Triangle 2
var transitionTriangle2 = {
  "v":"4.5.9","fr":30,"ip":0,"op":14,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":90},"p":{"a":0,"k":[960,516,0]},"a":{"a":0,"k":[19.25,-0.25,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,1,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0,0.333]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p667_0p667_0p333_0p333"],"t":1.091,"s":[100,100,100],"e":[7551,7551,100]},{"t":19.091}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-17,-43],[-17,42.5],[55.5,-0.25]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.957,0.933,0.878,1]}, "nm":".animation_svg_color_2", "cl":"animation_svg_color_2","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":1.091,"op":454,"st":-43.909,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":90},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[19.25,-0.25,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.667],"y":[1,1,0.667]},"o":{"x":[0.75,0.75,0.333],"y":[0,0,0.333]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p667_0p667_0p333_0p333"],"t":0.091,"s":[100,100,100],"e":[7551,7551,100]},{"t":18.091}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-17,-43],[-17,42.5],[55.5,-0.25]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.886,0.286,0.235,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"mn":"ADBE Vector Group"}],"ip":0.091,"op":453,"st":-44.909,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Triangle 2

//------------------------------------------------------------- Start Transition Triangle 3
var transitionTriangle3 = {
  "v":"4.5.9","fr":30,"ip":0,"op":22,"w":1920,"h":1080,"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 3","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":10,"s":[-27],"e":[85]},{"t":19}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[46,62,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":5,"s":[0,0,100],"e":[767,767,100]},{"t":28}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sr","sy":2,"d":1,"pt":{"a":0,"k":3,"ix":3},"p":{"a":0,"k":[0,0],"ix":4},"r":{"a":0,"k":0,"ix":5},"or":{"a":0,"k":254.377,"ix":7},"os":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5,"s":[50],"e":[15]},{"t":28}],"ix":9},"ix":1,"nm":"Polystar Path 1","mn":"ADBE Vector Shape - Star"},{"ty":"fl","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[52.231,63.958],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Polystar 1","np":3,"mn":"ADBE Vector Group"}],"ip":5,"op":305,"st":5,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 2","ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"n":["0p25_1_0p75_0"],"t":7,"s":[-24],"e":[97]},{"t":15}]},"p":{"a":0,"k":[960,540,0]},"a":{"a":0,"k":[46,62,0]},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.833],"y":[1,1,0.833]},"o":{"x":[0.75,0.75,0.167],"y":[0,0,0.167]},"n":["0p25_1_0p75_0","0p25_1_0p75_0","0p833_0p833_0p167_0p167"],"t":0,"s":[0,0,100],"e":[775,775,100]},{"t":23}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sr","sy":2,"d":1,"pt":{"a":0,"k":3,"ix":3},"p":{"a":0,"k":[0,0],"ix":4},"r":{"a":0,"k":0,"ix":5},"or":{"a":0,"k":254.377,"ix":7},"os":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":5,"s":[50],"e":[15]},{"t":28}],"ix":9},"ix":1,"nm":"Polystar Path 1","mn":"ADBE Vector Shape - Star"},{"ty":"fl","c":{"a":0,"k":[0.969,0.694,0.125,1]}, "nm":".animation_svg_color_1", "cl":"animation_svg_color_1","o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[52.231,63.958],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Polystar 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":300,"st":0,"bm":0,"sr":1}]
};
//------------------------------------------------------------- END Transition Triangle 3
