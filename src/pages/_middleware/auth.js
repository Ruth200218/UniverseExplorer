// import Unauthorized from "../../components/Unauthorized";

// const withAuth = (WrappedComponent) => {
//     const wraper = (props) => {
//         const authenticated = true;

//         if (!authenticated) {
//             return <Unauthorized/>
//         }

//         return <WrappedComponent {...props} />;
//     };

//     if (WrappedComponent.getInitialProps) {
//         wraper.getInitialProps = WrappedComponent.getInitialProps;
//     }
//     return wraper;
// };

// export default withAuth;