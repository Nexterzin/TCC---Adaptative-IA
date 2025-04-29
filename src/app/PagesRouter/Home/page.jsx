import UnauthorizedLogin from "@/app/Commons/Component/UnauthorizedLogin"

const { default: Home } = require("@/app/Commons/Home/Home")

const HomePage = () => {
    return (
        <>
        <Home/>
        {/* <UnauthorizedLogin/> */}
        </>
    )
}

export default HomePage