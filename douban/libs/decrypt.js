
var i = 16
var Q = 4096
var p = {
    start: 2,
    end: 7
}
var K = {}
K.read = function(t, e, r, n, o) {
    var i, a, s = 8 * o - n - 1, u = (1 << s) - 1, c = u >> 1, f = -7, l = r ? o - 1 : 0, h = r ? -1 : 1, p = t[e + l];
    for (l += h,
             i = p & (1 << -f) - 1,
             p >>= -f,
             f += s; f > 0; i = 256 * i + t[e + l],
             l += h,
             f -= 8)
        ;
    for (a = i & (1 << -f) - 1,
             i >>= -f,
             f += n; f > 0; a = 256 * a + t[e + l],
             l += h,
             f -= 8)
        ;
    if (0 === i)
        i = 1 - c;
    else {
        if (i === u)
            return a ? NaN : 1 / 0 * (p ? -1 : 1);
        a += Math.pow(2, n),
            i -= c
    }
    return (p ? -1 : 1) * a * Math.pow(2, i - n)
}

K.write = function(t, e, r, n, o, i) {
    var a, s, u, c = 8 * i - o - 1, f = (1 << c) - 1, l = f >> 1, h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : i - 1, d = n ? 1 : -1, m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e),
             isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
                 a = f) : (a = Math.floor(Math.log(e) / Math.LN2),
             e * (u = Math.pow(2, -a)) < 1 && (a--,
                 u *= 2),
                 e += a + l >= 1 ? h / u : h * Math.pow(2, 1 - l),
             e * u >= 2 && (a++,
                 u /= 2),
                 a + l >= f ? (s = 0,
                     a = f) : a + l >= 1 ? (s = (e * u - 1) * Math.pow(2, o),
                     a += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, o),
                     a = 0)); o >= 8; t[r + p] = 255 & s,
             p += d,
             s /= 256,
             o -= 8)
        ;
    for (a = a << o | s,
             c += o; c > 0; t[r + p] = 255 & a,
             p += d,
             a /= 256,
             c -= 8)
        ;
    t[r + p - d] |= 128 * m
}

encry2arr_from = function(t, e, r) {  // 1  39  50  66
    return from_a(null, t, e, r)
}


function hash(e) {
    return "string" == typeof e && (e = encry2arr_from(e)),to_string.call((0,o_default)(e, 41405), 16).replace(/^0+/, "")
}



function to_number() {
    return 65536 * this._a16 + this._a00
}



function to_string(t) {
    t = t || 10;
    var e = new i_i(t);
    if (!gt.call(this, e))
        return to_number.call(this).toString(t);
    for (var r = clone.call(this), n = new Array(64), o = 63; o >= 0 && (div.call(r, e),
        n[o] = to_number.call(r.remainder).toString(t),gt.call(r,e)); o--);
    return n[o - 1] = to_number.call(r).toString(t),
        n.join("")
}



gt = function(t) {
    return this._a48 > t._a48 || !(this._a48 < t._a48) && (this._a32 > t._a32 || !(this._a32 < t._a32) && (this._a16 > t._a16 || !(this._a16 < t._a16) && this._a00 > t._a00))
}



function div(t) {
    for (var e = clone.call(t), r = -1; !lt.call(this, e); )
        shiftLeft.call(e, 1, !0),
            r++;
    for (this.remainder = clone.call(this),
             this._a00 = 0,
             this._a16 = 0,
             this._a32 = 0,
             this._a48 = 0; r >= 0; r--)
        shiftRight.call(e, 1),
        lt.call(this.remainder, e) || (subtract(this.remainder, e),
            r >= 48 ? this._a48 |= 1 << r - 48 : r >= 32 ? this._a32 |= 1 << r - 32 : r >= 16 ? this._a16 |= 1 << r - 16 : this._a00 |= 1 << r);
    return this
}



function eq(t) {
    return this._a48 == t._a48 && this._a00 == t._a00 && this._a32 == t._a32 && this._a16 == t._a16
}



function lt(t) {
    return this._a48 < t._a48 || !(this._a48 > t._a48) && (this._a32 < t._a32 || !(this._a32 > t._a32) && (this._a16 < t._a16 || !(this._a16 > t._a16) && this._a00 < t._a00))
}



function shiftLeft(t, e) {
    return t %= 64,
        t >= 48 ? (this._a48 = this._a00 << t - 48,
            this._a32 = 0,
            this._a16 = 0,
            this._a00 = 0) : t >= 32 ? (t -= 32,
            this._a48 = this._a16 << t | this._a00 >> 16 - t,
            this._a32 = this._a00 << t & 65535,
            this._a16 = 0,
            this._a00 = 0) : t >= 16 ? (t -= 16,
            this._a48 = this._a32 << t | this._a16 >> 16 - t,
            this._a32 = 65535 & (this._a16 << t | this._a00 >> 16 - t),
            this._a16 = this._a00 << t & 65535,
            this._a00 = 0) : (this._a48 = this._a48 << t | this._a32 >> 16 - t,
            this._a32 = 65535 & (this._a32 << t | this._a16 >> 16 - t),
            this._a16 = 65535 & (this._a16 << t | this._a00 >> 16 - t),
            this._a00 = this._a00 << t & 65535),
    e || (this._a48 &= 65535),
        this
}



var t = {
    'getState': function(e) {
        return a(e)
    },
    'dispatch': function o() {
        return p
    }
}
var Ut = {
    "$UID": "j",
    "$defaultRootUID": 4,
    "$keys": "z",
    "$vals": "k",
    "crypto":{
        "decrypt": function n(t, e) {
            return r_decrypt(t, e)
        },
        "encrypt": function r(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hjasbdn2ih823rgwudsde7e2dhsdhas";
            "string" == typeof r && (r = [].map.call(r, function(t) {
                return t.charCodeAt(0)
            }));
            for (var n, o = [], i = 0, a = new t(e.length), s = 0; s < 256; s++)
                o[s] = s;
            for (s = 0; s < 256; s++)
                i = (i + o[s] + r[s % r.length]) % 256,
                    n = o[s],
                    o[s] = o[i],
                    o[i] = n;
            s = 0,
                i = 0;
            for (var u = 0; u < e.length; u++)
                s = (s + 1) % 256,
                    i = (i + o[s]) % 256,
                    n = o[s],
                    o[s] = o[i],
                    o[i] = n,
                    a[u] = e[u] ^ o[(o[s] + o[i]) % 256];
            return a
        }
    },
    "getRealUID": function(t) {
        if (t >= p.start) {
            var e = p.end - p.start;
            if (t < p.end)
                return t + e;
            if (t < p.end + e)
                return t - e
        }
        return t
    },
    "getType": function o(t) {
        return Object.prototype.toString.call(t).slice(8, -1)
    }

}




function from_a(t, e, r, n) {  // 2  38  51  65
    return false ? h(t, e, r, n) : "string" == typeof e ? f(t, e, r) : p(t, e)
}


function f(t, e, r) {  // 3  5  18  22  37  52  54  58  62  64
    var n = 0 | y(e, r);
    t = o_19(t, n);
    var a = write(t, e, r);
    return a !== n && (t = t.slice(0, a)),
        t
}




function y(t, e) {  // 6  8  17  55  57
    if (false)
        return t.length;
    if (false)
        return t.byteLength;
    "string" != typeof t && (t = "" + t);
    var r = t.length;
    if (0 === r)
        return 0;
    for (var n = !1; ; )
        switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
            case void 0:
                return Y(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return V(t).length;
            default:
                if (n)
                    return Y(t).length;
                e = ("" + e).toLowerCase(),
                    n = !0
        }
}




function toByteArray(t) {  // 13  30  32
    var f = {
        43: 62,
        45: 62,
        47: 63,
        48: 52,
        49: 53,
        50: 54,
        51: 55,
        52: 56,
        53: 57,
        54: 58,
        55: 59,
        56: 60,
        57: 61,
        65: 0,
        66: 1,
        67: 2,
        68: 3,
        69: 4,
        70: 5,
        71: 6,
        72: 7,
        73: 8,
        74: 9,
        75: 10,
        76: 11,
        77: 12,
        78: 13,
        79: 14,
        80: 15,
        81: 16,
        82: 17,
        83: 18,
        84: 19,
        85: 20,
        86: 21,
        87: 22,
        88: 23,
        89: 24,
        90: 25,
        95: 63,
        97: 26,
        98: 27,
        99: 28,
        100: 29,
        101: 30,
        102: 31,
        103: 32,
        104: 33,
        105: 34,
        106: 35,
        107: 36,
        108: 37,
        109: 38,
        110: 39,
        111: 40,
        112: 41,
        113: 42,
        114: 43,
        115: 44,
        116: 45,
        117: 46,
        118: 47,
        119: 48,
        120: 49,
        121: 50,
        122: 51,
    }
    var e, r, o, i, a, s, u = t.length;
    a = n_is_4(t),
        s = new Uint8Array(3 * u / 4 - a),
        o = a > 0 ? u - 4 : u;
    var c = 0;
    for (e = 0,
             r = 0; e < o; e += 4,
             r += 3)
        i = f[t.charCodeAt(e)] << 18 | f[t.charCodeAt(e + 1)] << 12 | f[t.charCodeAt(e + 2)] << 6 | f[t.charCodeAt(e + 3)],
            s[c++] = i >> 16 & 255,
            s[c++] = i >> 8 & 255,
            s[c++] = 255 & i;
    return 2 === a ? (i = f[t.charCodeAt(e)] << 2 | f[t.charCodeAt(e + 1)] >> 4,
        s[c++] = 255 & i) : 1 === a && (i = f[t.charCodeAt(e)] << 10 | f[t.charCodeAt(e + 1)] << 4 | f[t.charCodeAt(e + 2)] >> 2,
        s[c++] = i >> 8 & 255,
        s[c++] = 255 & i),
        s
}




function V(t) {  // 9  13  16  25  29  33
    return toByteArray(q(t))
}


function q(t) {  // 10  12  26  28
    if (t = z(t).replace(/[^+\/0-9A-Za-z-_]/g, ""),
    t.length < 2)
        return "";
    for (; t.length % 4 != 0; )
        t += "=";
    return t
}


function z(t) {  // 11  27
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
}



function n_is_4(t) {  // 14  31
    var e = t.length;
    if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
}


function i(t) {  // 15
    var e, r, o, i, a, s, u = t.length;
    a = n(t),
        s = new Uint8Array(3 * u / 4 - a),
        o = a > 0 ? u - 4 : u;
    var c = 0;
    for (e = 0,
             r = 0; e < o; e += 4,
             r += 3)
        i = f[t.charCodeAt(e)] << 18 | f[t.charCodeAt(e + 1)] << 12 | f[t.charCodeAt(e + 2)] << 6 | f[t.charCodeAt(e + 3)],
            s[c++] = i >> 16 & 255,
            s[c++] = i >> 8 & 255,
            s[c++] = 255 & i;
    return 2 === a ? (i = f[t.charCodeAt(e)] << 2 | f[t.charCodeAt(e + 1)] >> 4,
        s[c++] = 255 & i) : 1 === a && (i = f[t.charCodeAt(e)] << 10 | f[t.charCodeAt(e + 1)] << 4 | f[t.charCodeAt(e + 2)] >> 2,
        s[c++] = i >> 8 & 255,
        s[c++] = 255 & i),
        s
}


function o_19(t, e) {  // 19  21  59  61
    return true ? (t = new Uint8Array(e),
        t.__proto__ = Uint8Array.prototype) : (null === t && (t = new i(e)),
        t.length = e),
        t
}





function Y(t, e) {
    e = e || 1 / 0;
    for (var r, n = t.length, o = null, i = [], a = 0; a < n; ++a) {
        if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
            if (!o) {
                if (r > 56319) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue
                }
                if (a + 1 === n) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue
                }
                o = r;
                continue
            }
            if (r < 56320) {
                (e -= 3) > -1 && i.push(239, 191, 189),
                    o = r;
                continue
            }
            r = 65536 + (o - 55296 << 10 | r - 56320)
        } else
            o && (e -= 3) > -1 && i.push(239, 191, 189);
        if (o = null,
        r < 128) {
            if ((e -= 1) < 0)
                break;
            i.push(r)
        } else if (r < 2048) {
            if ((e -= 2) < 0)
                break;
            i.push(r >> 6 | 192, 63 & r | 128)
        } else if (r < 65536) {
            if ((e -= 3) < 0)
                break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
        } else {
            if (!(r < 1114112))
                throw new Error("Invalid code point");
            if ((e -= 4) < 0)
                break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
        }
    }
    return i
}



function write_E(t, e, r, n) {
    return X(Y(e, t.length - r), t, r, n)
}



function write(k, t, e, r, n) {  // 23  37  63
    if (void 0 === e)
        n = "utf8",
            r = k.length,
            e = 0;
    else if (void 0 === r && "string" == typeof e)
        n = e,
            r = k.length,
            e = 0;
    else {
        if (!isFinite(e))
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        e |= 0,
            isFinite(r) ? (r |= 0,
            void 0 === n && (n = "utf8")) : (n = r,
                r = void 0)
    }
    var o = k.length - e;
    if ((void 0 === r || r > o) && (r = o),
    t.length > 0 && (r < 0 || e < 0) || e > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    for (var i = !1; ; )
        switch (n) {
            case "hex":
                return _(k, t, e, r);
            case "utf8":
            case "utf-8":
                return write_E(k, t, e, r);
            case "ascii":
                return A(k, t, e, r);
            case "latin1":
            case "binary":
                return C(k, t, e, r);
            case "base64":
                return S_24(k, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return x(k, t, e, r);
            default:
                if (i)
                    throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(),
                    i = !0
        }
}


function S_24(t, e, r, n) {  // 24  34  36
    return X(V(e), t, r, n)
}


function X(t, e, r, n) {  // 35
    for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
        e[o + r] = t[o];
    return o
}


function a_slice(k, t, e) {  // 42  44  46  115  126  132  138  144  148
    var r = k.length;
    t = ~~t,
        e = void 0 === e ? r : ~~e,
        t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
    e < t && (e = t);
    var n;
    if (true)
        n = k.subarray(t, e),
            n.__proto__ = k.prototype;
    else {
        var o = e - t;
        n = new i(o,void 0);
        for (var a = 0; a < o; ++a)
            n[a] = this[a + t]
    }
    return n
}


function c(t, e) {
    if (undefined,
        t = o_19(t, e < 0 ? 0 : 0 | e),
        !true)
        for (var r = 0; r < e; ++r)
            t[r] = 0;
    return t
}


function allocUnsafe(t) {
    return c(null, t)
}



function a_68_copy(k, t, e, r, n) {
    if (r || (r = 0),
    n || 0 === n || (n = k.length),
    e >= t.length && (e = t.length),
    e || (e = 0),
    n > 0 && n < r && (n = r),
    n === r)
        return 0;
    if (0 === t.length || 0 === k.length)
        return 0;
    if (e < 0)
        throw new RangeError("targetStart out of bounds");
    if (r < 0 || r >= k.length)
        throw new RangeError("sourceStart out of bounds");
    if (n < 0)
        throw new RangeError("sourceEnd out of bounds");
    n > k.length && (n = k.length),
    t.length - e < n - r && (n = t.length - e + r);
    var o, a = n - r;
    if (k === t && r < e && e < n)
        for (o = a - 1; o >= 0; --o)
            t[o + e] = k[o + r];
    else if (a < 1e3 || !true)
        for (o = 0; o < a; ++o)
            t[o + e] = k[o + r];
    else
        Uint8Array.prototype.set.call(t, k.subarray(r, r + a), e);
    return a
}



function concat(t, e) {  // 48  68
    if (false)
        throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t.length)
        return i.alloc(0);
    var r;
    if (void 0 === e)
        for (e = 0,
                 r = 0; r < t.length; ++r)
            e += t[r].length;
    var n = allocUnsafe(e)
        , o = 0;
    for (r = 0; r < t.length; ++r) {
        var a = t[r];
        a_68_copy(a, n, o),
            o += a.length
    }
    return n
}


function a(e) {  // 70  92  94
    return "string" == typeof e && (e = t.from(e)),
        (0,
            h.default)(e, 41405).toString(16).replace(/^0+/, "")
}


function i_update(t, e, r) {
    if (!(true || this instanceof i_update))
        return new i(t,e,r);
    if ("number" == typeof t) {
        if ("string" == typeof e)
            throw new Error("If encoding is specified then the first argument must be a string");
        return c(this, t)
    }
    return a_g_Bt(this, t, e, r)
}



function r_e(n) {
    if (r[n])
        return r[n].exports;
    var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
    };
    return t[n].call(o.exports, o, o.exports, e),
        o.l = !0,
        o.exports
}



function update(kkk, t) {  // 88
    var r, o = "string" == typeof t;
    o && (t = n(t),
        o = !1,
        r = !0),
    "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer && (r = !0,
        t = new Uint8Array(t));
    var i = 0
        , c = t.length
        , f = i + c;
    if (0 == c)
        return kkk;
    if (kkk.total_len += c,
    0 == kkk.memsize && (kkk.memory = o ? "" : r ? new Uint8Array(32) : new i_update(32)),
    kkk.memsize + c < 32)
        return o ? kkk.memory += t : r ? kkk.memory.set(t.subarray(0, c), kkk.memsize) : a_68_copy(t, kkk.memory, kkk.memsize, 0, c),
            kkk.memsize += c,
            kkk;
    if (kkk.memsize > 0) {
        o ? kkk.memory += t.slice(0, 32 - kkk.memsize) : r ? kkk.memory.set(t.subarray(0, 32 - kkk.memsize), kkk.memsize) : t.copy(kkk.memory, kkk.memsize, 0, 32 - kkk.memsize);
        var l = 0;
        if (o) {
            var h;
            h = a(kkk.memory.charCodeAt(l + 1) << 8 | kkk.memory.charCodeAt(l), kkk.memory.charCodeAt(l + 3) << 8 | kkk.memory.charCodeAt(l + 2), kkk.memory.charCodeAt(l + 5) << 8 | kkk.memory.charCodeAt(l + 4), kkk.memory.charCodeAt(l + 7) << 8 | kkk.memory.charCodeAt(l + 6)),
                kkk.v1.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory.charCodeAt(l + 1) << 8 | kkk.memory.charCodeAt(l), kkk.memory.charCodeAt(l + 3) << 8 | kkk.memory.charCodeAt(l + 2), kkk.memory.charCodeAt(l + 5) << 8 | kkk.memory.charCodeAt(l + 4), kkk.memory.charCodeAt(l + 7) << 8 | kkk.memory.charCodeAt(l + 6)),
                kkk.v2.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory.charCodeAt(l + 1) << 8 | kkk.memory.charCodeAt(l), kkk.memory.charCodeAt(l + 3) << 8 | kkk.memory.charCodeAt(l + 2), kkk.memory.charCodeAt(l + 5) << 8 | kkk.memory.charCodeAt(l + 4), kkk.memory.charCodeAt(l + 7) << 8 | kkk.memory.charCodeAt(l + 6)),
                kkk.v3.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory.charCodeAt(l + 1) << 8 | kkk.memory.charCodeAt(l), kkk.memory.charCodeAt(l + 3) << 8 | kkk.memory.charCodeAt(l + 2), kkk.memory.charCodeAt(l + 5) << 8 | kkk.memory.charCodeAt(l + 4), kkk.memory.charCodeAt(l + 7) << 8 | kkk.memory.charCodeAt(l + 6)),
                kkk.v4.add(h.multiply(u)).rotl(31).multiply(s)
        } else {
            var h;
            h = a(kkk.memory[l + 1] << 8 | kkk.memory[l], kkk.memory[l + 3] << 8 | kkk.memory[l + 2], kkk.memory[l + 5] << 8 | kkk.memory[l + 4], kkk.memory[l + 7] << 8 | kkk.memory[l + 6]),
                kkk.v1.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory[l + 1] << 8 | kkk.memory[l], kkk.memory[l + 3] << 8 | kkk.memory[l + 2], kkk.memory[l + 5] << 8 | kkk.memory[l + 4], kkk.memory[l + 7] << 8 | kkk.memory[l + 6]),
                kkk.v2.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory[l + 1] << 8 | kkk.memory[l], kkk.memory[l + 3] << 8 | kkk.memory[l + 2], kkk.memory[l + 5] << 8 | kkk.memory[l + 4], kkk.memory[l + 7] << 8 | kkk.memory[l + 6]),
                kkk.v3.add(h.multiply(u)).rotl(31).multiply(s),
                l += 8,
                h = a(kkk.memory[l + 1] << 8 | kkk.memory[l], kkk.memory[l + 3] << 8 | kkk.memory[l + 2], kkk.memory[l + 5] << 8 | kkk.memory[l + 4], kkk.memory[l + 7] << 8 | kkk.memory[l + 6]),
                kkk.v4.add(h.multiply(u)).rotl(31).multiply(s)
        }
        i += 32 - kkk.memsize,
            kkk.memsize = 0,
        o && (kkk.memory = "")
    }
    if (i <= f - 32) {
        var p = f - 32;
        do {
            if (o) {
                var h;
                h = a(t.charCodeAt(i + 1) << 8 | t.charCodeAt(i), t.charCodeAt(i + 3) << 8 | t.charCodeAt(i + 2), t.charCodeAt(i + 5) << 8 | t.charCodeAt(i + 4), t.charCodeAt(i + 7) << 8 | t.charCodeAt(i + 6)),
                    kkk.v1.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t.charCodeAt(i + 1) << 8 | t.charCodeAt(i), t.charCodeAt(i + 3) << 8 | t.charCodeAt(i + 2), t.charCodeAt(i + 5) << 8 | t.charCodeAt(i + 4), t.charCodeAt(i + 7) << 8 | t.charCodeAt(i + 6)),
                    kkk.v2.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t.charCodeAt(i + 1) << 8 | t.charCodeAt(i), t.charCodeAt(i + 3) << 8 | t.charCodeAt(i + 2), t.charCodeAt(i + 5) << 8 | t.charCodeAt(i + 4), t.charCodeAt(i + 7) << 8 | t.charCodeAt(i + 6)),
                    kkk.v3.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t.charCodeAt(i + 1) << 8 | t.charCodeAt(i), t.charCodeAt(i + 3) << 8 | t.charCodeAt(i + 2), t.charCodeAt(i + 5) << 8 | t.charCodeAt(i + 4), t.charCodeAt(i + 7) << 8 | t.charCodeAt(i + 6)),
                    kkk.v4.add(h.multiply(u)).rotl(31).multiply(s)
            } else {
                var h;
                h = a(t[i + 1] << 8 | t[i], t[i + 3] << 8 | t[i + 2], t[i + 5] << 8 | t[i + 4], t[i + 7] << 8 | t[i + 6]),
                    kkk.v1.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t[i + 1] << 8 | t[i], t[i + 3] << 8 | t[i + 2], t[i + 5] << 8 | t[i + 4], t[i + 7] << 8 | t[i + 6]),
                    kkk.v2.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t[i + 1] << 8 | t[i], t[i + 3] << 8 | t[i + 2], t[i + 5] << 8 | t[i + 4], t[i + 7] << 8 | t[i + 6]),
                    kkk.v3.add(h.multiply(u)).rotl(31).multiply(s),
                    i += 8,
                    h = a(t[i + 1] << 8 | t[i], t[i + 3] << 8 | t[i + 2], t[i + 5] << 8 | t[i + 4], t[i + 7] << 8 | t[i + 6]),
                    kkk.v4.add(h.multiply(u)).rotl(31).multiply(s)
            }
            i += 8
        } while (i <= p)
    }
    return i < f && (o ? kkk.memory += t.slice(i) : r ? kkk.memory.set(t.subarray(i, f), kkk.memsize) : t.copy(kkk.memory, kkk.memsize, i, f),
        kkk.memsize = f - i),
        kkk
}


function digest(kkk) {  // 90
    var a = i_i  // 这些加密数据有用
        , s = a("11400714785074694791")
        , u = a("14029467366897019727")
        , c = a("1609587929392839161")
        , f = a("9650029242287828579")
        , l = a("2870177450012600261");

    var t, e, r = kkk.memory, n = "string" == typeof r, o = 0, i = kkk.memsize, h = new i_i;
    for (kkk.total_len >= 32 ? (t = kkk.v1.clone().rotl(1),
        t.add(kkk.v2.clone().rotl(7)),
        t.add(kkk.v3.clone().rotl(12)),
        t.add(kkk.v4.clone().rotl(18)),
        t.xor(kkk.v1.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v2.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v3.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f),
        t.xor(kkk.v4.multiply(u).rotl(31).multiply(s)),
        t.multiply(s).add(f)) : t = add(kkk.seed.clone(), l),
             add(t, s_this(kkk.total_len, h)); o <= i - 8; )
        n ? a_a.call(h, r.charCodeAt(o + 1) << 8 | r.charCodeAt(o), r.charCodeAt(o + 3) << 8 | r.charCodeAt(o + 2), r.charCodeAt(o + 5) << 8 | r.charCodeAt(o + 4), r.charCodeAt(o + 7) << 8 | r.charCodeAt(o + 6)): a_a.call(h, r[o + 1] << 8 | r[o], r[o + 3] << 8 | r[o + 2], r[o + 5] << 8 | r[o + 4], r[o + 7] << 8 | r[o + 6]),
            multiply(rotl.call(multiply(h, u),31), s),
            add(multiply(rotl.call(xor.call(t,h),27), s),f),
            o += 8;
    for (o + 4 <= i && (n ? h.fromBits(r.charCodeAt(o + 1) << 8 | r.charCodeAt(o), r.charCodeAt(o + 3) << 8 | r.charCodeAt(o + 2), 0, 0) : h.fromBits(r[o + 1] << 8 | r[o], r[o + 3] << 8 | r[o + 2], 0, 0),
        t.xor(multiply(h, s)).rotl(23).multiply(u).add(c),
        o += 4); o < i; )
        h.fromBits(n ? r.charCodeAt(o++) : r[o++], 0, 0, 0),
            t.xor(h.multiply(l)).rotl(11).multiply(s);
    return e = shiftRight.call(clone.call(t), 33),
        multiply(xor.call(t, e), u),
        e = shiftRight.call(clone.call(t), 29),
        multiply(xor.call(t, e), c),
        e = shiftRight.call(clone.call(t), 32),
        xor.call(t, e),
        i_this.call(kkk, kkk.seed),
        t
}



function clone() {
    return new i_i(this._a00,this._a16,this._a32,this._a48)
}



function shiftRight(t) {
    return t %= 64,
        t >= 48 ? (this._a00 = this._a48 >> t - 48,
            this._a16 = 0,
            this._a32 = 0,
            this._a48 = 0) : t >= 32 ? (t -= 32,
            this._a00 = 65535 & (this._a32 >> t | this._a48 << 16 - t),
            this._a16 = this._a48 >> t & 65535,
            this._a32 = 0,
            this._a48 = 0) : t >= 16 ? (t -= 16,
            this._a00 = 65535 & (this._a16 >> t | this._a32 << 16 - t),
            this._a16 = 65535 & (this._a32 >> t | this._a48 << 16 - t),
            this._a32 = this._a48 >> t & 65535,
            this._a48 = 0) : (this._a00 = 65535 & (this._a00 >> t | this._a16 << 16 - t),
            this._a16 = 65535 & (this._a16 >> t | this._a32 << 16 - t),
            this._a32 = 65535 & (this._a32 >> t | this._a48 << 16 - t),
            this._a48 = this._a48 >> t & 65535),
        this
}




function o_default() {  // 71  87  89  91
    return 2 == arguments.length ? digest(update(new o_default(arguments[1]), arguments[0])) : this instanceof o_default ? void i_this.call(this, arguments[0]) : new o(arguments[0])
}


function i_this(t) {  // 72
    var s = {'remainder': null, '_a00': 51847, '_a16': 34283, '_a32': 31153, '_a48': 40503, 'clone': function() { return new i_i(this._a00,this._a16,this._a32,this._a48)}}
    var u = {'remainder': null, '_a00': 60239, '_a16': 10196, '_a32': 44605, '_a48': 49842}
    return this.seed = new i_a(t),
        this.v1 = add(add(this.seed.clone(), s), u),
        this.v2 = add(this.seed.clone(), u),
        this.v3 = this.seed.clone(),
        this.v4 = subtract(this.seed.clone(), s),
        this.total_len = 0,
        this.memsize = 0,
        this.memory = null,
        this
}


function subtract(a, t) {
    return add(a, negate(clone.call(t)))
}


function negate(a) {
    var t = 1 + (65535 & ~a._a00);
    return a._a00 = 65535 & t,
        t = (65535 & ~a._a16) + (t >>> 16),
        a._a16 = 65535 & t,
        t = (65535 & ~a._a32) + (t >>> 16),
        a._a32 = 65535 & t,
        a._a48 = ~a._a48 + (t >>> 16) & 65535,
        a
}



function i_i(t, e, r, n) {
    return this instanceof i_i ? (this.remainder = null,
        "string" == typeof t ? i_u.call(this, t, e) : void 0 === e ? s_this.call(this, t) : void a_a.apply(this, arguments)) : new i_i(t,e,r,n)
}


function i_u(t, e) {
    e = e || 10,
        this._a00 = 0,
        this._a16 = 0,
        this._a32 = 0,
        this._a48 = 0;
    for (var r = c[e] || new i_i(Math.pow(e, 5)), n = 0, o = t.length; n < o; n += 5) {
        var a = Math.min(5, o - n)
            , s = parseInt(t.slice(n, n + a), e);
        add(multiply(this, a < 5 ? new i_i(Math.pow(e, a)) : r), new i_i(s))
    }
    return this
}



function multiply(k, t) {
    var e = k._a00
        , r = k._a16
        , n = k._a32
        , o = k._a48
        , i = t._a00
        , a = t._a16
        , s = t._a32
        , u = t._a48
        , c = e * i
        , f = c >>> 16;
    f += e * a;
    var l = f >>> 16;
    f &= 65535,
        f += r * i,
        l += f >>> 16,
        l += e * s;
    var h = l >>> 16;
    return l &= 65535,
        l += r * a,
        h += l >>> 16,
        l &= 65535,
        l += n * i,
        h += l >>> 16,
        h += e * u,
        h &= 65535,
        h += r * s,
        h &= 65535,
        h += n * a,
        h &= 65535,
        h += o * i,
        k._a00 = 65535 & c,
        k._a16 = 65535 & f,
        k._a32 = 65535 & l,
        k._a48 = 65535 & h,
        k
}



function i_a(t, e, r, n) {  // 73  75  78  80
    return this.remainder = null,
        this._a00 = 65535 & t,
        this._a16 = t >>> 16,
        this._a32 = 0,
        this._a48 = 0,
        this.clone = function() {  // 77  81
            return new i_i(this._a00,this._a16,this._a32,this._a48)
        },
        this
}


function s_this(t, k) {  // 74
    if (k)
        return k._a00 = 65535 & t,
            k._a16 = t >>> 16,
            k._a32 = 0,
            k._a48 = 0,
            k
    return this._a00 = 65535 & t,
        this._a16 = t >>> 16,
        this._a32 = 0,
        this._a48 = 0,
        this
}


function rotl(t) {
    if (0 == (t %= 64))
        return this;
    if (t >= 32) {
        var e = this._a00;
        if (this._a00 = this._a32,
            this._a32 = e,
            e = this._a48,
            this._a48 = this._a16,
            this._a16 = e,
        32 == t)
            return this;
        t -= 32
    }
    var r = this._a48 << 16 | this._a32
        , n = this._a16 << 16 | this._a00
        , o = r << t | n >>> 32 - t
        , i = n << t | r >>> 32 - t;
    return this._a00 = 65535 & i,
        this._a16 = i >>> 16,
        this._a32 = 65535 & o,
        this._a48 = o >>> 16,
        this
}


function xor(t) {
    return this._a00 ^= t._a00,
        this._a16 ^= t._a16,
        this._a32 ^= t._a32,
        this._a48 ^= t._a48,
        this
}





function a_a(t, e, r, n) {  // 79
    return void 0 === r ? (this._a00 = 65535 & t,
        this._a16 = t >>> 16,
        this._a32 = 65535 & e,
        this._a48 = e >>> 16,
        this) : (this._a00 = 0 | t,
        this._a16 = 0 | e,
        this._a32 = 0 | r,
        this._a48 = 0 | n,
        this)
}


function add(a, t) {  // 83  85
    var e = a._a00 + t._a00
        , r = e >>> 16;
    r += a._a16 + t._a16;
    var n = r >>> 16;
    n += a._a32 + t._a32;
    var o = n >>> 16;
    return o += a._a48 + t._a48,
        a._a00 = 65535 & e,
        a._a16 = 65535 & r,
        a._a32 = 65535 & n,
        a._a48 = 65535 & o,
        a
}











function r_decrypt(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hjasbdn2ih823rgwudsde7e2dhsdhas";
    "string" == typeof r && (r = [].map.call(r, function(t) {
        return t.charCodeAt(0)
    }));
    for (var n, o = [], i = 0, a = new i_update(e.length), s = 0; s < 256; s++)
        o[s] = s;
    for (s = 0; s < 256; s++)
        i = (i + o[s] + r[s % r.length]) % 256,
            n = o[s],
            o[s] = o[i],
            o[i] = n;
    s = 0,
        i = 0;
    for (var u = 0; u < e.length; u++)
        s = (s + 1) % 256,
            i = (i + o[s]) % 256,
            n = o[s],
            o[s] = o[i],
            o[i] = n,
            a[u] = e[u] ^ o[(o[s] + o[i]) % 256];
    return a
}




function Bt(t) {
    var e = {}
    e.maxObjectSize = 1e8,
        e.maxObjectCount = 32768,
        e.parseFile = function(t, e) {
            function r(t) {
                var r, n = null;
                try {
                    r = parseBuffer(t)
                } catch (t) {
                    n = t
                }
                e(n, r)
            }
            return n.isBuffer(t) ? r(t) : void f.readFile(t, function(t, n) {
                return t ? e(t) : void r(n)
            })
        }
    function r(e) {
        var r = x[e]
            , n = t[r]
            , o = (240 & n) >> 4
            , i = 15 & n
            , a = {
            offset: r,
            type: n,
            objType: o,
            objInfo: i,
            tableOffset: e
        };
        switch (o) {
            case 0:
                return f(a);
            case 1:
                return h(a);
            case 8:
                return p(a);
            case 2:
                return d(a);
            case 3:
                return m(a);
            case 6:
                return y(a);
            case 4:
                return g(a);
            case 5:
                return g(a, !0);
            case 10:
                return v(a);
            case 13:
                return b(a);
            default:
                throw new Error(2,o.toString(16))
        }
    }
    function f(t) {
        var e = t.objInfo
            , r = t.objType;
        switch (e) {
            case 0:
                return null;
            case 8:
                return !1;
            case 9:
                return !0;
            case 15:
                return null;
            default:
                throw new Error(3,r.toString(16))
        }
    }
    function h(r) {
        var n = r.offset
            , o = r.objInfo
            , i = Math.pow(2, o);
        if (i > 4)
            return u_h_Bt(a_slice(t, n + 1, n + 1 + i));
        if (i < e.maxObjectSize)
            return a_h_Bt(a_slice(t, n + 1, n + 1 + i));
        throw new Error("4 " + i + " " + e.maxObjectSize)
    }
    function p(r) {
        var n = r.offset
            , a = r.objInfo
            , s = a;
        if (s < e.maxObjectSize)
            return o({}, l, i(t.slice(n + 1, n + 1 + s)));
        throw new Error("4 " + s + " " + e.maxObjectSize)
    }
    function d(r) {
        var n = r.offset
            , o = r.objInfo
            , i = Math.pow(2, o);
        if (!(i < e.maxObjectSize))
            throw new Error("4 " + i + " " + e.maxObjectSize);
        var a = t.slice(n + 1, n + 1 + i);
        return 4 === i ? readFloatBE.call(a, 0) : 8 === i ? readDoubleBE.call(a, 0) : void 0
    }
    function m(e) {
        var r = e.offset
            , n = e.objInfo;
        3 != n && console.error(5, n);
        var o = t.slice(r + 1, r + 9);
        return new Date(9783072e5 + 1e3 * o.readDoubleBE(0))
    }
    function y(r) {
        var n = r.offset
            , o = r.objInfo
            , a = 1
            , s = o;
        if (15 == o) {
            var u = t[n + 1]
                , c = (240 & u) / 16;
            1 != c && console.error(6, c);
            var f = 15 & u
                , l = Math.pow(2, f);
            a = 2 + l,
                s = i(t.slice(n + 2, n + 2 + l))
        }
        if (s < e.maxObjectSize)
            return t.slice(n + a, n + a + s);
        throw new Error("4 " + s + " " + e.maxObjectSize)
    }
    function g(r, o) {
        var a = r.offset
            , s = r.objInfo;
        o = o || 0;
        var u = "utf8"
            , f = s
            , l = 1;
        if (15 == s) {
            var h = t[a + 1]
                , p = (240 & h) / 16;
            if (1 != p)
                throw new Error("7 " + p);
            var d = 15 & h
                , m = Math.pow(2, d);
            l = 2 + m,
                f = i_Bt(a_slice(t, a + 2, a + 2 + m))
        }
        if ((f *= o + 1) < e.maxObjectSize) {
            var y = new i_update(a_slice(t, a + l, a + l + f));
            return o && (y = c_g_Bt(y),
                u = "ucs2"),
                to_string_g_Bt.call(y, u)
        }
        throw new Error("4 " + f + " " + e.maxObjectSize)
    }
    function v(n) {
        var o = n.offset
            , a = n.objInfo
            , s = a
            , u = 1;
        if (15 == a) {
            var c = t[o + 1]
                , f = (240 & c) / 16;
            var l = 15 & c
                , h = Math.pow(2, l);
            u = 2 + h,
                s = i_Bt(a_slice(t, o + 2, o + 2 + h))
        }
        for (var p = [], d = 0; d < s; d++) {
            var m = i_Bt(a_slice(t, o + u + d * E, o + u + (d + 1) * E));
            p[d] = r(m)
        }
        return p
    }
    function b(n) {
        var o = n.offset
            , a = n.objInfo
            , s = (n.tableOffset,
            a)
            , u = 1;
        if (15 == a) {
            var c = t[o + 1]
                , f = (240 & c) / 16;
            1 != f && console.error(9, f);
            var l = 15 & c
                , h = Math.pow(2, l);
            u = 2 + h,
                s = i(a_slice(t, o + 2, o + 2 + h))
        }
        if (2 * s * E > e.maxObjectSize)
            throw new Error(4);
        for (var p = {}, d = 0; d < s; d++) {
            var m = i_Bt(a_slice(t, o + u + d * E, o + u + (d + 1) * E))
                , y = i_Bt(a_slice(t, o + u + s * E + d * E, o + u + s * E + (d + 1) * E))
                , g = r(m)
                , v = r(y);
            p[g] = v
        }
        return p
    }
    var w = a_slice(t, t.length - 32, t.length)
        , _ = readUInt8.call(w, 6)
        , E = readUInt8.call(w, 7)
        , A = s_Bt(w, 8)
        , C = s_Bt(w, 16)
        , S = s_Bt(w, 24);
    for (var x = [], O = 0; O < A; O++) {
        var T = a_slice(t, S + O * _, S + (O + 1) * _);
        x[O] = i_Bt(T, 0)
    }
    return r(C)
}


function readUInt8(t, e) {
    return this[t]
}


function s_Bt(t, e) {
    return readUInt32BE.call(a_slice(t, e, e + 8), 4, 8)
}


function readUInt32BE(t, e) {
    return e || I(t, 4, this.length),
    16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
}


function i_Bt(t, e) {
    e = e || 0;
    for (var r = 0, n = e; n < t.length; n++)
        r <<= 8,
            r |= 255 & t[n];
    return r
}


function a_g_Bt(t, e, r, n) {
    if ("number" == typeof e)
        throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? h(t, e, r, n) : "string" == typeof e ? f(t, e, r) : p_a(t, e)
}


function p_a(t, e) {
    if (true) {
        var r = 0 | e.length;
        return t = o_19(t, r),
            0 === t.length ? t : (a_68_copy(e, t, 0, 0, r),
                t)
    }
    if (e) {
        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
            return "number" != typeof e.length || G(e.length) ? o(t, 0) : l(t, e);
        if ("Buffer" === e.type && J(e.data))
            return l(t, e.data)
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
}



function c_g_Bt(t) {
    for (var e = t.length, r = 0; r < e; r += 2) {
        var n = t[r];
        t[r] = t[r + 1],
            t[r + 1] = n
    }
    return t
}


function to_string_g_Bt() {
    var t = 0 | this.length;
    return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : g_to_string.apply(this, arguments)
}


function g_to_string(t, e, r) {
    var n = !1;
    if ((void 0 === e || e < 0) && (e = 0),
    e > this.length)
        return "";
    if ((void 0 === r || r > this.length) && (r = this.length),
    r <= 0)
        return "";
    if (r >>>= 0,
        e >>>= 0,
    r <= e)
        return "";
    for (t || (t = "utf8"); ; )
        switch (t) {
            case "hex":
                return N(this, e, r);
            case "utf8":
            case "utf-8":
                return T_g(this, e, r);
            case "ascii":
                return k(this, e, r);
            case "latin1":
            case "binary":
                return R(this, e, r);
            case "base64":
                return O(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return j_g(this, e, r);
            default:
                if (n)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                    n = !0
        }
}


function j_g(t, e, r) {
    for (var n = a_slice(t, e, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
    return o
}


function T_g(t, e, r) {
    r = Math.min(t.length, r);
    for (var n = [], o = e; o < r; ) {
        var i = t[o]
            , a = null
            , s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
        if (o + s <= r) {
            var u, c, f, l;
            switch (s) {
                case 1:
                    i < 128 && (a = i);
                    break;
                case 2:
                    u = t[o + 1],
                    128 == (192 & u) && (l = (31 & i) << 6 | 63 & u) > 127 && (a = l);
                    break;
                case 3:
                    u = t[o + 1],
                        c = t[o + 2],
                    128 == (192 & u) && 128 == (192 & c) && (l = (15 & i) << 12 | (63 & u) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (a = l);
                    break;
                case 4:
                    u = t[o + 1],
                        c = t[o + 2],
                        f = t[o + 3],
                    128 == (192 & u) && 128 == (192 & c) && 128 == (192 & f) && (l = (15 & i) << 18 | (63 & u) << 12 | (63 & c) << 6 | 63 & f) > 65535 && l < 1114112 && (a = l)
            }
        }
        null === a ? (a = 65533,
            s = 1) : a > 65535 && (a -= 65536,
            n.push(a >>> 10 & 1023 | 55296),
            a = 56320 | 1023 & a),
            n.push(a),
            o += s
    }
    return P_T(n)
}


function P_T(t) {
    var e = t.length;
    if (e <= Q)
        return String.fromCharCode.apply(String, t);
    for (var r = "", n = 0; n < e; )
        r += String.fromCharCode.apply(String, a_slice(t, n, n += Q));
    return r
}


function a_h_Bt(t, e, r) {
    return e = e || 0,
        r = r || t.length - e,
        readIntBE.call(t, e, r)
}

function u_h_Bt(t, e) {
    return e = e || 0,
        readInt32BE.call(t.slice(e, e + 8), 4, 8)
}


function readIntBE(t, e, r) {
    t |= 0,
        e |= 0,
    r || undefined;
    for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); )
        i += this[t + --n] * o;
    return o *= 128,
    i >= o && (i -= Math.pow(2, 8 * e)),
        i
}




function readFloatBE(t, e) {
    return e || undefined,
        K.read(this, t, !1, 23, 4)
}

function readDoubleBE(t, e) {
    return e || undefined,
        K.read(this, t, !1, 52, 8)
}


function kt(t) {
    var i = Ut;
    function n(e) {
        if (1 === Object.keys(e).length && void 0 !== e[i.$UID])
            return o(e[i.$UID]);
        if (i.$vals in e) {
            var t = e[i.$keys]
                , n = e[i.$vals];
            return t ? t.reduce(function(e, t, i) {
                return e[o(t)] = r(n[i]),
                    e
            }, {}) : n.map(function(e) {
                return o(e)
            })
        }
        return Object.keys(e).reduce(function(t, n) {
            var o = e[n];
            return t[n] = r(o),
                t
        }, {})
    }
    function r(t) {
        return "Object" === (0,
            i.getType)(t) ? n(t) : "Array" === (0,
            i.getType)(t) ? t.map(function(e) {
            return r(e)
        }) : t instanceof i_update ? (0 === t[t.length - 1] && (t = t.slice(0, t.length - 1)),
            t.toString()) : t
    }
    function o(e) {
        return r(t[(0,
            i.getRealUID)(e)])
    }
    return o(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0,
        i.getRealUID)(i.$defaultRootUID))
}






function n_n(r) {
    return e_e(t)(r_r)(r)
}



function e_e(e) {
    return function(e) {
        return function(t) {
            var n = Object.keys(t)[0]
                , r = Ut.crypto.decrypt(t[n], n);
            return e(r)
        }
    }
}



function r_r(r) {
    return e_e_decrypt(t)(e_e_decrypt_n)(r)
}


function e_e_decrypt(e) {
    return function(e) {
        return function(t) {
            return e(Bt(t))
        }
    }
}


// function ee_decrypt{
//     return
// }

function e_e_decrypt_n(r) {
    return playload(t)(e_playload)(r)
}


function playload(e) {
    return function(e) {
        return function(t) {
            return e({
                type: "INIT",
                payload: kt(t)
            })
        }
    }
}


function e_playload(r) {
    return r
}


function decrypt(r){
    var a = encry2arr_from(r, "base64")  // 0
        , s = Math.max(Math.floor((a.length - 2 * i) / 3), 0)  // 40
        , u = a_slice(a,s, s + i);  // 41
    a =  concat([a_slice(a, 0, s), a_slice(a,s + i)]);  // 43  45  47
    var c_data = hash(concat([u,  encry2arr_from("")]));  // 49  67  69
    var l = {}
    l[c_data] = a
    var data = n_n((l = {},l[c_data] = a,l))
    return data
}

module.exports = decrypt;
