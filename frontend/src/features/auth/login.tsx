import React, { SVGProps, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Progress } from "@heroui/react";
import { Formik } from "formik";
import axios from "axios";
import { z } from "zod";
import { resolve } from "path";
// import {
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
//   Button,
//   Divider,
//   Center,
//   Box,
//   useToast,
// } from '@chakra-ui/react'

// import {AcmeIcon} from "./acme";

// function PasswordInput({
//   name,
//   onChange,
// }: {
//   name: string
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
// }) {
//   const [show, setShow] = React.useState(false)
//   const handleClick = () => setShow(!show)

//   return (
//     <InputGroup size="md">
//       <Input
//         pr="4.5rem"
//         type={show ? 'text' : 'password'}
//         placeholder="Enter password"
//         name={name}
//         onChange={onChange}
//       />
//       <InputRightElement width="4.5rem">
//         <Button h="1.75rem" size="sm" onClick={handleClick}>
//           {show ? 'Hide' : 'Show'}
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   )
// }

export const LoginX = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const toast = useToast();
  // const [formState, setFormState] = React.useState<LoginRequest>({
  //   username: "",
  //   password: "",
  // });
  // const [login, { isLoading }] = useLoginMutation();
  // const handleChange = ({
  //   target: { name, value },
  // }: React.ChangeEvent<HTMLInputElement>) =>
  //   setFormState((prev) => ({ ...prev, [name]: value }));
  // return (
  //   <Center h="500px">
  //     <VStack spacing="4">
  //       <Box>Hint: enter anything, or leave it blank and hit login</Box>
  //       <InputGroup>
  //         <Input
  //           onChange={handleChange}
  //           name="username"
  //           type="text"
  //           placeholder="Email"
  //         />
  //       </InputGroup>
  //       <InputGroup>
  //         <PasswordInput onChange={handleChange} name="password" />
  //       </InputGroup>
  //       <Button
  //         isFullWidth
  //         onClick={async () => {
  //           try {
  //             const user = await login(formState).unwrap()
  //             dispatch(setCredentials(user))
  //             navigate('/')
  //           } catch (err) {
  //             toast({
  //               status: 'error',
  //               title: 'Error',
  //               description: 'Oh no, there was an error!',
  //               isClosable: true,
  //             })
  //           }
  //         }}
  //         colorScheme="green"
  //         isLoading={isLoading}
  //       >
  //         Login
  //       </Button>
  //       <Divider />
  //       <ProtectedComponent />
  //     </VStack>
  //   </Center>
  // )
};

function login() {
  axios.post("http://localhost:8000/api/v1/login", values).then((response) => {
    console.log("SUCCESS", response);
  });
}

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-4">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-indigo-500 bg-red-300 border-4 border-red-400">
            Log in to your account to continue...
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting, ...others },
          ) => {
            console.log({ values, others });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSubmitting(false);
            // try {
            //   axios
            //     .post(configData.API_SERVER + "users/login", {
            //       password: values.password,
            //       email: values.email,
            //     })
            //     .then(function (response) {
            //       if (response.data.success) {
            //         console.log(response.data);
            //         dispatcher({
            //           type: ACCOUNT_INITIALIZE,
            //           payload: {
            //             isLoggedIn: true,
            //             user: response.data.user,
            //             token: response.data.token,
            //           },
            //         });
            //         if (scriptedRef.current) {
            //           setStatus({ success: true });
            //           setSubmitting(false);
            //         }
            //       } else {
            //         setStatus({ success: false });
            //         setErrors({ submit: response.data.msg });
            //         setSubmitting(false);
            //       }
            //     })
            //     .catch(function (error) {
            //       setStatus({ success: false });
            //       setErrors({ submit: error.response.data.msg });
            //       setSubmitting(false);
            //     });
            // } catch (err) {
            //   console.error(err);
            //   if (scriptedRef.current) {
            //     setStatus({ success: false });
            //     setErrors({ submit: err.message });
            //     setSubmitting(false);
            //   }
            // }
          }}
          validateOnChange={hasError}
          validate={({ email, password }) => {
            const schema = z.object({
              email: z.string().email(),
              password: z
                .string()
                .min(3, { message: "Must be atleast 3 characters" }),
            });

            const result = schema.safeParse({ email, password });
            let errors = {};

            if (!result.success) {
              setHasError(true);
              errors = result.error.flatten().fieldErrors;
            }
            // const errors: Record<string, unknown> = {};
            // if (!result.success) {
            //   Object.entries(result.error.format()).forEach(
            //     ([field, messages]) => {
            //       const msgs = Array.isArray(messages)
            //         ? messages
            //         : messages._errors;

            //       errors[field] = (
            //         <span>
            //           {msgs.map((msg) => (
            //             <span key={msg}>{msg}</span>
            //           ))}
            //         </span>
            //       );
            //       // console.log(field, messages)
            //     },
            //   );
            // }

            return errors;
          }}
        >
          {({
            errors,
            // handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            // touched,
            values,
            ...others
          }) => (
            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleSubmit}
              validationErrors={errors}
            >
              <Input
                isRequired
                label="Email Address"
                name="email"
                // placeholder="Enter your email"
                type="email"
                variant="bordered"
                value={values.email}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
              <Input
                isRequired
                label="Password"
                name="password"
                // placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                value={values.password}
                onChange={handleChange}
                // onBlur={handleBlur}
                endContent={
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="text-default-500"
                  >
                    {showPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                    {/* {showPassword ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )} */}
                  </button>
                }
              />
              <div className="flex w-full items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button
                className="w-full"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {" "}
                {(isSubmitting && (
                  <>
                    <span>Signing In ...</span>
                    <Progress
                      isIndeterminate
                      aria-label="Loading..."
                      className="max-w-md absolute bottom-0 content-center"
                      size="sm"
                      // showValueLabel
                      // label={<span>Signing In ...</span>}
                    />
                  </>
                )) || <span>Sign In</span>}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export const AcmeIcon: React.FC<IconSvgProps> = ({
  size = 32,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1.4em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1.4em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1.4em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1.4em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
