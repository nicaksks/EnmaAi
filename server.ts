import App from "@src/App";

App.listen(Bun.env.PORT ?? 3000, () => {
    console.log('Server Online!')
})