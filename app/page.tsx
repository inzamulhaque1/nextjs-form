"use client";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";


// type NewInput = {
//   type: string;
//   inputName: string;
// };

export default function Home() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      users: [{ name: '', email: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  return (
    <main>
      <div className="text-center font-bold mt-4">Welcome to input Section</div>
      <div className="flex justify-center mt-10">
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Dynamic Users Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          console.log(field, index+1);
          return (
          <div key={field.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <div>
              <label>Name:</label>
              <input
                {...register(`users.${index}.name`, { required: 'Name is required' })}
                placeholder="Enter name"
                style={{ width: '60%' }}
              />
              {errors.users?.[index]?.name && (
                <p style={{ color: 'red' }}>{errors.users[index].name.message}</p>
              )}
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <label>Email:</label>
              <input
                {...register(`users.${index}.email`, { required: 'Email is required' })}
                placeholder="Enter email"
                type="email"
                style={{ width: '60%' }}
              />
              {errors.users?.[index]?.email && (
                <p style={{ color: 'red' }}>{errors.users[index].email.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              style={{ marginTop: '0.5rem', backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '5px 10px' }}
            >
              Remove
            </button>
          </div>
        )
        })}

        <button
          type="button"
          onClick={() => append({ name: '', email: '' })}
          style={{ marginBottom: '1rem', backgroundColor: '#4CAF50', color: '#fff', padding: '8px 12px', border: 'none' }}
        >
          + Add User
        </button>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
      </div>
    </main>
  );
}
