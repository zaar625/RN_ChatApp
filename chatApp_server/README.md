express.urlencoded :

- express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용한다. -요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어입니다.

subString():

- substring() 메소드는 string 객체의 시작 인덱스로 부터 종료 인덱스 전 까지 문자열의 부분 문자열을 반환합니다.

- unshift() 메서드는 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환합니다.

---

- socket.on(eventName, listener) : eventName 에 대한 리스너.
- socket.join(name) : 주어진 룸에 참여하지 않은 클라이언트에게만 이벤트가 브로드캐스트 되도록 후속 이벤트 방출에 대한 수정자를 설정.
  - 브로드캐스트 : 1대 전체 \* 로컬 랜상에 붙어있는 모든 네트워크 장비들에게 보내는 통신
- socket.emit : 문자열 이름으로 식별되는 소켓에 이벤트를 내보냅니다. -> 모든 직렬화 가능한 데이터 구조가 지원됩니다.

- useEffect 와 useLayoutEffect :
  - useEffect의 경우 컴포넌트들이 render와 paint된 후 실행됩니다. 비동기적으로 실행됩니다.
    페인트가 된 후 실행되기 때문에 ,useEffect 내부에 dom에 영향을 주는 코드가 있을 경우 사용자 입장에서는 화면 깜빡임을 보게 된다.
  - useLayoutEffect : 컴포넌트들이 render 된 후 실행되며, 그 이후에 paint가 된다. 이 작업은 동기적으로 실행됩니다.
    페인트가 되기전에 실행되기 때문에 dom을 조작하는 코드가 존재하더라도 사용자는 깜빡임을 경험하지 않습니다. - 만약 useLayoutEffect와 useEffect를 함께 사용할 경우 useLayoutEffect가 먼저 실행된다.
    -socket.to(): 이벤트가 지정된 룸에 참여한 클라이언트에게만 브로드캐스트되도록 후속 이벤트 방출에 대한 수정자를 설정합니다(소켓 자체는 제외됨).
