import React, {Fragment, useState} from "react";
import {useFormikContext} from "formik";
import {Combobox, Transition} from "@headlessui/react";
import {LuChevronsUpDown} from "react-icons/lu";
import {CheckIcon} from "lucide-react";
import {string} from "yup";

interface ComboboxFieldProps {
    label: string,
    items: string[],
    name: string,
    valueKey?: { label: string; value: string }[]
}

const ComboboxField: React.FC<ComboboxFieldProps> = ({label, items, name, valueKey}) => {
    const {values, setFieldValue} = useFormikContext<any>();
    const [query, setQuery] = useState('');

    const filtered =
        query === ''
            ? items
            : items.filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
            );

    return (
        <div className="w-full group">
            <label className="text-sm font-normal">{label}</label>
            <div className="relative mt-1">
                <Combobox
                    value={values[name]}
                    onChange={(val) => setFieldValue(name, val)}
                >
                    <div className="relative bg-white rounded-lg">
                        <div className="flex items-center">
                            <Combobox.Input
                                className="w-full rounded-lg p-3 lg:p-4 group-hover:border-blue-500"
                                displayValue={(val: string) => val}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={`Select ${label.toLowerCase()}...`}
                            />
                            <Combobox.Button className="absolute right-2">
                                <LuChevronsUpDown className="h-5 w-5 text-gray-400"/>
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                static>
                                {filtered.length === 0 ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        No results found.
                                    </div>
                                ) : (
                                    filtered.map((item) => (
                                        <Combobox.Option
                                            key={item}
                                            value={item}
                                            className={({active}: { active: boolean }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                }`
                                            }
                                        >
                                            {({selected, active}) => (
                                                <>
                <span
                    className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                    }`}
                >
            {item}
            </span>
                                                    {selected && (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? 'text-blue-600' : 'text-blue-600'
                                                            }`}
                                                        >
                <CheckIcon className="h-5 w-5"/>
                    </span>
                                                    )}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        </div>
    );
};

export default ComboboxField;