import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "use-debounce"
import { useBankRecipient } from "@/data/wallets/get-recipient"

const bankRecipientSchema = z.object({
  accountNumber: z.string().min(10).max(10),
  bankCode: z.string().min(3).max(3)
})


export const ChooseBankRecipient = () => {
  const form = useForm({
    resolver: zodResolver(bankRecipientSchema),
    defaultValues: {
      accountNumber: '',
      bankCode: ''
    }
  })

  const values = useWatch({ control: form.control })
  const [debouncedValues] = useDebounce(values, 500)

  const bankRecipientQuery = useBankRecipient(
    debouncedValues.bankCode,
    debouncedValues.accountNumber
  )


  return (
    <div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="bankCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank name</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="001">Guy bank</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormDescription>
                  {bankRecipientQuery.isLoading ? (
                    <span>Loading recipient details...</span>
                  ) : bankRecipientQuery.isError ? (
                    <span>Recipient not found</span>
                  ) : bankRecipientQuery.isSuccess ? (
                    <span>{bankRecipientQuery.data.name}</span>
                  ) : null}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}