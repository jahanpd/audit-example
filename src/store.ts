import { writable } from 'svelte/store';

export const count = writable(0);

export const labels = writable({ })

export const form = writable({
    start: null,
    end: null,
    teams: [],
    consultant_include: [],
    consultant_exclude: [],
    procs_include: [],
    procs_exclude: [],
    urgency: []
})

export const procs = [
            { value: 1, label: 'Procedure 1' },
            { value: 2, label: 'Procedure 2' },
            { value: 3, label: 'Procedure 3' },
            { value: 4, label: 'Procedure 4' },
            { value: 5, label: 'Procedure 5' },
            { value: 6, label: 'Procedure 6' },
    ];

export const clusters = writable({
    all: procs,
    appendicectomy: [
            { value: 1, label: 'Procedure 1' },
            { value: 2, label: 'Procedure 2' },
    ],
    colonoscopy: [
            { value: 3, label: 'Procedure 3' },
            { value: 4, label: 'Procedure 4' },
    ]
})

export const teams = [
            { value: 1, label: 'Surg 1' },
            { value: 2, label: 'Surg 2' },
            { value: 3, label: 'Surg 3' },
            { value: 4, label: 'Surg 4' },
    ];
export const consultants = [
            { value: 1, label: 'Consultant 1' },
            { value: 2, label: 'Consultant 2' },
            { value: 3, label: 'Consultant 3' },
            { value: 4, label: 'Consultant 4' },
    ];
export const urgent = [
            { value: 1, label: 'Emergency' },
            { value: 2, label: 'Elective' },
    ];
