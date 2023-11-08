// ReviewContext.js
import React from "react";

export const ReviewContext = React.createContext();

// 이 Context를 사용하는 Provider 컴포넌트도 생성할 수 있다.
export const ReviewProvider = ReviewContext.Provider;
