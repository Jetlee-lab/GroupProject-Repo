import React, { Children, forwardRef, SVGProps, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Form,
  Divider,
  Progress,
  Select,
  SelectItem,
} from "@heroui/react";
import { Formik } from "formik";
import { z } from "zod";
import {
  AnimatePresence,
  clamp,
  domAnimation,
  LazyMotion,
  m,
  wrap,
} from "framer-motion";
import { useNavigate, redirect } from "react-router-dom"

export default function RestSignUp() {
  return (
    // <div className="flex w-full items-cente justify-between">
    //   <div className="size-14 grow-3 bg-primary-50 w-full">01</div>
    //   <div className="size-14 grow-7 w-full">02</div>
    //   <div className="size-14 grow-3 w-full">03</div>
    // </div>
    <>
      <div className="flex flex-row items-stretch justify-center mx-auto max-w-m md:max-w-2xl overflow-hidden rounded-xl xxxbg-secondary-100">
        {/* <div className="container mx-auto flex flex-1 flex-row items-center justify-center"> */}
        <div className="flex justify-center w-full max-w-md border-small border-danger-100 xxxbg-primary-100">
          d
        </div>
        <div className="flex justify-center w-full max-w-md rounded-lg border-small border-sucess-100 xxxbg-danger-50">
          <SignUpForm />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
const Slide = forwardRef(function Slide(
  { children, direction }: { children: React.ReactNode; direction: number },
  ref: React.Ref<HTMLDivElement>,
) {
  // const direction = -1; // usePresenceData();

  return (
    <m.div
      className="flex flex-col gap-4"
      ref={ref}
      initial={{ opacity: 0, x: direction * 24 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.5,
          bounce: 0.2,
        },
      }}
      exit={{ opacity: 0, x: direction * -24 }}
      // style={{ ...box, backgroundColorx: color }}
    >
      {/* <input value={`pdcdc ${direction}`} readOnly />
      <button
        style={{ backgroundColor: "#aaf" }}
      >{`click ${direction}`}</button> */}
      {children}
    </m.div>
  );
});

const SignUpWizard = () => {
  const items = [1, 2, 3, 4, 5, 6];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(1, items.length, selectedItem + newDirection);

    setSelectedItem(nextItem);
    setDirection(newDirection);
  }

  // const steps = {}
  <InitForm values={values} handleChange={handleChange} />;
  {
    /* <StudentForm values={values} handleChange={handleChange} /> */
  }

  return (
    <>
      {/* <div style={container}> */}
      {/* <ExitAnimation /> */}
      <LazyMotion features={domAnimation}>
        <m.div
          style={{ backgroundColor: "red", width: 40, height: 40 }}
          initial={{ opacity: 0 }}
          animate={
            (selectedItem > 1 && {
              opacity: 1,
              // x: 100,
              transition: {
                //   delay: 0.2,
                //   type: "spring",
                visualDuration: 0.1,
                bounce: 0,
              },
            }) ||
            undefined
          }
        >
          Icon
        </m.div>
        <m.div
          initial={{ x: -40 }}
          animate={
            (selectedItem > 1 && {
              // opacity: 1,
              x: 0,
              transition: {
                delay: 0,
                type: "tween",
                visualDuration: 0.5,
                ease: ["easeInOut"],
                // bounce: 0.4,
              },
            }) ||
            undefined
          }
        >
          Login
        </m.div>
        {/* <motion.button
        initial={false}
        animate={{ backgroundColor: color }}
        aria-label="Previous"
        style={button}
        onClick={() => setSlide(-1)}
        whileFocus={{ outline: `2px solid ${color}` }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.button> */}
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide key={selectedItem} direction={direction} />
        </AnimatePresence>
        {/* <motion.button
        initial={false}
        animate={{ backgroundColor: color }}
        aria-label="Next"
        style={button}
        onClick={() => setSlide(1)}
        whileFocus={{ outline: `2px solid ${color}` }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.button> */}
        {/* </div> */}
        {/* ); */}
      </LazyMotion>
    </>
  );
};

export const SignUpForm = () => {
  const [hasError, setHasError] = useState(false);
  const [role] = useState<"student" | "lecturer" | "registrar">("student");
  const steps = [1, 2];
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const navigate = useNavigate();

  function setSlide(newDirection: 1 | -1) {
    const nextStep = clamp(0, steps.length - 1, currentStep + newDirection);

    console.log({ currentStep, nextStep, newDirection });

    setCurrentStep(nextStep);
    setDirection(newDirection);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large xxxbg-warning-400">
        <div className="flex flex-col items-center pb-6">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">Create an Account</p>
          <p className="text-small">You're just seconds way...</p>
        </div>
        <Formik
          initialValues={{
            email: "a@e.com",
            ref: "23234",
            password: "123",
            confirm: "123",
            username: "",
            firstname: "A",
            lastname: "Ba",
            tel: "",
            country: "",
            tnc: false,
          }}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            // console.log({ values, others });
            const formData = Object.fromEntries(
              Object.entries(values).filter(
                ([k, _]) => !k.includes(["confirm"]),
              ),
            );

            console.log({ formData, values });
            if (currentStep === 0) {
              await sleep(2000)
              setSlide(1);

              return false;
            }
            await sleep(3000);
            setSubmitting(false);
            navigate('/dashboard', {replace:true})
          }}
          validateOnChange={hasError}
          validate={(values) => {
            let result, schema;

            switch (currentStep) {
              case 0:
                const { email, ref, password, confirm } = values;

                schema = z
                  .object({
                    email: z.string().email(),
                    ref: z.string().trim(),
                    password: z
                      .string()
                      .min(3, { message: "Must be atleast 3 characters" }),
                    confirm: z.string(),
                  })
                  .refine(
                    (data) => {
                      console.log({ data });

                      return data.password === data.confirm;
                    },
                    {
                      message: "Passwords don't match",
                      path: ["confirm"], // path of error
                    },
                  );

                result = schema.safeParse({ email, ref, password, confirm });
                break;
              case 1:
                const { firstname, lastname, tel, country } = values;

                schema = z.object({
                  firstname: z.string({ message: "Invalid first name" }).trim(),
                  lastname: z.string({ message: "Invalid last name" }).trim(),
                  tel: z.string({ message: "Invalid telphone number" }).trim(),
                  // TODO: maybe use .includes()
                  country: z.string().trim(),
                  // tnc: z.boolean({ message: "Need to check this field" }),
                });

                result = schema.safeParse({
                  firstname,
                  lastname,
                  tel,
                  country,
                });
                break;
              default:
                throw new Error("Something happened when validating...");
            }
            let errors = {};

            if (!result.success) {
              setHasError(true);
              errors = result.error.flatten().fieldErrors;
              console.log({ in: "tim", errors, currentStep, hasError });
            } else {
              console.log("getting succ", !!result.success);
            }

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
          }) => (
            <Form
              // className="flex flex-col gap-4"
              validationBehavior="native"
              onSubmit={handleSubmit}
              validationErrors={errors}
            >
              <LazyMotion features={domAnimation}>
                <div className="flex flex-row justify-center items-center">
                  <m.div
                    // style={{ backgroundColor: "red", width: 30, height: 30 }}
                    className="w-10 h-10 px-2 py-2 rounded-lg bg-default-100"
                    initial={{ opacity: 0 }}
                    onClick={() => setSlide(-1)}
                    animate={
                      (currentStep > 0 && {
                        opacity: 1,
                        transition: {
                          visualDuration: 0.4,
                          bounce: 0.4,
                        },
                      }) || { opacity: 0 }
                    }
                  >
                    {/* Icon */}
                  </m.div>
                  <m.div
                    initial={{ x: -30 }}
                    animate={
                      (currentStep > 0 && {
                        // opacity: 1,
                        x: 10,
                        transition: {
                          delay: 0,
                          type: "tween",
                          duration: 0.4,
                          // visualDuration: 1.4,
                          ease: ["easeInOut"],
                          // bounce: 0.4,
                        },
                      }) || { x: -30,  transition: {
                        delay: 0,
                        type: "tween",
                        duration: 0.4,
                        // visualDuration: 1.4,
                        ease: ["easeInOut"],} }
                    }
                  >
                    {!!role &&
                      (role == "student"
                        ? "Student"
                        : role === "lecturer"
                          ? "Lecturer"
                          : "Registrar") + " Details"}
                  </m.div>
                </div>
                <AnimatePresence
                  custom={direction}
                  initial={false}
                  mode="popLayout"
                >
                  <Slide key={currentStep} direction={direction}>
                    {(currentStep == 0 && (
                      <>
                        <InitForm values={values} handleChange={handleChange} />
                        <Button
                          className="w-full"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {" "}
                          {(isSubmitting && (
                            <>
                              <span>Registering ...</span>
                              <Progress
                                isIndeterminate
                                aria-label="Registering ..."
                                className="max-w-md absolute bottom-0 content-center"
                                size="sm"
                              />
                            </>
                          )) || <span>Continue with Email</span>}
                        </Button>
                      </>
                    )) || (
                      <>
                        <StudentForm
                          values={values}
                          handleChange={handleChange}
                        />
                        <Button
                          className="w-full"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {" "}
                          {(isSubmitting && (
                            <>
                              <span>Updating Details ...</span>
                              <Progress
                                isIndeterminate
                                aria-label="Updating Details ..."
                                className="max-w-md absolute bottom-0 content-center"
                                size="sm"
                                // showValueLabel
                                // label={<span>Signing In ...</span>}
                              />
                            </>
                          )) || <span>Finish</span>}
                        </Button>
                      </>
                    )}
                  </Slide>
                </AnimatePresence>
              </LazyMotion>
            </Form>
          )}
        </Formik>
        {currentStep == 0 && (
          <>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={
                  <Icon icon="flat-color-icons:google" width={24} />
                }
                variant="bordered"
              >
                Continue with Google
              </Button>
              <Button
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="fe:github"
                    width={24}
                  />
                }
                variant="bordered"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?{" "}
              <Link href="/account/login" size="sm">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const InitForm = ({
  values: { email, password, confirm, ref },
  handleChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Input
        isRequired
        label="Email Address"
        name="email"
        // placeholder="Enter your email"
        type="email"
        variant="bordered"
        value={email}
        onChange={handleChange}
        // onBlur={handleBlur}
      />
      <div className="flex flex-row gap-4">
        <Input
          isRequired
          label="Password"
          name="password"
          // placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          variant="bordered"
          value={password}
          onChange={handleChange}
          // onBlur={handleBlur}
          endContent={
            <button
              type="button"
              onClick={togglePassword}
              className="text-default-500"
            >
              {showPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
            </button>
          }
        />
        <Input
          isRequired
          label="Confirm Password"
          name="confirm"
          // placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          variant="bordered"
          value={confirm}
          onChange={handleChange}
          // onBlur={handleBlur}
        />
      </div>
      <Input
        isRequired
        label="Reference Number"
        name="ref"
        // placeholder="Enter your password"
        type="text"
        variant="bordered"
        value={ref}
        onChange={handleChange}
        // onBlur={handleBlur}
      />
    </>
  );
};

const CommonForm = ({
  values: { password, username, firstname, lastname, tel },
  handleChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Input
        label="Username"
        name="username"
        type="text"
        variant="bordered"
        value={username}
        onChange={handleChange}
        // onBlur={handleBlur}
      />
      <div className="flex flex-row gap-4">
        <Input
          isRequired
          label="First Name"
          name="firstname"
          type="text"
          variant="bordered"
          value={firstname}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Last Name"
          name="lastname"
          type="text"
          variant="bordered"
          value={lastname}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4 w-full">
        <Input
          // className="size-8grow flex-none"
          label="Telphone Number"
          name="tel"
          // placeholder="Enter your email"
          type="tel"
          variant="bordered"
          value={tel}
          onChange={handleChange}
          // onBlur={handleBlur}
        />
        <Select
          // className="size-4 flex-none"
          variant="bordered"
          // isRequired
          label="Country"
          // labelPlacement="outside"
          name="country"
          // placeholder="Select country"
        >
          <SelectItem key="ar">Argentina</SelectItem>
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="au">Australia</SelectItem>
        </Select>
      </div>
      <div className="text-start py-1">
        <Checkbox name="tnc" onChange={handleChange}>I agree</Checkbox> to the{"  "}
        <Link href="legal/tos">Terms</Link> and{" "}
        <Link href="legal/tos">Conditions</Link>
      </div>
    </>
  );
};

const StudentForm = ({ values, handleChange }) => {
  return (
    <>
      {/* <p>Student Login</p> */}
      <CommonForm values={values} handleChange={handleChange} />
    </>
  );
};

const LecturerForm = ({ values, handleChange }) => {
  return (
    <>
      {/* <p>Lecturer Login</p> */}
      <CommonForm values={values} handleChange={handleChange} />
    </>
  );
};

const RegistrarForm = ({ values, handleChange }) => {
  return (
    <>
      {/* <p>Registrar Login</p> */}
      <CommonForm values={values} handleChange={handleChange} />
    </>
  );
};

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
      height="1.6em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1.6em"
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
