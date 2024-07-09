import App from "@back/App";

App.listen(Bun.env.PORT ?? 3000, () => {
    console.log('Server Online!')
})