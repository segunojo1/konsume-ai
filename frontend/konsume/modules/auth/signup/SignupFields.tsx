import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const SignupFields = () => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        name="FirstName"
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className="text-[17.7px]/[120%] font-bold">First Name</FormLabel>
            <Input placeholder="Input your first name" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="LastName"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Last Name</FormLabel>
            <Input placeholder="Input your last name" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Email"
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className="text-[17.7px]/[120%] font-bold">Email</FormLabel>
            <Input placeholder="Input your email" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Password"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Password</FormLabel>
            <Input type="password" placeholder="Input your password" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="ConfirmPassword"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Confirm Password</FormLabel>
            <Input type="password" placeholder="Confirm your password" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
