const validateData = (dateString) => {
  // Verifica se a string está no formato dd/mm/aaaa
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) {
    return false;
  }
  // Extrai o dia, mês e ano da string
  const [, dia, mes, ano] = dateString.match(regex);
  // Converte para números
  const diaNum = parseInt(dia, 10);
  const mesNum = parseInt(mes, 10) - 1; // Os meses em JavaScript começam de 0 (janeiro = 0)
  const anoNum = parseInt(ano, 10);
  // Cria uma nova data
  const data = new Date(anoNum, mesNum, diaNum);
  return (
    data.getDate() === diaNum
    && data.getMonth() === mesNum
    && data.getFullYear() === anoNum
  );
};

module.exports = validateData;