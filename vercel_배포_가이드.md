# 김하백 연구소 생리 주기 웹앱 Vercel 배포 가이드

본 문서는 현재 개발된 단일 SPA 프로토타입 웹페이지를 Vercel(버셀) 플랫폼을 통해 무료로 전 세계에 배포하는 방법을 안내합니다. 가장 쉽고 빠른 2가지 방식(GitHub 연동 및 Vercel CLI 로컬 배포)을 제공합니다.

---

## 1. 방법 A: GitHub 연동 배포 (가장 추천하는 표준 방식)

코드를 수정하고 GitHub에 푸시(Push)할 때마다 Vercel이 실시간으로 감지하여 자동으로 재배포를 수행합니다.

### 1단계: GitHub 저장소(Repository) 생성 및 푸시
1. [GitHub](https://github.com)에 로그인 후, 우측 상단의 **[New]** 버튼을 클릭하여 새 저장소를 만듭니다.
2. 저장소 이름을 정하고(예: `kimhabaek-wellness`), **[Create repository]**를 누릅니다.
3. 현재 프로젝트 폴더(`생리주기_웰니스_차_추천`) 터미널에서 다음 명령어를 실행하여 코드를 올립니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/사용자아이디/저장소이름.git
   git push -u origin main
   ```

### 2단계: Vercel 계정 연동 및 배포
1. [Vercel 공식 홈페이지](https://vercel.com)에 접속하여 **[Sign Up]**을 클릭한 후, **Continue with GitHub**로 회원가입 및 로그인합니다.
2. 로그인 후 나타나는 대시보드에서 우측 상단의 **[Add New...]** -> **[Project]**를 클릭합니다.
3. **Import Git Repository** 목록에서 방금 만든 GitHub 저장소(예: `kimhabaek-wellness`)를 찾아 **[Import]**를 클릭합니다.
4. 세부 설정 화면이 나옵니다:
   - **Framework Preset**: `Other` (자동 지정됨)
   - **Root Directory**: `./` (그대로 유지)
   - 빌드 명령어나 아웃풋 설정은 비워둡니다. (정적 단일 HTML 파일이므로 빌드가 불필요합니다.)
5. 하단의 **[Deploy]** 버튼을 누릅니다.
6. 약 10~20초 뒤 배포가 완료되며, Vercel이 제공하는 고유의 무료 도메인 주소(예: `https://kimhabaek-wellness.vercel.app`)를 발급받을 수 있습니다.

---

## 2. 방법 B: Vercel CLI 로컬 배포 (GitHub 없이 터미널에서 바로 배포)

GitHub를 사용하지 않고 개발 중인 로컬 컴퓨터 터미널에서 Vercel 서버로 프로젝트를 직접 업로드하는 방식입니다.

### 1단계: Vercel CLI 설치 및 로그인
1. 시스템에 **Node.js**가 설치되어 있어야 합니다. (설치되어 있지 않다면 [Node.js 공식 홈페이지](https://nodejs.org)에서 LTS 버전 설치 필요)
2. 터미널(PowerShell 또는 CMD)을 열고 아래 명령어로 Vercel CLI를 설치합니다:
   ```bash
   npm install -g vercel
   ```
3. 설치가 완료되면 Vercel 서버에 로그인합니다:
   ```bash
   vercel login
   ```
   - 터미널에 안내되는 방식(이메일 혹은 GitHub 로그인) 중 원하는 방식을 선택해 로그인을 완료합니다.

### 2단계: 프로젝트 배포 실행
1. 프로젝트 루트 폴더(`생리주기_웰니스_차_추천`) 경로의 터미널에서 다음 명령어를 실행합니다:
   ```bash
   vercel
   ```
2. 터미널 창에 대화형 질문이 나타납니다. 전부 **기본값(엔터)**만 누르면 완료됩니다:
   - `Set up and deploy ...?` [Y/n] -> **y** 입력 후 엔터
   - `Which scope do you want to deploy to?` -> 본인 계정 선택 후 엔터
   - `Link to existing project?` [y/N] -> **n** (신규 프로젝트이므로) 입력 후 엔터
   - `What’s your project’s name?` -> 프로젝트 명 지정 후 엔터
   - `In which directory is your code located?` -> `./` (엔터)
   - `Want to modify these settings?` [y/N] -> **n** (엔터)
3. 자동으로 정적 파일이 업로드되고 미리보기 배포 주소(Preview URL)가 생성됩니다.

### 3단계: 프로덕션(최종) 배포
개발이 완료되어 실제 공식 도메인 주소로 배포하고 싶을 때는 아래 명령어를 입력합니다:
```bash
vercel --prod
```
출력되는 `Production:` 옆의 링크가 최종적으로 누구나 접속할 수 있는 공개 웹 주소입니다.
