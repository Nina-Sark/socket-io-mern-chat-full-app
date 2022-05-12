import { Helmet } from "react-helmet";

export const Head = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}