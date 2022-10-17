import React, { useState } from "react";

const App = () => {
    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        // const value = event.currentTarget.value
        const {
            currentTarget: { value },
        } = event;
        setValue(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello", value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="username"
                />
                <button>Log In</button>
            </form>
        </div>
    );
};

export default App;
