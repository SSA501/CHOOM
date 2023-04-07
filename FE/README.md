# Frontend README

## ****🕺💃 시작하기****

### **필수 사항**

- Node.js (권장 버전: 14.x 이상)
- npm 혹은 yarn

### ****🛠️ 설치 방법****

```
# CLONE REPOSITORY
git clone https://github.com/SSA501/CHOOM.git
cd FE
cd frontend

# INSTALLATION
npm i

# START
npm start
```

### ****📁 프로젝트 구조****

```
frontend
├─ src
│  ├─ apis
│  ├─ components
│  ├─ constants
│  ├─ hooks
│  ├─ styles
│  ├─ pages
│  ├─ store
│  ├─ react-app-env.d.ts
│  ├─ App.tsx
│  └─ index.tsx
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ Dockerfile
├─ nginx.conf
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

## ****💻 사용 기술 및 프레임워크****

- [React](https://reactjs.org/) - SPA 구현을 위한 라이브러리
- [Redux](https://redux.js.org/) - 상태 관리 라이브러리
- [styled-components](https://styled-components.com/) - CSS-in-JS 라이브러리
- [Blazepose](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection) - 포즈 인식을 위한 TensorFlow.js 모델
    
    **BlazePose의 선택 이유 🎯**
    
    BlazePose는 Google에서 개발한 포즈 인식 모델로, 성능과 정확도, 그리고 활용성 측면에서 다른 포즈 인식 모델들에 비해 우수한 점수를 보이기 때문에 선택되었습니다.
    
    **성능 비교**
    
    | 모델 | 정확도 (mAP) | FPS (최적 환경) | 모델 크기 |
    | --- | --- | --- | --- |
    | BlazePose | 0.75 | 30+ | 3MB |
    | PoseNet | 0.65 | 20+ | 7MB |
    | OpenPose | 0.85 | 10~20 | 200MB |
    1. **정확도**: BlazePose는 COCO keypoint AP (Average Precision)에서 약 70%의 정확도를 보여줍니다. 이는 경쟁 모델들과 비교하여 매우 높은 수치로, 사용자의 포즈를 정확하게 인식할 수 있습니다.
    2. **성능**: BlazePose는 초당 프레임 수 (FPS)가 매우 높아 실시간 포즈 추적이 가능합니다. 일반적인 환경에서는 30FPS 이상의 성능을 제공하며, 높은 성능의 디바이스에서는 60FPS까지 도달할 수 있습니다. 이러한 높은 성능은 사용자의 춤을 원활하게 인식하고 분석할 수 있는 데 도움이 됩니다.
    3. **활용성**: TensorFlow.js를 통해 브라우저에서 모델을 실행할 수 있어, 웹 기반 서비스에 적합합니다. 따라서, 사용자가 별도의 애플리케이션 설치 없이 웹 페이지를 통해 포즈 인식 기능을 이용할 수 있습니다.
    
    이러한 이유로 BlazePose를 다른 포즈 인식 모델들과 비교하여 선택하였으며, 이를 바탕으로 C#OOM 프로젝트에서 높은 정확도와 성능을 제공할 수 있습니다.
    
- [Kakao API](https://developers.kakao.com/docs/latest/ko/message/rest-api) - 메시지 전송을 위한 카카오 API
- [ReChart](https://recharts.org/) - React 차트 라이브러리

## **📝 스타일 가이드 및 코딩 규칙**

### **스타일 가이드**

1. **들여쓰기**: 공백 2칸을 사용합니다.
2. **줄 길이**: 한 줄의 최대 길이는 80자 또는 120자로 제한합니다.
3. **변수명**: camelCase를 사용하며, 변수명은 명확하게 기능을 설명할 수 있도록 작성합니다.
4. **함수명**: 동사로 시작하는 camelCase를 사용하며, 함수의 기능을 명확하게 설명할 수 있도록 작성합니다.
5. **상수명**: 모두 대문자로 작성하며, 단어 사이에는 언더스코어(_)를 사용합니다.
6. **주석**: 가능한 한 모든 함수, 클래스, 모듈에 주석을 작성합니다. 주석은 해당 코드의 기능과 사용 방법을 설명해야 합니다.

### **코딩 규칙**

1. **함수 길이**: 함수는 가능한 짧게 작성하며, 하나의 함수는 하나의 기능만을 수행해야 합니다.
2. **DRY 원칙**: 코드의 중복을 최소화하며, 필요한 경우 함수나 클래스를 작성하여 재사용성을 높입니다.
3. **명확한 에러 처리**: 에러 처리를 명확하게 하며, 사용자에게 적절한 에러 메시지를 제공합니다.
4. **유지보수성**: 코드는 가능한 한 유지보수가 쉽도록 작성되어야 합니다. 이를 위해 함수와 클래스를 작성하고, 적절한 주석을 달아 코드의 가독성을 높입니다.
5. **최신 문법 사용**: 가능한 한 최신의 문법과 기술을 사용하여 코드를 작성합니다. 이를 통해 코드의 효율성과 가독성을 높입니다.
