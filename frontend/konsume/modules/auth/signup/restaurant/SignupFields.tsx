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
            <Input placeholder="Input your restaurant date of establishment" {...field} type='date' />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Location"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Location</FormLabel>
            <Input placeholder="Input your restaurant location" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Food"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[17.7px]/[120%] font-bold">Type of food Sold</FormLabel>
            <Input placeholder="Input the type of food you sell" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Name"
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className="text-[17.7px]/[120%] font-bold">Restaurant Name</FormLabel>
            <Input placeholder="Input your restaurant name" {...field} />
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
    </div>
  );
};
