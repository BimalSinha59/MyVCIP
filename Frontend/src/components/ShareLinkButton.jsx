import { useState } from "react";
import { CheckIcon, CopyIcon, Share2Icon } from "lucide-react";
import toast from "react-hot-toast";

function ShareLinkButton() {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            // Dynamically grabs the current browser URL
            const inviteLink = window.location.href; 
            await navigator.clipboard.writeText(inviteLink);
            
            setCopied(true);
            toast.success("Invite link copied to clipboard!");
            
            // Reset icon back to copy after 2 seconds
            setTimeout(() => setCopied(false), 2000); 
        } catch (err) {
            toast.error("Failed to copy link", err);
        }
    };

    return (
        <button
            onClick={handleCopyLink}
            className={`btn btn-sm gap-2 normal-case transition-all ${
                copied ? "btn-success text-success-content" : "btn-outline btn-primary"
            }`}
        >
            {copied ? (
                <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Share2Icon className="w-4 h-4" />
                    <span>Invite Peer</span>
                </>
            )}
        </button>
    );
}

export default ShareLinkButton