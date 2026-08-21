'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, Smartphone, Copy, Check } from 'lucide-react';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// UPI Configuration - Update these in your .env.local file
const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "yourname@paytm";
const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || "Your Name";

const formSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    address: z.string().min(3, 'Village/Address is required'),
    city: z.string().min(2, 'City is required'),
    aadhar_number: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits'),

    role_type: z.enum(['batsman', 'bowler', 'all_rounder'], {
        message: "Please select a role",
    }),

    // Specific style will be stored in a generic field or computed
    player_style: z.string().min(1, 'Please select your playing style'),

    photo: z
        .any()
        .refine((files) => files?.length == 1, "Photo is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),

    payment_screenshot: z
        .any()
        .refine((files) => files?.length == 1, "Payment screenshot is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),

    upi_transaction_id: z.string()
        .regex(/^\d{12}$/, 'UPI Transaction ID must be exactly 12 digits'),

    terms: z.boolean().refine(val => val === true, {
        message: "You must confirm the details are correct",
    }),
}).superRefine((data, ctx) => {
    // Check if both photos are the same file
    const photoFile = data.photo?.[0];
    const paymentScreenshotFile = data.payment_screenshot?.[0];
    
    if (photoFile && paymentScreenshotFile) {
        // Compare by name, size, and last modified time to detect if same file
        const isSameFile = 
            photoFile.name === paymentScreenshotFile.name &&
            photoFile.size === paymentScreenshotFile.size &&
            photoFile.lastModified === paymentScreenshotFile.lastModified;
        
        if (isSameFile) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Player photo and payment screenshot cannot be the same file. Please upload different images.",
                path: ['payment_screenshot'],
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Player photo and payment screenshot cannot be the same file. Please upload different images.",
                path: ['photo'],
            });
        }
    }
});

export function RegistrationForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [upiIdCopied, setUpiIdCopied] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            aadhar_number: '',
            terms: false,
            upi_transaction_id: '',
        },
    });

    const roleType = form.watch('role_type');

    const handleCopyUpiId = async () => {
        try {
            await navigator.clipboard.writeText(UPI_ID);
            setUpiIdCopied(true);
            toast.success('UPI ID copied to clipboard!');
            setTimeout(() => setUpiIdCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy UPI ID');
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('full_name', values.full_name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('address', values.address);
            formData.append('city', values.city);
            formData.append('aadhar_number', values.aadhar_number);
            formData.append('role_type', values.role_type);
            formData.append('player_style', values.player_style);
            formData.append('photo', values.photo[0]);
            formData.append('payment_screenshot', values.payment_screenshot[0]);
            formData.append('upi_transaction_id', values.upi_transaction_id);

            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            toast.success('Registration submitted successfully!');
            router.push('/registration-success');

        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-cyan-500">
                    Player Registration
                </CardTitle>
                <CardDescription className="text-center text-slate-400">
                    Fill your details for the tournament
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="M.S. Dhoni" {...field} className="bg-slate-950 border-slate-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="9876543210" {...field} className="bg-zinc-950 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="msd@example.com" type="email" {...field} className="bg-zinc-950 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="aadhar_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Aadhar Card Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1234 5678 9012" {...field} className="bg-zinc-950 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address (Village Name)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ranchi" {...field} className="bg-zinc-950 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ranchi" {...field} className="bg-zinc-950 border-zinc-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <h3 className="text-lg font-semibold text-blue-400">Player Role</h3>

                            <FormField
                                control={form.control}
                                name="role_type"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Select Category</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0 text-slate-300">
                                                    <FormControl>
                                                        <RadioGroupItem value="batsman" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">Batsman</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0 text-slate-300">
                                                    <FormControl>
                                                        <RadioGroupItem value="bowler" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">Bowler</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0 text-slate-300">
                                                    <FormControl>
                                                        <RadioGroupItem value="all_rounder" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">All Rounder</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {roleType && (
                                <FormField
                                    control={form.control}
                                    name="player_style"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3 animate-in fade-in slide-in-from-top-4">
                                            <FormLabel>Specific Style</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                                                >
                                                    {roleType === 'batsman' && (
                                                        <>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Right-handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Right-handed Batsman</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Left-Handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Left-Handed Batsman</FormLabel>
                                                            </FormItem>
                                                        </>
                                                    )}

                                                    {roleType === 'bowler' && (
                                                        <>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Right Arm Pace" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Right Arm Pace</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Left Arm Pace" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Left Arm Pace</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Right Arm Spin" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Right Arm Spin</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Left Arm Spin" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Left Arm Spin</FormLabel>
                                                            </FormItem>
                                                        </>
                                                    )}

                                                    {roleType === 'all_rounder' && (
                                                        <>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Right Arm Fast/Right-Handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Right Arm Fast/Right-Handed Batsman</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Left Arm Fast/Left-Handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Left Arm Fast/Left-Handed Batsman</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Right Arm Spin/Right-Handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Right Arm Spin/Right-Handed Batsman</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border border-slate-800 p-3 rounded-md hover:bg-slate-800/50 cursor-pointer">
                                                                <FormControl><RadioGroupItem value="Left Arm Spin/Left-Handed Batsman" /></FormControl>
                                                                <FormLabel className="font-normal cursor-pointer w-full">Left Arm Spin/Left-Handed Batsman</FormLabel>
                                                            </FormItem>
                                                        </>
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <FormLabel>Player Photo</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            type="file"
                                            accept="image/*"
                                            className="bg-slate-950 border-slate-700 file:bg-slate-800 file:text-slate-200 file:border-0 file:rounded-sm file:px-2 file:mr-2 hover:file:bg-slate-700"
                                            onChange={(event) => {
                                                onChange(event.target.files);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Payment Section */}
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <h3 className="text-lg font-semibold text-green-400">Payment Details</h3>
                            
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-3">
                                <p className="text-slate-300 text-sm">
                                    Registration Fee: <span className="font-bold text-green-400">₹500</span>
                                </p>
                                
                                <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                                    <p className="text-slate-400 text-xs mb-2">Pay to this UPI ID:</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-slate-950 px-3 py-2 rounded border border-slate-600">
                                            <p className="text-green-400 font-mono font-semibold text-lg">{UPI_ID}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleCopyUpiId}
                                            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2"
                                            size="sm"
                                        >
                                            {upiIdCopied ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-700/50 p-3 rounded">
                                    <p className="text-blue-300 text-xs font-medium mb-1">📱 Payment Instructions:</p>
                                    <ol className="text-slate-300 text-xs space-y-1 list-decimal list-inside">
                                        <li>Open your UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
                                        <li>Click on "Send Money" or "Pay"</li>
                                        <li>Enter UPI ID: <span className="font-mono text-green-400">{UPI_ID}</span></li>
                                        <li>Enter amount: <span className="font-semibold">₹500</span></li>
                                        <li>Add note: "Cricket Tournament Registration"</li>
                                        <li>Complete the payment</li>
                                    </ol>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="payment_screenshot"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormLabel>Payment Screenshot</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fieldProps}
                                                type="file"
                                                accept="image/*"
                                                className="bg-slate-950 border-slate-700 file:bg-slate-800 file:text-slate-200 file:border-0 file:rounded-sm file:px-2 file:mr-2 hover:file:bg-slate-700"
                                                onChange={(event) => {
                                                    onChange(event.target.files);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="upi_transaction_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>UPI Transaction ID/ UTR/ Ref. No:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., 123456789012" 
                                                {...field} 
                                                className="bg-zinc-950 border-zinc-700" 
                                                maxLength={12}
                                                type="text"
                                                inputMode="numeric"
                                                onChange={(e) => {
                                                    // Only allow digits
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    // Limit to 12 digits
                                                    const limitedValue = value.slice(0, 12);
                                                    field.onChange(limitedValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-slate-400 text-xs">
                                            अपने payment receipt या UPI app में जो transaction reference number दिखता है, वो number यहाँ enter करें। यह number payment complete होने के बाद दिखता है।
                                            <span className="block mt-1 text-yellow-400 font-medium">⚠️ Note: This transaction ID will be used for payment verification.</span>
                                            <span className="block mt-1 text-yellow-400 font-medium">⚠️ Note: Transaction ID must be exactly 12 digits.</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-800 p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="cursor-pointer">
                                            I confirm the details above are correct
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg rounded transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
