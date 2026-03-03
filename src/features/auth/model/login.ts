/**
 * 소셜 로그인 시작 (OAuth2 인증 요청)
 * @param provider 'kakao' | 'naver' | 'google'
 */
export const startSocialLogin = (provider: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // 백엔드가 신규/기존 유저를 판단하여 리다이렉트 처리
  // 신규 유저 → 닉네임 페이지, 기존 유저 → 메인 페이지
  const loginUrl = `${baseUrl}/oauth2/authorization/${provider}`;

  window.location.href = loginUrl;
};
