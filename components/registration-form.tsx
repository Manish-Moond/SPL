'use client';

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDIAN_STATES } from '@/lib/indian-states';
import { cn } from '@/lib/utils';
import {
    Building2,
    Check,
    Copy,
    CreditCard,
    FileText,
    IdCard,
    Loader2,
    Mail,
    Map,
    MapPin,
    Phone,
    Smartphone,
    Upload,
    User,
    UserPlus,
} from 'lucide-react';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || 'yourname@paytm';

const formSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    address: z.string().min(3, 'Village is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'Please select your state'),
    aadhar_number: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits'),
    role_type: z.enum(['batsman', 'bowler', 'all_rounder'], {
        message: 'Please select a role',
    }),
    player_style: z.string().min(1, 'Please select your playing style'),
    photo: z
        .any()
        .refine((files) => files?.length == 1, 'Photo is required.')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
    payment_screenshot: z
        .any()
        .refine((files) => files?.length == 1, 'Payment screenshot is required.')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
    upi_transaction_id: z.string().regex(/^\d{12}$/, 'UPI Transaction ID must be exactly 12 digits'),
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must agree to the Terms & Conditions and Privacy Policy',
    }),
}).superRefine((data, ctx) => {
    const photoFile = data.photo?.[0];
    const paymentScreenshotFile = data.payment_screenshot?.[0];

    if (photoFile && paymentScreenshotFile) {
        const isSameFile =
            photoFile.name === paymentScreenshotFile.name &&
            photoFile.size === paymentScreenshotFile.size &&
            photoFile.lastModified === paymentScreenshotFile.lastModified;

        if (isSameFile) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Player photo and payment screenshot cannot be the same file.',
                path: ['payment_screenshot'],
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Player photo and payment screenshot cannot be the same file.',
                path: ['photo'],
            });
        }
    }
});

function BatsmanSilhouette({ className, flip = false }: { className?: string; flip?: boolean }) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="currentColor"
            className={cn('size-12', flip && '-scale-x-100', className)}
            aria-hidden
        >
            <circle cx="32" cy="10" r="6" />
            <path d="M24 18c0 2 3 4 8 4s8-2 8-4l1 14-5 4v16h-8V36l-5-4 1-14z" />
            <rect x="44" y="22" width="4" height="22" rx="1.5" transform="rotate(28 46 33)" />
        </svg>
    );
}

function FieldShell({
    icon,
    children,
    className,
}: {
    icon: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex h-12 items-center gap-2 rounded-md border border-[#38BDF8]/60 bg-[#081420]/40 px-1.5 backdrop-blur-[2px] focus-within:ring-1 focus-within:ring-[#38BDF8]',
                className
            )}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#0EA5E9] text-white">
                {icon}
            </span>
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}

const inputClass =
    'h-11 border-0 bg-transparent px-1 text-white shadow-none placeholder:text-neutral-500 focus-visible:ring-0 md:text-sm';

function RequiredLabel({ children }: { children: React.ReactNode }) {
    return (
        <FormLabel className="text-sm font-medium text-white">
            {children} <span className="text-red-500">*</span>
        </FormLabel>
    );
}

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
            state: '',
            aadhar_number: '',
            terms: false,
            upi_transaction_id: '',
        },
    });

    const roleType = form.watch('role_type');
    const playerStyle = form.watch('player_style');

    const handleCopyUpiId = async () => {
        try {
            await navigator.clipboard.writeText(UPI_ID);
            setUpiIdCopied(true);
            toast.success('UPI ID copied to clipboard!');
            setTimeout(() => setUpiIdCopied(false), 2000);
        } catch {
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
            formData.append('state', values.state);
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
            router.push(`/registration-success?name=${encodeURIComponent(values.full_name)}`);
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-[#38BDF8]/60 bg-gradient-to-br from-[#0B2233]/30 via-[#081826]/25 to-[#050F1A]/30 p-4 shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_40px_rgba(56,189,248,0.14)] backdrop-blur-sm sm:p-6 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Name</RequiredLabel>
                                    <FieldShell icon={<User className="size-4" />}>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} className={inputClass} />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aadhar_number"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Aadhar Number</RequiredLabel>
                                    <FieldShell icon={<IdCard className="size-4" />}>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter 12 digit Aadhar number"
                                                inputMode="numeric"
                                                maxLength={12}
                                                {...field}
                                                className={inputClass}
                                                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                            />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Phone Number</RequiredLabel>
                                    <FieldShell icon={<Phone className="size-4" />}>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your mobile number"
                                                inputMode="numeric"
                                                maxLength={10}
                                                {...field}
                                                className={inputClass}
                                                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Email</RequiredLabel>
                                    <FieldShell icon={<Mail className="size-4" />}>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                type="email"
                                                {...field}
                                                className={inputClass}
                                            />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Village</RequiredLabel>
                                    <FieldShell icon={<MapPin className="size-4" />}>
                                        <FormControl>
                                            <Input placeholder="Enter your village" {...field} className={inputClass} />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>City</RequiredLabel>
                                    <FieldShell icon={<Building2 className="size-4" />}>
                                        <FormControl>
                                            <Input placeholder="Enter your city" {...field} className={inputClass} />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <RequiredLabel>State</RequiredLabel>
                                    <FieldShell icon={<Map className="size-4" />}>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="h-11 w-full border-0 bg-transparent px-1 text-white shadow-none focus-visible:ring-0 data-[placeholder]:text-neutral-500">
                                                    <SelectValue placeholder="Select your state" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-72 border-[#38BDF8]/40 bg-[#081420] text-white">
                                                    {INDIAN_STATES.map((state) => (
                                                        <SelectItem
                                                            key={state}
                                                            value={state}
                                                            className="focus:bg-[#0EA5E9] focus:text-white"
                                                        >
                                                            {state}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="role_type"
                        render={({ field }) => (
                            <FormItem>
                                <RequiredLabel>Player Role</RequiredLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            form.setValue('player_style', '');
                                        }}
                                        value={field.value}
                                        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                                    >
                                        {[
                                            { value: 'batsman', label: 'Batsman' },
                                            { value: 'bowler', label: 'Bowler' },
                                            { value: 'all_rounder', label: 'All Rounder' },
                                        ].map((role) => (
                                            <FormItem key={role.value}>
                                                <FormLabel
                                                    className={cn(
                                                        'flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-semibold transition',
                                                        field.value === role.value
                                                            ? 'border-[#0EA5E9] bg-[#0EA5E9] text-white'
                                                            : 'border-white/70 bg-transparent text-white hover:border-[#38BDF8]'
                                                    )}
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem value={role.value} className="sr-only" />
                                                    </FormControl>
                                                    {role.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
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
                                <FormItem>
                                    <RequiredLabel>
                                        {roleType === 'batsman' ? 'Batsman Style' : 'Specific Style'}
                                    </RequiredLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className={cn(
                                                'grid gap-3',
                                                roleType === 'batsman' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
                                            )}
                                        >
                                            {roleType === 'batsman' && (
                                                <>
                                                    <StyleCard
                                                        selected={playerStyle === 'Left-Handed Batsman'}
                                                        value="Left-Handed Batsman"
                                                        label="Left Hand"
                                                        flip
                                                    />
                                                    <StyleCard
                                                        selected={playerStyle === 'Right-handed Batsman'}
                                                        value="Right-handed Batsman"
                                                        label="Right Hand"
                                                    />
                                                </>
                                            )}
                                            {roleType === 'bowler' && (
                                                <>
                                                    <CompactStyleCard selected={playerStyle === 'Right Arm Pace'} value="Right Arm Pace" label="Right Arm Pace" />
                                                    <CompactStyleCard selected={playerStyle === 'Left Arm Pace'} value="Left Arm Pace" label="Left Arm Pace" />
                                                    <CompactStyleCard selected={playerStyle === 'Right Arm Spin'} value="Right Arm Spin" label="Right Arm Spin" />
                                                    <CompactStyleCard selected={playerStyle === 'Left Arm Spin'} value="Left Arm Spin" label="Left Arm Spin" />
                                                </>
                                            )}
                                            {roleType === 'all_rounder' && (
                                                <>
                                                    <CompactStyleCard selected={playerStyle === 'Right Arm Fast/Right-Handed Batsman'} value="Right Arm Fast/Right-Handed Batsman" label="Right Arm Fast / Right-Handed" />
                                                    <CompactStyleCard selected={playerStyle === 'Left Arm Fast/Left-Handed Batsman'} value="Left Arm Fast/Left-Handed Batsman" label="Left Arm Fast / Left-Handed" />
                                                    <CompactStyleCard selected={playerStyle === 'Right Arm Spin/Right-Handed Batsman'} value="Right Arm Spin/Right-Handed Batsman" label="Right Arm Spin / Right-Handed" />
                                                    <CompactStyleCard selected={playerStyle === 'Left Arm Spin/Left-Handed Batsman'} value="Left Arm Spin/Left-Handed Batsman" label="Left Arm Spin / Left-Handed" />
                                                </>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <RequiredLabel>Player Photo</RequiredLabel>
                                <FieldShell icon={<Upload className="size-4" />}>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            type="file"
                                            accept="image/*"
                                            className="h-11 border-0 bg-transparent px-1 text-white file:mr-3 file:rounded file:border-0 file:bg-[#0EA5E9] file:px-3 file:py-1 file:text-sm file:font-medium file:text-white hover:file:bg-[#0284C7]"
                                            onChange={(event) => onChange(event.target.files)}
                                        />
                                    </FormControl>
                                </FieldShell>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4 rounded-xl border border-[#38BDF8]/40 bg-[#081826]/30 p-4">
                        <h3 className="text-lg font-semibold text-[#38BDF8]">Payment Details</h3>
                        <p className="text-sm text-neutral-300">
                            Registration Fee: <span className="font-bold text-[#38BDF8]">₹550</span>
                        </p>
                        <div className="rounded-md border border-[#38BDF8]/40 bg-[#081420]/40 p-3">
                            <p className="mb-2 text-xs text-neutral-400">Pay to this UPI ID:</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 rounded border border-[#38BDF8]/40 bg-[#081420]/50 px-3 py-2">
                                    <p className="font-mono text-lg font-semibold text-[#38BDF8]">{UPI_ID}</p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleCopyUpiId}
                                    className="bg-[#0EA5E9] px-3 py-2 text-white hover:bg-[#0284C7]"
                                    size="sm"
                                >
                                    {upiIdCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-md border border-[#38BDF8]/30 bg-[#38BDF8]/10 p-3">
                            <p className="mb-1 flex items-center gap-1 text-xs font-medium text-[#7DD3FC]">
                                <Smartphone className="size-3.5" /> Payment Instructions:
                            </p>
                            <ol className="list-inside list-decimal space-y-1 text-xs text-neutral-300">
                                <li>Open your UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
                                <li>Enter UPI ID: <span className="font-mono text-[#38BDF8]">{UPI_ID}</span></li>
                                <li>Enter amount: <span className="font-semibold">₹550</span></li>
                                <li>Add note: Cricket Tournament Registration</li>
                                <li>Complete the payment and upload the screenshot below</li>
                            </ol>
                        </div>

                        <FormField
                            control={form.control}
                            name="payment_screenshot"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <RequiredLabel>Payment Screenshot</RequiredLabel>
                                    <FieldShell icon={<CreditCard className="size-4" />}>
                                        <FormControl>
                                            <Input
                                                {...fieldProps}
                                                type="file"
                                                accept="image/*"
                                                className="h-11 border-0 bg-transparent px-1 text-white file:mr-3 file:rounded file:border-0 file:bg-[#0EA5E9] file:px-3 file:py-1 file:text-sm file:font-medium file:text-white hover:file:bg-[#0284C7]"
                                                onChange={(event) => onChange(event.target.files)}
                                            />
                                        </FormControl>
                                    </FieldShell>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="upi_transaction_id"
                            render={({ field }) => (
                                <FormItem>
                                    <RequiredLabel>Utr Number</RequiredLabel>
                                    <FieldShell icon={<FileText className="size-4" />}>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter UTR number"
                                                {...field}
                                                className={inputClass}
                                                maxLength={12}
                                                inputMode="numeric"
                                                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                            />
                                        </FormControl>
                                    </FieldShell>
                                    <FormDescription className="text-xs text-neutral-400">
                                        Enter the 12-digit UPI / UTR reference from your payment receipt.
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="border-[#38BDF8] data-[state=checked]:bg-[#0EA5E9] data-[state=checked]:border-[#0EA5E9] data-[state=checked]:text-white"
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal leading-snug text-neutral-200">
                                    I agree to the{' '}
                                    <Link href="/terms" className="font-medium text-[#38BDF8] hover:underline">
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="font-medium text-[#38BDF8] hover:underline">
                                        Privacy Policy
                                    </Link>
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-md bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] text-base font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(255,107,0,0.35)] hover:from-[#FF6B00] hover:to-[#e55f00]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                PROCESSING...
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-5 w-5" />
                                REGISTER NOW
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

function StyleCard({
    selected,
    value,
    label,
    flip = false,
}: {
    selected: boolean;
    value: string;
    label: string;
    flip?: boolean;
}) {
    return (
        <FormItem>
            <FormLabel
                className={cn(
                    'relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 px-4 py-6 transition',
                    selected
                        ? 'border-[#0EA5E9] bg-[#0EA5E9] text-white'
                        : 'border-white/80 bg-[#081826]/30 text-white hover:border-[#38BDF8]'
                )}
            >
                <FormControl>
                    <RadioGroupItem value={value} className="sr-only" />
                </FormControl>
                <span
                    className={cn(
                        'absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border',
                        selected ? 'border-white bg-white text-[#0EA5E9]' : 'border-white bg-transparent'
                    )}
                >
                    {selected ? <Check className="size-3.5" /> : null}
                </span>
                <BatsmanSilhouette flip={flip} className="size-14" />
                <span className="text-base font-semibold">{label}</span>
            </FormLabel>
        </FormItem>
    );
}

function CompactStyleCard({
    selected,
    value,
    label,
}: {
    selected: boolean;
    value: string;
    label: string;
}) {
    return (
        <FormItem>
            <FormLabel
                className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition',
                    selected
                        ? 'border-[#0EA5E9] bg-[#0EA5E9] text-white'
                        : 'border-white/70 bg-[#081826]/30 text-white hover:border-[#38BDF8]'
                )}
            >
                <FormControl>
                    <RadioGroupItem value={value} className="sr-only" />
                </FormControl>
                {label}
                <span
                    className={cn(
                        'flex size-4 items-center justify-center rounded-full border',
                        selected ? 'border-white bg-white text-[#0EA5E9]' : 'border-white'
                    )}
                >
                    {selected ? <Check className="size-3" /> : null}
                </span>
            </FormLabel>
        </FormItem>
    );
}
