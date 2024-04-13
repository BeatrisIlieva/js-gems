exports.verifyCardDetails = (cardData) => {
  const { longCardNumber, expirationDate, cvvCode } = { ...cardData };

  const sixteenDigitsPattern = /^\d{16}$/;
  const cvvPattern = /^\d{3}$/;
  const expirationDatePattern = /^\d{2}\/\d{2}$/;

  if (!sixteenDigitsPattern.test(longCardNumber)) {
    console.log(longCardNumber);
    throw new Error("The card number should be exactly 16 digits long.");
  } else if (!cvvPattern.test(cvvCode)) {
    throw new Error("The CVV code should be exactly 3 digits long.");
  } else if (!expirationDatePattern.test(expirationDate)) {
    throw new Error("The expiration date should be in the format MM/YY.");
  } else if (isCardExpired(expirationDate)) {
    throw new Error("This card has expired.");
  }
};

function isCardExpired(expirationDate) {
  const [month, year] = expirationDate
    .split("/")
    .map((val) => parseInt(val, 10));
  const expiration = new Date("20" + year + "-" + month + "-01");

  const currentDate = new Date();

  if (expiration < currentDate) {
    return true;
  } else {
    return false;
  }
}
