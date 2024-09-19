import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const SignupFields = () => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        name="Datee"
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className="text-[17.7px]/[120%] font-bold">Date Of Establishment</FormLabel>
            <Input placeholder="Input your first name" {...field} type='date' />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Location"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Location</FormLabel>
            <Input placeholder="Input your last name" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Name"
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className="text-[17.7px]/[120%] font-bold">Restaurant Name</FormLabel>
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
    </div>
  );
};
