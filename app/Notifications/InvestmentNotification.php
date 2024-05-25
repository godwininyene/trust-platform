<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvestmentNotification extends Notification
{
    use Queueable;


    public $user;
    public $wallet;
    public $mining;
    public $plan;
    /**
     * Create a new notification instance.
     */
    public function __construct($user, $wallet, $mining, $plan)
    {
        $this->user = $user;
        $this->wallet = $wallet;
        $this->mining = $mining;
        $this->plan = $plan;
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
        return (new MailMessage)->markdown('email.investments', [
            'wallet' => $this->wallet,
            'user' => $this->user,
            'mining' => $this->mining,
            'plan' => $this->plan,
        ]);
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
