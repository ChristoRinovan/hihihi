export default function LoveIllustration({ ending = false }) {
  return (
    <div className={`love-art ${ending ? "love-art--ending" : ""}`} aria-hidden="true">
      <span className="art-spark art-spark--one">✦</span>
      <span className="art-spark art-spark--two">✳</span>
      <span className="art-spark art-spark--three">✦</span>
      <span className="art-mini-heart art-mini-heart--one">♥</span>
      <span className="art-mini-heart art-mini-heart--two">♥</span>
      <svg className="art-svg" viewBox="0 0 440 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="220" cy="184" r="145" fill="#FFE3EB" />
        <circle cx="220" cy="184" r="121" stroke="#F7B6CD" strokeWidth="2" strokeDasharray="5 12" />
        <ellipse cx="226" cy="313" rx="133" ry="16" fill="#F0B3C9" fillOpacity=".4" />
        <path d="M110 181L219 114L332 181V281C332 300 321 309 302 309H139C120 309 110 298 110 279V181Z" fill="#FFC9D9" stroke="#A85A7C" strokeWidth="4" strokeLinejoin="round" />
        <rect x="138" y="109" width="164" height="163" rx="12" fill="#FFFCF9" stroke="#A85A7C" strokeWidth="4" />
        <path d="M166 138H272" stroke="#EBC0CE" strokeWidth="8" strokeLinecap="round" />
        <path d="M166 159H252" stroke="#EBC0CE" strokeWidth="8" strokeLinecap="round" />
        <path d="M167 180H236" stroke="#EBC0CE" strokeWidth="8" strokeLinecap="round" />
        <path d="M110 190L211 254C216 257 224 257 230 254L332 190V280C332 299 320 309 301 309H141C122 309 110 299 110 280V190Z" fill="#FFDAE6" stroke="#A85A7C" strokeWidth="4" strokeLinejoin="round" />
        <path d="M110 297L191 237M332 297L250 237" stroke="#A85A7C" strokeWidth="4" strokeLinecap="round" />
        <path d="M220 266C214 262 173 235 173 214C173 193 201 185 220 203C239 185 267 193 267 214C267 235 226 262 220 266Z" fill="#F16B9C" stroke="#A85A7C" strokeWidth="3.5" />
        <circle cx="207" cy="223" r="3.5" fill="#6D3552" />
        <circle cx="234" cy="223" r="3.5" fill="#6D3552" />
        <path d="M212 237Q221 247 230 237" stroke="#6D3552" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="194" cy="233" rx="6" ry="3" fill="#F9B0BE" />
        <ellipse cx="247" cy="233" rx="6" ry="3" fill="#F9B0BE" />
        <path d="M66 155C62 145 52 142 44 149C36 156 43 169 66 182C89 169 96 156 88 149C80 142 70 145 66 155Z" fill="#FFA6C2" />
        <path d="M360 122C357 115 350 113 344 118C338 125 343 134 360 145C377 134 382 125 376 118C370 113 363 115 360 122Z" fill="#BCA8EF" />
        <path d="M335 70L340 84L354 89L340 94L335 108L330 94L316 89L330 84L335 70Z" fill="#FFD687" />
        <path d="M88 251L92 260L101 264L92 268L88 277L84 268L75 264L84 260L88 251Z" fill="#AFE0C9" />
      </svg>
    </div>
  );
}
