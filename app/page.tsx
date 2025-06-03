"use client";
import { useFieldArray, useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// type NewInput = {
//   type: string;
//   inputName: string;
// };

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      users: [{ name: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
  };

  return (
    <main>
      <div className="text-center font-bold mt-4 text-sky-600 text-4xl">
        Welcome to input Section
      </div>

      <div className="flex justify-center mt-5">
        <div>
          <h2>Dynamic Users Form</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2">
              {fields.map((field, index) => {
                console.log(field, index + 1);
                return (
                  <div
                    key={field.id}
                    
                  >
                    <div className="grid grid-cols-2">
                      <div>
                        <label>Name:</label>
                        <input
                          {...register(`users.${index}.name`, {
                            required: "Name is required",
                          })}
                          placeholder="Enter name"
                          style={{ width: "60%" }}
                        />
                        {errors.users?.[index]?.name && (
                          <p style={{ color: "red" }}>
                            {errors.users[index].name.message}
                          </p>
                        )}
                      </div>

                      <div style={{ marginTop: "0.5rem" }}>
                        <label>Email:</label>
                        <input
                          {...register(`users.${index}.email`, {
                            required: "Email is required",
                          })}
                          placeholder="Enter email"
                          type="email"
                          style={{ width: "60%" }}
                        />
                        {errors.users?.[index]?.email && (
                          <p style={{ color: "red" }}>
                            {errors.users[index].email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      style={{
                        marginTop: "0.5rem",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            <br />
            <div className="space-x-5">
              <button
                type="button"
                onClick={() => append({ name: "", email: "" })}
                className="px-3 py-1 bg-green-700 rounded-2xl font-bold text-white cursor-pointer"
              >
                + Add User
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-sky-700 rounded-2xl font-bold text-white cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
