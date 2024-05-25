<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OnboardNotify extends Notification
{
    use Queueable;

    public $user;
    public $otp;
    public $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($user, $type = 'otp', $otp = null)
    {
        $this->user = $user;
        $this->otp = $otp;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if($this->type == 'account_approved'){
            return (new MailMessage)
                ->subject('Account Approved')
                ->markdown('emails.onboardmail', ['user' => $this->user, 'type' => $this->type]);
        }elseif($this->type == 'account_denied'){
            return (new MailMessage)
                ->subject('Account Denied')
                ->markdown('emails.onboardmail', ['user' => $this->user, 'type' => $this->type]);
        }else{
            return (new MailMessage)
                ->subject('OTP Verification')
                ->markdown('emails.onboardmail', ['user' => $this->user, 'otp' => $this->otp, 'type' => $this->type]);
        }
        
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
