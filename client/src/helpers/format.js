export const prettierValorCOP = (valor) => {
    const formater = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return formater.format(valor)
}

export const prettierFecha = (fecha) => {
    const date = new Date(fecha);
    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric', timeZone: 'UTC'};

    return date.toLocaleDateString('es-US', optionsDate)
}