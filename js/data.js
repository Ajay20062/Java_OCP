const MODULES = [
{
    id:1,
    title:"Java Basics & Data Types",
    priority:"High",
    color:"orange",

    sections:[
        {
            name:"Program Structure",
            topics:[
                "Class structure",
                "main() method",
                "Packages",
                "Imports",
                "Compilation flow",
                "Classpath basics"
            ]
        },

        {
            name:"Variables",
            topics:[
                "Local variables",
                "Instance variables",
                "Static variables",
                "Final variables",
                "Initialization rules",
                "Scope & lifetime"
            ]
        },

        {
            name:"Primitive Types",
            topics:[
                "byte",
                "short",
                "int",
                "long",
                "float",
                "double",
                "char",
                "boolean"
            ]
        }
    ],

    traps:[
        "Integer overflow",
        "Implicit casting pitfalls",
        "Wrapper null unboxing",
        "Pre/post increment confusion",
        "Operator precedence mistakes"
    ]
},

{
    id:2,
    title:"Strings & StringBuilder",
    priority:"High",
    color:"orange",

    sections:[
        {
            name:"String Basics",
            topics:[
                "String pool",
                "Immutability",
                "Heap objects",
                "Literal vs new String()",
                "String comparison"
            ]
        },

        {
            name:"String Methods",
            topics:[
                "substring()",
                "indexOf()",
                "contains()",
                "replace()",
                "trim()",
                "strip()",
                "repeat()"
            ]
        },

        {
            name:"StringBuilder",
            topics:[
                "append()",
                "insert()",
                "delete()",
                "replace()",
                "reverse()",
                "capacity()"
            ]
        }
    ],

    traps:[
        "== vs equals() confusion",
        "String immutability",
        "trim() vs strip()",
        "isBlank() vs isEmpty()"
    ]
},

{
    id:3,
    title:"Date & Time API",
    priority:"Medium–High",
    color:"green",

    sections:[
        {
            name:"Core Classes",
            topics:[
                "LocalDate",
                "LocalTime",
                "LocalDateTime",
                "Instant",
                "Duration",
                "Period"
            ]
        },

        {
            name:"Formatting",
            topics:[
                "parse()",
                "DateTimeFormatter",
                "Pattern formatting",
                "Localized formatting"
            ]
        }
    ],

    traps:[
        "Invalid date values",
        "Formatter case sensitivity",
        "Immutability confusion"
    ]
},

{
    id:4,
    title:"Program Flow Control",
    priority:"High",
    color:"orange",

    sections:[
        {
            name:"Conditionals",
            topics:[
                "if",
                "if-else",
                "nested if",
                "ternary operator"
            ]
        },

        {
            name:"Loops",
            topics:[
                "for loop",
                "while loop",
                "do while",
                "enhanced for loop",
                "nested loops"
            ]
        },

        {
            name:"Switch",
            topics:[
                "traditional switch",
                "switch expression",
                "yield",
                "arrow syntax"
            ]
        }
    ],

    traps:[
        "Switch fallthrough",
        "Infinite loops",
        "break vs continue",
        "Scope visibility"
    ]
},

{
    id:5,
    title:"Object-Oriented Programming",
    priority:"Very High",
    color:"red",

    sections:[
        {
            name:"Classes & Objects",
            topics:[
                "Object creation",
                "Reference variables",
                "Garbage collection"
            ]
        },

        {
            name:"Inheritance",
            topics:[
                "extends",
                "super",
                "overriding",
                "polymorphism",
                "upcasting",
                "downcasting"
            ]
        },

        {
            name:"Interfaces",
            topics:[
                "default methods",
                "functional interfaces",
                "abstract classes"
            ]
        }
    ],

    traps:[
        "Constructor chaining",
        "Overloading vs overriding",
        "Hidden methods",
        "Polymorphic references"
    ]
},

{
    id:6,
    title:"Exception Handling",
    priority:"High",
    color:"orange",

    sections:[
        {
            name:"Exception Basics",
            topics:[
                "try",
                "catch",
                "finally",
                "throw",
                "throws"
            ]
        },

        {
            name:"Advanced",
            topics:[
                "multi-catch",
                "try-with-resources",
                "AutoCloseable",
                "custom exceptions"
            ]
        }
    ],

    traps:[
        "Catch ordering",
        "finally return behavior",
        "Unchecked vs checked"
    ]
},

{
    id:7,
    title:"Arrays & Collections",
    priority:"Very High",
    color:"red",

    sections:[
        {
            name:"Arrays",
            topics:[
                "1D arrays",
                "2D arrays",
                "Arrays.sort()",
                "binarySearch()"
            ]
        },

        {
            name:"Collections",
            topics:[
                "ArrayList",
                "LinkedList",
                "HashSet",
                "TreeSet",
                "HashMap",
                "TreeMap"
            ]
        }
    ],

    traps:[
        "HashSet ordering",
        "List.of() immutability",
        "Comparator confusion"
    ]
},

{
    id:8,
    title:"Streams & Lambdas",
    priority:"Very High",
    color:"red",

    sections:[
        {
            name:"Functional Interfaces",
            topics:[
                "Predicate",
                "Consumer",
                "Supplier",
                "Function"
            ]
        },

        {
            name:"Streams",
            topics:[
                "filter()",
                "map()",
                "flatMap()",
                "sorted()",
                "collect()",
                "reduce()"
            ]
        }
    ],

    traps:[
        "Consumed streams",
        "Lazy execution",
        "Infinite stream issue"
    ]
},

{
    id:9,
    title:"Modules & Deployment",
    priority:"Medium",
    color:"blue",

    sections:[
        {
            name:"Modules",
            topics:[
                "module-info.java",
                "requires",
                "exports",
                "services"
            ]
        }
    ],

    traps:[
        "Module visibility",
        "exports restrictions"
    ]
},

{
    id:10,
    title:"Concurrency",
    priority:"Medium–High",
    color:"green",

    sections:[
        {
            name:"Threads",
            topics:[
                "Runnable",
                "Callable",
                "Thread lifecycle"
            ]
        },

        {
            name:"Executors",
            topics:[
                "ExecutorService",
                "Future",
                "Scheduled executors"
            ]
        }
    ],

    traps:[
        "Deadlocks",
        "Race condition",
        "Shared mutable state"
    ]
},

{
    id:11,
    title:"Java I/O & NIO",
    priority:"Medium",
    color:"blue",

    sections:[
        {
            name:"Streams",
            topics:[
                "Byte streams",
                "Character streams",
                "Buffered streams"
            ]
        },

        {
            name:"NIO",
            topics:[
                "Path",
                "Files",
                "copy()",
                "move()"
            ]
        }
    ],

    traps:[
        "Path confusion",
        "File closing issue"
    ]
},

{
    id:12,
    title:"JDBC",
    priority:"Medium",
    color:"blue",

    sections:[
        {
            name:"Core",
            topics:[
                "DriverManager",
                "Connection",
                "Statement",
                "PreparedStatement",
                "ResultSet"
            ]
        }
    ],

    traps:[
        "SQL injection",
        "Connection leaks"
    ]
},

{
    id:13,
    title:"Localization",
    priority:"Medium",
    color:"blue",

    sections:[
        {
            name:"Locale",
            topics:[
                "Locale class",
                "Resource bundles",
                "Formatting"
            ]
        }
    ],

    traps:[
        "Locale mismatch"
    ]
},

{
    id:14,
    title:"Logging & Annotations",
    priority:"Low–Medium",
    color:"blue",

    sections:[
        {
            name:"Logging",
            topics:[
                "Logger",
                "Handlers",
                "Log levels"
            ]
        },

        {
            name:"Annotations",
            topics:[
                "@Override",
                "@Deprecated",
                "@FunctionalInterface"
            ]
        }
    ],

    traps:[
        "@Override misuse"
    ]
},

{
    id:15,
    title:"Generics",
    priority:"High",
    color:"orange",

    sections:[
        {
            name:"Generics Basics",
            topics:[
                "Generic classes",
                "Generic methods",
                "Type inference"
            ]
        },

        {
            name:"Wildcards",
            topics:[
                "? extends",
                "? super",
                "PECS principle"
            ]
        }
    ],

    traps:[
        "Type erasure",
        "Wildcard confusion",
        "Heap pollution"
    ]
}
];