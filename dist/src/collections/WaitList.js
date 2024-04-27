"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waitlist = void 0;
exports.Waitlist = {
    slug: "waitlist",
    access: {
        read: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        create: function () { return false; },
        update: function () { return false; },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        }
    },
    fields: [
        {
            name: "email",
            label: "Correo Electrónico",
            type: "text",
            required: true,
        },
    ],
};
