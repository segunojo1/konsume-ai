import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { LoginFormProps } from '@/@types';

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit }) => (
    <div className='max-w-[807px] md:mx-auto'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
                <div className="flex flex-col gap-6 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                                <FormLabel className="text-[19.63px] font-bold">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Input your email"
                                        {...field}
                                        className="xl:max-w-[348.9px] text-[17.44px] text-[#8C8CA1] py-[13px] px-[17px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel className="text-[19.63px] font-bold">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Input your password"
                                        type="password"
                                        {...field}
                                        className="xl:max-w-[348.9px] text-[17.44px] text-[#8C8CA1] py-[13px] px-[17px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="mt-8 w-full max-w-[348.9px] bg-[#8DCF384D] p-[10px] border-2 border-[#D6FBC4] rounded-[30px] text-desktop-highlight font-bold min-h-[52px]" type="submit">
                    Continue
                </Button>
            </form>
        </Form>
    </div>
);

export default LoginForm;