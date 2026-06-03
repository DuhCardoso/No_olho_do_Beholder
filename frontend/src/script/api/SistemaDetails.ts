// GET trazer os Detalhes do sistema (para preencher os selects)
export const getSistemaDetails = async (route: string, state: any, resError: string | any) => {
    try {
        const res = await fetch(route);
        if (!res.ok) throw new Error("Erro na requisição");

        const data = await res.json();
        console.log(data);

        state(data);
        console.log("Produtos Recebidos!");
    } catch (error: string | any) {
        resError(error.message);
    }
};