// WebGL flare used by the hero and other dark bands (locked FS_L shader, Nov 2026).
export const FS_L = `precision mediump float;uniform vec2 r;uniform float t;uniform float s;uniform float kk;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fb(vec2 p){float v=0.,m=.5;for(int i=0;i<5;i++){v+=m*n(p);p*=2.03;m*=.5;}return v;}
void main(){vec2 u=gl_FragCoord.xy/r;vec2 p=u*vec2(r.x/r.y,1.)*1.2;vec2 q=vec2(fb(p+vec2(t*.04,0.)),fb(p+vec2(3.1,1.7)-vec2(0.,t*.03)));float f=fb(p+1.8*q+vec2(t*.03,-t*.02));
float band=u.x*.8+u.y*.9+f*.5-.55;
vec3 bg=vec3(.965,.973,.98),silver=vec3(.86,.89,.94),steel=vec3(.62,.71,.84),peach=vec3(1.,.76,.64),coral=vec3(1.,.42,.29),mint=vec3(.74,.92,.84);
vec3 c=mix(silver,steel,smoothstep(.0,.3,band));c=mix(c,peach,smoothstep(.3,.5,band));c=mix(c,coral,smoothstep(.48,.65,band));c=mix(c,mint,smoothstep(.7,.95,band));
float w=smoothstep(.05,.25,band)*(1.-smoothstep(.95,1.15,band));float hd=smoothstep(.55,.0,length((u-vec2(.5,.7))*vec2(1.,2.4)));c=mix(bg,c,w*s*(1.-kk*hd));
c+=pow(smoothstep(.45,1.,f),3.)*.2*w*s;float lines=smoothstep(.0,.02,abs(fract(band*10.-t*.05)-.5)-.47)*.05*w*s;c+=lines;
gl_FragColor=vec4(c,1.);}`;

export function mkGL(cv: HTMLCanvasElement, src: string, S0 = 1, K0 = 0): (t: number) => void {
  const gl = cv.getContext("webgl", { antialias: false });
  if (!gl) return () => {};
  const mk = (tp: number, s: string) => { const x = gl.createShader(tp)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, mk(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
  gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, src));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const lc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(lc); gl.vertexAttribPointer(lc, 2, gl.FLOAT, false, 0, 0);
  const ur = gl.getUniformLocation(pr, "r"), ut = gl.getUniformLocation(pr, "t"), us = gl.getUniformLocation(pr, "s"), uk = gl.getUniformLocation(pr, "kk");
  return (t: number) => {
    if (!cv.clientWidth) return;
    const w = Math.max(2, (cv.clientWidth * 0.6) | 0), h = Math.max(2, (cv.clientHeight * 0.6) | 0);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h); gl.uniform2f(ur, w, h); gl.uniform1f(ut, t);
    if (us) gl.uniform1f(us, S0); if (uk) gl.uniform1f(uk, K0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
}
