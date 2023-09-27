// 커스텀 오버레이 원래 코드
// 아래 코드는 문자열로 구현한 것
// Home.js에 있는 코드는 문자열을 HTMLElement로 구성한 다음 click 이벤트를 등록한 것

// data.forEach((element) => {
//   let seatImage;
//   if (element.count <= 15) {
//     seatImage = seatRed;
//   } else if (element.count > 15 && element.count <= 31) {
//     seatImage = seatYellow;
//   } else {
//     seatImage = seatGreen;
//   }

//   let borderColor;

//   if (element.count <= 15) {
//     borderColor = "#F96356";
//   } else if (element.count > 15 && element.count <= 31) {
//     borderColor = "#FFC85F";
//   } else {
//     borderColor = "#00F29B";
//   }

//   const overlayContent = `
//   <div id="overlay_${element.name}" class="${styles.overlayContainer}" style="border-color: lightgray">
//     <div class="${styles.logoContainer}">
//       <img class="${styles.logo}" src=${seatImage} />
//       <h2 class="${styles.CafeName}">${element.name}</h2>
//     </div>
//   </div>`;

//   const overlay = new kakao.maps.CustomOverlay({
//     content: overlayContent,
//     map: map,
//     position: new kakao.maps.LatLng(element.xmap, element.ymap),
//   });

//   kakao.maps.event.addListener(overlay, "click", function () {
//     setIsModalVisible(true); // 모달을 보이게 합니다.
//     setModalContent(element.name); // 클릭한 오버레이의 정보를 모달에 전달합니다. 이 부분은 필요에 따라 수정하면 됩니다.
//   });
// });
