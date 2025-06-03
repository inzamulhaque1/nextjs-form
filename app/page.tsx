"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { IoPersonAddOutline, IoPersonRemoveSharp } from "react-icons/io5";
import { MdAdsClick } from "react-icons/md";
import Swal from "sweetalert2";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedUsers = data.users
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user: any, index: number) =>
          `<b>User ${index + 1}:</b><br>
       Name: ${user.name}<br>
       Email: ${user.email}<br><br>`
      )
      .join("");

    Swal.fire({
      title: "Form Submitted Successfully!",
      html: `
        <div style="text-align: left;">
          <h3>Submitted Data:</h3>
          ${formattedUsers}
        </div>
      `,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6", // sky-500
    });
  };

  return (
    <main>
      <div className="text-center font-bold mt-4 text-sky-600 text-4xl">
        Welcome to input Section ({fields.length})
      </div>

      <div className="flex justify-center mt-5">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2">
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="p-4 border-2 border-sky-400 m-2 rounded-3xl bg-sky-50 relative"
                  >
                    <div className="grid grid-cols-2 gap-2 ">
                      <div className="rounded-l-3xl border border-sky-200 bg-amber-50 text-sky-600 px-4 py-1 focus:bg-amber-300">
                        <label>Name:</label>
                        <input
                          {...register(`users.${index}.name`, {
                            required: "Name is required",
                          })}
                          className="pl-5"
                          placeholder="Enter name"
                        />
                        {errors.users?.[index]?.name && (
                          <p style={{ color: "red" }}>
                            {errors.users[index].name.message}
                          </p>
                        )}
                      </div>

                      <div className="rounded-r-3xl border border-sky-200 bg-amber-50 text-sky-600 px-4 py-1">
                        <label>Email:</label>
                        <input
                          {...register(`users.${index}.email`, {
                            required: "Email is required",
                          })}
                          placeholder="Enter email"
                          className="pl-5"
                          type="email"
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
                      className="absolute -top-3 -right-3 cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      <IoPersonRemoveSharp className="bg-red-500 p-2 text-3xl rounded-full text-white hover:text-red-500 hover:bg-amber-50 border border-sky-200 " />
                    </button>
                  </div>
                );
              })}
            </div>

            <br />
            <div className="space-x-5 flex ">
              <div className="flex items-center px-3 py-1 bg-green-700 hover:bg-green-900 rounded-2xl font-bold text-white cursor-pointer">
                <IoPersonAddOutline className="mr-2" />
                <button
                  type="button"
                  onClick={() => append({ name: "", email: "" })}
                  className=" cursor-pointer"
                >
                  Add User
                </button>
              </div>
              {fields.length > 0 && (
                <div className="flex items-center px-3 py-1 bg-sky-700 rounded-2xl hover:bg-sky-900 font-bold text-white cursor-pointer">
                  <button type="submit" className="cursor-pointer">
                    Submit
                  </button>
                  <MdAdsClick className="ml-2" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
