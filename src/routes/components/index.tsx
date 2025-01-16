import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Checkbox } from "../../components/ui/checkbox"
import { format } from "date-fns"
import { CalendarIcon, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Textarea } from "../../components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DrawerDialogDemo } from "./responsiveDialog"


const Components = () => {
    const form = useForm()
    const [date, setDate] = useState<Date>()

    return <div className=" lg:w-4/12 mx-auto py-10">
        <h2 className="text-xl font-bold pt-20 pb-10">Ícones</h2>
        <a href="https://heroicons.com/">heroicons.com</a>

        <h2 className="text-xl font-bold pt-20 pb-10">Inputs</h2>
        <Form {...form}>
            <form onSubmit={() => { }} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite aqui seu email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Digite aqui sua senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>

        <h2 className="text-xl font-bold pt-20 pb-10">Botões</h2>
        <div className="flex gap-4 flex-wrap">
            <Button>Botão default</Button>
            <Button variant={'primary'}>Botão primário</Button>
            <Button variant={"link"}>Botão link</Button>
            <Button variant={"destructive"}>Botão destructive</Button>
            <Button variant={"outline"}>Botão outline</Button>
            <Button variant={"secondary"}>Botão secondary</Button>
            <Button variant={"ghost"}>Botão ghost</Button>
            <Button variant={"outlinePrimary"}>Botão outline primário</Button>
        </div>

        <h2 className="text-xl font-bold pt-20 pb-10">Botões de ícone</h2>
        <div className="flex gap-4 flex-wrap">
            <Button rounded={'full'} size="icon"><Mail /></Button>
            <Button rounded={'full'} size="icon" variant={'primary'}><Mail /></Button>
            <Button rounded={'full'} variant={"link"} size="icon"><Mail /></Button>
            <Button rounded={'full'} variant={"destructive"} size="icon"><Mail /></Button>
            <Button rounded={'full'} variant={"outline"} size="icon"><Mail /></Button>
            <Button rounded={'full'} variant={"secondary"} size="icon"><Mail /></Button>
            <Button rounded={'full'} variant={"ghost"} size="icon"><Mail /></Button>
            <Button rounded={'full'} variant={"outlinePrimary"} size="icon"><Mail /></Button>
        </div>

        <h2 className="text-xl font-bold pt-20 pb-10">Badges</h2>
        <div className="flex gap-4 flex-wrap">
            <Badge>Badge</Badge>
            <Badge variant="outline">Badge</Badge>
            <Badge variant="destructive">Badge</Badge>
            <Badge variant="secondary">Badge</Badge>
            <Badge variant="success">Badge</Badge>
            <Badge variant="warning">Badge</Badge>
            <Badge variant="primary">Badge</Badge>
            <Badge variant="orange">Badge</Badge>
            <Badge variant="violet">Badge</Badge>
            <Badge variant="violet">Badge</Badge>

            <Badge variant="purple">Badge</Badge>
            <Badge variant="cyan">Badge</Badge>
            <Badge variant="teal">Badge</Badge>
            <Badge variant="emerald">Badge</Badge>
            <Badge variant="lime">Badge</Badge>
            <Badge variant="amber">Badge</Badge>

        </div>


        <h2 className="text-xl font-bold pt-20 pb-10">Checkbox</h2>
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Accept terms and conditions
            </label>
        </div>
        <br />
        <div className="flex items-center space-x-2">
            <Checkbox id="terms2" disabled />
            <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Accept terms and conditions
            </label>
        </div>
        <br />
        <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Date Picker</h2>

        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>

        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Textarea</h2>
        <Textarea />
        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Select</h2>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Radio group</h2>
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup>


        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Dialog</h2>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <h2 className="mt-6 mb-4">Dialog with sheet in mobile device</h2>
        <DrawerDialogDemo />

        <br />
        <h2 className="text-xl font-bold pt-20 pb-10">Sheet</h2>
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>


    </div>
}

export default Components