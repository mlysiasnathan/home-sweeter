import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// npx sequelize-cli db:migrate

