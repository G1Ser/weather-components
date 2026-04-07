const MOBILE_MODEL_PATTERNS: RegExp[] = [
  /iphone/i,
  /ipod/i,
  /ipad/i,
  /android/i,
  /harmonyos/i,
  /mobile/i,
  /mi\s?\d+/i,
  /redmi/i,
  /hm\snote/i,
  /huawei/i,
  /honor/i,
  /oppo/i,
  /vivo/i,
  /oneplus/i,
  /realme/i,
  /iqoo/i,
  /sm-[a-z0-9]+/i,
  /pixel\s?\d/i,
  /moto/i,
  /nokia/i,
];

const isMobile = () => {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (!ua) return false;
  return MOBILE_MODEL_PATTERNS.some((pattern) => pattern.test(ua));
};

export default isMobile;
